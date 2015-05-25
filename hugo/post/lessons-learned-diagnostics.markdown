---
aliases:
- /journal/2007/7/8/lessons-learned-diagnostics.html/index.html
date: 2007-07-08
title: Lessons Learned - Diagnostics
tags:
- dev-process
- testing
---
<p>Bigger the projects are is, harder it is to make sure that everything is running smoothly and there are no unknown bugs. This becomes even harder if the software is highly flexible and configurable. One way of dealing with this challenge (in addition to the UnitTests and Continuous Integration) is adding some more run-time diagnostics to software. </p>

<p>For example you could ship some Unit Tests with your product (Kudos to <a href="http://www.ssw.com.au/" target="_blank">SSW</a> for the idea) or run built-in diagnostics.</p>

<p>One of the easy ways for implementing Diagnostics - just sprinkle self-checking code in critical places of the system, and then run every validation (check out the Validation Application Block, for example) method while building the visualization of your system.</p>
