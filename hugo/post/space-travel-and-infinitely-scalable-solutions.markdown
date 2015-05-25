---
aliases:
- /journal/2010/8/22/space-travel-and-infinitely-scalable-solutions.html/index.html
date: 2010-08-22
tags:
- xLim
- Azure
- Cloud Computing
- CQRS
title: Space Travel and Infinitely Scalable Solutions
---
<p>Recently, I’ve been re-reading Pat Helland’s paper on <a href="http://abdullin.com/wiki/infinitely-scalable-system.html">infinitely scalable solutions</a> in the same time interval with finishing <em>A second chance at Eden</em> follow-up to <em>Night’s Dawn</em> trilogy by <em>Peter F. Hamilton</em>. Something clicked in my mind and Sci-Fi concepts of space travel got strongly locked with the scalable architectures. It became much simpler to <strong>understand <a href="http://abdullin.com/wiki/cloud-computing.html">cloud enterprise development</a> and challenges of infinitely scalable solutions</strong>.</p>

<blockquote>
  <p>I strongly recommend at least glancing through <a href="/pat-helland/">Helland</a>’s paper (just 10 pages of extremely useful information and thoughts) before proceeding with this journal post. And if you are a big fan of Science Fiction, then Night’s Dawn is another recommendation (thanks, Joannes!).</p>
</blockquote>

<p>Basically the concept is simple: while building our scalable systems we <strong>treat aggregate roots as space ships</strong> (ARs are similar to entities in Helland’s paper) . </p>

<ul>
<li>In the context of the repository pattern: <em>aggregate roots are the only objects your client code loads from the repository</em>.</li>
<li>In Domain-Driven Design: <em>the root is the only member of the AGGREGATE that outside objects are allowed to hold references to</em>.</li>
</ul>

<p>There are a few rules to start with:</p>

<ul>
<li>Human race always starts with a Solar system and begins expanding outwards.</li>
<li>Universe might have multiple star systems.</li>
<li>Space ship is obviously smaller than a star system and always fits in there.</li>
<li>As human race expands across the galaxy, it builds more and more ships.</li>
<li>Although a single ship can always fit and be sustained by star system (even if the ship is as big as Death Star), the entire human fleet might not fit or be sustained.</li>
</ul>

<p>Now same rules apply to the aggregates or entities as well:</p>

<ul>
<li>Scalable application usually starts with a single machine.</li>
<li>Cloud fabric or data center might have multiple machines available for the app.</li>
<li>Aggregate root (entity) can always fit into a single machine (or a small cluster).</li>
<li>As application grows it gets to handle more and more aggregates; they are re-distributed towards the new machines as needed.</li>
<li>Although a single AR fits on the machine (or a small cluster), entire application might not (hence the need to expand).</li>
</ul>

<p>So far - so good. Let’s explore the universe.</p>

<ul>
<li>Ships are small and relatively safe. When you need to talk to the crew member - you call. It takes milliseconds to for the connection to be made.</li>
<li>Space is a large and unpredictable place. While calling from the ship to the ship, you never know how far your recipient is going to be. It can be a few light seconds away, a few minutes away or it could have traveled to the other side of the galaxy.</li>
<li>It is usually possible to send a message from ship to ship via the hyper-space relays, but you never know when you’ll get the response. Message might even need to chase the ship for a little bit.</li>
<li>Since space is a large and unpredictable space, hyper-space relays need to be redundant, sending the message via a few routes. This guarantee that it will eventually get through. Although a ship might get a few copies, this is not a big deal, since it’s trivial to look up the correspondence with the sender and discard the duplicates.</li>
<li>There are always exceptions. When it is really needed and one has credits at hand, it is possible to buy quantum entanglement channel for the ships. It will be fast and reliable but extremely expensive. Besides it locks ships together (it’s hard to have a reasonable talk when one ships is in the normal space and the other accelerates towards the speed of light)</li>
</ul>

<p>Let’s see how these future principles apply to the modern world of distributed systems:</p>

<ul>
<li>Aggregate is a native consistency boundary. Since it fits into the memory of a single machine, you can always ensure that everything is rolled into the transaction.</li>
<li>Events could be propagated within the Aggregate Root instantly and reliably. Each event that goes outside - will take an unknown amount of time.</li>
<li>Usually queues do not guarantee that the message will be delivered only once and in the order (although they try their best at it). That’s the common to Azure Queues, for example. It is the responsibility of the recipient entity to track and handle duplicates, restoring proper ordering where this is important. Activities (sagas), managing entity-2-entity partnerships, are usually responsible for such operations.</li>
<li>There are always exceptions. If it is really needed and one has development resources at hand, some sort of direct messaging could be established (i.e.: based on the TCP abstractions), but it is rather unusual and expensive. Same is with the transactions - although they are usually better to stay within the AR, it is possible to bend the rules, if it is worth the effort and increased complexity. </li>
<li>We usually can't be sure about the the exact delivery time and state of it's recipient, until the reply or some notification come in (which might take some time). During this interval of uncertainty state of the recipient is uncertain to us. We need to consider and design on this fact.</li>
</ul>

<p><strong>Lessons learned</strong> for me: build your space ships small and ready for the travel around the known space as it expands. In other words: </p>

<ul>
<li>Infrastructure should be capable of evolving in order to handle scaling and repartitioning.</li>
<li>Business logic and entities should avoid doing anything that anchors them to each other or a specific partition. Otherwise, when time comes to move and scale, it will hurt.</li>
<li>Message-based architectures allow building scalable and decoupled architectures. Yet they bring a degree of uncertainty and eventual consistency into the solution. We need to start learning from the real world and our past. Our ancestors were building long-running interactions, transactions and vast organizations with sail mail, telegraph and various analogues of Pony Express. Message delivery was indeed slow and unreliable back then, taking months instead of fractions of the second.</li>
</ul>

<blockquote>
  <p>This article builds upon and continues <a href="http://abdullin.com/xlim/">xLim 4 (CQRS in the Cloud)</a> research and development series, attributing to the <a href="/tags/cqrs/">CQRS body of knowledge</a> being gathered within this Journal.</p>
</blockquote>

