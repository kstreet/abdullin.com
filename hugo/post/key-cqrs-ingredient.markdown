---
aliases:
- /journal/2010/11/16/key-cqrs-ingredient.html/index.html
date: 2010-11-16
tags:
- xLim
- Lokad
- DDD
- CQRS
title: Key CQRS Ingredient
---
<p>Recently there was a bit of feedback around CQRS (mostly with the regard to <a href="http://code.google.com/p/lokad-cqrs/" target="_blank" class="offsite-link-inline">Lokad.CQRS for Windows Azure</a>), where developer gets along with the architecture, design concepts and all the other exciting little things of CQRS, but then he just gets confused. There's too much tech information at once and too little ideas of where to go next.</p>

<p>Questions tend to be like this:</p>

<ul>
<li>How do I design these commands and events?</li>
<li>Why can't I just have one command handler that processes all requests?</li>
<li>I have a problem I want to solve with Windows Azure and your framework. I did the tutorials. What do I do next?</li>
</ul>

<p>I recall being in the same place as well: elements of CQRS architectures make sense, but aside from that it's all too overwhelming and confusing. You don't understand why is everybody so excited with all this mess. You don't see the <strong>clear learning path forward</strong>.</p>

<p>Let's see what we can do to simplify further learning and avoid possible disappointment.</p>

<p>First, we'll take a little step back and walk over the basic concepts again. We'll start with the purely technical ones (excerpt from <a href="http://abdullin.com/journal/2010/11/3/cqrs-architecture-and-definitions.html">here</a>):</p>

<ul>
<li><em>Command-Query Responsibility Segregation Principle</em> is about separation of reads from writes.</li>
<li><em>Circular Architecture</em> (another term that comes up in the groups; don't confuse it with the <em>onion architecture</em>) is about structuring these reads and writes in a decoupled way with the help of asynchronous messages (namely commands and events) and synchronous view queries.</li>
<li><em>Event Sourcing</em> is another idea - persisting objects as a stream events that happened to them.</li>
</ul>

<p>These are just technical concepts that might look cool but aren't extremely exciting on their own. These are actually the things that have been used over and over in various systems for ages with various degree of success. </p>

<p>Understanding these tech ideas alone is not enough for efficiently building valuable and scalable systems in the cloud and on-premises. There is the <strong>key ingredient</strong> missing from this picture: <strong>Domain-Driven Design</strong>. DDD is about understanding, explaining and evolving your domain model (that abstract thing that we are trying to express with the code) in a way that:</p>

<ul>
<li>model would focus on the most important characteristics of the problem at hand (while putting less important things aside, for the sake of preserving the sanity of everybody);</li>
<li>the model could evolve and still stay in sync with reality;</li>
<li>model would help different people with various backgrounds to work together (i.e.: users, sales people and hard-core developers);</li>
<li>model would let you avoid costly development mistakes (it could even help to deliver new exciting features as a simple logical extension of what has already been implemented).</li>
</ul>

<p>Isn't that a lot for "model": something vague that's not even a code or final architecture document of 200+ pages? Well, <strong>DDD is not just "model"</strong>, but the methodology and principles to create it, distill and keep evolving afterwards. <strong>It's way of thinking, learning and talking about the business problem</strong> in a manner that implementing everything would be rather simple, despite the initial complexity of the actual problem.</p>

<p><em>CQRS architecture approaches</em> build upon this way of thinking and created models: here we extend the DDD methodology and add new exciting ways to implement everything as a scalable and cost-effective software. We make heavy use of terms like <em>ubiquitous language</em>, <em>bounded contexts</em>, <em>context maps</em>, linking these directly to the technological and architectural constraints of CQRS Architectures. That's actually what <strong>Distributed Domain-Driven Design</strong> is - DDD principles enhanced with specific CQRS-based patterns-n-practices and a clear way of migrating existing systems towards better complexity management, scalability and integration capabilities.</p>

<p>The same is with the <strong>Cloud CQRS Architectures</strong> (or <a href="http://abdullin.com/xlim/">xLim 4</a>) - Domain-Driven Design and understanding of your domain model are the important milestone to go for. Once you have it figured out - things like messages, routing, partitions and elastic scalability will just unfold on top of that model in a rather straightforward fashion without the risk of creating non-scalable, overengineered or expensive cloud computing system.</p>

<blockquote>
  <p>So as you can see <a href="http://code.google.com/p/lokad-cqrs/" target="_blank" class="offsite-link-inline">Lokad.CQRS for Azure</a> is not extremely important or outstanding on it's own - it is just the framework to help using DDD/CQRS principles for building systems powered by Windows Azure Cloud Computing Platform.</p>
</blockquote>

<p>So if you got caught by this "CQRS hype" with all it's cool technological promises and then got stuck, I recommend to proceed as:</p>

<ul>
<li>Read the <a href="http://www.amazon.com/gp/product/0321125215?ie=UTF8&amp;tag=abdullin-20" target="_blank" class="offsite-link-inline">Domain-Driven Design by Eric Evans</a>.</li>
<li>Go through the materials on <a href="http://cqrsinfo.com/" target="_blank" class="offsite-link-inline">Cqrsinfo.com</a> site (to cover the transition from DDD to DDDD).</li>
<li>Start a small learning project using DDD and the most familiar technologies and architectures.</li>
<li>Gradually walk through migrating this project towards the CQRS architecture (either cloud implementation or not).</li>
</ul>

<p>These references are already available in <a href="/tags/cqrs/">CQRS Starting point</a>, but I wanted to highlight the importance of DDD one more time.</p>

