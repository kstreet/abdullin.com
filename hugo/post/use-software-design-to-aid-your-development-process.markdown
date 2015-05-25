---
aliases:
- /journal/2013/4/11/use-software-design-to-aid-your-development-process.html/index.html
date: 2013-04-11
title: Use Software Design to Aid Your Development Process
tags:
- story
- design
- dev-process
---
<p><strong>Each project is unique and requires different development methodology</strong> (a repeatable process for delivering software aka "whom to blame if deployment breaks and how to avoid it"). At Lokad we adopted a number of different methodologies for different types of projects. </p>

<p>In each specific case the choice was an attempt to balance between:</p>

<ul>
<li>complexity of adding new features;</li>
<li>cost of failure and number of people that can be allocated for testing;</li>
<li>number of developers working together on the project;</li>
<li>required speed of development;</li>
</ul>

<p>It was interesting to see different methodologies (basically just a collection of rules) emerge and evolve, as our understanding of the process grew and project specifics changed.</p>

<p><strong>On one extreme we have relatively rigorous process</strong>, where almost all changes are tested as they go through the scheduled regular releases to Windows Azure. Development teams have multiple developers (even though they can be moving between projects on an hourly basis) and some testing people. This happens for projects where a missed bug could seriously hurt the business.</p>

<p><strong>On the other extreme we have some projects with almost no testing and continuous deployment to Windows Azure</strong>, where each commit to the repository is immediately pushed to the production (web sites are updated and backend services are redeployed). This can be applied to supporting projects, where a bug would be a mere inconvenience.</p>

<p>There are some projects at Lokad which are located somewhere between these extremes (e.g.: somewhat important). During their lifetime, projects can change their location on this scale as well (e.g.: prototype turning into a commercial product or commercial product being discontinued).</p>

<p>In each case, <strong>software design and methodology serve as a powerful enabling factor</strong>, which reduces risks and costs at multiple levels. Here are <strong>some tech-specific examples</strong>:</p>

<ul>
<li>append-only storage (as in event sourcing) significantly reduces risk of loosing data in case of faulty deployment. There is still some risk of getting corrupt data in, but this problem is usually limited by the short time window.</li>
</ul>

<blockquote>
  <p>append-only storage does not mean that data grows indefinitely. It just means that during the normal operation data can only be appended and never erased. </p>
</blockquote>

<ul>
<li><p>by applying basic techniques from object-oriented software programming, messaging and domain-driven design, one can build rather decoupled software that is relatively simple to reason about. Low coupling will lead:</p>

<ul>
<li>reduced risk of cascading failures;</li>
<li>lower cost of development - developers don't step on each others toes while changing code or merging changes;</li>
<li>less expensive teams - if certain portions of the code are rather simple and decoupled, then you don't need a brilliant and expensive development team to handle them;</li>
</ul></li>
<li><p>usage of domain-driven design and event sourcing can simplify data persistence, especially managing it between software upgrades. In the very extreme, software would have either event streams (transaction logs)  schema of which rarely changes or persisted views (cached read models), which can be cleared upon the deployment. This can simplify deployment process to the point of reliable continuous delivery. No fear of irreversibly breaking your database with an SQL upgrade script.</p></li>
<li><p>changes in tech requirements that would otherwise be relatively expensive are now taken for granted (e.g. moving software from on-premises to the cloud or back, scaling out client UI or backend processing). This allows software to evolve such turning points without noticeable spikes in complexity and development effort (which would otherwise require change of development methodologies).</p></li>
</ul>

<p>Having that said, good software design is merely one of the necessary factors required for successful delivery. Good team collaboration, strategic analysis and adequately disciplined development methodology are also good-to-have.</p>
