---
aliases:
- /journal/2011/4/23/use-cqrs-when-constrained-on-developers-and-time.html/index.html
date: 2011-04-23
tags:
- xLim
- Lokad
- Cloud Computing
- CQRS
title: Use CQRS When Constrained on Developers and Time
---
<p>Udi Dahan wrote a funny article recently, talking about <a href="http://www.udidahan.com/2011/04/22/when-to-avoid-cqrs/" target="_blank" class="offsite-link-inline">When to avoid CQRS</a>.</p>

<blockquote>
  <p>So, when should you avoid CQRS? The answer is most of the time..</p>
</blockquote>

<p>I deeply respect Udi's immense experience. Yet, based on my limited experience, potential surface for applying CQRS Architectural patterns and practices is much bigger, than outlined is his article. </p>

<p>In essence, synergies within CQRS work, whenever you need to:</p>

<ul>
<li>tackle complexity;</li>
<li>distribute teams;</li>
<li>scale out under massive loads.</li>
</ul>

<p>All this could happen, when you have roughly 1.2 people (that's less than one-and-a-half-developer) per project in a fast-paced development environment with limited time and resources.</p>

<p>Of course, this kind of "scaling" is a somewhat extreme case (although, I believe, we should be able to do even better at <a href="http://www.lokad.com/developers.ashx" target="_blank" class="offsite-link-inline">Lokad</a>). Non-startup organizations don't need to fit these constraints. However wild my guess is: if CQRS approaches worked greatly for us in such situation (where N-tier, ORM, relational, DTC stuff and all their friends failed badly for scalability and complexity reasons), then they would work in less extreme situations.</p>

<p><span class="full-image-block ssNonEditable"><span><img src="/storage/uploads/2011/04/2011-04-23_cqrs-scaling.png?__SQUARESPACE_CACHEVERSION=1303572203514" alt="CQRS Scaling"/></span></span></p>

<p>Another important thing is that the CQRS architecture and development approaches seem to work consistently under a diverse variety of conditions, such us:</p>

<ul>
<li>Simplifying and speeding up complex entangled legacy systems.</li>
<li>Developing complex integration platforms reaching out dozens of unreliable systems around the globe.</li>
<li>Rapidly implementing simple tactical solutions with teams distributed globally.</li>
</ul>

<p>In these very conditions classical approaches failed for us. The latter could be attributed to the fact that we (I mean "I" here) didn't have knowledge and experience required to master SOA, N-Tier, ESB and all the other things. This was complex stuff, potentially requiring years of learning, expensive courses and large teams. </p>

<p>Yet, for some strange reason, the mental model of CQRS provided much friendlier and faster implementation route here (despite the fact that there is not a single book published on the subject, yet). Diverse solutions being delivered to production, share similar architecture, development principles, reduced complexity levels and teams. They just work. <strong>No dedicated training courses or expensive consultants are needed</strong> for us to handle various scalability challenges, because all of them already have clear solution paths. The fact that we develop for the elastic cloud environment (which is less stable and predictable than on-premises systems), does not help to save the situation and make it less boring.</p>

<p>Having said all that, if you are new to the CQRS, you have two options to take:</p>

<ul>
<li>Sign up for Udi's <a href="http://www.udidahan.com/training/#Advanced_Distributed_System_Design" target="_blank" class="offsite-link-inline">course on distributed systems</a> for mere 2500 EUR.</li>
<li>Check out <a href="/tags/cqrs/">CQRS Starting point</a> and referenced learning materials and articles.</li>
</ul>

<p>For those who are familiar with CQRS and my work, here are some good news. I've "accidentally" decoupled core functionality of Open-Source Lokad.CQRS project from Windows Azure. After the v2 release, it should theoretically be possible to run it under Linux for embedded and cloud solutions (version .NET 3.5, if using stand-alone TPL library)</p>

