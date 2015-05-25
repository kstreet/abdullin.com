---
aliases:
- /journal/2013/11/24/many-ways-for-an-emergent-design-in-a-component.html/index.html
date: 2013-11-24
title: Many ways for an Emergent Design in a component
tags:
- design
---
<p>Recently I mentioned 6 steps of an <a href="http://abdullin.com/journal/2013/11/18/things-i-learned-recently.html">evolutionary design in software development</a>. These steps describe iterative process aiming at continuous improvement. Such an improvement process can happen at two distinct levels:</p>

<ul>
<li>High-level view of the entire system involving components and their interactions;</li>
<li>implementation details of a component.</li>
</ul>

<p>While high-level system evolution is covered pretty well in methodologies like domain-driven modelling (strategic design), implementation level can be more project-specific and hard to explain in uniform fashion. May be that's because there is <strong>no generic approach to describe evolution of components or services</strong> in a real-world system. <strong>Each element might need to evolve in a unique way</strong> to order to reach the best balance between complexity, performance and capabilities.</p>

<p>For example, let's consider an evolution path that a single component can go through in a startup team focused on emergent design, rapid iterations and .NET stack:</p>

<p><img style="display:block; margin-left:auto; margin-right:auto;" src="/storage/uploads/2013/11/2013-11-24-01.jpg" alt="2013 10 30 stacks" title="2013-10-30 stacks.jpeg" border="0" width="460" height="600" /></p>

<p>Team dynamics, past experience and current political situation might lead to a design approach, where each component starts as a simple console app and then evolves towards more complicated design in order to fulfil specific requirements. We try to keep things as simple as possible, but no simpler. If a component is kept simple and focused (which is a task of a strategic design), then at any point in time it could be rewritten from scratch.</p>

<p><strong>Evolution tree below is merely a visualisation of existing design approach</strong> inside a given team, serving as a way to make design options more explicit and allow better communication. Any change in team, business priorities or design methodologies could affect this evolution tree.</p>

<p><img style="display:block; margin-left:auto; margin-right:auto;" src="/storage/uploads/2013/11/2013-11-24-evolution-paths.jpg" alt="2013 11 24 evolution paths" title="2013-11-24-evolution-paths.jpg" border="0" width="550" height="311" /></p>

<p>Here is a <a href="/storage/uploads/2013/11/2013-11-24-evolution-paths.jpg">bigger version of this image</a>.</p>

<p>Please note, that at any evolution along such design tree is a specific optimisation that comes at the cost of complexity. Sometimes it is better to <strong>delay paying that complexity cost and keep your options open</strong>.</p>
