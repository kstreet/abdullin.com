---
aliases:
- /journal/2012/5/22/dddcqrs-challenge-integrating-distributed-systems.html/index.html
date: 2012-05-22
tags:
- xLim
- Lokad
- Cloud Computing
- DDD
- CQRS
- Story
title: DDD/CQRS Challenge - Integrating Distributed Systems
---
<p>Let's have a look at the relatively simple DDD/CQRS challenge in <strong>integrating elements of a distributed system</strong> composed of a <em>different bounded contexts</em> and deployed across <em>different hosting environments</em>.</p>

<p>Let's imagine a small Software-as-a-Service company which provides some subscription-based service while charging customers per consumption on pay-as-you-go basis. Software infrastructure of such company could consist of only 3 bounded contexts (a major oversimplification on my part, bigger view might be <a href="http://abdullin.com/journal/2012/4/7/birds-eye-view-of-a-distributed-system-context-map.html">more complicated</a>):</p>

<p><span class="full-image-block ssNonEditable"><span><img src="/storage/uploads/2012/05/2012-05-22_100843.jpg?__SQUARESPACE_CACHEVERSION=1337674187688" alt=""/></span></span></p>

<ul>
<li><p><strong>Subscriptions</strong> - subscription management system, that keeps track of all customers, their active plans, billing information, invoices, monthly service consumption and available login keys. This system is architected as NoSQL solution with event sourcing and is deployed on a dedicated server (with plans to redeploy it to Azure some time later).</p></li>
<li><p><strong>Cloud Services Integration</strong> - massively scalable set of services deployed in Windows Azure (e.g. using some <a href="http://abdullin.com/journal/2012/5/2/processing-big-data-in-cloud-a-la-lokad.html">big data processing design</a>). Among the other things, these services expose API to 3rd party companies and even products of the same company. This API is secured by user tokens, which are replicated from the subscriptions BC. This project is stable and does not change frequently.</p></li>
<li><p><strong>Product 1</strong> - a new product being delivered by the company. It is developed as a standalone set of systems that enhance user experience, using Cloud API. This product leverages authentication and user management capabilities from "Subscriptions" and interoperates with API.</p></li>
</ul>

<p>Here are some examples of the interactions between these system:</p>

<ul>
<li>If new user is added to the subscriptions, it's auth credentials should be immediately (within 1-2 seconds) replicated to Cloud Services, to enable access via API.</li>
<li>If customer's account is locked out due to balance overdraft, then all related users should be locked out of the API.</li>
<li>When services consumption is detected in the API, it should be within 5 minutes reported to subscriptions portal.</li>
</ul>

<p>Naturally all <strong>these systems have to work independently</strong> in such way, that if one of these is down, the rest will continue doing their part (at the very least by providing read-only UI, at best - doing everything that is not dependent on the other systems). </p>

<p>For example, if subscriptions are down for maintenance or Cloud Services and Product 1 should continue working as they were (all pending changes should be replicated after system comes back online).</p>

<p>Additional constraints:</p>

<ul>
<li>Resulting design (with inherent implications) should be relatively easy to explain to a Junior dev.</li>
<li>It should also be relatively straightforward to deploy and run systems both locally (xcopy deployment of .NET code) and in the cloud.</li>
<li>systems should be able to change independently and rapidly as they follow their individual DDD evolution paths (for example, weekly releases with <a href="http://abdullin.com/journal/2012/4/21/ddd-evolving-business-processes-a-la-lokad.html">new business processes</a> but without breaking any relations).</li>
<li>no more than 3 people per project to develop and maintain it.</li>
</ul>

<p>Note, that we are focusing here only on the integration between the systems. Internal design of each system might affect such integration, but is less relevant in this case. Still it would be nice, if integration patterns shared natural affinity with internal design of each bounded context (this tends to create systems that are more robust and practical).</p>

<p><em>How would you approach this problem?</em></p>

