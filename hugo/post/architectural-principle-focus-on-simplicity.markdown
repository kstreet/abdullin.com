---
aliases:
- /journal/2012/2/2/architectural-principle-focus-on-simplicity.html/index.html
date: 2012-02-02
title: Architectural Principle - Focus on Simplicity
tags:
- design
---
<p>A few hours ago I've posted a tweet that gathered unexpected response:</p>

<blockquote>
  <p>Popular things that I consciously avoid: IoC Containers, Mocking, ORM, SQL, NuGet, WCF, WWF, WPF, NServiceBus, DTC and TFS.</p>
</blockquote>

<p>I did expect any kind of response. And I'd understand that perfectly, since I myself used to <a href="http://abdullin.com/journal/2008/7/6/implementing-orm-independent-linq-queries.html">adore ORM</a>, <a href="http://abdullin.com/journal/2009/6/25/testing-mvc-elements-and-interactions-with-mock-container.html">play with mocking</a>, <a href="http://abdullin.com/journal/2010/4/24/visualize-ioc-container-and-domain-dependencies-part-2.html">abuse IoC badly</a> and do all sorts of <a href="http://abdullin.com/xlim/">other bad things</a>.</p>

<p>However the only question people got was: "<em>What's the problem with NuGet</em>"? Well, answering it requires going a few steps back. </p>

<blockquote>
  <p>Keep in mind, that I'll be pushing my point of view slightly to the extreme, just to make the point more clear.</p>
</blockquote>

<p>Every new junior developer (growing team, or a product) starts with the simple approach: we start writing software and adding features till we deliver (sometimes in waterfall approach quite a lot of time could be invested before this happens). Then we grow from there. As software and developers mature, they face new challenges and problems. Luckily we get new tools, skills and ideas to help us growing. New team members and frameworks join in to help everybody move forward and deliver more. Things that hurt or are uncool are thrown away (even though sometimes it might take some effort). </p>

<p>Sounds like fun.</p>

<p>However, somewhere in my career path, I've been lucky to get on a rocky path. We never had real ability to just add more tools, people or features. I never worked on a project that had more than 3 people involved in it full-time at once. All these projects were stressed in time (no man-years till the next release) and functionality (rapidly growing companies need to evolve and scale fast).</p>

<p>Sounds like a minefield and completely unrewarding environment, does not it? <strong>Every wrong decision shows itself really fast</strong>. Every step that is just good (and <em>not outstanding</em>) also shows (since you waste precious time that could've been invested more efficiently). So my development career was governed by pain: wrong decisions and poor choices lead to long hours, late nights and unsustainable work efforts. Not, that I don't make frequent mistakes any more, but these ones were really bad. </p>

<p>And that's actually good: <strong>harder life hits you, faster you learn</strong>. Bad ideas and tools don't get a lot of chances to stick around in such poor environment. Semi-useful things don't get to stick either. The core principle that still remains and always works is <strong>disciplined simplicity and focus</strong>. Among other things this means:</p>

<ul>
<li>If I get a chance to remove something or break things down with a small effort, I will take that effort. </li>
<li>If I get a chance to add something with a small effort, I will fight it. </li>
<li>I prefer to refactor something first and then maybe add complexity as opposed to adding complexity and then maybe refactoring.</li>
<li>If I have a chance to defer solving the problem (or even avoid it altogether), I will try that.</li>
</ul>

<blockquote>
  <p>Obviously this is the idealistic scenario, that does not factor business values and the rest of the real-world. However, these are just strengthened even more, when you start consciously measuring costs and try to avoid problems.</p>
</blockquote>

<p>This often comes to things that other would see as extremes: dropping project references, avoiding to use new technology or framework, removing files, taking preventable risks and even turning down features. Some call this <strong>pain-driven development</strong> - you keep only things that are too painful to live without, because you can't afford keeping the rest; you focus only on problems that are the most painful for the business (and are measured in real money), because you don't have enough people and hours to deal with the rest.</p>

<p>This is like constant <strong>tending your garden</strong> or <strong>curating an exhibition</strong>: you continuously look look for bad combinations or things that are just good (and not great). You think twice before adding something new (Dependencies also count). Because each thing means:</p>

<ul>
<li>One more thing for a new developer to learn.</li>
<li>One more thing that have a chance of going wrong in production.</li>
<li>One more thing to keep in mind while developing.</li>
<li>One more logical dependency that has a chance of causing regression.</li>
</ul>

<p>All this zealotic obsession with simplicity would not be needed if I had environment that is more rich: with more resources, time and people to help us. Would it?</p>

<p>If we push the idea to the extreme, consider two imaginary products. One could be designed by a rich team with a strong vision, smart architects and man-years dedicated for their goal. The other product could be developed mostly by a semi-organized group individualistic hackers, that scavenge a few hours, accept risks, while working on diverse bits, that are kept stupid and isolated.</p>

<p>How do you think, will these projects perform in real life? How close is your project to either of these extremes?</p>

<ul>
<li>An example of rich project environment would be something like: <strong>TFS</strong>.</li>
<li>An example of poor project would be a collection of hacks commonly known as <strong>Git</strong>.</li>
</ul>

<p>I'm not trying to compare these projects or judge them. This is up to you :)</p>

<p>BTW: the answer to the question of "What's wrong with NuGet, NSB etc" is simple: <strong>these projects might be good, but I can live without them in my projects</strong> (or learned how to live without them). They didn't prove essential (just like almost all utilities and open source libraries I've created and thrown out myself). </p>

<p>Constraints of such projects are:</p>

<ul>
<li>A few developers (distributed around the world) and rapid releases.</li>
<li>Necessity to compete with multi-billion transnational companies. </li>
<li>Necessity to have complex business intelligence (think business analytics) OR extreme scaling (think big data processing with 200x scaling in matter of hours) OR flexible and rich UIs OR cross-cloud low-friction development OR low operating costs OR tolerance to process failures and human errors.</li>
</ul>

<p>More often than not, such <strong>projects require ALL of that at once</strong> (that's how we roll at <a href="http://www.lokad.com/aboutus.ashx">Lokad</a>). And guess who gets to babysit these projects and spend weekends fixing things that go wrong?</p>

<p>Such tight constraints led to the architectural principles and focus on simplicity that I've outlined in this article. </p>

<p>Tools and frameworks that we still stick to - are getting all the passion, gratitude and even free time. They are worth it, since they helped to work through the problems that we were unable to solve otherwise. However, among all these precious things, <strong>the most valuable</strong> tool and architectural principle is <strong>keep things simple</strong>, focus on that.</p>

<p>PS: You can continue reading on this topic in a fine article by Rob Ashton: <a href="http://codeofrob.com/entries/your-container-is-not-wanted-here.html">Your container is not wanted here</a>.</p>
