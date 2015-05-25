---
aliases:
- /journal/2011/10/24/roadtrip-2011-lessons-learned-at-eventcentric-in-kiev.html/index.html
date: 2011-10-24
tags:
- Lokad
- DDD
- CQRS
title: Roadtrip-2011 Lessons Learned at
---
<p>In short - this spontaneous <strong>Event centric weekend in Kiev was totally awesome and rewarding</strong>. </p>

<p>Check out <a href="http://twitter.com/#!/search/eventcentric">tweets</a>, if you are interested in what others feel (people are talking about sparkles in the eyes and #eventcentric cult :)</p>

<p>This event was organized as a part of <a href="http://abdullin.com/roadtrip-2011">Road-Trip 2011</a> with Greg Young. There were quite a few other adventures that happened along the way earlier - too much to write about. So I'll just focus on the last weekend and lessons learned.</p>

<p>Event Centric weekend in Kiev was a two day class held for free in Kiev. Greg Young was doing his well-known CQRS/DDD course, I've got to share some of my practical experience with such systems "in the wild" (including various cloud options). </p>

<p>Room was packed with 90+ people from multiple Ukrainian cities and also from a few cities in Russia. </p>

<p><a href="http://www.luxoft.ru/about/delivery/ukraine.html">Luxoft Ukraine</a> helped us immensely by providing with the place to do that. Irina Odina of Luxoft deserves a medal (or two raises in salary) for staying with us through the weekends and helping with the coffee breaks. <em>Mike Chaliy</em> and really friendly Kiev <a href="http://kievalt.net/">Alt.NET community</a> were helping with afterparties, logistics and coping with unexpected.</p>

<p>Here's what I've learned during this event:</p>

<p>One of the best ways to <strong>strengthen your understanding in a field</strong> is to <strong>speak and share</strong>. For instance, I've learned a lot simply by explaining aggregates and sagas to the audience and then seeing that not everybody gets a clear and coherent picture. Or, when you get an question from an audience, and you know an answer to that question, but can't explain this immediately in clear and concise language immediately. Then Greg comes in with his explanation and reveals missing pieces and steps in my own explanation and understanding.</p>

<p>Showing my own hacks to the theory and practice (and sharing how everything works really nicely in distributed teams and cloud environments) is always a pleasure of its own.</p>

<p>There were a few smaller realizations of its own along the way. The most important one of them was about more clear and focused picture of bringing multiple complex systems together in a way to limit complexity and facilitate development (obviously, with limited time and resources). Basically that's the a-ha understanding of how to separate elements of a distributed systems (bounded contexts, sagas, services, cloud scalability points), while keeping each element highly specialized (and relatively simple).</p>

<p>In essence, this is a direct analogy with human body, where:</p>

<ul>
<li>Bounded contexts (matching aggregate roots in extreme) == <a href="http://en.wikipedia.org/wiki/Neuron">neurons</a> that are completely isolated from each other, but can exhibit complex behaviors and have a short-term memory;</li>
<li>Sagas (stateful or stateless) == <a href="http://en.wikipedia.org/wiki/Neuroglia">glial cells</a> that protect and insulate neurons from each other, while connecting them;</li>
<li>Stateless services (integration, number crunching, file processing etc) == specialized <a href="http://en.wikipedia.org/wiki/Organ_(anatomy">organs</a>) in a body that can get some job done, but tend not to have any memory on their own. They react to impulses and send back information about the events that happened to them.</li>
</ul>

<p>This analogy (coupled with the basic principles of biology) actually explained me better how to build and evolve really interesting IT systems, while keeping core cells simple. In short - that's just like how evolution does this. That was a really important realization since before that I simply could not understand how to bring together behavioristic CQRS-driven systems with elastically scalable functional elements of big data crunching or messy technology-dependent integrations. This understanding comes just in the right time - as we are starting yet another project at Lokad these days. I'll definitely blog about that more of that later.</p>

<p>A few smaller realizations were coupled to Sagas (explaining them better, to be precise) and transition from domain models to Aggregate Roots with Event Sourcing via TryDo-Do logic (nothing essential to the production but still helps to see and explain better)</p>

<p>By the way, the road-trip is not other yet. There is still a lot to learn and do. </p>

<p>So far, thanks to everybody for helping to learn and have some wonderful time!</p>

