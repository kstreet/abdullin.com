---
aliases:
- /journal/2012/2/13/reading-list-on-big-data.html/index.html
date: 2012-02-13
tags:
- xLim
- Lokad
- Azure
- Cloud Computing
- DDD
- CQRS
- Domain Event
title: Reading List on Big Data
---
<p>This is purely theoretical blog post to summarize my last few days of studies into the big data (which were triggered by one homeless guy and sequence of highly unprobable events that actually took place). No fancy intro, just assuming that dealing with big data processing is really cool or at least has an outstanding financial reward potential (given the trajectory taken by modern IT and economics).</p>

<h2>Current Approach at Lokad</h2>

<blockquote>
  <p>Or at least - simple part of it, that is not touched yet by secret fairy dust of our outstanding analytics team. </p>
</blockquote>

<p>In short, big data is bulky, complex, requires a lot of CPU and does not fit in RAM. So we've got to <strong>break calculations into smaller batches</strong>. We want to process everything as fast as possible, so we <strong>push these batches to separate machines</strong>. Concurrent processing can cause a lot of problems with race conditions, so <strong>we cheat</strong>:</p>

<ul>
<li>Batches of big data are immutable once written (that should scare anybody who is coming from the old world where storage was expensive and SQL ruled the world). So we can share them.</li>
<li>We keep bulk processing as dead-simple immutable functions, that are woken up by a message, consume some immutable data, do heavy CPU job and then produce output message (which could include reference to a newly created immutable block of data)</li>
<li>These immutable functions construct a processing graph of (extremely simplified) <a href="http://en.wikipedia.org/wiki/MapReduce">map reduce</a> implementation, that can actually do a lot of things.</li>
<li>When graph elements need synchronization, we do that via messages that flow to aggregate roots controlling the process. They don't do any heavy-lifting (they don't even touch actual data, but just metadata level information), but encapsulate some complex behaviors to navigate execution through the computational graph. We don't have problems with implementing this seemingly complex part (or testing it), since <a href="http://codebetter.com/gregyoung/">Greg Young</a> and <a href="http://domaindrivendesign.org/books/evans_2003">Eric Evans</a> provided us with CQRS/DDD toolset and some <a href="http://bliki.abdullin.com/event-sourcing/why">event sourcing</a>.</li>
</ul>

<p>This is a <strong>poor-man's architecture</strong> that can be implemented by a single developer from scratch in a month. It will work and have decent elastic scaling capacities, provided that you have abundance of CPU, Network and Storage capacities (which are provided by cloud environments these days).</p>

<p><strong>This approach is explained in a lot more detail</strong> in <a href="http://abdullin.com/journal/2012/5/2/processing-big-data-in-cloud-a-la-lokad.html">Processing Big Data in Cloud à la Lokad</a></p>

<p>Potential caveats:</p>

<ul>
<li>Domain modeling should be done carefully from the start. Lay out the computations and think through the algorithms.</li>
<li>Cloud queue latency and complexity would be your bottlenecks in the cloud (all the other limitations are solved by adding more VMs)</li>
<li>This is a batch-processing approach, which is not fit for real-time processing.</li>
<li>Yes, this is a hand-made implementation of MapReduce.</li>
</ul>

<h2>How can we improve that?</h2>

<p>So what are the limitations of the previous approach?</p>

<ul>
<li>Complexity</li>
<li>Messaging latency</li>
<li>Absence of real-time processing</li>
</ul>

<p>First <strong>complexity limitation</strong> can be handled by separating the system into separate elements. No, I'm not talking about layers (these will do more harm than good), but rather separate bounded contexts, that have clear:</p>

<ul>
<li>boundaries;</li>
<li>language;</li>
<li>contracts for exchanging data and communicating with other bounded contexts;</li>
<li>whatever choice of technology that is fit.</li>
</ul>

<p><strong>Second limitation of messaging latency</strong> can be worked by saying <em>au revoir</em> to any solution with man-in-the-middle architecture (in cloud these implementations are called "cloud queues" or "cloud service buses"). Broker-based architectures are a logical dead-end for the large-scale distributed computations (just like relational databases are for persistence). They limit our scaling capabilities.</p>

<p>So we need to rewire our brains just a little bit and leave the world of ACID, transactions and tables (wake up, Neo):</p>

<ul>
<li><a href="http://en.wikipedia.org/wiki/Eventual_consistency">eventual consistency</a>;</li>
<li><a href="http://www.zeromq.org/whitepapers:brokerless">brokerless architectures</a>;</li>
<li><a href="http://highscalability.com/blog/2011/11/14/using-gossip-protocols-for-failure-detection-monitoring-mess.html">gossip protocols</a>;</li>
</ul>

<p>Or, if you want a simpler path, just use <a href="http://hadoop.apache.org/">Hadoop</a>.</p>

<p><strong>Third limitation is lack of real-time processing</strong>. You see, this approach to big data is still good old batch processing. It grabs a chunk of data and then takes some time to process it. If we are working with real-life information, then by the movement we finish processing history, we'll have some fresh data that requires recomputation.</p>

<p>If this were end of the road, Twitter would never exist. But they cheat. They provide real-time capabilities by incrementally processing new data using some crude and rough algorythms. They are not as precise as batch processing, can make mistakes, can handle only a little bit of data, but they <strong>are fast</strong>. </p>

<p>So whenever a user loads up his twitter profile, he gets result that is composed from thoroughly processed batch data plus whatever changes happened since this slow process started. The latest bits might not be precise (i.e. they could miss a few mentions from fellows in the other hemisphere and also include a few spam-bots), but they are almost real-time, which is what matters. And actually as the time goes, <strong>results will be magically corrected</strong>, because a little bit later batch map reduce algorithms will get there and replace fast approximations with slow but thorough results.</p>

<p><a href="http://www.slideshare.net/nathanmarz/storm-distributed-and-faulttolerant-realtime-computation">Twitter Storm</a> incorporates end explains this dual approach to big data in greater details.</p>

<h2>Edge Cases</h2>

<p>People say that there are no silver bullets (which is actually wrong, you <a href="http://www.bulletforge.com/plated.php">can buy that stuff on internet</a>) and hence one approach to big data will not fit all cases. Let's ignore total absence of logic in this statement and focus on potentially specific edge case of big data that might benefit from a separate approach. I'm talking about event streaming.</p>

<p>Enterprise companies consider event streams this to be a rather complex scenario, when "a lot of events come in a short amount of time". Such complexity even created niche called <a href="http://en.wikipedia.org/wiki/Complex_event_processing">Complex Event Processing</a> which sounds like really complicated and expensive field. Partially this is justified because events often require proactive reaction to something that happens in real-time. Yet this reaction could depend upon the events that happened millions of events back (this means "a lot of" data has to be stored).</p>

<blockquote>
  <p>From now on, please replace "a lot of" with the term that you will hear in 12th episode of <a href="http://distributedpodcast.com/">distributed podcast</a> which was recorded this weekend.</p>
</blockquote>

<p>Let's see if there is a simple poor man's approach to handle "a lot of events". We will need following ingredients.</p>

<p><strong>First ingredient is fast storage</strong>, that is dead-simple, provides immediate access to any data by key (at most two disk seeks for cases, where entire key index does not fit in memory). We don't ask for ACID or query language here, but ease of replication is definite plus. <a href="http://wiki.basho.com/Bitcask.html">Basho bitcask</a> and <a href="http://www.igvita.com/2012/02/06/sstable-and-log-structured-storage-leveldb/">Google's SStable</a> provide extensive guidance here. </p>

<p>By the way, <a href="http://html5-demos.appspot.com/static/html5storage/index.html#slide34">IndexDB in WebKit</a> uses LevelDB, which is based on SSTable.</p>

<p><strong>Second ingredient is distributed architecture design</strong> that would support arbitrarily large amount of nodes operating in a single prepartitioned ring-shaped hash-space, where nodes can come, fail and go as they wish. <a href="http://vimeo.com/13667174">Data should survive</a> no matter what (and be easily available), while scaling can be elastic. If this sounds a bit scary for you, don't worry, there is plenty of material (and source code) from:</p>

<ul>
<li><a href="http://basho.com/blog/technical/2011/04/12/Where-To-Start-With-Riak-Core/">Basho Riak Core</a></li>
<li><a href="http://project-voldemort.com/design.php">Project Voldemort</a></li>
<li>Father of them all - <a href="http://s3.amazonaws.com/AllThingsDistributed/sosp/amazon-dynamo-sosp2007.pdf">Amazon Dynamo</a></li>
</ul>

<p><strong>Third ingredient is cloud computing</strong>, that would provide CPU, Network and computing resources needed to power that architecture, while not requiring any upfront investments. I've been blogging about this aspect for quite a few years for now. At this point in time we already have a number of cloud computing providers with some competition between them. For example:</p>

<ul>
<li>Windows Azure Cloud;</li>
<li>Amazon AWS;</li>
<li>Rackspace Cloud.</li>
</ul>

<p>Competition in this area already drives prices down and rewards efficient use of resources.</p>

<p><strong>Fourth ingredient is about lower-level implementation principles</strong> that fit into the distributed environments, append-only persistence and eventually consistent world that even tolerates conflicts. Great head-start in this area is provided by <a href="http://zguide.zeromq.org/page:all">ZeroMQ tutorial</a> and filled by the mess of patterns and practices united by the name of <a href="/tags/cqrs/">CQRS architectures</a>. </p>

<p>Since these CQRS-based principles actually provide a uniform mental model for dealing with events and events streams in distributed world (unless you are playing it old-school with SQL) along with techniques of designing and modeling such abstractions (known as <a href="http://en.wikipedia.org/wiki/Domain-driven_design">DDD</a>), they already give solutions to most common problems that you might face, while bringing together in practice distributed architectures, fast streaming key-value stores and cloud computing.</p>

<p><strong>Fifth ingredient is the Force.</strong> May it be with you, in this new but certainly exciting field :)</p>

<pre><code>[2012021402321337237189] Memory dump complete...
</code></pre>

