---
aliases:
- /journal/2011/9/17/vienna-cqrs-notes.html/index.html
date: 2011-09-17
title: Vienna CQRS Notes
tags:
- cqrs
- design
- story
---
<p>Vienna Pro.net conference was a lot of fun. I want to share my deepest respects for the organizers and community around for making this such an interesting event. I enjoyed both talking and having some good CQRS Beers afterwards. </p>

<p>I was making 2x45min talk on Practical CQRS after 2x45min talks of Greg Young on CQRS/DDD. Coupled with some really nice latenight CQRS Beer discussions, this created really exciting and fruitful atmosphere at the event. Here are just some notes and lessons learned.</p>

<ul>
<li>During the Copenhagen conference we came out with a nice <a href="http://abdullin.com/journal/2011/5/12/distributed-decide-act-report-model.html">Decide-Report-Act</a> (manufacturing plant) analogy for drawing parallels between real world processes and CQRS designes. It was accepted quite well for the explanation in Vienna. More than that, we figured out the extension of this logical model to explain sagas (even stateless ones). Nothing really new (just a reference to document-based sagas in Greg's talks), but I didn't realize this before.</li>
<li>During slightly more geeky discussion there was a parallel drawn between <a href="http://en.wikipedia.org/wiki/Biological_neural_network">biological neural networks</a> and complex distributed systems (with sagas as well). It gives slighly different viewpoint on the problem.  </li>
<li>Creating presentations works nicely when you use KeyNote for styling and Visio for the diagrams. Here's what I <a href="http://abdullin.com/storage/publish/2011-09-15_Vienna.pdf">made for the talk</a>.</li>
<li>I remain really impressed by my Mac Book Air. It has to go through one more test before being considered "production worthy" - full disk encryption.</li>
<li>Specifications (behavioral tests for <a href="http://abdullin.com/journal/2011/6/26/event-sourcing-a-la-lokad.html">aggregates with event sourcing</a>) turn out to be a really nice linguistic tool for capturing behaviors in code in a non-fragile way. I can almost see how CRISP specifications can make domain development almost as boring as writing view projections. Sagas still remain more complicated topic (some joint calculus is needed).</li>
<li>Political aspect of CQRS was quite interesting to people as well (politics here is just about leveraging cost-efficiency and flexibility of CQRS/Event-centric systems in organization in order to have more options for delivering project successfully or achieving other goals of the company).</li>
<li>I wish I had time to actually show code and really down-to-earth aspects of running CQRS systems. Further improvements - plan talks better, don't loose eye contact with audience by checking up on the presentation plan, more slides and may be even photos from Bali :) </li>
</ul>

<p>Apparently this phrase of mine caused some funny looks from .NET developers: "<em>This project was designed to run on Windows Azure, was developed locally without Azure SDK and deployed to staging in Rackspace Cloud.</em>" If a get a spare bit of time, I'll try to push some work in Lokad.CQRS just to be able to continue the phrase some time later: "<em>oh, and the last deployment went to Linux</em>".</p>

<p>Once again, Vienna was awesome (even though I didn't get to see the city in the daylight :) Thanks to everybody who helped to make it this way.</p>
