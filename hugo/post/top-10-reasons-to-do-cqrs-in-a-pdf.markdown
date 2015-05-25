---
aliases:
- /journal/2010/10/21/top-10-reasons-to-do-cqrs-in-a-pdf.html/index.html
date: 2010-10-21
tags:
- xLim
- Lokad
- Cloud Computing
- DDD
- CQRS
- Domain Event
title: Top 10 Reasons to do CQRS (in a PDF)
---
<p>Here's PDF that maps my <strong>top 10 reasons</strong> to use Command-Query Responsibility Segregation in your development. These reasons are about <strong>benefits of CQRS</strong> and things that it <strong>enables to do</strong>: <em>Domain-Driven Design, Event Sourcing, Cloud Computing</em> etc. </p>

<p>This map is made in a form of research/skill tree (just like the one in <em>Master of Orion 2</em> or <em>Diablo 2</em>) and shows my take on the dependencies between these different architectural elements along with the benefits they provide. In essence these are potential paths of evolution that your system might go through as it matures and faces new scalability, complexity or business challenges.</p>

<p><span class="full-image-block ssNonEditable"><span><img src="/storage/uploads/2010/10/2010-10-22_022341.png" alt="10 Reasons to do CQRS"/></span></span>
<a href="/storage/uploads/2010/10/CQRS-big-picture.pdf">
<strong>Download PDF</strong></a> | <a href="/storage/uploads/2010/10/CQRS-big-picture.png"><strong>Download Hi-Res PNG</strong></a> | <a href="http://abdullin.com/journal/2010/10/22/top-10-reasons-to-do-cqrs-in-a-pdf.html"><strong>Permalink</strong></a> </p>

<p>This CQRS roadmap was inspired by the question of Samuel Jack on CQRS applicability in small systems that don't require massive scalability. There were a few other similar questions as well. Apparently, by pushing CQRS to the <a href="http://abdullin.com/journal/2010/9/26/theory-of-cqrs-command-handlers-sagas-ars-and-event-subscrip.html">theory of almost-infinitely scalable systems</a>, I've made an impression that scalability is all that is out there.</p>

<p>I think, large scalability is not the only reason to try <a href="/tags/cqrs/" target="_blank" class="offsite-link-inline">CQRS</a> architectures (and any of the other features down the "research tree"). However if you discover that you need to reduce complexity, bring up the scalability or add smarter business intelligence - these paths will still be open for you in a rather straightforward way.</p>

<p>In fact, another inspiration for the outline was the current process of jump-starting yet another Lokad project on top of Lokad.CQRS for Windows Azure. This project is bound to be simple, robust and flexible enough to handle new business requirements as they come - <strong>a perfect fit for CQRS</strong>.</p>

<p>You are welcome to <a href="/storage/uploads/2010/10/CQRS-big-picture.pdf">download</a> this CQRS "research tree", share it, print out as a reference (it should scale to 2 A4 sheets by default), use to persuade your boss or colleagues about some long-term refactoring investment or do pretty much what you like.</p>

<p>Do you like it?</p>

<blockquote>
  <p>PS: this post is a proud member of <a href="http://abdullin.com/xlim/">xLim 4: CQRS in Cloud</a> series, but it's applicability is not limited by the cloud.</p>
</blockquote>

