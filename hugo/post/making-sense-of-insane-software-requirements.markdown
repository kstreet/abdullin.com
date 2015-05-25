---
aliases:
- /journal/2013/4/17/making-sense-of-insane-software-requirements.html/index.html
date: 2013-04-17
title: Making Sense of Insane Software Requirements
tags:
- design
---
<blockquote>
  <p>Writing is a thought you can analyze (c) Tim Ferris</p>
</blockquote>

<p>Have you ever found yourself looking at a pile of software requirements without any clue what to do with them? Some of them could make sense, while others - little sense or even contradict to each other. All in all this would leave this nagging feeling of "big ball of mud", that you have to sort out.</p>

<p>This happens quite often to me. I used to hate such situations before. However these days such problems are simply tasks that usually have step-by-step solution.</p>

<p>Let's see why these big piles of requirements (or specifications) even show up. They are probably caused by the fact that it's rare for a single person to have a clear vision of all requirements in his head. Usually these come from different people at different points in time:</p>

<ul>
<li>Different people specify different "I want to have this awesome feature" ideas for the same project.</li>
<li>Somebody might provide one suggestion ("Make it green, it'll look awesome!"), forget about it, then provide completely contradicting solution a week later ("Make it red, it'll look awesome!"). This happens to busy people all the time.</li>
<li>People might provide feature requests without full knowledge about how things are already implemented ("Please add this helicopter landing pad on top of our building", while the building is simply a bungalo on the beach)</li>
</ul>

<p>The most interesting part is that it's duty of software developer to accomplish all that in the best possible way, while turning down things that are too expensive or risky ("You know, adding underground parking garage to this existing building would probably make it collapse").</p>

<p>One approach to accomplish that is to simply start organizing these requirements, giving them some sort of structure. You would try to bring closely related concepts together and look at them in isolation from the others (hey, these 2 requirements try to give button "X" different colors).</p>

<p>You might need to try different approaches to structure and represent requirements, before you find the one that fits your sutiation (put them on cards and shuffle around, add as lines to Excel, draw UI mockups etc). </p>

<p>The big goal here is not to try build links and relations in your head - it'll take a lot of energy just to remember them. You can instead try to bring them some place out (even if the first attempt is a mess) and then improve on that structure on a step-by-step basis. At some point in the process you might even discover contradicting requirements (e.g.: making the button red and green at the same time), and this time you will be able to reason about them and explain "why" it is so.</p>

<p><strong>So next time you encounter a bunch of complex and contradicting requirements - just try putting them on a sheet of paper and shuffling around.</strong></p>

<p>Ultimately, in the world of complex business relations and behaviors, you can go further and try to code your domain model while exploring numerous specifications. Code can provide much stronger logical and reasoning support than simple writing. You'll be able to clarify your understanding by encapsulating some complexity inside value objects, hiding business behaviors inside aggregates and isolating UI-related details inside projected views and client-side interactions.</p>

<p>This will give you rather structured high-level representation with the ability to dive into any single detail. Better than that, you could send it for somebody to review and improve. If coded domain model happens to capture everything perfectly - it can serve as a basis for production software that will do something useful with it. Otherwise, it's just a written model that you can improve on.</p>

<p>Tim Ferriss once said "Writing is a thought that you can analyze". In the world of software design we can push it even further and say that "Code is a representation of the problem that you can analyze". If you happen to encounter complex business problem that needs solving, then may be capturing it in the code would help you to understand it and reason about it. Just give it a try, even if the code itself would never run in production.</p>
