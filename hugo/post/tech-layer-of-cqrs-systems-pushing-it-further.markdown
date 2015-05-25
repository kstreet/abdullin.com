---
aliases:
- /journal/2011/12/18/tech-layer-of-cqrs-systems-pushing-it-further.html/index.html
date: 2011-12-18
tags:
- Azure
- Cloud Computing
- Domain Event
title: Tech Layer of CQRS Systems&#58; Pushing it Further
---
<p>Let's see how we can extend <a href="http://abdullin.com/journal/2011/12/18/learning-distributed-systems-sockets-and-event-store.html">previously mentioned</a> model of simple event store to support partitioning of event stores, along with re-partitioning and fail-over scenarios.</p>

<p><span class="full-image-block ssNonEditable"><span><img src="/storage/uploads/2011/12/eschema3.png?__SQUARESPACE_CACHEVERSION=1324223809248" alt=""/></span></span></p>

<p>We bring in the Service-Oriented Reliable queuing  (<a href="http://zguide.zeromq.org/page:all#Service-Oriented-Reliable-Queuing-Majordomo-Pattern">Majordomo Pattern</a> with heartbeat support) as the middle-man between clients (aggregate roots) and actual event stores. This router will know about available event store partitions (even if there is only one) and their fail-over replicas.</p>

<p>Actual stores could be either straight append-only files that are preallocated in large chunks (with one writer and multiple readers). Alternatively we could use circular buffer (resembling <a href="http://martinfowler.com/articles/lmax.html">LMAX approach</a>) for short-term memory, that is eventually replicated to something more durable.</p>

<p>Note, that here we assume that we could host multiple readers on the same event stream:</p>

<ul>
<li>Publishers (to replicate events downstream).</li>
<li>Replayers (to provide random access to persisted events, including full replays).</li>
<li>Saga and projections hosts.</li>
</ul>

<p>Each of these readers has benefit of being able to process pending events in batches, simplifying "we need to catch up on a lot of work" scenarios. Once again, just like it is in LMAX.</p>

<p>For the purity approach we can just keep publisher and replayer running on that even stream, while pushing the rest of the readers further down-stream.</p>

<p>In order for some things to happen properly, event store must add it's own envelope (or a frame) to recorded messages, including <strong>sequence number</strong>, that is incrementing and unique within the store. Fortunately it is easy to do, since we have only one writing thread (the one, that supports more than 20000 messages per second on commodity hardware).</p>

<p><strong>Why would we need sequence number?</strong> Imagine a case, where a few projection hosts are subscribed to  event stream in real time. Let's also assume that we have so many projection hosts over the network, that UDP-like broadcasts become beneficial for us. There is a slight problem though - we can't guarantee reliable delivery of messages out-of-box with UDP. This is where sequence numbers come in - they can be used to detect missing, duplicate or out-of-order messages. When this happens, we will ask for replay or just throw the exception to support.</p>

<p><strong>How do we handle fail-over of event stores?</strong> High-availability pair could be used here (<a href="http://zguide.zeromq.org/page:all#High-availability-Pair-Binary-Star-Pattern">Binary star</a>). We will start another store replica in a different availability zone, connected via the dedicated network connection to the master. We'll configure store clients (our majordomo broker in this case) to fall back to the slave store if the master is not available (this can be detected via the heart-beats). Slave will take on as master, if it starts getting requests AND master is not available. Tricky part here is to avoid network configuration that would increase chance of "split brain".</p>

<p><strong>How do we handle failures of central broker?</strong> We don't need to. We can have multiple instances running on the network and have clients configured to pick the one available.</p>

<p><strong>How do we handle repartitioning of stores?</strong> That's an interesting one. <a href="http://ntnu.diva-portal.org/smash/get/diva2:439581/FULLTEXT01">Articles</a> are written about repartitioning (i.e. when applied to search indexes). Brute-force approach is to create a replica on a new machine and let it catch up with the primary store. Then, shut down writing thread of the master and switch broker(s) to the slave. We'll configure stream readers to start working on new partition as soon as readers fully catch up on the former masters.</p>

<p><strong>Interesting possibility</strong> is that similar setup could also be used to create persistent queues for "command" messages.  The same message store could also be used to implement Disconnected Reliability (<a href="http://zguide.zeromq.org/page:all#Disconnected-Reliability-Titanic-Pattern">Titanic Pattern</a>) on top of Service-Oriented reliable queuing provided by <a href="http://zguide.zeromq.org/page:all#Service-Oriented-Reliable-Queuing-Majordomo-Pattern">Majordomo</a>.</p>

<p><span class="full-image-block ssNonEditable"><span><img src="/storage/uploads/2011/12/eschema4.png?__SQUARESPACE_CACHEVERSION=1324225208419" alt=""/></span></span></p>

<p>How much sense does this make?</p>

<p>NB: Naturally, there are a few notes:</p>

<ul>
<li>Presented setup does not need to fit 100% of event centric systems. It's just something that an architecture could be based upon. Specific sections and subsystems could be tuned from there (especially as we go into custom setups and various outliers).</li>
<li>Setup provides enough decoupling and flexibility to work in both intranet scenarios (or even in a single machine) and in the flexible cloud scenarios. This does not affect the architecture, just a few specific choices around topology and infrastructure.</li>
<li>ZMQ guide provides an extensive overview of reliability and scalability patterns mentioned above. If something does not make sense, please try to <a href="http://zguide.zeromq.org/page:all">read the guide</a> first.</li>
</ul>

<p><strong>I don't plan to bring these approaches into production</strong> any time soon. At the moment of writing this is just a theoretical exercise that should serve as a backup plan. This is just in case I would need to increase throughput of our message queues by a factor of 1000 or more per partition. Given specifics of our work at <a href="http://www.lokad.com/">Lokad</a>, this possibility should be handled upfront - hence this research.</p>

