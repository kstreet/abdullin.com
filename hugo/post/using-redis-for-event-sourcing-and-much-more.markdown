---
aliases:
- /journal/2012/9/16/using-redis-for-event-sourcing-and-much-more.html/index.html
date: 2012-09-16
tags:
- xLim
- Lokad
- Domain Event
- Story
title: Using Redis for Event Sourcing and much more
---
<p>Over the last week I've been thinking about high-scale production setups for event-centric architectures. Something that can handle retail networks in realtime while providing cost-effective solution to deal with <a href="http://abdullin.com/journal/2012/9/12/business-amnesia.html">business amnesia</a>. Obviously there is Greg's event store (to be released tomorrow), however having multiple deployment options is even better.</p>

<p>Here's a quick overview of implementing event store with <a href="http://redis.io/">Redis</a>. Redis is an <strike>Erlang</strike> C key-value store with configurable reliability guarantees, master-slave replication and a diverse set of server-side storage primitives. </p>

<p>ServiceStack developers use Redis extensively for caching. They have even developed <a href="https://github.com/ServiceStack/ServiceStack.Redis">ServiceStack.Redis for C#</a></p>

<p>Using immediate persistence (fsync after each change) and eventual replication you can easily get thousands of commits per second on a simple machine. This is way less than specialized event store implementations, but could be good enough for a low-cost production deployment. Besides, you can speed things up by doing fsync after each second. <a href="http://redis.io/topics/benchmarks">See more benchmarks</a> or check out series of articles on <a href="http://blog.zilverline.com/">ES with Redis and scala</a>.</p>

<h2>Event Storage Primitives</h2>

<p>We can use following primitives for event storage persistence:</p>

<ul>
<li>Hash - provides fast O(1) get/set retrieval operations for individual events</li>
<li>List - can store associations of events to the individual streams (fast to add)</li>
</ul>

<p>Store individual events in hash structure (allows O(1)) operations:</p>

<pre><code>&gt; HSET EventStore e1 Event1
</code></pre>

<p>Where:</p>

<ul>
<li>EventStore - name of the hash to use for storing events (might as well be one store per riak DB)</li>
<li>e1 - sequentially incrementing commit id</li>
<li>Event1 - event data</li>
</ul>

<p>You can get number of events in the store by</p>

<pre><code>&gt; HLEN EventStore

(integer) 8
</code></pre>

<p>In order to enumerate all events in a store, you simply ask Redis to return all hashes given their IDs, for example:</p>

<pre><code>&gt; HMGET EventStore e1 e2 e3 e4 

1) "Event1"
2) "Event2"
3) "Event3"
4) "Event4"
</code></pre>

<p>Individual event streams are just lists which contain references to individual commit IDs. You can add event(s) to a stream by <code>RPUSH</code>. For instance, here we add events e2, e4, e7 to list <code>customer-42</code></p>

<pre><code>&gt; RPUSH customer-42 e2 e4 e7
</code></pre>

<p>Version of an individual event stream is a length of corresponding list:</p>

<pre><code>&gt; LLEN customer-42

(integer) 3
</code></pre>

<p>In order to get list of commits that are associated with a given list:</p>

<pre><code>&gt; LRANGE customer-42 0 3

1) "e2"
2) "e4"
3) "e7"
</code></pre>

<p>In order to achieve fast performance and transactional guarantees, we can run each commit operation as server-side LUA script, which will:</p>

<ol>
<li>Provide concurrent conflict detection</li>
<li>Push event data to hash</li>
<li>Associate event with a stream</li>
</ol>

<h2>Publishing and replays</h2>

<p>Redis provides basic primitive for PUB/SUB. This means, that we can push event notification to zero or more subscribers immediately (in the same tx) or eventually:</p>

<pre><code>&gt; PUBLISH EventStore e1 e2
</code></pre>

<p>This means that in order for the projection host (or any event listener) to have the latest events we:</p>

<ol>
<li>Get current version of event store: <code>HLEN</code></li>
<li>Enumerate all events from 0 to length by <code>HMGET</code></li>
<li>Subscribe to new events, if there were new events since we started replaying (or read the new batch otherwise): <code>SUBSCRIBE</code></li>
</ol>

<h2>Additional side effects</h2>

<p>First, since Redis is a key-value store, we can also persist within the same setup:</p>

<ul>
<li>Aggregate snapshots</li>
<li>Projected views</li>
</ul>

<p>Second, capability for message queues can be handy for load-balancing work commands between multiple servers.</p>

<p>Third, server-side capability for associating events with event streams (individual event stream is just a collection of pointers to event IDs) can be handy for event-sourced business processes.</p>

