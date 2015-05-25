---
aliases:
- /journal/2012/2/22/importance-of-execution.html/index.html
date: 2012-02-22
tags:
- Lokad
- Cloud Computing
- CQRS
- Story
title: Importance of Execution
---
<p><strong>Ideas are worth nothing</strong>, no matter how smart they might sound like. They are just theory (even if they are based on real-world practice). And we all know, that <strong>in theory there is no difference between theory and practice</strong>. While <strong>in practice such difference exists</strong>.</p>

<p>The crucial <strong>bridge between theory and practice</strong> is called <strong>execution</strong>. Good execution is the key element that can take a simple idea and turn it into profitable and inspiring business. Bad execution can easily ruin a brilliant idea and turn it into a pile of debts and bunch of burned out people. </p>

<p>Ideas expressed in this and following texts could be dangerous or reckless, if considered in isolation, without taking a closer look at the execution. </p>

<p>For instance, let's talk about rapid delivery at <a href="http://www.lokad.com/">Lokad</a>, where multiple releases to cloud per day are not an outstanding exception. For us it is a way to outrun competition, rapidly respond changing market or solve some <a href="http://abdullin.com/journal/2012/2/21/how-to-deal-with-unexpected-problems.html">unexpected problems</a>. It is one of the reasons customers give us testimonials like this one:</p>

<blockquote>
  <p>Lokad improved the accuracy of our planning process significantly. The immediate impact was a stock reduction of almost 1 million EUR at a monthly cost of 150 EUR. </p>
  
  <p><strong>Thomas Bremont</strong>, Head of Supply Chain Bizline</p>
</blockquote>

<p>This might sound like an impossible idea for people coming from enterprise background with highly formalized environment, predictable monthly milestones and precise technical specifications. In fact, this approach is barely applicable in their case (which strengthens our competitive advantage even further).</p>

<p>However, while thinking about reliability of these ideas, please consider their execution aspects at Lokad:</p>

<ul>
<li>we <strong>test complex behavioral code thoroughly</strong> with things like <a href="http://cqrs.wikidot.com/specification">specifications</a> that also serve as <strong>living documentation</strong>;</li>
<li>even more complex forecasting code has a dedicated multi-machine cloud deployment and benchmarking infrastructure that <strong>continuously cross-tests changes in the code</strong> against large data library; this tracks performance of forecasting models and allows our brilliant analytics team to <strong>push state of the art in forecasting</strong>; they even have their own <a href="http://lokad.github.com/lokad-cloud/">stack for Windows Azure</a>;</li>
<li>our master branch (in git source control repository) of integration systems is always close to being <strong>stable</strong> (large changes happen in separate branches); releases are tagged, backed up and deployed according to <strong>deployment protocol</strong>;</li>
<li>core <strong>data is immutable and append-only</strong> (persisted as <a href="http://cqrs.wikidot.com/event-sourcing">event sourcing</a> streams for behavior-based entities) and hence it is inherently easy to back up or revert any changes;</li>
<li>a lot of systems include <strong>sanity checks and self-diagnostic routines</strong> that help DevOps to detect any potential problems or edge cases; some even have <strong>self-recovery</strong> logic;</li>
<li>most frequent changes in customer-facing systems deal with user experience, and <strong>UI is simple in DDD/CQRS systems</strong>, especially when changes to data structure behind UI are <a href="http://abdullin.com/journal/2012/2/10/getting-rid-of-cqrs-view-rebuilds.html">managed automatically</a> by cloud servers;</li>
<li>all of our new systems inherently support <strong>hybrid cloud deployments.</strong> Newest designs even support <strong>real-time replication</strong> of data based on event sourcing, since we must become <strong>more reliable and secure than any single cloud</strong>.</li>
</ul>

<p>As you can see, we simply took brilliant ideas from Greg Young and other members of CQRS community and try to diligently execute them by applying lessons from companies like 37Signals, github and Twitter. </p>

<p>In the following articles I will try to address both aspects in parallel: <strong>ideas and execution</strong>.</p>

