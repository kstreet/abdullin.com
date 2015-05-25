---
aliases:
- /journal/2012/7/25/behind-the-scenes-of-dddes-project-salescast2.html/index.html
date: 2012-07-25
tags:
- xLim
- Lokad
- Cloud Computing
- DDD
- CQRS
- Domain Event
- Story
title: Behind the Scenes of DDD/ES Project - Salescast2
---
<p>A few posts back I dropped a screenshot of <a href="http://abdullin.com/journal/2012/7/23/structure-of-dddes-solution-in-visual-studio.html">Visual Studio solution structure for the Salescast2</a> of Lokad. Jonathan Oliver (author of <a href="https://github.com/joliver/EventStore/">EventStore</a> and also partner in crime in the <a href="http://distributedpodcast.com/">distributed podcast</a>) immediately left following comment:</p>

<blockquote>
  <p>Ouch! That's a lot of projects. Granted, it's not as many as NServiceBus, but the pain in .NET land I'm feeling right now comes from compile times and JIT startup times on anything over 3-4 projects. </p>
</blockquote>

<p>I personally, I wouldn't consider Salescast2 solution to be really large, given what this baby can do. So let's do a quick tour, shall we?</p>

<p><strong>Salescast2 is a platform</strong> for pulling diverse sales data from retail networks (lots of it), performing some rather smart data processing (that's what we specialize in at Lokad), producing business intelligence reports and passing resulting reports back.</p>

<blockquote>
  <p>Here's a <a href="http://cqrsguide.com/case:lokad-salescast">case study</a> and <a href="http://www.lokad.com/salescast-sales-forecasting-software.ashx">product page</a> about the previous version of this platform.</p>
</blockquote>

<p>This sounds like something simple, so far. However, there is more. We pull data either via custom adapters or rather flexible database schema which could be located on Oracle, mySQL, MS SQL or PostgreSQL server. Each of these databases can have not only rather different setup (e.g. different columns for inventory products), but also different performance. For instance compare clustered Oracle setup versus some tiny mySQL database running in a shared environment. Obviously, Salescast2 should be able to <strong>automatically identify type of the database, it's configuration and performance capabilities, adjusting to all that</strong>. There are a lot of things that can go wrong. Some of these are critical (products table does not exist), while some are less important (exports table exists but is not writeable). <strong>Problems should be handled automatically if possible</strong>, exposing helpful information about the nature of information if something goes wrong. Printing exception stack is not enough.</p>

<p><span class="full-image-block ssNonEditable"><span><img src="/storage/uploads/2012/07/2012-07-25_222430.png?__SQUARESPACE_CACHEVERSION=1343235563815" alt=""/></span></span></p>

<p>Solving all these problems was achieved via use of <strong>Event Sourcing applied to Domain-Driven Design</strong>. Granted, it was not easy, but fortunately we had our domain model established in the first version. Server-side functionality for all that is hosted in 5 projects:</p>

<ul>
<li><strong>Contracts</strong> - message and persistence contracts, language of our system;</li>
<li><strong>Domain.BC</strong> - actual code that coordinates everything, starting from discovering projects and up to generating excel reports;</li>
<li><strong>Adapter.BC</strong> - messy code of SQL integration;</li>
<li><strong>Wires</strong> - some infrastructure-level implementations (e.g. sending emails or persisting documents);</li>
<li><strong>Worker</strong> - console to run app server locally, it also acts as a worker role that can run on Windows Azure cloud.</li>
</ul>

<p>That's it. <strong>This is the only project-specific code of the application server that runs the system</strong>. All the rest is less important.</p>

<p>However database integration is only part of the big picture. <strong>This server code does much more</strong>. We also need to aggregate data, clean it up, run some analysis, calculate some formulas, start even more complex process of forecasting, retreive results, run additional formulas, arrange available data and skip missing bits, producing nice Excel reports or exporting data back to customer's database.</p>

<p>Fortunately, during this process we don't need to deal with the most complicated part of analytics (producing classical and quantile forecasts). This aspect (and <a href="http://www.lokad.com/forecasting-technology.ashx">core of our technology</a>) is handled by a separate set of systems.</p>

<p>Still, while doing all these calculations, we need to handle relatively <strong>big data</strong>. 300k products and 80m sales entries were an initial target for a single project (customer can have any number of projects). AFAIK, that's more than 500MB of data if stored in compressed format.</p>

<p>We achieved that, and also done a bit more: </p>

<ul>
<li>This dataset can be processed on a single thread on a laptop under one hour (old version used to require day and a large server), obviously in production we can use as many threads as we need.</li>
<li>data processing (e.g. map reduce) use efficient streaming operations that require rather small amount of memory.</li>
<li>entire system can natively run either on a file system without ANY external dependences except .NET (xcopy deployment is fine) or it can be deployed to Windows Azure, using efficiently it's capabilities.</li>
</ul>

<blockquote>
  <p>One of the reasons behind that is - SQL server and especially Microsoft Azure Stack is horribly slow on my tiny Mac Book Air, which has to run a bunch of Visual Studios in a VM with 1.5GB of RAM. So they had to go, in order to provide comfortable development experience. Nobody regrets the decision.</p>
</blockquote>

<p>In order to achieve that, we used some of the old storage abstractions from Lokad.CQRS and also enhanced them with a few new ones (to be ported to open source).</p>

<p>Obviously, this is still just a tip of the iceberg. This server, in addition to pure processing and business logic, also hosts some code for Web UI projects, providing denormalized read models (views), which are convenient to bind to ASP.NET MVC views. This server tracks any changes in it's own code and rebuilds views automatically, should it be required. It also accepts commands from various clients and provides additional integration capabilities with 2 more systems.</p>

<p>These Web UI clients on their own are quite simple (since all complicated logic is done on the app server). They add a few more projects to the solution:</p>

<ul>
<li><strong>Admin.BC</strong> - projections and read models for the Admin UI</li>
<li><strong>Admin.Web</strong> - Admin UI with ASP.NET MVC</li>
<li><strong>Client.BC</strong> and Client.Web - idem for Client UI</li>
</ul>

<p><span class="full-image-block ssNonEditable"><span><img src="/storage/uploads/2012/07/2012-07-25_233806.png?__SQUARESPACE_CACHEVERSION=1343237984281" alt=""/></span></span></p>

<p>Both Web UI projects, obviously, display relatively nicely both on desktop browsers and on mobile devices. Albeit, UI Design itself is not as nice as it could've been (if it'll be worth it - we could just hire a PHP or Ruby team to redo that UI in a few weeks).</p>

<p>Rest of the projects in this solution is just support:</p>

<ul>
<li><strong>Cqrs.Portable</strong> and <strong>Cqrs.Azure</strong> - copies of Lokad.CQRS source code to provide actual infrastructure capable of doing big data, cloud integration and all the other things;</li>
<li><strong>Dsl</strong> - helper util to generate command and event <a href="http://abdullin.com/journal/2012/7/25/improved-dsl-syntax-for-ddd-and-event-sourcing.html">classes on-the-fly</a>;</li>
<li><strong>Admin.Deploy</strong>, <strong>Worker.Deploy</strong>, <strong>Client.Deploy</strong> - just deployment projects for Azure</li>
<li><strong>Audit</strong> - a copy of event stream viewer from Lokad.CQRS</li>
<li>a bunch of test projects (not enough).</li>
</ul>

<p>Obviously, there is a bit more:</p>

<ul>
<li>Capability for zero downtime upgrades;</li>
<li>Capability for immediate backup and replication of data (event streams make it easy);</li>
<li>Almost-infinite scalability (processing partitioning is dead-easy here and storage is partitioned by default);</li>
<li>Low-friction evolution - it is easy to add new behaviors or functionality to application server; UI changes are never a problem - server will rebuild the views as needed (and all queries take just one round-trip to Azure storage);</li>
<li>Any server-side failure can be easily reproduced most of the time, including complete state of the corresponding business object at that moment;</li>
<li>Writing and evolving long-running business processes is marginally more complex than dealing with projections (and these are handled automatically);</li>
<li>Ability for fail-over between the clouds and availability zones (read-only mode and full functionality). That was something I really missed for Salescast on February 29th.</li>
</ul>

<p>So, all in all, I think this big-data BI platform has some decent capabilities packed in a rather small and simple project (even though it includes it's own infrastructure and tooling in source code). As you probably already know, we hate friction and unnecessary complexity at <a href="http://www.lokad.com/">Lokad</a>.</p>

<p>Knowledge and experience learned during it's development was pushed in A+ES chapter in <a href="http://my.safaribooksonline.com/9780133039900">Vaughn's IDDD book</a> (chapter is still not visible on Safar, yet), <a href="https://github.com/Lokad/lokad-iddd-sample">Lokad IDDD Sample</a> and is being used to gradually improve <a href="http://lokad.github.com/lokad-cqrs/">Lokad DDD/ES Sample Project</a>.</p>

<p>So far I'm pretty happy with how this little project went (it will be released to public soon). Massive kudos, respects and thanks to <a href="http://www.lokad.com/aboutus.ashx">Lokad team</a> for pushing effort in this direction. Plus all the people behind CQRS/DDD and ES communities.</p>

<p>What to do next?</p>

<ul>
<li><strong>If you are developer interested in this technology</strong> - please feel free to do what you want with the materials from this blog on Salescast or source code from any of Lokad Sample Projects (no stupid restrictions apply). We'll be updating in the upcoming months to share some more code and practices. Don't hesitate to ask questions and share problems. Hopefully this little bit of sharing could help you to move forward personally.</li>
<li>If you are an <strong>existing customer or developer with some Lokad-specific questions</strong> - please don't hesitate to drop me an email. I'm especially interested in cases, when some stupid big-data query takes hours to compute or when you need to budget millions of euros just to store and process your data. The latter is a huge waste of resources, you know (probably it all fits on a single laptop or even a smartphone).</li>
<li>If you are a <strong>Lokad team member</strong> - we're just getting started :)</li>
</ul>

<p>By the way, do you know what was the most difficult part along this journey? There were two problems:</p>

<ul>
<li>Actually understanding what this product really has to do and how (Domain-driven design helped here);</li>
<li>Stepping away from all these widely-accepted technologies, practices, databases and service buses; then unlearning them and doing something much simpler.</li>
</ul>

<p>This journey was clearly worth all the effort. And if I can do a single one thing, <strong>I would like you to encourage you to try a similar one</strong>. This does not need to be same stack or set of approaches, but just exploring new directions and sharing results. On such journey not only can you find something new for yourself, but you can also serve the greater good of helping to push forward the community. That's how we all learn, move forward and push the state of the art together.</p>

