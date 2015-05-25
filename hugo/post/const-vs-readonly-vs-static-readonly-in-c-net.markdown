---
aliases:
- /journal/2008/10/22/const-vs-readonly-vs-static-readonly-in-c-net.html/index.html
date: 2008-10-22
tags:
- C#
title: Const vs. readonly vs. static readonly in C# .NET
---
<p>Here are the differences between C# .NET <em>const</em>, <em>readonly</em> and <em>static readonly</em> fields.</p>

<p><strong>Constants</strong>:</p>

<ul>
<li>Static by default </li>
<li>Must have compilation-time value (i.e.: you can have "A"+"B" but cannot have method calls)</li>
<li>Can be used in attributes</li>
<li>Are copied into every assembly that uses them (every assembly gets a local copy of values)</li>
<li>Could be declared within functions</li>
<li>The compiler performs some optimization by not declaring any stack space for the field</li>
</ul>

<p><strong>Readonly instance fields</strong>:</p>

<ul>
<li>Are evaluated when instance is created</li>
<li>Must have set value by the time constructor exits</li>
</ul>

<p><strong>Static readonly fields</strong>:</p>

<ul>
<li>Are evaluated when code execution hits class reference (i.e.: new instance is created or static method is executed)</li>
<li>Must have evaluated value by the time static constructor is done</li>
<li>You really do not want to put ThreadStaticAttribute on these (since static constructor will be executed in one thread only and it will set value for its thread; all other threads will have this value uninitialized)</li>
</ul>

<p>Class that has only constant or readonly instance fields is considered to be prepared for the <a href="http://en.wikipedia.org/wiki/Concurrent_systems" rel="external nofollow">concurrency</a> challenges of parallel computing, since it has no mutable state.</p>

<p>BTW, there is a simple unit-test to <a href="/journal/2008/10/14/writing-net-code-analysis-rules-as-unit-tests.html">enforce that your classes are immutable</a>. </p>

<p>Additionally you might be interested in <a href="/journal/2008/9/23/some-tips-on-writing-event-handling-code-in-c-net.html">some tips on writing the event-handling code in .NET C#</a> from the <a href="/journal/category/theory">theory</a> category.</p>

