---
aliases:
- /journal/2010/3/23/dddd-cqrs-and-other-enterprise-development-buzz-words.html/index.html
date: 2010-03-23
tags:
- xLim
- Integration
- DDD
- CQRS
title: DDDD, CQRS and Other Enterprise Development Buzz-words
---
<p><strong>Update:</strong> there is a <strong>CQRS Roadmap</strong>, that was written at a later moment of time and does better job in bringing these buzz-words and terms together, while explaining the benefits and relations. <a href="/journal/2010/10/22/top-10-reasons-to-do-cqrs-in-a-pdf.html">Check it out</a>!</p>

<p>Let's do a <strong>brief overview of DDDD, CQRS and other related buzz-words</strong> in the domain of enterprise development. I'll try to give a <em>simplified explanation, highlight some logical relations</em> and provide <strong>links for further reading</strong>.</p>

<blockquote>
  <p>By the way, if you are interested in practical side of applying CQRS to the .NET platform and Windows Azure - check out <a href="http://code.google.com/p/lokad-cqrs/" target="_blank" class="offsite-link-inline">Lokad CQRS</a> project, which has a lot of samples and tutorials.</p>
</blockquote>

<p>We'll walk over such terms as:</p>

<ul>
<li>Domain Driven Design (DDD and DDDD)</li>
<li>Command Query Responsibility Separation (CQRS)</li>
<li>Event Sourcing and Audit Logs</li>
<li>Messaging and integration</li>
</ul>

<p>Basically CQRS + DDDD are just a group of patterns, design principles and approaches that happen to work quite well together, especially in complex large-scale enterprise solutions. Although they happen to help in simpler scenarios as well. Since CQRS and DDDD are often seen together with the other specific development patterns, this sometimes creates an additional confusion, making it hard to distinguish and understand different logical concepts.</p>

<p>In the <a href="http://community.devexpress.com/forums/t/63236.aspx" target="_blank">DevExpress thread</a> the discussion (which inspired this article) started with the event sourcing. Let’s do the same here.</p>

<p><b>Event Sourcing</b> describes a concept of persisting application entities (i.e.: aggregate roots) as sequence of events that create and alter them:</p>

<ul>
<li>AccountCreated</li>
<li>BillingAddressChanged</li>
<li>CustomPropertyAdded</li>
<li>AccountCharged</li>
<li>AccountSuspended</li>
<li>etc</li>
</ul>

<p>By its nature, the simplest implementation of event sourcing only needs two tables (table with primary keys and another one with serialized events) and represents <em>full audit log of all the changes</em>. When we load the entity, we simply replay all events since the beginning. Obviously, such storage in the classical SQL world would be less than performant, if we regenerate large entity for every operation. However we can simply keep the entity in memory (they are not that large anyway), use snapshots and distribute aggregate roots between the machines.</p>

<blockquote>Martin Fowler has written extensively about <a href="http://martinfowler.com/eaaDev/EventSourcing.html" target="_blank" class="offsite-link-inline">event sourcing</a> and <a href="http://martinfowler.com/eaaDev/EventNarrative.html" target="_blank" class="offsite-link-inline">focusing on events</a> in general.</blockquote>

<p>One can create <b>audit logs</b> <em>without the event sourcing</em>. For example in the billing subsystem, where accounts are allowed to have balances, balance could be defined as an append-only table, just like in the real-world accounting. In order to modify the balance, append a row with the change amount and new value. Optionally accountant information and operation name could be included.</p>

<span class="full-image-block ssNonEditable"><span><img src="/storage/uploads/2010/03/2010-03-23_171253.jpg" alt="Append-only billing balance table"/></span></span>

<p> In order to get the actual balance – simply: </p>

<pre>SELECT TOP 1 * 
FROM [Balance] 
ORDER BY [Id] DESC 
WHERE [AccountId] = ?</pre>

<p>Although for the majority of the display purposes (which happen to be more than 80% of the cases) accessing denormalized query table would work perfectly without hitting the DB hard even in "Show total balance by account" types of the reports. CQRS uses this approach heavily and will be discussed later.</p>

<blockquote>Software will always have bugs and problems. Keeping extra information around (audit logs is one form of that) helps to make life less painful and issues - less expensive. <a href="http://www.amazon.com/Release-Production-Ready-Software-Pragmatic-Programmers/dp/0978739213" target="_blank" class="offsite-link-inline">Release It!: Design and Deploy Production-Ready Software</a> is an incredible read on the subject of delivering and handling real-world solutions.</blockquote>

<p><b>Aggregate Root</b> concept (along with terms like <em>Bounded Context</em>, 
<em>Ubiquitous Language</em> or <em>Value Object</em>), comes from the world of <strong>Domain Driven Design </strong>(DDD), which defines a way of modeling business entities in the process of software design, development and evolution. Basically, it links together business concepts and the evolving software model. Principles start from the principles of thinking and communicating and go up to the allowed logical relations between the entities. </p>


<blockquote><a href="http://jonathan-oliver.blogspot.com" target="_blank" class="offsite-link-inline">Jonathan Oliver</a> has gathered a nice <a href="http://jonathan-oliver.blogspot.com/2009/03/dddd-and-cqs-getting-started.html" target="_blank" class="offsite-link-inline">overview of materials</a> introducing developer in the world of DDDD and CQRS.</blockquote>

<p><strong>Fourth D</strong> in the DDDD comes from the <em>Distributed</em>. It, as the name implies, brings us closer to everything that is distributed, large-scale and cloudy. By a coincidence, principles of <strong>Command-query responsibility separation</strong> (CQRS) happen to address some problems that the DDDD faces.</p>

<p>The very principle of representing business changes and processes in form of events, commands and messages, is close to the concepts of the <strong>messaging systems</strong>, middleware and, as far as message processing is concerned, <em>service buses</em>. Concepts of message-driven architecture help to <em>decouple complex systems and processes</em> (this usually happens within the boundaries of a service layer), while making them <em>more reliable and easier to comprehend</em>. <b>Enterprise integration</b> (especially in the world of unreliable systems) also depends on messaging heavily.</p>

<blockquote><a href="http://www.eaipatterns.com/" target="_blank" class="offsite-link-inline">Enterprise Integration Patterns book</a> is a must-read for everybody interested in the subject. <a href="http://www.amqp.org/confluence/display/AMQP/Advanced+Message+Queuing+Protocol" target="_blank" class="offsite-link-inline">Advanced Message Queuing Protocol Specification</a> is also an eye-opening material (it's not boring).</blockquote>

<p><strong>CQRS as a concept</strong> is a <em>way of architecturing systems</em> that attempts to <em>deal with some of the frustrating problems of delivering enterprise software</em>:</p>

<ul>
<li>Performance bottlenecks and scalability</li>
<li>Concurrency conflicts, their resolution and prevention</li>
<li>Data staleness</li>
<li>Complexity of the design, development and maintenance</li>
</ul>


<p>CQRS attempts to deal with these problems by <em>reevaluating constraints and assumptions</em> that we’ve been considering to be true and valid for the last X0 years. This allows to rethink core principles and the architecture.</p> 
<p>In an oversimplified manner, <b>CQRS separates commands</b> (that change the data) <b>from the queries</b> (that read the data). This simple decision brings along a few changes to the classical architecture with service layers along with some positive side effects and opportunities.</p>

<blockquote>
  <p>At the micro-development level Command-query separation says that method can either be a query (returning data to the caller) or a command (changing the state), but not both.</p>

  <p>In other words, asking the question should not change the answer.</p>
</blockquote>

<p>So if we go deeper, <em>Command-query Responsibility Separation</em> is about development principles, patterns and the guidance to build solution architecture on top of them.</p>

<blockquote><a href="http://www.udidahan.com" target="_blank" class="offsite-link-inline">Udi Dahan</a> has a brilliant paper on the <a href="http://www.udidahan.com/2009/12/09/clarified-cqrs/" target="_blank" class="offsite-link-inline">Clarified CQRS</a>. He also blogs frequently on the subject along with <a href="http://codebetter.com/blogs/gregyoung/default.aspx" target="_blank" class="offsite-link-inline">Greg Young</a> (who is supposed to be writing a book on the DDDD and CQRS) and <a href="http://jonathan-oliver.blogspot.com/" target="_blank" class="offsite-link-inline">Jonathan Oliver</a>.</blockquote>

<p>Here's one of the simple architectural overviews with some details.</p>

<p><span class="full-image-block ssNonEditable"><span><img src="/storage/uploads/2010/03/2010-03-23_153233.jpg" alt="CQRS Architecture implementation"/></span></span></p>

<ul>
  <li>All data presented to the user is stale anyway, since we don’t keep UI in constant sync with the database, refreshing every millisecond. And since it is ok, let’s use this. </li>

  <li>Querying data for presentation and accessing it for the changes do not have to use the same resources. In fact, since querying happens in 80%-90% of the cases (people read often, modify less), let’s take some time (a few seconds, for example) and denormalize the data heavily and publish it to some easily accessible locations. Presentation UI will just have to do </li>
</ul>

<pre>SELECT * 
FROM [MyCustomersView]
WHERE…</pre>

<ul>
  <li>Instead of updating the entire entities (i.e. reading and writing the entire BillingAccount when just the email changes) let’s send a ChangeBillingEmailCommand to the server. </li>

  <li>Before sending this command let’s use our query tables to verify that the email address is unique and correct. This should give us 99.99% probability that it will be accepted. It’s OK. So send the command and move on. </li>

  <li>When the command lands into the server – place it into the queue. This way it’ll be processed even if the server is off-line, too loaded or encounters an eventual deadlock. We could additionally distribute work between multiple servers, which is becoming embarrassingly easy in the era of cloud computing. </li>

  <li>When command is being processed, double check the validation and business rules. In the unlikely chance that something is wrong with the command data – send user a message (i.e.: email address has changed by somebody else). </li>

  <li>Flow of commands could be saved somewhere, forming a sort of auxiliary audit log, JIC. </li>

  <li>After the command is processed – take a little bit of CPU cycles to update our query tables to make them easier to be consumed by presentation and validation logic. Here we just make sure that all these complex joins have to happen only once, keeping reads (which happen more often than writes) extremely fast. In fact, since storage is cheap, we can aggressively use query tables (i.e.: query per view per role) and also distribute them. </li>

  <li>Domain commands and events could be used to split complex systems in order to <strong>reduce complexity or distribute the load</strong> as well. Middleware messaging systems or even rich service buses could be used here. <a href="http://abdullin.com/journal/2009/6/20/cloud-bursting-scenarios-for-small-companies.html">Cloud bursting scenarios</a> are applied here easily as well.</li>

  <li>Commands, events and other types of messages happen to <strong>correlate to the terms from Ubiquitous Language</strong> of the domain (they actually form it), so the DDD could be used in the process of communicating over, architecting and evolving the enterprise system. </li>

  <li><strong>Persistence does not really matter here</strong>, so we can go ignore it, while using rather rare patterns like event sourcing (giving us full audits and simplifying the replication) or document databases. Actually, query data does not need to be in the relatively expensive RDB at all.</li>

<li>CQRS and Event Sourcing also simplify implementation of the <strong>flexible entity models with various custom fields and properties</strong> that are often defined at the run-time and used in layout and drag-n-drop designers by the end-users.</li>


<li>CQRS significantly simplifies <a href="http://abdullin.com/journal/2010/3/27/inject-business-intelligence-into-net-software.html">introduction of business intelligence into the enterprise solutions</a>. BI helps to make better decisions that make business - better (reducing expenses and increasing profits). </li>
</ul>

<p>As you can see from this brief overview, there are quite <em>a lot of different patterns and ideas composing the domain around CQRS and DDDD</em>. Common trend is that they generally have synergy effect, where using a few of these patterns might create additional benefits or simplify the design. Yet, as in any real-world project, it is <em>strongly advised against taking all these principles and dumping into the architecture blindly</em>. It’ll probably hurt.</p>

<p> It’s more beneficial to learn, understand and practice all of these, but use only the ones that fit the project (feeling free to adapt them as needed).</p>

<p>Please keep in mind that this overview is brief and <em>quite a bit of important problems were left out</em> along with their solutions. Some of these problems are listed below (to give you the idea of the scope) while answers could be found in the materials referenced in the article.</p>

<ul>
<li>How do we handle failing commands from the user's perspective?</li>
<li>How can we handle delays in the updates of the query data from the UI perspective?</li>
<li>Data validation vs. business context rules in the CQRS</li>
<li>Resolving database deadlocks and the command-handling level.</li>
<li>Elastically scaling processing capacities.</li>
<li>How do we apply CQRS principles in the world of AJAX and web applications; Smart Clients?</li>
<li>How and where do we host command handling services?</li>
<li>etc</li>
</ul>

<blockquote>If you are interested in more articles on this topic, you can stay tuned by <a href="/atom.xml">subscribing to this blog via RSS</a>.</blockquote>

<blockquote>Note, that this document starts outlining the scope of the <a href="http://abdullin.com/xlim">xLim 4</a> body of knowledge on efficiently building flexible and light distributed information management systems. There also is a separate page aggregating information on the <a href="/tags/cqrs/">CQRS</a>.</blockquote>

<p>All comments, thoughts, questions and any other feedback are welcome and appreciated.</p>

<p>So, what do you think?</p>

<p><strong>Related Posts:</strong></p>

<ul>
<li><a href="/tags/cqrs/">Command-Query Responsibility Segregation</a></li>
<li><a href="http://abdullin.com/journal/2010/4/14/cqrs-validation-and-business-rules.html">CQRS - Validation and Business Rules</a></li>
<li><a href="http://abdullin.com/journal/2010/4/14/cqrs-automatically-visualize-and-document-your-solution.html">CQRS - Automatically Visualize and Document Your Solution</a></li>
</ul>

