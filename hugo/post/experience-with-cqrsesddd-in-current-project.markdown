---
aliases:
- /journal/2011/10/11/experience-with-cqrsesddd-in-current-project.html/index.html
date: 2011-10-11
tags:
- xLim
- Lokad
- C#
- Azure
- Cloud Computing
- DDD
- CQRS
- Domain Event
title: Experience with CQRS+ES/DDD in Current Project
---
<p>Just a quick summary of tech I'm using in the current project. So far it works out rather nicely.</p>

<p><strong>Project targets Windows Azure</strong>. However, just like our other recent projects at Lokad, it is developed to be cloud-ignorant (can be deployed anywhere where Microsoft .NET can be run).</p>

<p><strong>Development machine</strong>: MacBook Air 2011 13' with intel i5 CPU (1.7Mhz), 4GB RAM and 128 GB SSD. OSX (Lion) with Windows 7 running in Parallels. I used to boot it in BootCamp (for native performance) a few times and then switched to pure VM mode.</p>

<p><strong>Development IDE</strong>: Visual Studio 2010 with ReSharper 6 (solution-wide analysis is OFF). Windows Azure SDK is installed (with Emulator and Storage) However it's not used at this project at all, due to being rather inefficient with resources of my MBA. File system is used for both queues and storage instead. In production  they will be reconfigured to use Azure-specific adapters (abstractions provided by Lokad.Cqrs).</p>

<p><strong>Architecture</strong>: Distributed system with "CQRS approach" where aggregates are implemented using <a href="http://bliki.abdullin.com/event-sourcing/why">Event Sourcing</a>. Business processes are stateless routing rules (as opposed to more classical sagas), with more complex workflow logic and state being pushed to aggregates or dedicated entities. The latter makes perfect sense with event sourcing and deployments in cloud environments. </p>

<p>Read-models are implemented using document model for now (each view is a single document being updated atomically). Still no SQL. Huge lists will be handled on per-platform basis (if they ever become a problem worth solving).</p>

<p><strong>Frameworks</strong>: Domain logic (the most complex part) does not really depend on anything except Base Class library (System. namespace). Infrastructure (essentially, configuration code) relies on ProtoBuf/ServiceStack for serialization and Lokad.CQRS with Autofac for hosting everything server-side. Web UI - ASP.NET.</p>

<p><strong>Testing</strong>: NUnit used to wire custom specifications (code copied and adjusted from SimpleTesting).</p>

<p><strong>Custom tools</strong>: using side helper to generate command/event contract classes (got lots of them) out of compact DSL. C# code is generated whenever I do Ctrl-S and is immediately picked up by R# (this is slightly improved version if T4-driven CodeDSL. Improvement - it no longer depends on T4 and hence is much easier to change. Actual DSL generation is completely within the project now. <a href="https://gist.github.com/1268198">details are in gist</a>. This custom tool can be dropped at any point (completely along with the DSL files), contract files will stay.</p>

<p><strong>What makes development complex</strong>: </p>

<ul>
<li>it's hard to get domain models and bounded contexts right (however coding or testing itself is no longer an issue. Scalability and performance - even more so);</li>
<li>hard to communicate finer-grain detail to people used to SQL/ORM;</li>
<li>I still haven't figured how to explain (graph) business processes. So far sequence diagrams work the best;</li>
<li>Event sourcing plumbing had to be implemented manually (EventStore was too much of a dependency, something more simple was needed).</li>
</ul>

<p>For the record, this project is a replacement of the project that was using following stack:</p>

<ul>
<li>NHibernate + FluentNHibernate</li>
<li>Newtonsoft JSON</li>
<li>Autofac</li>
<li>Windows Azure</li>
<li>Microsoft SQL Server</li>
<li>Protobuf</li>
<li>Lokad Shared Libraries</li>
</ul>

<p>Migrating existing system to ES requires an additional custom "Reverse Engineering" app, which scans database and generates events for the new deployment (roughly 300000 events). </p>

<p><strong>Best lessons learned</strong>:</p>

<ul>
<li>NHibernate and ORMs in general are a pain (especially in systems that has to live through more than 1 deployment). Although we are so used to that pain, that it does not feel. Well, until you have to go back and work on projects that have not been migrated, yet.</li>
<li>Specification tests (and ability to use them as a living documentation readable by non-dev people) create some interesting additional opportunities.</li>
<li>Simpler the code is - better.</li>
<li>Abstraction from the persistence not only reduces friction, but also allows to have multiple deployment options (in cloud, on-premises, in memory etc).</li>
<li>If domain model is defined (i.e.: there is BC and specifications for an aggregate), then actually coding Aggregate root with event sourcing (AR+ES) feels like a monkey coding - you just need to make all tests pass.</li>
<li><a href="/pat-helland/">Helland's principles</a> (of building distributed systems in eventually consistent world) can be enforced in CQRS/DDD world, if we get rid of sagas in classical interpretation (something that has state, subscribes to events and publishes commands), replacing them with stateless routing rules and pushing state to entities (aggregates). Underlying framework becomes much easier (no need to explicitly manage and correlate saga state). Dynamic scalability - too.</li>
<li>I'm using Event Sourcing even for simple things (like replicated user logins), simply because introducing Sql (or any other storage) would add too much complexity and friction without any visible gains.</li>
<li>Using specifications for testing AR+ES has another side advantage - I added a single unit test, that gathers pre-populated commands and events from these specifications. This data is round-ripped through a few serializers and compared. This ensures that message contracts (and their use) stays compatible with all primary serialization options (ProtoBuf, JSON). Helps to catch use of DateTimeKind issues (which is  generally not supported by JSON+PB).</li>
</ul>

<p>Obviously, this is highly subjective experience (and really rewarding). It  might change as we are pushing the project to the first release (and further). Your mileage may vary. <strong>If you are really interested in long-term production experience - please ask me about that in a few years</strong>.</p>

<p>PS: This is not the first project where ES has been used. But it combines the best lessons learned in lean development at <a href="http://www.lokad.com/aboutus.ashx">Lokad</a>.</p>

