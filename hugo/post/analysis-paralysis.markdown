---
aliases:
- /journal/2012/10/3/analysis-paralysis.html/index.html
date: 2012-10-03
tags:
- management
- Lokad
- Story
title: Analysis Paralysis
---
<p>How many times did you want to start a new project and implement some really exciting idea? I've been there multiple times myself. Most of my attempts failed in the very beginning, because I was <strong>trying to think or plan too much</strong> in advance:</p>

<ul>
<li>How do I plan for future extensibility and adding new features?</li>
<li>What if I need to switch between databases - how do we abstract this away?</li>
<li>How do we scale out for 1000000 users?</li>
<li>I need some formal process around features and releases. If project becomes successful and grows, new team members should have no difficulty joining in.</li>
</ul>

<p>These are the most sane of the imaginary requirements that used to come to my mind (more exotic ones included terms: "Neural networks", "Linux kernel", "ARM processor support" and "should make good expresso").</p>

<p>All this felt like something good, as if I were planning for every feature and problem in advance. </p>

<p>However, in practice this somehow used to turn simple and exciting projects into challenging sets of problems, that had to be solved all at once. Most of the times, these sets were so complicated, that I had to stare them in awe without any slightest idea of where to start and what to do next. This state is often called <em>analysis paralysis</em> (or the worst way of dreaming). As you might guess, almost all of such projects were dropped, while the other half failed later during careful planning and execution.</p>

<p><strong>We can wish to be prepared for a lot of problems and features in advance. But do we really need for them to happen all at once?</strong> That's really hard to achieve. </p>

<p>Life is simple. You can't walk 1000 miles at once. There has to be the first step, and then the one that will come after.</p>

<p>There is an approach that helps to move forward with development in such situations (first time I heard it from Gregory Young). It can be really hard for developers, since we all are inherently perfectionists. <strong>Instead of trying to plan for the entire project in advance, we just take the smallest bite possible</strong>. You can call it a "<em>prototype</em>", "<em>minimum viable product</em>", "<em>let's give it a try</em> or "<em>dirtiest and hackiest code I've ever written</em>". This attempt will be fast and deal with the <a href="http://abdullin.com/journal/2012/9/21/design-obsessions.html">core idea</a>. If it fails - it will fail fast; if it makes at least some sense - it will only get better from this point. We can focus on the most painful problem that makes this idea shine (it will be easy to prioritise) and solve it. Then the next one and the next.</p>

<p>The idea is just to start walking towards the goal, instead of burning yourself down by an attempt of 1000 mile jump (only to discover that you jumped in the wrong direction).</p>

<p>The approach becomes even more valuable, when there are multiple stakeholders involved in the project. <strong>It is much easier to arrive at collaborative analysis paralysis, when everybody keeps on throwing their dreams in</strong>: "<em>we want this</em>", "<em>it should do this</em>", "<em>what if this happens?</em>". </p>

<p>The most simple solution to the core problem provides team with a starting point for discussion and planning. It makes discussions more real, than juggling with wishes and fears in the abstract problem space. This approach also helps to prioritise further progress - you focus on the most painful thing first.</p>

<p><strong>Life and projects can overwhelm with problems. Keep it simple and focus on making next most important step. Step by step, you can walk around the world.</strong></p>

