---
aliases:
- /journal/2012/4/7/birds-eye-view-of-a-distributed-system-context-map.html/index.html
date: 2012-04-07
tags:
- Lokad
- DDD
- CQRS
- Story
title: Bird's-eye view of a Distributed System - Context Map
---
<p>In one of my previous posts on <a href="http://abdullin.com/journal/2012/3/31/anatomy-of-distributed-system-a-la-lokad.html">Anatomy of Distributed System à la Lokad</a> we were zooming into the design of a system that could be built as a part of SaaS company. Such system was built with and around CQRS/ES concepts.</p>

<p><span class="full-image-block ssNonEditable"><span><img src="/storage/uploads/2012/03/2012-03-31_anatomy_2_bc_connected.png" alt=""/></span></span></p>

<p>This approach looks like a nice by-the-book design: bounded contexts that are based on a uniform design and connected together to deliver some functionality. This is the kind of drawing that could be produced by an ivory tower architect or a consultant that is "too expensive to ever touch the codebase".</p>

<p>However as we know, <strong>nothing exists in isolation from the real world</strong>. Every entity (either biological  or digital) is always connected to much larger environment (and is affected by it). In software projects, for instance, you would have other departments to cooperate with, customers to serve and partners to integrate with. You might also have Microsoft and Apple OS to curse about. Even political rivalry between departments A and B in an organization could matter (especially if they share a database).</p>

<p>So there is an immensely <strong>complex and diverse ecosystem that surrounds every single software project</strong>. There are different technologies, languages, concepts, mentalities and resource constraints. These things do not necessarily belong to the project directly, but could have an extremely strong impact on risks and costs, potentially leading to the <strong>difference between success and failure</strong>. Good software developer will always consider the most important of these strategic factors, while making tactical decisions.</p>

<p>One of the ways to take some of these factors into consideration is by changing perspective of your system and by looking from bird's-eye view at it and other systems that it is linked to. Let's <strong>zoom out</strong> of our CQRS/ES-based set of systems in a department (which was discussed in <a href="http://abdullin.com/journal/2012/3/31/anatomy-of-distributed-system-a-la-lokad.html">Anatomy post</a>) and look at a bigger picture. We'll include other departments, some of the customers and partners.</p>

<p>This view will be based on "Context Map" approach of DDD but slightly expanded to cover ecosystem within and around the company. I will keep CQRS/ES-based bounded contexts marked with orange border, while "external" ones will have borders of other colors (just like countries on a map).</p>

<p><span class="full-image-block ssNonEditable"><span><img src="/storage/uploads/2012/04/2012-04-07_context-map-2.png" alt=""/></span></span></p>

<p>Ok, now that's a subtle change. We get a lot more variety in colors and shades, which represent differences:</p>

<ul>
<li>outside elements have technologies and context specifics that differ greatly from ours;</li>
<li>our own elements turn out to have different shades of CQRS/ES implementations as well.</li>
</ul>

<p>In other words, each bounded context is different. These differences can be caused by a huge amount of internal and external factors. For example, consider these two contexts, which happen to be owned by different organizations:</p>

<p><span class="full-image-block ssNonEditable"><span><img src="/storage/uploads/2012/04/2012-04-07_bcs.png" alt=""/></span></span></p>

<p>Obviously, <strong>these differences would make different approaches more or less successful than the others</strong>. And it actually is perfectly OK to have different approaches and technologies living in the same organization or a project, if this is justified by the environment. Unless, of course you are a developer from a Soviet Russia that has to employ absolutely identical set of tools everywhere (i.e. SQL everywhere, NHibernate everywhere, NServiceBus everywhere etc).</p>

<p>A few vivid examples of ignoring the strategic context, while charging into the battle were clearly demonstrated by Napoleon and Hitler. They came over to visit Russia and stayed over for the winter with such extended and fragile supply lines. </p>

<p>So, please, don't repeat mistakes already covered by history books (these are the most shameful ones) and: </p>

<ul>
<li><strong>Take into consideration real world</strong> that surrounds this project, trends and risks that surround in future.</li>
<li>Split your environment into set of bounded contexts, that could be distinguished by similar language, match with organizational boundaries or technology manifestations. <strong>Map the terrain</strong> to make it more understandable.</li>
<li>Before considering to apply CQRS/ES (or any other tech) to a given bounded context - <strong>consider and compare it with other approaches</strong>, their risks and costs.</li>
<li><strong>Delay non-essential decisions</strong> as much as possible.</li>
<li>Push for approaches that allow you to <strong>capture feedback from real life as fast as possible</strong> (lower development friction, faster iterations, simple architectures).</li>
<li><strong>Keep it simple and separated</strong> (KISS).</li>
</ul>

<p>Let me reiterate.</p>

<p>Domain-Driven Design with its approach of bounded contexts that can be joined into a strategic context map - is one of the ways to visualize and represent environment surrounding and affecting a project. This approach can help to take into account all important factors and figure out the tactical details of most implementation, architecture and technology. Sometimes CQRS/ES approach would be the best fit, however more frequently you would have a different set of conditions that require a different solution to the challenge ahead.</p>

<p>Pick your weapons wisely, for they might affect the outcome of the battle and war.</p>

