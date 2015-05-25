---
aliases:
- /journal/2010/10/26/my-current-development-environment.html/index.html
date: 2010-10-26
tags:
- xLim
- Lokad
- Cloud Computing
title: My Current Development Environment
---
<p>A few years ago I wrote a blog post about the <a href="http://abdullin.com/journal/2008/1/3/development-software-requirements-for-the-xlim-2-solutions.html">development environment for building xLim 2</a> applications. <a href="http://twitter.com/junto" target="_blank" class="offsite-link-inline">Ben</a> recently uncovered it and asked a question if anything has changed since then. Yes, it did. 2 years are a huge time interval, especially when you try to learn as fast as you can. So let's talk about my <strong>current software environment around the PC workstation</strong> which is mainly used for the development (there also is a notebook for develop-while-you-travel and an iPad for learning and planning, but that's a different story which I'll tell later, if you're interested).</p>

<h2>Side story - what is this xLim?</h2>

<p>For those of you who are still confused with the whole <a href="http://abdullin.com/xlim/">xLim concept</a>, here's how it showed up. </p>

<p>3.5 years ago, while working remotely as a Developer and Team Lead in an American company I got fed up with the absolute lack of progress in the project (it hit hard the complexity barrier) and decided that it should be possible to do better with much fewer resources, than 5-15 developers. <em>Much fewer</em> meant - <em>just one developer</em> or slightly more. </p>

<p>When you have idea, passion and a bravery to follow it (which is sometimes referred as "childish stupidity" by more conservative part of the society), then two things are certain to follow:</p>

<ul>
<li>cool name (xLim standing for eXtensible Lightweight Information Management system);</li>
<li>a bunch of hard lessons and disappointments.</li>
</ul>

<p>So they did show up on the horizon rather soon and were put to a good use. Practical experience was turned into the first "lessons learned" report, which actually opened me the way to the first remote freelance project and even more experience. </p>

<blockquote>
  <p>You can still download the report and associated screenshots from the <a href="http://abdullin.com/xlim/">xLim page</a> (just scroll to the very bottom). </p>
</blockquote>

<p>Lessons were continuously learned (or learnt in GB English) since then and recorded in form of the reports, articles and teaching materials for the Russian teams I happened to manage and train from time to time. Most part of them was republished as articles within the xLim series.</p>

<p>Every time there was a decent paradigm shift in the perception of the problem at hand (and the simplest possible solutions that work in practice), xLim version number was incremented. Every next version incorporated the best of the experience from the previous steps, but reshuffled the whole vision and opened room for new paradigms and further movement forward. Current version is 4 - "xLim 4: CQRS in the Cloud" and I still maintain that you can build and run incredibly rich and beneficial applications without spending a lot of resources or time))</p>

<p>OK, let's get back to the point - how does my development environment look right now, in October 2010, while it matches xLim 4.</p>

<h2>IDE, Required Tools and Libraries</h2>

<ul>
<li>Visual Studio 2010 (mine is Ultimate, but Professional is enough)</li>
<li>Microsoft .NET Framework 4.0 (TPL and Rx for .NET are a must)</li>
<li><a href="http://www.jetbrains.com/resharper/index.html" target="_blank" class="offsite-link-inline">ReSharper 5.1</a> (some things never change, just get better)</li>
<li>NUnit for Unit Testing</li>
<li>Mercurial (TortoiseHg) or Git (TortoiseGit) for version control (as long as this is not CVS, SVN, TFS or SourceSafe).</li>
<li><a href="http://abdullin.com/autofac/" target="_blank" class="offsite-link-inline">Autofac</a> IoC Container</li>
<li><a href="http://code.google.com/p/protobuf-net/" target="_blank" class="offsite-link-inline">Protobuf-net</a> for fast and efficient serialization, implementing custom storage formats.</li>
<li><a href="http://www.asp.net/mvc" target="_blank" class="offsite-link-inline">ASP.NET MVC</a> with <a href="http://mvccontrib.codeplex.com/" target="_blank" class="offsite-link-inline">MvcContrib</a> and a dash of <a href="http://jquery.com/" target="_blank" class="offsite-link-inline">jQuery</a> (completely replaces DXperience in web).</li>
<li><a href="http://www.sqlite.org/" target="_blank" class="offsite-link-inline">SQLite</a> for file-based databases with incredible performance, SQL syntax and schema-tolerance (i.e.: you can put 4MB Blob into INT field).</li>
<li><a href="http://www.red-gate.com/products/reflector/" target="_blank" class="offsite-link-inline">Reflector for .NET</a></li>
<li><a href="http://www.chiark.greenend.org.uk/~sgtatham/putty/" target="_blank" class="offsite-link-inline">Putty SSH client</a>.</li>
<li>Gmail.</li>
<li><a href="http://www.rabbitmq.com/" target="_blank" class="offsite-link-inline">RabbitMQ</a> - preferred message server implementing AMQP (in cases when I don't have to use Azure Queues)</li>
</ul>

<p>As you can see SQLite is the only persistence-focused item in this list. There is no SQL Express, mySQL, Oracle or, NHibernate+FluentNHibernate+LINQ with all libraries it uses. I'm still using them on a daily basis because of the existing projects (or databases we need to integrate with). Plus NHibernate is featured in Lokad.CQRS (as a single library) because that's what people are mostly used to.</p>

<p>However, in my personal mental model (and while evolving projects) ORMs are being rotated out along with the relational databases - with a great success, more flexibility and simplicity. Check out the article on <a href="http://abdullin.com/journal/2010/9/23/command-handlers-without-2pc-and-with-various-levels-of-reli.html">CQRS, Reliability and Redundancy</a>. It may not seem particularly simple in the theory, yet when it gets to the code (backed up by the reasoning), things do get more simple and efficient.</p>

<p>In addition to a few things being removed or replaced, there is a new and critically important piece: <strong>cloud computing</strong>. Virtual Machines from <a href="http://www.rackspacecloud.com/" target="_blank" class="offsite-link-inline">Rackspace Cloud</a> are used frequently. For example, when I need test against some version of DB engine, which I don't want to install on my development machine. That's 1-3 minutes to provision Ubuntu and SSH into it and a few more to apt-get and configure mySQL instance. That's a bit faster than Windows Azure (which takes just half an hour to update Worker Role) which I also happen to use at Lokad.</p>

<p>Obviously, Cloud Computing, as perceived from the point of efficient development, is not just a quick way to get VMs to play with and pay pennies for that. Cloud storage and on-demand computing are actually affecting the whole concept of <a href="http://abdullin.com/xlim/">xLim 4</a> and allow an individual to build systems that could compete with corporations in scalability and flexibility (and still fit within a limited budget). The concept of Almost-infinitely scalable systems (as applied to CQRS) would be much more complex to achieve without cloud computing. Just check out the <a href="http://abdullin.com/journal/2010/10/22/top-10-reasons-to-do-cqrs-in-a-pdf.html">CQRS Roadmap</a> for the better high-level picture.</p>

<h2>Recommended Tools</h2>

<ul>
<li><a href="http://www.launchy.net/" target="_blank" class="offsite-link-inline">Launchy</a> (keystroke launcher that I also configured to open ticket shortcuts in various trackers).</li>
<li><a href="http://www.faststone.org/FSCaptureDetail.htm" target="_blank" class="offsite-link-inline">FSCapture</a> - for making screenshots.</li>
<li><a href="http://www.fiddler2.com/fiddler2/" target="_blank" class="offsite-link-inline">Fiddler2</a> - the best tool to debug these AJAX Calls or REST APIs (esp. when you need to prove to Azure team that their APIs do not behave according to the documentation)</li>
<li><a href="http://www.jetbrains.com/profiler/" target="_blank" class="offsite-link-inline">JetBrains dotTrace profiler</a></li>
<li><a href="http://keepass.info/" target="_blank" class="offsite-link-inline">KeePass Password Safe</a> - for keeping my passwords, logins and sensitive configuration settings.</li>
<li><a href="https://www.jungledisk.com/personal/" target="_blank" class="offsite-link-inline">JungleDisk</a> (Desktop Edition) - for backing up my files into the cloud (in encrypted way) and transparently syncing them between the machines.</li>
<li><a href="http://www.foxitsoftware.com/pdf/reader/" target="_blank" class="offsite-link-inline">FoxitReader</a> - because Adobe PDF reader is an overkill.</li>
<li><a href="http://www.evernote.com/" target="_blank" class="offsite-link-inline">Evernote</a> - to gather small notes, articles and reference materials.</li>
<li><a href="http://www.7-zip.org/" target="_blank" class="offsite-link-inline">7-Zip</a> - the Archive Manager</li>
<li>Windows 7 64 bit - the best operating system that works with Visual Studio 2010.</li>
<li><a href="http://submain.com/products/ghostdoc.aspx" target="_blank" class="offsite-link-inline">GhostDoc</a> - VisualStudio Add-in for generating XML documentation stubs.</li>
</ul>

<p>Please note, that a few of these items create additional value outside my development machine. For example, Evernote and Jungle Disk frictionlessly sync important information between my development PC, travel notebook and an iPad.</p>

<h2>Development Environment Collaboration</h2>

<p>Strict development environment requirements from xLim 2 are getting obsolete. With the cloud and SaaS services available you can rent various wikis, issue trackers and version control repositories at rather competitive rates or even for free (for smaller projects). For everything else there is a cloud. Open source projects benefit significantly from offers like: <a href="http://code.google.com/hosting/" target="_blank" class="offsite-link-inline">Google Projects</a> and <a href="https://sites.google.com/" target="_blank" class="offsite-link-inline">Google Sites</a>.</p>

<p>At Lokad we are currently using <a href="http://www.codebasehq.com/" target="_blank" class="offsite-link-inline">CodebaseHQ</a> (Mercurial hosting + issue tracker), Google Sites and self-hosted <a href="http://confluence.public.thoughtworks.org/display/CCNET/Welcome+to+CruiseControl.NET" target="_blank" class="offsite-link-inline">CruiseControl.NET</a> (yes, this one is antique but it still does the job and even handles a bit of misuse by Lokad R&amp;D)</p>

<p>In short, you can get yourself rather flexible development environment for the distributed teams either for free or at the cost of a few dollars per month.</p>

<p>Just add Skype to it.</p>

<h2>Reference Materials</h2>

<p><a href="/tags/cqrs/">CQRS section</a> aggregates various references specific to the architectural approaches of the current xLim version (and all the solutions I'm building).</p>

<p>As for the pre-architecture requirements of xLim 4 (development practices, recommended reading, design guidelines, low-level building blocks and producing decent code etc) - that will be a rather long story to tell within this post (or probably even series). For references I just recommend to look through previous versions of xLim, discarding everything that does not fit into the CQRS approaches or does not scale in the cloud.</p>

<p>NB: Composite application approach still holds, but all these Enterprise Application blogs or universal frameworks just do not work out. You can rapidly develop various Client applications on top of CQRS without any need for the complexity.</p>

<h2>Hardware</h2>

<p>Actual hardware is nothing special these days and hasn't been upgraded for a year. Yet it works for me (especially when compared with more painful configs). Let's start with the most important things:</p>

<ul>
<li><strong>important!</strong> <a href="http://www.microsoft.com/hardware/mouseandkeyboard/productdetails.aspx?pid=043" target="_blank" class="offsite-link-inline">Microsoft Natural Ergonomic Keyboard 4000</a> (after more than 10 years of coding my wrists are quite touchy about keyboards and eventually <a href="http://en.wikipedia.org/wiki/Carpal_tunnel_syndrome" target="_blank" class="offsite-link-inline">start burning</a> on any other keyboard)</li>
<li><strong>important!</strong> <a href="http://www.microsoft.com/hardware/mouseandkeyboard/productdetails.aspx?pid=086" target="_blank" class="offsite-link-inline">Microsoft Natural Wireless Laser Mouse 6000</a> (same reasons as the keyboard, although I would try to get one of Logitech's Trackballs these days).</li>
<li><strong>important!</strong> Ergonomic chair designed for workers-of-the-keyboard (I picked one at the local store)</li>
<li><strong>important!</strong> Two decent wide-screen LCD monitors. And they are better to be connected to DVI/HDMI ports (ATI Radeon HD 4800 in my case), unless you want your eyes to be hurting by the end of the day.</li>
</ul>

<p>Less important stuff:</p>

<ul>
<li>Intel Core 2 Quad CPU Q6700 @ 2.67 (would use i7 these days)</li>
<li>8 GB of RAM</li>
<li>RAID 0 HD Setup for faster disk IO over the OS and project files (would use SSD these days)</li>
<li>Decent power box to supply tower with all this hardware.</li>
</ul>

<p>Note, that I am not doing any over-clocking to "get the bang out of the buck". It is just not worth it.</p>

<h2>Tools For the Project Manager</h2>

<ul>
<li>Microsoft Office 2010 (Word, Excel, Powerpoint)</li>
<li>Microsoft Visio 2010 - for creating all these nice diagrams you see in my blog.</li>
</ul>

<p>As you can see we've lost MindManager, MS Project, NDepend and Source Monitor from our list. Complex management software is no longer needed (at least personally for me) due to work in environment that rapidly changes and sometimes requires new feature to be designed, implemented, deployed and stabilized within 1-5 days. </p>

<p>At such pace well-thought projects become obsolete really fast (the next few days) and become just a waste of time. Instead, Amazon.com development style starts working better and better. <a href="http://en.wikipedia.org/wiki/Getting_Things_Done" target="_blank" class="offsite-link-inline">Getting Things Done</a> methodology, priority lists and OmniFocus (which unfortunately runs only on iPad or Mac) help to stay sane and keep all things under control even when there are multiple projects running concurrently with multiple tasks that have volatile priorities.</p>

<p>Word, Visio and <a href="http://en.wikipedia.org/wiki/Moleskine" target="_blank" class="offsite-link-inline">Moleskine</a> help to do the actual planning, brainstorming and architecture design.</p>

<h2>Summary</h2>

<p>Now, locking back at changes within these couple of years I can clearly see reduced dependency on the libraries, frameworks or specific tools (aside from the Visual Studio + ReSharper). There's a clear tendency of getting rid of the relational databases and layers of persistence and using more capabilities offered by the cloud. Projects get smarter, more reliable and efficient not because of the building blocks used, but because of a lot of theory being put into them and simplicity enforced at all levels. </p>

<blockquote>
  <p>Actually I believe simplicity to be the hardest target to arrive at. It easy to develop a complex solution. It's much harder to develop solution that achieves the same but in a more simple and straightforward way. This at least requires some experience and I feel like standing at the beginning of the road towards this experience.</p>
</blockquote>

<p>Despite these changes I still maintain that a single developer with limited resources can build and manage rather interesting solutions; especially if he uses these resources efficiently, keeps everything simple and thinks a lot before doing anything (obviously now the term "interesting solution" means a bit more, than 3 years ago).</p>

