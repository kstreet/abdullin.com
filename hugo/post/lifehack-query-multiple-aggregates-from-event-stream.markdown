---
aliases:
- /journal/2011/11/16/lifehack-query-multiple-aggregates-from-event-stream.html/index.html
date: 2011-11-16
tags:
- Cloud Computing
- DDD
- Domain Event
title: Lifehack&#58; Query Multiple Aggregates from Event Stream
---
<p>Given a domain log (containing all events and commands of some context) it's really easy to load any aggregate (or any group of them) and perform some query, given that you are using <a href="http://bliki.abdullin.com/event-sourcing/why">event sourcing</a>.</p>

<p>Last night I've got a problem with one of the systems running on staging grounds in Rackspace cloud. This system performs some big data processing and analytics for <a href="http://www.lokad.com/shelfcheck-on-shelf-availability-optimization.ashx">OSA analysis</a>. One of the required steps is to assemble data and then run massive Map Reduce operation on top of it, involving some 3rd party services. Roughly 8 reduce batches (out of 300) failed with the timeouts caused by that external service. This morning I have to figure out the exact data problem and find ways to 'scavenge' the results without rerunning long operation again.</p>

<p>Luckily I'm using good old CQRS/ES to manage all behaviors and integrations (actual data is never referenced or managed by AR+ES entities). Also, to facilitate debugging (and view rebuilds), systems record all passing messages into a separate event stream called <em>domain log</em>. So the task is reduced to getting the latest version of this stream (which is just an append-only file) and loading it in a snippet:</p>

<pre><code>var dataSerializer = ProtoBufDataSerializer.LoadAndScanDomains();
var envelopeSerializer = new ProtoBufEnvelopeSerializer();
var envelopeStreamer = new EnvelopeStreamer(envelopeSerializer, dataSerializer);

// load all messages
var stores = new FileTapeStream(@"C:\temp\domain.tmd")
    .ReadRecords(0, int.MaxValue)
    .Select(b =&gt; envelopeStreamer.ReadAsEnvelopeData(b.Data))
    .SelectMany(b =&gt; b.Items.Select(i =&gt; i.Content))
    // pick only events for an aggregate bound to StoreId
    .OfType&lt;IEvent&lt;StoreId&gt;&gt;()
    // group them and load into the state objects
    .GroupBy(b =&gt; b.Id.Id)
    .Select(events =&gt; new StoreAggregateState().With(events));

foreach (var store in stores)
{
    var missingForecasts = store.Forecasts.Values.Where(f =&gt; !f.Delivered);
    foreach (var forecast in missingForecasts)
    {
        Console.WriteLine("Missing {0} with key {1}", forecast.Dataset, forecast.ApiKey);
    }
}
</code></pre>

<p>That gives me enough data to check out the missing batches and deal with the situation.</p>

<p><strong>Important:</strong> obviously the purpose of this snippet is to facilitate the debugging. In production you would almost never use such queries across the entire <em>domain log</em>. <a href="http://bliki.abdullin.com/event-sourcing/projections">Projections</a> are a better fit here.</p>

<p>This approach relies on <a href="http://bliki.abdullin.com/event-centric/identity">strongly-typed identities</a> and their binding to <a href="http://bliki.abdullin.com/event-centric/aggregates-2">aggregate roots</a> in order to simplify querying of event stream. However this is not essential.</p>

