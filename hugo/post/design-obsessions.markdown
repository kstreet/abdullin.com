---
aliases:
- /journal/2012/9/21/design-obsessions.html/index.html
date: 2012-09-21
tags:
- Lokad
- Story
title: Design Obsessions
---
<p>I had a lot of failures in my past development experience. Most of them were caused by being completely obsessed by some cool technology or a trick. These things were so appealing that desire to use them became the central idea of an application. </p>

<p>Among the failures I had in my development, these ones were caused by design obsessed with some technology:</p>

<ul>
<li><strong>Design driven by principles of UI composition and Flexibility</strong>, where you build ultimately flexible CRM system with any number of fields, queries and forms.</li>
<li><strong>Inversion-of-control-container driven design,</strong> where you design a system by dropping a large pile of services, controllers and managers into the IoC container, and then letting it resolve a complex graph.</li>
<li><strong>ORM-driven design</strong>, where you design your "business objects" and the rest of the system is wired almost automatically.</li>
<li><strong>CQRS-driven design</strong>, where you take this principle as architectural guideline and end up with a complete mess of messages and views.</li>
</ul>

<p>Lesson learned - <em>if central idea of your design is about technology, then such system will become a slave of this technology</em>. All advantages and limitations of such technology will eventually become forth and strike you really hard. </p>

<p>If you start your system design by assumption of using a certain framework, database or tool - you are already paying a tribute to this obsession. It is unavoidable to some extent, since we are limited by knowledge and capabilities of our development teams. </p>

<p>However, we can reduce bad side-effects by trying hard to <em>focus on the idea that is worth becoming the center of your application</em>. As you probably have guessed, this idea is about <strong>solving the real-world business problem</strong> you have at hand (granted that this problem is worth solving). Examples of such problems are: </p>

<ul>
<li>helping business to optimize it's pricing strategies across hundreds of thousands of products to increase turn-over and reduce amount of inventory that is thrown away; </li>
<li>enabling a company to serve millions of its customers better by allowing behavioral analysis of each individual and suggesting healthier and cheaper products; </li>
<li>helping a hospital to serve it's patients better by providing more efficient ways to diagnose patients, schedule available resources or collaborate on information about treatments and medications.</li>
</ul>

<p>Technologies, stacks and approaches are merely replaceable tools that help to support such solution (even if tech is as cool as cloud computing, event sourcing or $YourCurrentlyFavoriteTechnologyHere$). Pick them consciously and don't let them become the core idea behind design of your solution. <strong>Such obsessions are among the most expensive ones</strong>. If you have too many - you can even end up with a severe case of <a href="http://abdullin.com/journal/2012/10/3/analysis-paralysis.html">analysis paralysis</a>.</p>

<p><strong>While designing systems we try to use all cool tech we love. Design obsession with solving business problems is better.</strong></p>

<blockquote>
  <p>Update: if you want to hear a bit more on the subject and my mistakes - check out <a href="http://beingtheworst.com/2012/episode-8-frameworks-over-forms-is-a-design-obsession">Episode 8 of Being The Worst Podcast</a></p>
</blockquote>

