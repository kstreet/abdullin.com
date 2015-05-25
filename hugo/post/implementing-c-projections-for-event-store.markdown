---
aliases:
- /journal/2013/8/16/implementing-c-projections-for-event-store.html/index.html
date: 2013-08-16
title: Implementing C# projections for Event Store
tags:
- story
- event-driven
---
<p>In one of my previous posts I mentioned migration of some Lokad systems to <a href="http://abdullin.com/journal/2013/7/26/migrating-to-eventstore-in-windows-azure.html">dedicated Event Store</a>. One of the steps in this migration process involve switch from legacy <a href="http://abdullin.com/journal/2011/1/19/scalable-and-simple-cqrs-views-in-the-cloud.html">Lokad.CQRS View projections</a> to new C# projections.</p>

<p>New version of view projections does not have smart in-memory replay managed by the system, but they are inherently faster due to batch processing nature. Design is really simple: we subscribe to events from the storage (from last known checkpoint) and pass to projection, batching events together for better performance. After each batch, we update checkpoint.</p>

<p><img src="/storage/uploads/2013/08/2013-08-16-implementing-projections.jpg" title="4792283217ca0116da1b145263f70c92.jpeg" border="0" width="550" height="235" /></p>

<p>Here's how one projection implementation (maintaining list of comments per account) might look like:</p>

<pre><code>public sealed class AccountViewProjection : BatchProjectionFor&lt;AccountView&gt;
{
    public AccountViewProjection(IKeyValueStore store) : base(store)
    {
        RequestEventsInBatchesOf(100);
    }

    public override void HandleEventsIdempotently(ICollection&lt;object&gt; events)
    {
        var comments = events
            .OfType&lt;AccountCommentAdded&gt;()
            .ToLookup(c =&gt; c.AccountId);

        if (!comments.Any()) return;
        // This batch change is fast, but it must be idempotent
        // for this specific projection type, since underlying
        // storage does not support transactions spanning multiple keys

        // Probably we could make this async...
        comments
            .AsParallel()
            .ForAll(g =&gt; Store.UpdateEnforcingNew(g.Key, view =&gt;
                {
                    foreach (var added in g)
                    {
                        view.AddComment(added.Comment, added.Manager.FullName);
                    }
                }));
    }
}
</code></pre>

<p>This design is shaped by the <strong>constraint that we need to work efficiently with dead-simple key-value storage</strong> like Azure blob storage (but support simple migration to any database engine). This is caused by the fact that existing Lokad.CQRS projections run use this storage.</p>

<p>What we actually do here - for each projection:</p>

<ol>
<li>Start a projection manager as separate runtime task (can be implemented as Task that is retried on failure).</li>
<li>Calculate projection version from the codebase. If projection code has changed, then kill all the cached views and reset checkpoint.</li>
<li>Subscribe to specific event stream starting from the last known checkpoint.</li>
<li>Feed retrieved events in batches to the projection.</li>
<li>After processing batch, update the checkpoint.</li>
</ol>

<p>Please, keep in mind: this is the very first version that is not optimised. <strong>I'm following mantra: first, make it work, then make it beautiful, then make it fast</strong>.</p>

<p>Additional notes:</p>

<ul>
<li>Projection can actually specify batch size it's willing to accept. </li>
<li><strong>Detection of changes in projection's codebase</strong> is done using the same code as in projection rebuilder of Lokad.CQRS (via Mono.Cecil).</li>
<li>Since <strong>each projection subscribes to event store individually</strong>, they are completely independent. However, this could mean a lot of traffic going through. Simple solution would be to have an <strong>event store cache per node</strong>, which is shared by all projections on the same node. This cache could be either in memory or on disk. See mantra, though.</li>
<li>In case of projection failure, it will blow up it's manager. Runtime will restart this task and projection will resume from the last known checkpoint. If we have too many repetitive failures - <a href="http://en.wikipedia.org/wiki/Circuit_breaker_design_pattern">circuit breaker</a> will kick in to let the system cool down.</li>
</ul>

<p>What do you think? How do you implement your view projections in C#?</p>
