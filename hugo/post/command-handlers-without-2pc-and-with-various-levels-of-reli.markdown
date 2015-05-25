---
aliases:
- /journal/2010/9/23/command-handlers-without-2pc-and-with-various-levels-of-reli.html/index.html
date: 2010-09-23
tags:
- xLim
- Cloud Computing
- CQRS
- Domain Event
title: Command Handlers without 2PC and with Various Levels of Reliability
---
<p>In the <a href="http://abdullin.com/journal/2010/9/19/domain-driven-design-event-sourcing-rx-and-marble-diagrams.html">last post</a> we've tried to start reasoning out <a href="/tags/cqrs/">CQRS</a> theory by making first parallels between Rx for .NET, almost-infinitely scalable systems as advocated by <a href="/pat-helland/">Pat Helland</a>. I've been thinking a lot about this recently and so far the logic seems to hold.</p>

<p>Let's continue with talking about persistence and message dispatch in command handlers. We will do that without worrying too much what exatly resides within the command handler. Valid options would be:</p>

<ul>
<li>aggregate root with a state repository;</li>
<li>aggregate root with event sourcing;</li>
<li>saga.</li>
</ul>

<blockquote>
  <p>Note that we are not talking about relational databases for the persistence in this scenario. Working with RDB would require 2PC, distributed transactions and all sorts of complex stuff. We don't need this.</p>
</blockquote>

<p>I would like to express my thanks to the DDD/CQRS group for helping to <a href="http://groups.google.com/group/dddcqrs/browse_thread/thread/6ce93c01b88dd813" target="_blank" class="offsite-link-inline">clarify this logic</a> and especially <a href="http://jonathan-oliver.blogspot.com/" target="_blank" class="offsite-link-inline">Jonathan Oliver</a>.</p>

<h2>Command Handler</h2>

<p><strong>Command handler</strong> is a process that resides within a partition and knows how to apply incoming commands (delivered via the durable message queue) to entities that reside within the partition. Commands always have a recipient (we need to be able to route them to the partition), so applying commands is a matter of:</p>

<ul>
<li>loading the entity uniquely identified by it's identity which is mentioned in the command (from memory cache, snapshot, persisted state or event stream);</li>
<li>applying the command to the entity (by calling a method);</li>
<li>in case of success we persist changes to the store and acknowledge command to the incoming durable message queue (actually deleting it).</li>
</ul>

<p>Change persistence within the partition could happen in form of:</p>

<ul>
<li><strong>event sourcing</strong> - we save events that describe the change and allow to reproduce it; essentially that's domain-aware transaction log that keeps <strong>all</strong> the information.</li>
<li><strong>state change</strong> - we just discard the intermediate information and persist only the latest state to the store, appending it.</li>
</ul>

<p>In both cases we need to persist information about the incoming command(s) that caused this transaction. This way we will be able to <strong>ensure command idempotency</strong>. The latter allows us to handle rare but possible scenarios when:</p>

<ul>
<li>environment duplicates some messages (this can happen in the cloud or partitioned systems).</li>
<li>process crashes between the moment we've committed the change and ACKed the incoming message.</li>
</ul>

<p>Obviously appending changes to the disk is not the only outcome of the command handler. It might need to send messages (i.e.: aggregate publishes events and saga sends commands).</p>

<p>This is done by the async process that runs in parallel and checks the storage for any newly committed changes. If it discovers them, then the associated messages are also published. In case of the event sourcing we simply publish all events, in case of the state persistence we just look for the explicit messages. Anyway message dispatcher within the partition will know how look for messages to send.</p>

<p>By the way, incoming command message might actually include multiple commands. This could be used in CQRS scenarios when we want to achieve <em>all fail or succeed together</em> behavior (command composition is a lazy way to avoid writing large commands for each combination that might need to be atomic). In this case all caused changes are perceived as a single unit of work and are committed together as one.</p>

<p>If the changes can't be persisted in a single write operation  (i.e.: too big or storage does not handle atomic updates), you can first write all the changes in as many passes as you need. The write could be finished by the SHA1 signature of the changes. This way the transaction is considered to be completed (by the event dispatcher or anybody else who's reading it) if the signature is correct. Otherwise we have abandoned transaction that just needs to be cleaned up (or ignored).</p>

<h2>Reliability and Redundancy</h2>

<p>We can have to levels of reliability and redundancy in this scenario (we are talking about the simplest scenario where changes are written to disk and we need to handle reliability and redundancy explicitly).</p>

<p>As long as we <strong>stay within the partition</strong> (a single machine or a small cluster) we can have 100% logical redundancy. Basically we can persist a change to multiple locations at once. Transaction will be considered as completed if the change is valid on all locations. And since all locations are within the partition, reads are guaranteed to be fast and consistent. One can implement this manually or just trust RAID to do that.</p>

<p>If one of the writes fail - then the entire transaction is considered to be failed. </p>

<p>This approach allows us to have a variable level or reliability in the persistence (we pick that level). In fact one should be able to move critical processes to highly-reliable partitions (dedicated hardware and data centers) and keep non-critical entities in the commodity environment (i.e.: in the cloud).</p>

<p>Second level of reliability comes at the moment we <strong>cross the partition boundaries</strong>. We would eventually want to do this, since data is more safe, when stored in multiple locations (earth-quakes, floods, political issues etc). However, since we cross boundaries, the reliability would be eventual, giving us a small time window (from a few milliseconds up to seconds or longer), during which hot data will reside only within a single partition. Basically RAID arrays and redundant writes are just needed to reduce risk of fresh data corruption within this time window and increase the chance of successful replication it somewhere else. Replication comes here in form of yet another simple async process that merely picks up our changes and sends them across the partition boundaries to long-term storage (preferably there will be multiple locations).</p>

<p>If our recipient is not available at the moment (network failure, repartitioning in the process or 2012), then all we can do is to raise alert, retry shipping changes outside of the partition boundary till we succeed (the infrastructure might also provide alternate shipping locations).</p>

<blockquote>
  <p>By the way, the very process of shipping changes across the partition boundaries could also be used to replicate them across the globe, feeding to various read models (they are eventually consistent anyway).</p>
</blockquote>

<p>Basically we could combine these two simple approaches (writing to multiple locations within the partition and shipping changes outside of the partition) to achieve a desired degree of reliability and fault-tolerance. Besides, we can always position various partitions (based on their business importance) in environments with various reliability settings to achieve the maximum ROI and handle risks in cost-effective manner.</p>

<blockquote>
  <p>There also is a <em>third approach</em>, that involves <strong>sending data in a transactional manner across the partition boundaries</strong> on the actual write. This one is slightly more complex and would probably require using some storage engine for the purpose. However in essence this would work like: storage sequentially writes the value to multiple locations within various partitions, sending ACK only if the last write is successful (or there is a quorum or whatever tech is used to figure out decision across the consistency boundaries). I doubt this is much better than 2-step redundancy approach described earlier.</p>
</blockquote>

<p>This simplicity and ability to tune reliability settings (and failure probabilities) on per-partition level is what I like about the approach. Simplicity allows to scale and evolve, variable-level reliability allows to be really efficient and cost-effective.</p>

<p>NB: please keep in mind, that for me this <em>just a theory at the moment</em> (logically ruled out of the properties of the distributed and scalable environments and some cloud experience at <a href="http://www.lokad.com" target="_blank" class="offsite-link-inline">Lokad</a> projects). I haven't tried this specific approach in production (this might be fixed soon, though). The whole purpose of this exercise is to figure out and <em>understand underlying theory so that future systems will be developed without architectural decisions blocking almost-infinite scaling</em> by enforcing certain constraints based on the theory.</p>

<p>All feedback is welcome!</p>

<blockquote>
  <p>Now if only somebody could help to me figure out how to distribute events to subscribers in partitioned environment without feeding everything to a single message bus (complicates and creates single point of failure). I just can't figure out the logical transition from the published event (going outside of the partition) via the subscription and into the command that has a recipient and goes inside the partition.</p>
</blockquote>

