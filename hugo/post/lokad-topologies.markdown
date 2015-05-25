---
aliases:
- /journal/2012/9/7/lokad-topologies.html/index.html
date: 2012-09-07
tags:
- xLim
- Lokad
- Cloud Computing
- CQRS
- Story
title: Lokad Topologies
---
<p>Let's talk about system topologies of Lokad.CQRS application. System topology describes flow of messages between elements of a single application or distributed cluster. If you remember classical CQRS triangle (client-application server-projection host), this is an example of topology.</p>

<blockquote>
  <p>Normally this should be an episode in Being the worst podcast. However this is a complicated  topic for first episodes, and I don't want to make some of the advanced Lokad.CQRS users wait for a few months.</p>
</blockquote>

<p>There are multiple ways to organize topology, depending on your scenario and technology. I'm going to present you one of such ways, that is partially based on CQRS principle with some support for multiple BCs and scalability.</p>

<p>While reading that please keep in mind, that the core focus of this topology is to keep things as simple and uniform as possible. That approach would work with minor modifications for basic projects, however more complicated scenarios might require stepping back from the starting template.</p>

<p>We'll start with revisiting basic elements. Here are some assumptions and terminology:</p>

<ol>
<li>Currently our building blocks are: Application Services, Ports, Projections and Tasks. </li>
<li>Application Service is just a class that hosts multiple command handlers (methods that are called when command message or remote procedure call arrives to server). Application services contain core business logic and can either be stateless (functions that take command, do some action and publish result as an event) or stateful. Stateful application services usually deal with entities which are uniquely idenfitied by an identity. In Lokad.CQRS projects the majority of stateful application services host aggregates with event sourcing (or A+ES).</li>
<li>Currently in Lokad.CQRS the only way to call application service is by sending a command, which will be put to a persistent queue. Message dispatcher on the server will pick this command and dispatch it to the corresponding command handling method on an application service.</li>
<li>Application services hosting A+ES do not publish any events directly; instead, they append events to the event store. Message publisher will send them out later. This functionality is being introduced in IDDD branch of Lokad.CQRS and helps to solve the problem of two-phased-commit (if you don't know what this is - don't worry, that's legacy from SQL times).</li>
</ol>

<h2>Application Service with A+ES</h2>

<p>Application service with A+ES and an event store looks like the bit below.</p>

<p><span class="full-image-block ssNonEditable"><span><img src="/storage/uploads/2012/09/2012-09-07_simple-entity2.png?__SQUARESPACE_CACHEVERSION=1347034835172" alt=""/></span></span></p>

<p>We can scale this out between multiple threads on the same system by paritioning. Our partitioning logic will assume that entities with the same ID will always be handled on the same machine. For instance, we can use such router code:</p>

<pre><code>ICommand&lt;IIdentity&gt; cmd;
IQueueWriter[] queues;

queues[cmd.Id.GetStableHash % queues.Length].Put(cmd);
</code></pre>

<p>In this case, if we have 2 queues, then commands to aggregates with IDs like 0, 2, 4 will always go to the first queue, while IDs 1,3,5 etc will be handled on the second.</p>

<p><span class="full-image-block ssNonEditable"><span><img src="/storage/uploads/2012/09/2012-09-07_entity-partitioned.png?__SQUARESPACE_CACHEVERSION=1347034632166" alt=""/></span></span></p>

<p>These application service instances can be located on different threads within the same machine or located on other machines. This approach allows us to parallelize execution, while still ensuring, that all commands of a single aggregate instance will always be handled within the same thread. Such thread affinity allows to simplify a lot of otherwise complicated synrhonization and concurrency scenarios at the cost of some idle threads (or even machines). </p>

<p>Fortunately, hardware evolution favors low-power multi-core systems (think about all these energy-efficient ARM chips), which will benefit from this architecture even more.</p>

<h2>Functional Service</h2>

<p>With functional services everything is a bit simpler. They handle commands in idempotent fashion (preferrable) and produce events but without any state affinity. This makes them easy candidate for hosting some resource intensive  logic (like number crunching).</p>

<p><span class="full-image-block ssNonEditable"><span><img src="/storage/uploads/2012/09/2012-09-07_func-simple.png?__SQUARESPACE_CACHEVERSION=1347034677554" alt=""/></span></span></p>

<p>Since we don't have any state to synchronize access to, we can scale such tasks by distribute commands around in any way (e.g. having 8 functional threads on 4 different virtual machines). Round-robin and random distribution are simple but rather efficient approaches to balance the load more-or-less evenly. Besides, you can always add multiple functional command handlers to the same queue, making them compete for work.</p>

<p>You might go even further and have these functional command handlers on a separate VM, increasing or decreasing number of VM instances according to the load (e.g. number of unprocessed messages in the queue).</p>

<p>You can have these functional services publish events by writing them to the same event store, or you can throttle load on that event store by publishing messages to the "event recorder queue", handler or which will write events to the store.</p>

<p><span class="full-image-block ssNonEditable"><span><img src="/storage/uploads/2012/09/2012-09-07_func-deferred.png?__SQUARESPACE_CACHEVERSION=1347034660848" alt=""/></span></span></p>

<h2>Client interactions</h2>

<p>Presence of command routers and functional recorders come in handy, when you need to bring client applications in picture (e.g.: web client or smartphone client). These applications would need a way to send commands (rename user) or report events (user logged into the web UI). Obviously, these would go to the same "command router" or "event recorder" queues. </p>

<p><span class="full-image-block ssNonEditable"><span><img src="/storage/uploads/2012/09/2012-09-07_client.png?__SQUARESPACE_CACHEVERSION=1347034694357" alt=""/></span></span></p>

<p>Note: you can easily have one single "router" queue, which will either route commands or record events, but I found this to complicate the implementations. It's easier to be more explicit.</p>

<h2>Bringing this all together</h2>

<p>Having said all that, let's have a look, how all these elements come together for one possible configuration of topology. This picture might look complex (it is actually a topology for <a href="http://www.lokad.com/salescast-sales-forecasting-software.ashx">Lokad.Salescast2</a> product), if you try to "swallow" all of it at once. If you break it down into individual components - things should get easier.</p>

<p><span class="full-image-block ssNonEditable"><span><img src="/storage/uploads/2012/09/2012-09-07_s2.png?__SQUARESPACE_CACHEVERSION=1347034712804" alt=""/></span></span></p>

<p>Please note, that implementing this <strong>full topology is an overkill for a lot of scenarios</strong>. Often you can live with just a few queues and handlers. However, sometimes it helps to know in which direction you can evolve your topology, should requirements become more demanding.</p>

