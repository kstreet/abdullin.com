---
aliases:
- /journal/2012/7/19/dddes-missing-guidance.html/index.html
date: 2012-07-19
tags:
- Lokad
- DDD
- CQRS
- Domain Event
- Story
title: DDD/ES - Missing Guidance
---
<p>Over the course of last few days I received a lot of feedback on the <a href="http://lokad.github.com/lokad-iddd-sample/">IDDD sample for Aggregates</a> with Event Sourcing (ES) published. I tried to address some questions either by replying or by adding more documentation to the actual project (which resulted in commits <a href="https://github.com/Lokad/lokad-iddd-sample/commit/577ed500183fe9cadf1e3ad0a40336b94d10611a">like this one</a>).</p>

<p>However, there still is a set of questions that can't be addressed within that specific sample - this will overload sample and hijack the original intent of showing <em>how a single aggregate works with event sourcing</em>.</p>

<p>As it seems, the <strong>missing guidance currently includes following topics</strong>:</p>

<ul>
<li><strong>Added</strong>: High-level overview of DDD/ES architecture (a la Lokad) and building blocks in various deployment configurations. Overview of available case studies; influence by DDD and Event Sourcing.</li>
<li><strong>Added</strong>: Reality vs Domain Model vs Implementation; capturing domain model via coding exercise and evolving it towards deeper insight; features of good domain models.</li>
<li><strong>Added</strong>: Detailed overview of <a href="http://abdullin.com/journal/2012/7/22/bounded-context-is-a-team-working-together.html">building blocks</a> that can be used for DDD/ES architecture; how to model, design, test and maintain each block individually and as a part of bounded context:
<ul>
<li>Application Services</li>
<li>Aggregates with Event Sourcing</li>
<li>View Projections</li>
<li>Tasks</li>
<li>Event Ports</li>
</ul></li>
<li>Dealing with remote services (or integration points) that can fail, timeout or require case-by-case automated performance adjustment (e.g. throttling);</li>
<li>Inter-aggregate relations, sources of truth, eventual consistency and compensating actions;</li>
<li>Capturing long-running business processes in a way that both matches Domain-driven Design (DDD) and is generally simpler to deal with in practice than sagas;</li>
<li>Integrating multiple bounded contexts together (e.g. when you need to share some information between);</li>
<li><strong>Added</strong>: Developing Clients UIs: composition of UI and data, eventual consistency and task-based UIs, specifics of targeting multiple platforms (Web, Desktop clients, mobile apps), authorization;</li>
<li>Maintenance, debugging, release and failure management of systems implemented with DDD+ES approach;</li>
<li>Addressing specific scalability and performance requirements; cloud deployments.</li>
<li><strong>Added</strong>: Multi-tenancy, tenant-specific customizations and processing. Deployments and maintenance of multi-tenant systems.</li>
<li><strong>Added</strong>: Building occasionally-connected systems. Concurrent editing, conflict resolution strategies and merging. Feedback to user.</li>
<li><strong>Added</strong>: Migrating legacy systems to DDD/ES architecture; PROs and CONs; justifying risks and costs.</li>
<li><strong>Added</strong>: Appendix for .NET developers:
<ul>
<li>Structuring Visual Studio Solutions</li>
<li>Developing ASP.NET MVC Web applications</li>
<li>Windows Azure practices for DDD/ES systems</li>
<li>Helpful tools and frameworks </li>
</ul></li>
</ul>

<p>Does this list of topics cover all black spots, or <strong>are there any other areas that need some coverage</strong>?</p>

