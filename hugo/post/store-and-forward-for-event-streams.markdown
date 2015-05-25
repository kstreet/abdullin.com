---
aliases:
- /journal/2011/12/1/store-and-forward-for-event-streams.html/index.html
date: 2011-12-01
tags:
- xLim
- Azure
- Cloud Computing
- Domain Event
title: Store and forward for Event Streams
---
<p>As we are getting deeper into event centric architectures at <a href="http://www.lokad.com/">Lokad</a>, more and more event stores show up in our systems. Most of them sit around in Azure Cloud store, while some are replicated to different cloud and across local machines.</p>

<p><span class="full-image-block ssNonEditable"><span><img src="/storage/uploads/2011/12/2011-12-01_event-log.png?__SQUARESPACE_CACHEVERSION=1322719772044" alt=""/></span></span></p>

<blockquote>
  <p>See BlockBlobTapeStream in Lokad.CQRS code for latest implementation details of event streams for Azure. This is different from previous version of BlobTapeStream but generates a format that matches the one of FileTapeStream.</p>
</blockquote>

<p>Essentially event stream file (or blob) is just an append-only binary structure that contains envelopes with some properties and binary payload. Envelopes include signature bytes, hashes and length specifiers by default. Simple stuff that fits in a few hundred lines of code per storage type. It also works. There are certain quirks but the job gets done.</p>

<p>Problem shows up at different level - replication of streams stored in Azure Blob Storage. Don't get me wrong, simple Azure Blob scenario would work for 90% of our scenarios out-of-the-box, and it is extremely reliable (as reliable as Blob Storage). Yet, when you are pushing certain primary nodes to their limit, they become the bottleneck in the system because of the latency (caused by multiple REST requests to Azure cloud storage just to perform an append). </p>

<p>Since event store is the essential building block of event centric systems, I would like to have something that could be relied on and dead-simple. Just <strong>store-and-forward service for event streams</strong> that can push through at least 1000 events per second for a single stream (I know, that's not too much to ask).</p>

<p>Ideally, it would be platform agnostic (meaning that it works same way on local machine and remote server). I'm willing to relax reliability constraints (of an individual node) a bit in favor of performance (it's my job to make sure that overall system is cloud-proof and can withstand the test of "<em>Azure VM got currupted</em>" or "<em>sudden restart came in</em>").</p>

<p>When I'm saying "building block", it actually means:</p>

<ul>
<li>a set of polished classes that are copied from project to project (binary references only, if really needed);</li>
<li>no flexible configuration syntax;</li>
<li>no general purpose functionality;</li>
<li>no complex threading logic.</li>
<li><strong>no server</strong> (only embeddable block).</li>
</ul>

<p>Essentially, a dead-simple stuff that is plugged (in the code!) into the topology and gets the job done. Just like <em>in nature we have simple cells acting as building blocks for complex creatures</em> (even politics).</p>

<p>Currently I'm considering (as a mental exercise) following design of that store-and-forward block. This replay service is just a TPL-driven daemon (engine process in Lokad.CQRS) that stores and forwards binary buffers in completely decentralized manner.</p>

<p><span class="full-image-block ssNonEditable"><span><img src="/storage/uploads/2011/12/2011-12-01_store-and-forward.png?__SQUARESPACE_CACHEVERSION=1322718594984" alt=""/></span></span></p>

<p>These will be plugged in the code to other elements, generating redundancy, replication and decent throughput (even for low performance of our messages).</p>

<p>So any client of that service will just:</p>

<ul>
<li>come online;</li>
<li>subscribe to real-time notifications (put them to in memory queue);</li>
<li>request history from the last known version;</li>
<li>start consuming notifications;</li>
</ul>

<p>By client I would mean "projection host" (the one that handles read models) or local audit tool, or interested and occasionally connected sub-system.</p>

<p>A few additional constraint relaxations:</p>

<ul>
<li>I'm willing to accept occasional message duplication.</li>
<li>I'm willing to accept risk that some information might be completely lost within that node (if surrounding environment goes corrupt).</li>
</ul>

<p>If really needed I could probably tweak the same code to feature any degree of immediate redundancy (as in "write to store is considered to be complete only after it successfully persists data to itself and X slave stores down the stream").</p>

<p>I don't care about the performance since it will be more than adequate here even with the brute-force implementation of mine (I've been saying these words far too often last days). Primary concern is the logical approach. Am I on the right track with it? Any thoughts or experience with similar architectures?</p>

<p><strong>by <a href="http://thinkbeforecoding.com">Jeremie</a></strong>:</p>

<blockquote>
  <p>If you have several streams appending concurently on the same disk, pre allocate the files... or you'll achieve maximal fragmentation.. In the end, it can really really hurt your perf.</p>
  
  <p>I don't say you'll need it, but keep it in mind, so that you don't wonder why your server is reading/writing so slow when file size grows.</p>
  
  <p>I usually split stream in 10 -> 100Mb files.</p>
</blockquote>

<p><strong>Update</strong>:</p>

<p>I've tried a quick prototype that pushes messages through in a really naive way. I'm getting throughput of 1000 persisted messages per second (each message is 15 bytes) on my small VM running inside MacBook Air (disk is flushed after each write).</p>

<p><strong>Update 2</strong>: this article continues in <a href="http://abdullin.com/journal/2011/12/3/thoughts-on-event-streams-in-elastic-environments.html">Thoughts on Event Streams in Elastic Environments</a> (and in a few articles from now I'll have 20000 messages in durable mode :)</p>

