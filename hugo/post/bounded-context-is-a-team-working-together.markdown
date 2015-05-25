---
aliases:
- /journal/2012/7/22/bounded-context-is-a-team-working-together.html/index.html
date: 2012-07-22
tags:
- Lokad
- DDD
- Domain Event
- Story
title: Bounded Context is a Team Working Together
---
<p>Let's talk about architecture-level decisions that drive development and evolution of systems. As <em>Stacy</em> noticed recently:</p>

<blockquote>
  <p>I notice your architecture is at the BC level. I certainly can see some advantages. But I wonder about things growing into a big ball of mud as requirements dictate more aggregates or larger ones. By designing at the aggregate root level, things stay small an agile as the business requirements grow and change. Although the tradeoff is more message chatter between them.</p>
  
  <p>Just wondering what drove you to the BC's as components, rather than aggregate roots? </p>
</blockquote>

<p><strong>I used to focus just on aggregates</strong> (taking the route of "your aggregate is your bounded context"). This looked plausible in theory, but <strong>it didn't work for me in practice</strong> that well. </p>

<p>Reason behind that - <strong>Aggregates are the most important building block</strong> of my systems, since they capture core business concepts and deal with complex persistence tasks (via event sourcing). However, <strong>focusing only on aggregates can lead to less efficient designs</strong>, that lack some synergies and capabilites. Such approach encourages putting too much responsibility in one place, which significantly raises complexity and cost of change (if you seen recent "Avengers" movie, you have an idea of what happens, when you put a team out of outstanding heroes - most of the time they argue and deliver collateral damage).</p>

<p>Besides, this actually leads to rather chatty implementations. Aggregates, no matter how significant they are, still need to cooperate and exchange information (e.g. consider the case with "Customer" and "Invoice" aggregates, where old invoice has to be cancelled, whenever an override invoice is issued for the same customer). </p>

<p>Solution to that problem of mine was to <strong>start thinking in terms of bounded contexts, rather than individual aggregates</strong>. Bounded Context (BC) is part of a domain model, unified by a common ubiquituous language, shared and connected concepts. It is like an organ of a human or a plant - composed from multiple separate cells, but with distinct boundaries (or, you can consider BC to be a country, if you prefer my <a href="http://abdullin.com/journal/2012/4/14/software-war-starts-with-a-map-context-map.html">war analogies</a>).</p>

<p>As such, Bounded Context consists of multiple distinct building blocks that work together to simplify achieving common goals of capturing core business concepts (and aggregates are one of these building blocks). </p>

<p>Implementation-wise, <strong>Bounded Context is a highly specialized team of focused soldiers</strong> (e.g. <a href="http://www.imdb.com/title/tt0084967/">A-team</a>) that work together. They tend to be deployed together as well (which aligns them well with the development and operations). Software solution can be composed rom multiple bounded contexts.</p>

<p>Each arcitecture style has it's own set of building blocks. Common guidelines for picking them are:</p>

<ul>
<li>blocks have to be relatively <strong>simple and coherent</strong> on their own in theory;</li>
<li>development, management and evolution of this building blocks should be <strong>practical</strong>.</li>
</ul>

<p>In the case of doing <strong>Domain-Driven Design a la Lokad</strong>, we have arrived to the list of building blocks:</p>

<ul>
<li><strong>Application Services</strong> - groups of command handlers, defined on a single class. Most of the time, these command handlers are responsible for loading aggregates and executing their methods (although, other uses are quite common, as well). </li>
<li><strong>Aggregates implemented with event sourcing</strong>; they capture behaviors and core business concepts in an expressive way that frees us from bothering about complex persistence, its testing and versioning.</li>
<li><strong>View Projections</strong> - event handling classes that denormalize events into persistent read models called "views". These views are complextely disposable and can be automatically rebuilt by server, if corresponding projection code changes. They are used for bringing information together in a way, that is easy to consume by: aggregates, clients, tasks etc.</li>
<li><strong>Event Ports</strong> - simple event handling classes that declare event subscriptions and act as ACL (previously called "Event Receptors", but switched the name to match "Ports and Adapters" by Alistair Cockburn). They make boundaries and relations - explicit.</li>
<li><strong>Tasks</strong> - long-running processes (in essence, just a <code>while(server.IsRunning) { DoSomething(); Sleep(server, 5.Mins()); }</code>), that allow the system to actively invoke actions; keep track of timeouts and schedule actions.</li>
</ul>

<p>In practice, <strong>not every bounded context has all of these blocks</strong> (for example, my client BCs tend to have only view projections). However, having them at hand (along with the available practices of development, deployment and operations) is what makes a lot of scenarios possible: starting from simple SaaS billing system and up to self-diagnosting big-data platform for integration (which integrates directly via databases with flexible schema) and business intelligence.</p>

<p>Please, keep in mind, that this choice of building blocks is by no means something final, officially approved, certified (hell, I'm merely bringing together and exposing knowledge of more experienced practitioners). So it is just a selection that has (so far) proven to work the best in Lokad and some other small result-oriented companies. These are the companies, where software designers and architects have wear the burden of responsibility about their decisions and choices for years. This is exactly the environment, where operations crush and crumble nice theoretical ideas, forging some other solutions that ain't that pretty. Yet, in practice they work.</p>

<p>Each block has a whole story behind. I hope eventually to share it (dude called <em>Vaughn Vernon</em> even strongly suggests on writing a separate book on that). However, what matters the most right now - this is minimal set of blocks that we would currently need to build a system in a case, which requires application of Domain-Driven Design (with or without capabilities for cloud deployments and big data processing). More is certainly possible, but that would be less.</p>

<p>This approach to structuring Bounded Contexts would certainly evolve and change, as simpler approaches are found and new tools show up in this area of knowledge (some of the future improvements in development landscape are already accounted for).</p>

<h2>Takeaway</h2>

<p>Aggregates are just one of the building blocks for expressing Bounded Contexts in the code. Aggregates implemented with event sourcing shine in capturing rich behaviors that might require both complex persistence AND rapid evolution of underlying schema. Domain-Driven Design and use of other building blocks is an essential prerequisite for this approach to succeed.</p>

