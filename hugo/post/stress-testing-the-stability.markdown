---
aliases:
- /journal/2008/8/22/stress-testing-the-stability.html/index.html
date: 2008-08-22
title: Stress testing the stability
tags:
- testing
- dev-process
---
<p>You think that your distributed system is stable and ready for the production, do not you?</p>

<p>So did I, before trying out this simple "How to break your distributed system" recipe:</p>

<ul>
<li>Get fresh dataset for your database (it should have the size comparable to the production data, or even larger)</li>
<li>Prepare simple command-line agents that emulate user activity (CRUD actions against different entities). </li>
<li>Take 10-100 of these agents and let them boil in stress mode (1-5 sec. or no delay between actions)</li>
<li>Fire up all distributed automation/processing services that you have in the picture (obviously, in the stress mode, as well)</li>
<li>Optional: continuously stir connectivity to the Database and Application Virtual Machines</li>
<li>Let everything cook for some time</li>
</ul>

<p>My first unhandled exception (it was a deadlock) bubbled up within 30 seconds after firing this whole thing up. And it is really to reproduce this one - you just have to restart everything and wait for a minute or so.</p>

<p>The system would be called relatively stable if it can survive 24h in the stress mode (and validation proves that all the scheduled tasks have been properly completed).</p>
