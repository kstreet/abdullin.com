---
aliases:
- /journal/2012/8/25/updates-on-lokadcqrs-iddd-branch.html/index.html
date: 2012-08-25
tags:
- xLim
- Lokad
- Azure
- Cloud Computing
- DDD
- CQRS
title: Updates on Lokad.CQRS - IDDD Branch
---
<p>I've just finished pushing some code to <a href="https://github.com/Lokad/lokad-cqrs/tree/iddd">Lokad.CQRS (iddd) branch</a>. Some of the changes are listed below.</p>

<p><strong>Last stable version of embedded event store</strong>. As you know, we've been working on one for our purposes. <a href="https://github.com/Lokad/lokad-iddd-sample">Lokad IDDD sample</a> included beta version, which was polished and cleaned a bit since then by our production experience. That's what went to Lokad.CQRS</p>

<p>This event store (and underlying infrastructure) are based on <a href="http://downloads.basho.com/papers/bitcask-intro.pdf">bashio bitcask model</a> in a simplified way (full in-memory caching, immediate persistence commits, SHA1 checks and crash-tolerance). New event store is more maintenance-friendly for cases when you have hundreds of thousands of event streams (they are no longer stored in individual files, but are rather interleaved within the same transaction log).</p>

<p>This store has two implementations out-of-the box: file system and azure blob storage (the latter uses efficient blob range posts to append to log files). IDDD sample also has SQL-based implementations.</p>

<p>This event store is multi-thread friendly (and tested to be so). </p>

<p><strong>Simplified Lokad.CQRS core</strong>, which is used in new projects. I dropped a lot of things to simplify infrastructure and support future scenarios. Among these changes, message envelopes got really simplified and got proper SHA1 checks for their content. Startup projection rebuilder got a little bit smarter. This core is also a better fit for rapid DDD prototyping of persistence-ignorant systems.</p>

<p><strong>Improved performance</strong> (a little bit), getting rid of two-phased-commit (aggregate events are appended to the store and get published in batches by a separate process, which no longer needs to access router).</p>

<p>This isn't the end of the work on this branch)since I have to get rid of complexity in "SimpleTesting" (reusing simpler one-file approach from IDDD sample) and drop a lot of complexity from SaaS sample (turning it rather into the project template). </p>

<p>However, I wanted to bring these changes to the attention of people that were asking for latest changes in Lokad.CQRS, compatible with the concepts from IDDD book. So, <a href="https://github.com/Lokad/lokad-cqrs/tree/iddd">here you go</a>.</p>

