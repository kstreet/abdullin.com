---
aliases:
- /journal/2010/11/23/contributing-to-open-source-is-so-much-better-than-taking-a.html/index.html
date: 2010-11-23
tags:
- Lokad
title: Contributing To Open Source Is So Much Better Than Taking A Class
---
<p>Let's say you want to really learn cloud computing, unit testing, inversion of control or CQRS. You can either:</p>

<ul>
<li>pay for a course, read some books, do exercises and get a certificate at the end;</li>
<li>participate in an open source project or two in your field, getting real-world practical knowledge and being forever recorded as a contributor; nothing to pay and skills will be up-to-date.</li>
</ul>

<p>Guess which option will score more victory points, when you apply for a job or start building your own ISV startup? <em>My personal biased bet</em> will be on <strong>Open Source</strong>, so let's talk about it.</p>

<blockquote>
  <p>BTW, my many thanks to Muneeb for sending a question on the topic. Also thanks to <a href="http://jonathan-oliver.blogspot.com/" target="_blank" class="offsite-link-inline">Jonathan Oliver</a> for helping to clarify the title.</p>
</blockquote>

<p><strong>Open Source projects</strong> are something we all know about - projects where <em>people collaborate to develop a product, providing it at no cost along with documentation and source code</em>.</p>

<p>In .NET community you probably came across a project like NUnit, Autofac, NAnt or NHibernate. These are open source. Their analogues on the other platforms are usually open source as well. You can get the source codes, build them and run. <strong>Certain restrictions may apply</strong>, depending on the licensing terms. However generally you can do pretty much what you want as long as the credit is given and fair sense is applied.</p>

<p>We can clearly see the commercial benefit of Open Source Software (OSS) in various projects - you don't need to pay licensing costs and usually have faster development model. However, there is much more in OSS!</p>

<p>In my previous post of <a href="http://abdullin.com/journal/2010/11/19/10-steps-to-become-better-net-developer.html">10 Steps To Become Better .NET Developer</a> there was this seemingly simple line:</p>

<blockquote>
  <p>Contribute to Open Source Projects of your choice.</p>
</blockquote>

<p>Actually this was one of the most important items in the self-improvement list. Let's talk how exactly open source projects can help you to become a better developer. </p>

<blockquote>
  <p>If you would like to <strong>recommend a .NET Open Source</strong>, or <strong>need help in finding one</strong> that fits your field of interest - please <strong>read towards the end of the article and leave a comment</strong>.</p>
</blockquote>

<h2>Learn from Open Source</h2>

<p>First of all, you can benefit from the Open Source by just <strong>downloading the source code</strong> and <strong>learning how smart people get things done in software</strong>. I loved reading through and being inspired by <a href="http://nant.sourceforge.net/" target="_blank" class="offsite-link-inline">NAnt</a>, <a href="http://www.jetbrains.com/omea/reader/" target="_blank" class="offsite-link-inline">OmeaReader of JetBrains</a>, <a href="http://developer.mindtouch.com/en" target="_blank" class="offsite-link-inline">MindTouch</a> and <a href="http://structuremap.net/structuremap/index.html" target="_blank" class="offsite-link-inline">StructureMap</a>, when I was just starting with .NET. Such an activity helps to:</p>

<ul>
<li>practically see how people organize code and do all sorts of small things: name classes and variables, throw exceptions, write sanity checks and document code;</li>
<li>learn about testing projects, building and integrating them - this is real-world stuff;</li>
<li>see various ways to organize projects, supply documentation and version dependencies;</li>
<li>practically understand what steps are actually involved in delivering a project.</li>
</ul>

<p>Of course, there are no perfect projects or developers. After checking out a few similar projects you will notice that they tend to have different strengths and focuses. Some might have better codebase, the other - better documentation, third - more efficient development environment and faster feature deliveries.</p>

<p>By comparing them you will see tradeoffs made by people running them. They had to focus on the most important things (in their opinion) while using limited resources at hand. Resources are usually limited by their own free time and motivation. And since the Open Source project is active and being used, you can already say that they were successful in making these choices and executing them. Hence, you can learn a lot.</p>

<p>Besides, if you focus on a set of open source projects in a certain niche, you will be able to <strong>learn the technology and the primary principles</strong> behind. You will practically see the choices and trade-offs being made in the code. </p>

<p><strong>For example</strong>, less than a year ago I knew little about messaging and nothing about service buses. Yet, when there was a need to build a service bus for Windows Azure with a specific set of requirements, it was a rather straightforward process. I simply had to:</p>

<ul>
<li>Learn the theory and read a lot of articles;</li>
<li>Find open source projects dealing with the similar problems (NServiceBus, Mass Transit and Rhino Queues), reading through them;</li>
<li>Start working on <a href="http://code.google.com/p/lokad-cqrs/" target="_blank" class="offsite-link-inline">Lokad.CQRS</a>, while adapting the most important ideas from these projects to the specifics of Windows Azure;</li>
<li>whenever I had a problem at hand, there were already 2-3 options of solving it.</li>
</ul>

<p>The end result is that now I can say a couple of words about using and building service buses in <a href="http://abdullin.com/cloud-computing/">cloud computing</a> environments and on-premises (esp. in <a href="/tags/cqrs/">CQRS architectures</a> and Windows Azure). Plus this brings real business value at Lokad.</p>

<p>As you can see Open Source projects can give you a lot merely by providing real-world something to learn from. However you can gain a lot more by actively participating in them.</p>

<h2>Participate in Open Source</h2>

<p>Participating in Open Source project allows you to:</p>

<ul>
<li>actually practice your development skills: applying design patterns, writing unit tests,  managing complexity and doing all sorts of other things essential for any project;</li>
<li>get feedback on what you do and potentially some helpful guidance - it will come from the people involved in the project and hence having practical experience in the field; this is far more better than spending time in university (for which you will need to pay) and listening to teachers that don't necessarily have up-to-date practical knowledge and experience;</li>
<li>learn and practice things like: issue trackers, wikis, version control systems and change management, integration tests; you will also learn how to use them in order to work with the other people spread all across the globe.</li>
</ul>

<h2>How Can You Get Involved in OSS project?</h2>

<p>First you need to <strong>pick projects in the field that really interests you</strong>. </p>

<blockquote>
  <p>The "really interests" part is extremely important, since personal motivation can make a huge difference between personal endeavor pushed to success and something we just spend time on and eventually put aside.</p>
</blockquote>

<p>Second, you <strong>learn as much as you can about it</strong>:</p>

<ul>
<li>read documentation (and especially the FAQ);</li>
<li>download the source code, try building it and running;</li>
<li>walk through the samples, if there are any;</li>
<li>sometimes other people will blog about the project - google these articles up.</li>
</ul>

<p>Already at this point you probably have some questions or came across an odd behavior. <strong>Share these discoveries</strong>! </p>

<ul>
<li>ask questions in the community;</li>
<li>blog about successful and not-so-successful experience (while doing that - please try to be more professional, than I tend to be, say, when writing about Windows Azure);</li>
<li>try to figure the problems on your own, propose solutions and submit patches.</li>
</ul>

<p>I can already tell you that almost every single open source project (i.e.: .NET framework or tool) would love to have:</p>

<ul>
<li>better documentation and tutorials;</li>
<li>samples;</li>
<li>unit tests and small bug fixes;</li>
<li>small features that some people want but don't have the skills to do;</li>
<li>people using their projects and providing detailed feedback;</li>
</ul>

<p>So you can check out issue trackers (they could also be named as tickets, bugs or feature requests) in a project. They will list problems and feature requests that project owners would love to be done. Yet for some reason they are not done; the reason being - lack of time to do that. So if you step up for the challenge and offer your help - you'll be a hero of the day. If you are just a beginning developer and don't see something you can handle, just go the community and say the words: </p>

<blockquote>
  <p>"Hi, I love your project and would like to contribute. Tickets are too complex for me at the at the moment, but I really want to learn this field. How can I help?". </p>
</blockquote>

<p>I would be surprised if you'll be able to get away with less than few things to do and recommendations. The truth is: owners of these projects run them in their spare time and <strong>will gladly accept any help you can offer</strong>. Besides that, they are passionate about their projects and just love to talk, teach, help and share (how many university teachers do love answering questions on evenings and weekends?). Community members usually are no better either - they just love talking about the project, field and improving it, while doing all sorts of things to make this happen. Since there always are some really smart people out there (with a practical experience), this is way better than your average class for learning, sharing and having some fun.</p>

<p>That's the nature of the open source. So if you would love to learn some practical skills (and understand that universities might just serve some outdated theory), feel free to check OSS out. <strong>For example</strong>, in .NET you can start with:</p>

<ul>
<li>For Inversion of Control: <a href="http://code.google.com/p/autofac/" target="_blank" class="offsite-link-inline">Autofac IoC Container</a> (<a href="http://code.google.com/p/autofac/issues/list" target="_blank" class="offsite-link-inline">22 tasks</a> in the issue tracker) and <a href="http://www.castleproject.org/container/" target="_blank" class="offsite-link-inline">Windsor Container</a> (more than 50 <a href="http://issues.castleproject.org/issues?q=%23unresolved" target="_blank" class="offsite-link-inline">unresolved issues</a>)</li>
<li>For Cloud Computing and Windows Azure: <a href="http://code.google.com/p/lokad-cloud/" target="_blank" class="offsite-link-inline">Lokad.Cloud for Windows Azure</a> (<a href="http://code.google.com/p/lokad-cloud/issues/list" target="_blank" class="offsite-link-inline">23 tasks</a> in the issue tracker)</li>
<li>For Continuous Integration: <a href="http://confluence.public.thoughtworks.org/display/CCNET/Welcome+to+CruiseControl.NET" target="_blank" class="offsite-link-inline">Cruise Control .NET</a> (more than 200 <a href="http://jira.public.thoughtworks.org/browse/CCNET" target="_blank" class="offsite-link-inline">open issues</a>)</li>
<li>For Unit Testing: <a href="https://github.com/acken/AutoTest.Net" target="_blank" class="offsite-link-inline">AutoTest.NET</a> (just <a href="https://github.com/acken/AutoTest.Net/issues" target="_blank" class="offsite-link-inline">3 issues</a>, but they will have more, plus participating there can get you a beta of <a href="http://abdullin.com/journal/2010/11/11/mighty-moose-smart-continuous-unit-tests-for-net-and-mono.html" target="_blank" class="offsite-link-inline">Mighty Moose</a>) or NUnit (38 <a href="https://bugs.launchpad.net/nunit-3.0" target="_blank" class="offsite-link-inline">open bugs</a> in 3.0 version)</li>
<li>For service buses: <a href="http://www.nservicebus.com/" target="_blank" class="offsite-link-inline">NServiceBus</a> and <a href="http://masstransit-project.com/" target="_blank" class="offsite-link-inline">MassTransit</a> </li>
</ul>

<p>NB: <strong>This list is by no means complete</strong>. It just serves the purpose of giving the overall perspective. If you want to <strong>recommend an open source project to participate</strong> or look for one in a specific field - please, <strong>read to the end of the article and leave a comment</strong>.</p>

<blockquote>
  <p>After participating in Open Source projects, you can also take the <strong>next step - start your own</strong>. There are always places in .NET community and outside, where the tooling is less than perfect or there only are expensive options. By taking this step, you will learn an additional set of skills which a lot of companies look for in resumes (we definitely do at <a href="http://www.lokad.com/Careers.ashx" target="_blank" class="offsite-link-inline">Lokad</a>). This will also will provide you with additional background for managing development projects at companies or starting your own business. In fact, an open source project you are passionate about, can become the foundation for the business. But that's a story for another post.</p>
</blockquote>

<h2>Go for it!</h2>

<p>So if you liked what you heard - I encourage you to go and take a closer look at open source projects in the fields you are passionate about. You could learn a lot of practical and inspiring things, get a good line for the resume (actually companies tend to look for active contributors in the open source projects that they rely on) and give something back to the community. The latter will give you this warm fuzzy feeling of doing good stuff and being part of some bigger effort.</p>

<p>I also strongly encourage you to <strong>comment below if you</strong>:</p>

<ul>
<li><strong>look for an open source project</strong> in a specific field with a friendly and welcoming community willing to help you <strong>to learn and contribute back</strong>; please indicate <em>field of study/interest</em>.</li>
<li>run an open source project in some field (or know such projects) that would love to get more help and interest; please indicate <em>focus of the project</em> and give a few <em>samples of how a novice can help</em>. <strong>Contact info would also</strong> help.</li>
</ul>

<p>You can also <strong>retweet this article and share it</strong> with people and communities <strong>to encourage diving into open source projects</strong> (you might have one or two specific ones in your mind already) and getting real-world experience while helping them to move forward. Links for sharing are below. I'll keep this article updated.</p>

<p>PS: As you can see, an innocent-looking item of "Contribute to Open Source Projects of your choice" in <a href="http://abdullin.com/journal/2010/11/19/10-steps-to-become-better-net-developer.html">10 Steps To Become Better .NET Developer</a> turns out to be far more exciting and valuable than it might look on the surface. I'm planning to dive in a few more topics from this list later as well. <a href="/atom.xml" target="_blank" class="offsite-link-inline">Stay tuned</a>!</p>

