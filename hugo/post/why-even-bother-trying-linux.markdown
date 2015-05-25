---
aliases:
- /journal/2011/4/13/why-even-bother-trying-linux.html/index.html
date: 2011-04-13
tags:
- Linux
title: Why Even Bother Trying Linux
---
<p>I've got really <strong>great question</strong> in comments from <em>Alex</em>, when he replied to 
<a href="http://abdullin.com/journal/2011/3/16/linux-setup-tweaks-of-net-developer-with-ssd.html">Linux Setup Tweaks of .NET Developer with SSD</a>. Before I knew, I started typing a reply that actually deserved a short post. Thank you very much for it!</p>

<p>So here's the question:</p>

<blockquote>
  <p>I cannot really understand what you're trying to achieve here. What is the point of installing Linux? Just something new play with? Something to remind you of days when you spent a lot of time making a computer work, as oppose to use it for work? :)</p>
  
  <p>Because all I can see here is a lot of troubles to go through - install Linux, figure out how all the little tasks are done there. You still use Windows for your main tasks - development. You still use VS and .NET. But now you need to create a VM for that. Why not just have your laptop running Win7 with everything setup?</p>
</blockquote>

<p>Alex, it is just about forcing my own mind to learn new concepts and ideas in their native environments. </p>

<p>Microsoft stack is powerful, and I will be sticking to it for the years to come. However, at the same time, this stack might have it's own weaknesses that the other environments do not have (and vice versa). More than that, a lot of ideas, we benefit from on everyday basis in Win7 and .NET, originally come from the other stacks, where they originated. For example, distributed version control systems, IoC containers, unit testing, non-blocking web servers etc. </p>

<p>There could also be the other ideas that didn't make this transition, yet.</p>

<p>By being exposed to non-Win on everyday basis <strong>I'm forced to learn things</strong> that I previously could have neglected due to my ignorance. For example, I'm forced to use terminal, stick to simplicity and rethink my everyday workflows. There are new opportunities as well.</p>

<p><span class="full-image-block ssNonEditable"><span><img src="/storage/uploads/2011/04/2011-04-13-linux-win.png?__SQUARESPACE_CACHEVERSION=1302691728596" alt="Linux + Win"/></span></span></p>

<p>This approach also <strong>simplifies learning some new things</strong> by immensely reducing friction of trying them out. For example Marc Gravell currently mentions a lot using <a href="http://marcgravell.blogspot.com/2011/04/async-redis-await-booksleeve.html" target="_blank" class="offsite-link-inline">Redis with ProtoBuf-net</a> for key value store in <a href="http://stackexchange.com/">StackExchange</a> (which we all know for really efficient StackOverflow). Should I want to give a try to this combination, installing redis is just:</p>

<pre><code>yum install redis
</code></pre>

<p>Not only this affects my take on things, it also <strong>helps to think further in terms of CQRS and cloud architectures</strong>. Being Technology Leader at Lokad, that's the part of my job, to try to think and learn beyond the current "research level" of the company (which is quite bleeding-edge with all this cloud computing stuff in production). Of course, only a few percent of what's learned will get into the production in our projects, but it will be good stuff to further save resources, reduce risks or increase development efficiency: ideas, tricks, architecture simplifications etc. </p>

<p>Please, don't get me wrong. <strong>Mixing operating systems is not a simple thing</strong> and I would not advise it to a developer who just wants to be efficient with his everyday tasks. I still have crashes of VS from time to time. However, this is just like with building cloud and distributed systems - you are forced to build reliable and efficient things out of potentially failing interactions and systems.</p>

<p>Surprising enough, this Linux + Win7 combination, does not slow me down. More than that, aside from providing new ideas, it actually speeds up my everyday work. Partially this could be attributed to:</p>

<ul>
<li>VM flexibility;</li>
<li>Native terminal;</li>
<li>Linux workspaces;</li>
<li>plethora of packages available;</li>
<li>sheer speed of Linux, that does not slow down even when there are a few VS2010 instances with ReSharper.</li>
</ul>

<blockquote>
  <p>And I'm really tempted to give a try some day to CQRS system built in the cloud for the cost of peanuts with RabbitMQ + Redis + RoR + .NET Server on Mono.</p>
</blockquote>

<p>So for me running Linux as a primary OS for Win7 is just about forcing myself to break down the fence of ignorance I might have built during my previous years of focusing on one stack. It's learning, as if I still were in the university.</p>

<p>PS: BTW, if my laptop faces a horrible death, I'll be able to start working on a new one in less than an hour. That's the time needed to install Linux, grab my primary dev VM from backup and fire it up. Or, it could be a MacOS on a new MacBookPro with it's 7+ hours battery life span :)</p>

