---
aliases:
- /journal/2012/4/17/ddd-from-reality-to-implementation.html/index.html
date: 2012-04-17
tags:
- Lokad
- Cloud Computing
- DDD
- CQRS
- Story
title: DDD From Reality to Implementation
---
<blockquote>
  <p>This is yet another post in a series that were triggered by fruitful discussions with <a href="http://vaughnvernon.co/">Vaughn Vernon</a> over content for his DDD book.</p>
</blockquote>

<p>I think, one of the sources of confusion in DDD/CQRS world is that we often mix terms and concepts that belong do absolutely different layers (and that we don't know how to go from one to the other). Let's start by introducing the following separation:</p>

{{% img src="ddd-from-reality-to-implementation/2012-04-17_DDD-reality.jpg" %}}

<blockquote>
  <p>For the new readers, DDD stands for Domain Driven Design, which was introduced by <a href="http://domaindrivendesign.org/about">Eric Evans</a> in the book with the same name. CQRS stands for Command-Query Responsibility Principle, which is often associated with architecture styles for implementing systems with DDD and optional Event Sourcing. The term was coined and explored by <a href="http://goodenoughsoftware.net/">Greg Young</a>.</p>
</blockquote>

<h2>Reality</h2>

<p><strong>Reality</strong> is that thing around us, which we perceive through our senses and continuously try to understand. In the context of business and software, <strong>reality contains core business concepts</strong> which are important for the competitive advantage of our business. We want to capture them and then somehow express in code for automation purposes. For example, business concepts could involve things as:</p>

<ul>
<li>Customer</li>
<li>Registration Process</li>
<li>Customer Subscription</li>
<li>Invoice</li>
<li>Invoice Payment Cycle</li>
</ul>

<blockquote>
  <p>I'm taking examples from the environment of Software-as-a-Service (SaaS) company, since that's what I'm mostly familiar with.</p>
</blockquote>

<h2>Domain Model</h2>

<p>As we learn more about reality and business concepts, we could distill our understanding into the <strong>domain model</strong>, which contains all things that are relevant and important in the current situation. For the sake of simplicity, we will break down the entire model into set of bounded contexts (BCs) which are separate by the natural boundaries we've discovered in the real world.</p>

<p>In SaaS world we could highlight BCs like:</p>

<ul>
<li>Customer Subscriptions and Billing</li>
<li>Client Portal</li>
<li>Reporting</li>
<li>Product 1</li>
<li>Product 2</li>
<li>Cloud integration</li>
<li>etc.</li>
</ul>

<p>Each of the bounded contexts in this model stems directly from our understanding of the reality and the natural boundaries that we have identified (<a href="http://abdullin.com/journal/2012/4/14/software-war-starts-with-a-map-context-map.html">read more</a>). </p>

<p>If we dive inside one of these bounded contexts, we could discover more fine-grained concepts:</p>

<ul>
<li>Ubiquitous Language</li>
<li>Aggregate and Aggregate Root</li>
<li>Consistency Boundary</li>
<li>Business Process</li>
</ul>

<p>Please keep in mind, that these are purely logical concepts, that have (yet) nothing to do with the implementation and all the less important details!</p>

<p>The process of identifying BC boundaries can take into consideration things like: teams, skills, available resources and technologies. However, <strong>at this level we still don't care about technical details like</strong>: frameworks, databases, message middleware, service buses etc. We just create foundation for making conscious choice later down the road.</p>

<h2>Architecture Styles and Implementation</h2>

<p>Only after we have identified bounded contexts, we can focus on each BC and start thinking about implementation matters, while considering project specifics. Result of this exciting process would be a choice of key elements for the specific bounded context:</p>

<ul>
<li><strong>development process</strong> - how do we organize and manage our development.</li>
<li><strong>architecture style</strong> - how do we structure and design software implementation.</li>
<li><strong>technology stack</strong> - what technologies do we use and how do we get them</li>
<li><strong>resource allocation</strong> - how do we get resources (budgets, people, knowledge) for the project delivery.</li>
</ul>

<p>For instance, if our teams are familiar with the SQL/RavenDB and NService Bus, we can pick <strong>architecture style described by Udi Dahan</strong> (<a href="http://www.udidahan.com/?blog=true">blog</a>), where:</p>

<ul>
<li>aggregates are persisted with SQL+NHibernate or RavenDb;</li>
<li>command handlers and application services are hosted by NServiceBus;</li>
<li>business processes are implemented with NServiceBus sagas;</li>
<li>consistency boundaries happen within the transaction scope;</li>
<li>views are created either by in-memory events or via projected audit logs;</li>
<li>development process will be aligned towards Waterfall or Agile.</li>
</ul>

<p>If environment requires event sourcing or teams are hyped with <strong>AR+ES architectural style of Greg Young</strong> (<a href="http://goodenoughsoftware.net/">blog</a>), we can:</p>

<ul>
<li>persist aggregates with event sourcing in event streams;</li>
<li>host command handlers in custom message dispatchers that use something like AMQP or direct socket communication;</li>
<li>business processes are mainly implemented with state machines hosted within event handlers or via document-based state machines (where state is persisted in messages);</li>
<li>views are disposable and are projected from event streams to whatever technology that is needed;</li>
<li>consistency boundaries are within aggregate;</li>
<li>use Agile development process.</li>
</ul>

<p>At Lokad we are mostly using <strong>Lokad.CQRS architecture style</strong> (<a href="http://lokad.github.com/lokad-cqrs/">sample</a>) that is derived from Greg's but is fine-tuned to:</p>

<ul>
<li>fit cloud computing environments while supporting on-premises deployments;</li>
<li>reduce development friction and development effort at the <strong>cost of higher requirements for team skills and discipline</strong>;</li>
<li>support rapid domain evolution in rapidly changing business environment.</li>
</ul>

<p>This architecture style involves following technical choices:</p>

<ul>
<li>aggregates are persisted with event sourcing in event stream;</li>
<li>message handlers are hosted in custom message dispatchers provided by Lokad.CQRS sample project (with adapters for on-premises and cloud deployments);</li>
<li>business process transitions are implemented as part of the aggregate behaviors (they could be triggered by user interactions, stateless event handlers sending commands in response to events or tasks that sending commands on a schedule);</li>
<li>views are disposable and are projected from event streams, using dead-simple key-value persistence for the majority of cases (with adapters for on-premises and cloud);</li>
<li>consistency boundaries are per entity (aggregate or view instance);</li>
<li>rapid development process is used for multiple releases per week/day.</li>
</ul>

<p>Obviously, these are just a few options of implementing a given bounded context. There are more architecture styles available out there (and each architecture style can have multiple implementation options and variations).</p>

<h2>DDD Modeling Process</h2>

<p>Now, for the most fun part. This trajectory from reality to architectural style is just a <em>happy path scenario</em> that happens only in dreams. In reality you might need to <strong>iterate from reality to implementation multiple times</strong>:</p>


{{% img src="ddd-from-reality-to-implementation/2012-04-17_DDD-iterate.jpg" %}}

<p>These iterations are the foundation of the <strong>approach to explore and capture core business concepts in domain model</strong> (or, one of the approaches). Approach is totally attributed to Greg Young. </p>

<p>We start by sketching out domain model without even trying hard to be precise from the start. Then we try to implement it in the code using the <strong>most hacky approach possible</strong>. Lokad.CQRS style with file-based persistence and messaging works for us, because it is designed for rapid iterations and has the least friction (I'll need to do a quick video on that process). </p>

<p>One of the goals here is to build a set of unit tests that use <a href="http://cqrsguide.com/doc:specification">specifications</a> to verify behaviors of aggregate roots with event sourcing (AR+ES). These specifications can be printed out as use cases in human-readable way.</p>

<p>More often than not, a lot of problems and questions show up during this implementation phase. At this point we usually forget about the implementation (while keeping our use cases) and go back to the domain experts with these questions (more often than not, for me this boils to going and talking to the mirror). Then we adjust the domain model according to the lessons learned. Depending on the nature of the adjustment, implementation is either discarded completely or refactored to fit (AR+ES specifications are usually kept between these iterations, to make sure that we don't loose any captured use case).</p>

<p>The <strong>process is repeated till we distill our domain model</strong> to the point that it captures all required business concepts in a way that can be easily implemented in the code. At this point we can print out specifications, reconfigure implementation to use adapters for production environment (e.g. Azure), push it to production and try to call it a day (only to have next challenge handed to us).</p>

<p>PS: If you are interested in this topic, next article in the series might interest you: <a href="http://abdullin.com/journal/2012/4/21/ddd-evolving-business-processes-a-la-lokad.html">DDD: Evolving Business Processes a la Lokad</a>.</p>
