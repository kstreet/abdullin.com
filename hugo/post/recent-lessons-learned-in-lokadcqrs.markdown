---
aliases:
- /journal/2012/7/5/recent-lessons-learned-in-lokadcqrs.html/index.html
date: 2012-07-05
title: Recent Lessons Learned in Lokad.CQRS
tags:
- design
- story
- event-driven
---
<p>As you probably already know, <a href="http://lostechies.com/gabrielschenker/author/gabrielschenker/">Gabriel Schenker</a> has started a series of blog posts on <a href="http://lostechies.com/gabrielschenker/2012/06/12/how-we-got-rid-of-the-database/">How we got rid of the database</a>. One or two concepts in Gabriel's approach originate from <a href="http://lokad.github.com/lokad-cqrs/">Lokad.CQRS Sample Project</a>.</p>

<p>It was really inspiring to see these ideas put to some practical use and validated outside of Lokad. It also provided a nice retrospective which helped to see, what changed in Lokad.CQRS recently.</p>

<p>Given that, I want to share some of the changes that actually happened to Lokad.CQRS approach (mostly based on DDDSummit 2012, work with Vaughn Vernon and also recent experience in new projects).</p>

<p><strong>Automated projection management is a huge life-saver</strong> (rebuilding views that have a projection code changed or creating new views). It vastly simplifies life both in development and production, enabling new scenarios. For example, it becomes possible to get immediate feedback for your UI tweaks in development. </p>

<p><strong>Joining command handlers into Application services</strong> (similar to how we join multiple event handlers into a projection class) helps to make them more consistent. This makes solution more structured, when you get dozens of commands.</p>

<p>Development workflow noticeably speeds up, when you <strong>auto-generate (and auto-update) handler interfaces</strong> for your aggregates and their states, based on some contracts DSL (provided you use event sourcing there). DSL sample in Lokad.CQRS already does that.</p>

<p>As your projects grow (in complexity and load) it becomes apparent, that handling event streams as individual files/blobs might not be efficient. For instance, try copying 100000 individual event stream files from the cloud for some debugging (hint: latency will be the pain). So at Lokad we gradually shift towards operating with <strong>event streams per bounded context</strong>. These are equivalent to domain logs in older Lokad.CQRS or to transaction logs in other database solutions. </p>

<p>In essence, bounded context stream is an aggregation of all event streams within a given bounded context, where individual event streams are identified by a name but are still stored together. This makes it extremely simple to replicate or to write (we can also preallocate some disk space to reduce enormous fragmentation). Reading individual streams can be problematic, unless you store in memory either full caches or at least indexes. </p>

<p>In other words, we just slightly change storage approach to keep all separate event streams together.</p>

<p>First draft implementations of this approach are covered in stream implementations provided in <a href="http://lokad.github.com/lokad-iddd-sample/">IDDD sample</a>. They are based on Riak Bitcask. Since publishing them, we have slightly improved on that in out internal code. I hope to bring all these improvements back into Lokad.CQRS soon (when starting to implement proper DDD sample).</p>

<p>These changes are are well aligned with both Greg's future event store (he's making awesome product, by the way) and future book by Vaughn.</p>

<p>Having said that, per-file event stores are still a valid and nice approach for local development purposes and low-volume production scenarios.</p>

<p><strong>Domain Services</strong> become really nice tool to exchange information between different aggregates in eventually consistent way. Before, I would try to somehow wire all information from one aggregate to another via event-command chain (making them really bulky and sending around a lot of useless info). Now, I tend to define view projection that is used within core bounded context. This projection is auto-managed (meaning I can change it any way, and server will rebuild it as necessary) and is populated by events coming from some aggregates. Another aggregate accesses it via a domain service that knows how to query this view.</p>

<p><strong>Value objects</strong> become really important in expressing domain logic. It is amazing, how simply writing a descriptive concept class (i.e.: email, forecast settings, service level variable etc) makes the rest of the code more compact and robust.</p>

<p>As you can probably see, majority of changes affect either DDDesign principles on top of Lokad.CQRS or some subtle implementation details underneath. Core abstractions and ideas (i.e. document storage, Aggregates with event sourcing) seem to stay relatively stable and practical.</p>
