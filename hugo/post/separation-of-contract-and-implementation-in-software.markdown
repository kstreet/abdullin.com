---
aliases:
- /journal/2013/11/25/separation-of-contract-and-implementation-in-software.html/index.html
date: 2013-11-25
title: Separation of contract and implementation in software
tags:
- design
---
<p>A bit earlier I posted a sample drawing with evolution options for a <a href="http://abdullin.com/journal/2013/11/24/many-ways-for-an-emergent-design-in-a-component.html">component in a big software application</a>. This diagram is merely a convenience snapshot of performance optimisations and tech options available at any given point in time. Knowing about them in advance helps in planning future development.</p>

<p>Each node on the tree of component evolution represents a design pattern that has its own advantages and costs. Costs almost always include increased complexity. Sometimes such design pattern also has certain affinity with other patterns, making it simpler to evolve component to the next level.</p>

<p>For example, consider a component that happened to arrive at the following design during its evolution (after multiple iterations):</p>

<p><img style="display:block; margin-left:auto; margin-right:auto;" src="/storage/uploads/2013/11/2013-11-25-complex-component.jpg" alt="2013 10 11 Component" title="2013-10-11 Component.jpeg" border="0" width="550" height="331" /></p>

<p>We can say that this component has a public contract and an internal implementation. <strong>Public contract</strong> could say:</p>

<ul>
<li>Component implements a certain documented API with JSON, XML and ProtoBuf formats; these API interactions can be scripted or tested using tools on a variety of platforms;</li>
<li>we can expert 99.9% uptime of the component; query response times under 50ms in 99% of the cases; commands are acknowledged synchronously in 500ms in 99% of the cases;</li>
<li>we expect API to have throughput of 1500 transactions per second, if deployed in single-node configuration (all transactions extra would be rejected with <code>503 Retry Later</code>);</li>
<li>Queries have eventual consistency of less than 1000ms in 99% of the cases.</li>
</ul>

<p>All of the above is easily achievable, for example, using .NET on Windows Azure with multi-worker deployment configuration and an efficient Event Store.</p>

<p>Yet, please note, that the <strong>public contract does not say anything about the implementation details</strong>. It's normally up to the team to decide what these should be (better if that team is also follows the mantra "you build it, you run it"). This means, that at any given point in time, internal implementation might change in order to accommodate new requirements. Implementation might also change if requirements get relaxed and we can actually degrade the performance and get rid of some complexity in exchange.</p>

<p>If component boundaries are defined well (as driven by strategic design and its evolution), then public contract will not change often. In such case development challenges are merely constrained to deal with the implementation details, shifting it along a well-known evolution path in order to achieve well-known benefits. We could actually <strong>fine-tune specific components to meet certain requirements</strong>. </p>

<p>We might even say that with this natural approach, <strong>large scale software design emerges as a by-product of design process driven by two distinct feedback loops</strong>:</p>

<ul>
<li>evolving strategic vision which deals with business capabilities and how they are implemented by composing together components, defined by their contracts.</li>
<li>fine-tuning component implementations to fulfil their contracts.</li>
</ul>

<p>However, while doing all this evolution, it is really important to break such process into small steps, which can be handled separately. Doing work in tiny bites provides you with opportunity to step back, acknowledge feedback, reflect upon the design at strategic and implementation levels. I think that one would find more opportunities for such separation if we:</p>

<ul>
<li>decompose software into small focused components;</li>
<li>handle component contracts separately from their implementations;</li>
<li>plan evolution process in advance, where possible.</li>
</ul>
