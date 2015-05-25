---
aliases:
- /journal/2008/10/8/hunger-for-the-integration-builds.html/index.html
date: 2008-10-08
tags:
- Integration
title: Hunger for the integration builds
---
<p>I want more different types of integration builds with every passing day.</p>

<p>Every integration build checks for something, that could not be checked within the IDE or another build. Integration builds are especially good in detecting dormant issues that hide between the different sub-solutions of a development project, between internal and external code-bases or in some other integration joint.</p>

<p>Obviously, increasing number of builds will increase the probability that something will break. And this is good, since that means more consistency and stability in the codebase and less dormant issues.</p>

<p>The are constraints, though:</p>

<ul>
<li>Adding too many integration builds, will make the development extremely stable and extremely slow (good for mature projects with the established architecture and logic)</li>
<li>Complex integration builds tend to have higher hardware requirements (exponential growth, as usual)</li>
</ul>

