---
aliases:
- /journal/2009/5/18/maintenance-and-monitoring-infrastructure-for-the-enterprise.html/index.html
date: 2009-05-18
tags:
- management
- Integration
title: Maintenance and Monitoring Infrastructure for the Enterprise Software Systems
---
<p><em>Enterprise application software systems</em> are about the software that organizations buy or develop to <strong>solve their business specific problems</strong>.</p>

<p>Usually these systems start rather small. However, over the time they tend to grow more and more complex, increasing the number of subsystems involved and developing numerous interactions and synergy effects between them.</p>

<p>For example, a company <em>SmartForce</em> might get started with a simple intranet web site and a database behind it. That's the most common scenario of getting started with an in-house enterprise system, that I've seen. That's the easiest one, too.</p>

<p>As the company evolves, so does the software solving its problems. So over the time complex business rules and long-running workflows might be added to our system of <em>SmartForce</em>. These workflows might involve integrating with the external information systems or scheduling document processing for the nights. End-users might get interested in receiving custom notifications or scheduled tasks along the way. One of the most common implementations for this scenario (I'm generalizing here) is the introduction of automation server(s) to our web site deployment with a database backend.</p>

<p>Then, the complexity of the enterprise software system might increase even further, as project stake-holders decide to introduce rich business functionality, integration with office tools or offline capabilities to the external client applications. This might lead us to Smart Client architecture implementations (whether they are done as desktop or browser-hosted applications). This kind of architectural change, generally requires some sort of the public API to be deployed. External integration scenarios also require such an API.</p>

<p>The overall setup looks slightly more complex already. As if it were not enough, we might eventually get to the point of having multiple API versions to maintain and support (that's what usually happens to any API that is exposed to public).</p>

<p>So the overall enterprise software architecture at this point might look like the one displayed on the picture below.</p>

<p><span class="full-image-block ssNonEditable"><span><img src="/storage/uploads/2009/05/2009-05-18_223555.png?__SQUARESPACE_CACHEVERSION=1242679151594" alt=""/></span></span></p>

<p>Obviously, things might get a lot more complicated, but we are not showing them on the picture in order to keep it small and clear for the next part of the article. Yet, one can clearly imagine that the system might expand in size and complexity due to the following requirements:</p>

<ul>
<li>introducing multiple file storage servers integrated into the system;</li>
<li>handling the traffic spikes by setting up a few API endpoints and web servers;</li>
<li>integrating automated issue reporting and deployment updates into the system;</li>
<li>distributing CPU-intensive tasks between multiple automation servers (or even delegating these tasks to the cloud);</li>
<li>provide additional setups of the entire infrastructure for people from development, QA and marketing to play with.</li>
</ul>

<p>Such an enterprise software system definitely requires some efficient maintenance and health monitoring in order to function properly despite all the problems. </p>

<p>By saying <em>efficient</em> I mean maintenance that does not require having a dedicated team in order detect problems before they happen (that's when fixing them is most cheap), simplifies and speeds up the resolution of issues encountered. </p>

<p><strong>Information is critical</strong> for this kind of maintenance (you have to know all about your patient in order to keep him healthy). We need a deep insight into the system, information on its behavior and its deviations under different conditions (as we all know, <strong>production reality may be quite different from the development</strong> despite all attempts to reproduce real-life stress and behavior profiles in testing scenarios).</p>

<p>For example, we might need to know such basic things as:</p>

<ul>
<li>uptime and failures of subsystems;</li>
<li>CPU and memory consumption on the machines hosting subsystems;</li>
<li>utilization levels of the services and resources that our infrastructure provides;</li>
<li>repository (database) statistics and performance</li>
<li>network latency and response times of the external services;</li>
<li>various exceptions captured and handled (or unhandled, which should be a rather exceptional scenario) within the code, failed sanity checks and warnings from the internal subsystems;</li>
<li>low-level performance indicators in the code-base (i.e.: execution time, counts or loads of various methods, number of database dead-locks encountered and resolved by the reliability layer, custom counters).</li>
</ul>

<p>It is not enough just to capture these indicators. If we want to be efficient we could also:</p>

<ul>
<li>persist indicators in the operations database in order to see how system performance evolves over the time;</li>
<li>present the data in form of real-time reports, making it more easy to spot problems or check the state;</li>
<li>create and receive custom notifications when certain indicators or their aggregations go outside their threshold. For example, system going offline should result in an immediate notification to all involved parties, while slight performance degradation is just worth mentioning in the daily report.</li>
</ul>

<p>Obviously this entire setup has to be implemented in an efficient manner that allows to:</p>

<ul>
<li>change any indicator threshold in minutes;</li>
<li>modify or add report in minutes;</li>
<li>automatically version and deploy all changes.</li>
</ul>

<p>Note, that when providing time estimates, I'm taking into the consideration just the human labor required for the change. Automated deployment processes on their own might take anywhere from 5 minutes and up to 24 hours. This depends on the change propagation policies and processes employed by the specific development infrastructure.</p>

<p>Let's take our previous picture of the enterprise system composition and add maintenance-related subsystems and interactions to the mix. One of the possible results might look like this:</p>

<p><span class="full-image-block ssNonEditable"><span><img src="/storage/uploads/2009/05/2009-05-18_223631.png?__SQUARESPACE_CACHEVERSION=1242679103690" alt=""/></span></span></p>

<p>Basically, at this point we are talking about the <em>infrastructure for performing system-wide maintenance and monitoring related tasks</em>.</p>

<p>This sample design works like this.</p>

<p>Every primary subsystem exposes a standard monitoring API that could be used by the monitoring server to capture information. Internally every subsystem is instrumented with simple performance counters, capturing low-level execution (and failure) information and making it available via the monitoring interface API. </p>

<p>Additionally, you may have your external client applications report exceptions directly to your issue management and monitoring systems.</p>

<p>Maintenance monitor then aggregates all the information, applies any notification and warning rules available (some of these may result in notifications being sent out), runs custom reports and publishes them to the dashboard.</p>

<p>That's not that hard to implement with existing open source tools. And having an ability to check how many seconds on the average does that complex repository call run against production db in real-time scenario - <em>makes you wonder how could you live without such functionality before</em>. <strong>It is like the ReSharper addiction</strong>.</p>

<p>If you couple this kind of statistics with the domain events from the CQRS world, you would be able to answer tricky questions like:</p>

<ul>
<li>What's the average item retrieval speed from mySQL databases? How often do we encounter timeouts and deadlocks?</li>
<li>How many seconds does it take to sync 100k products from SQL Azure database in the same data-center?</li>
<li>What's the average upload speed to Lokad Forecasting API for datasets larger than 10k series, after that API upgrade in the last iteration?</li>
</ul>

<p><a href="http://abdullin.com/journal/2010/7/11/importance-of-tooling-and-statistics-in-cqrs-world.html">More on this topic...</a></p>

<p>By the way, it may seem logical to extend the picture above by adding the maintenance server that would:</p>

<ul>
<li>aggregate information from the monitoring subjects across the infrastructure;</li>
<li><p>match that information with the development and deployment reports in order to provide better OLAP analysis of the infrastructure performance across the:</p>

<ul>
<li><strong>resource consumption growth</strong>: How do our subsystems handle spikes? Do we provide graceful degradation as resource consumption growth (or is it an exponential curve indicating some critical bottleneck that should be handled soon)?</li>
<li><strong>development process</strong>: How do new versions affect the overall performance? Do they improve or degrade it?</li>
</ul></li>
<li><p>Host and run SLA rules to watch for the resource consumption and provision/surrender resources depending on their consumption levels. </p></li>
</ul>

<p>But that's another story, that gets closer to the topic of cloud bursting (aka using cloud computing provider to handle spikes in the resource consumption).</p>

<p>By the way, there is a post showing, how an enterprise overview report might look on an <a href="http://abdullin.com/journal/2010/4/1/ipad-for-enterprise-developer.html">iPad dashboard</a>.</p>

<blockquote>This document is an essential part of <a href="http://abdullin.com/xlim">xLim 3 body of knowledge</a>.</blockquote>

<p><em>What do you think about this post?</em>: </p>

<ul>
<li><em>Do you have monitoring infrastructures in your enterprise application system?</em></li>
<li><em>If <strong>yes</strong>, is your implementation different from the provided simple architecture? What would you like to add to it, if you were able to?</em></li>
<li><em>If <strong>not</strong>, do you think, that it is worth having such an infrastructure?</em></li>
</ul>

