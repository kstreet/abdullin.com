---
aliases:
- /journal/2013/8/7/replicating-events-to-remote-eventstore.html/index.html
date: 2013-08-07
title: Replicating events to remote EventStore
tags:
- event-driven
- story
---
<p>At the moment of writing majority of event-sourced systems at Lokad run at simplified event store from Lokad.CQRS library. We are migrating to <a href="http://geteventstore.com/">Greg's Event Store</a>. In our setup it is  <a href="http://abdullin.com/journal/2013/7/26/migrating-to-eventstore-in-windows-azure.html">hosted on Azure</a>. </p>

<p>Migration process must ensure that we don't break any existing systems. This means that we can't simply jump and switch all code to use new storage. Instead, the <strong>migration process has to be incremental</strong>, like navigating deep waters. After all, running single node on Azure-backed VM, is not supported scenario (although it works).</p>

<p>So we implement change in the least important part of the system, deploy it and observe. There will be some failures and lessons learned. Then, we'd incorporate these into the code and make the next step. So far sequence looks like this:</p>

<ul>
<li>Replicate events from production to dedicated event store server on Azure;</li>
<li>switch non-critical projections to chase streams on dedicated event store server;</li>
<li>migrate aggregates to use dedicated event store server;</li>
<li>where possible, discard server-side command handlers and host aggregate logic directly in Web UI.</li>
</ul>

<p>One of these initial steps involves <strong>replication of events from production event store to new server</strong>. This can be achieved by continuously polling local event store for changes and pushing any new message batches as individual events to remote event stream. For the time being to keep things simple I'll be pushing all events to the single stream. Later on we could relink them to individual event streams.</p>

<p>Actual replication code runs in a separate thread. It is just a "while(true)" loop:</p>

<pre><code>using (var conn = Connect(_config))
{
    conn.Connect();
    connectFailure = 0;

    var version = GetLastReplicatedEventFromRemoteStore(conn, stream);
    var lastReplicatedEvent = version.LocalVersion;
    var remoteVersion = version.RemoteVersion;

    while (!token.IsCancellationRequested)
    {
        if (lastReplicatedEvent == _store.GetCurrentVersion())
        {
            // no work to do, so sleep and continue
            token.WaitHandle.WaitOne(500);
            continue;
        }

        var keys = _store.ReadRecords(lastReplicatedEvent, 10000).ToList();
        var remoteEvents = keys.SelectMany(ConvertToNewEventFormat).ToList();
        conn.AppendToStream(stream, remoteVersion, remoteEvents);

        lastReplicatedEvent = keys.Last().StoreVersion;
        remoteVersion = remoteVersion + remoteEvents.Count;
    }
}
</code></pre>

<p>In order to deal with possible transient failures of the remote event store (this is possible, since I'm running it as single-node for now), we put wrap entire replication process into another loop:</p>

<pre><code>void RunReplicationProcess(CancellationToken token)
{
    int connectFailure = 0;
    while (!token.IsCancellationRequested)
    {
        try
        {
            var localStoreIsEmpty = _store.GetCurrentVersion() == 0;
            if (localStoreIsEmpty)
            {
                token.WaitHandle.WaitOne(TimeSpan.FromSeconds(30));
                continue;
            }

            using (var conn = Connect(_config))
            {
                conn.Connect();
                connectFailure = 0;

                /* replication from snippet above */
            }
        }
        catch (Exception ex)
        {

            if (connectFailure == 0)
            {
                SystemObserver.Notify("Event store connection failure {0}", ex);
            }
            connectFailure += 1;
            token.WaitHandle.WaitOne(TimeSpan.FromMinutes(1));
        }
    }
}
</code></pre>

<p>Once this code is in production and production event streams are replicated, we could migrate less important projections (like the ones backing up Admin Web Apps used by Lokad team members) to new event storage.</p>
