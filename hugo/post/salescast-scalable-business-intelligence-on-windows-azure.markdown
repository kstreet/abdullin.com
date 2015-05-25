---
aliases:
- /journal/2010/5/29/salescast-scalable-business-intelligence-on-windows-azure.html/index.html
date: 2010-05-29
tags:
- Analytics
- Lokad
- Azure
- Cloud Computing
- CQRS
title: Salescast - Scalable Business Intelligence on Windows Azure
---
<p>Yesterday we finally released first version of <a href="http://salescast.lokad.com" target="_blank" class="offsite-link-inline">Salescast</a>. There is an <a href="http://blog.lokad.com/journal/2010/5/28/salescast-sales-forecasting-made-way-easier.html" target="_blank" class="offsite-link-inline">official announcement</a> from Lokad. In this article  we'll talk a bit about <strong>how it was built</strong>, focusing on the <strong>technology, Windows Azure</strong> and what this means to customers in terms of <strong>business value</strong>.</p>

<h2>What does Salescast do?</h2>

<p>This web application offers <em>smart integration between various inventory and sales management solutions and Lokad Forecasting Services</em>. </p>

<p>Basically, if you have some eCommerce shop that you want to run through some analytics and get forecasts on the future sales, Salescast can help out and handle the routine. It will detect your solution, retrieve the data, process and upload it to <a href="http://www.lokad.com/forecasting-technology.ashx" target="_blank" class="offsite-link-inline">Lokad Forecasting Services</a> and assemble the results into nice reports. This decision support comes with some extra integration experience on top of that to automate and streamline the process further:</p>

<ul>
<li>Reduce inventory costs and over-stocks.</li>
<li>Improve customer satisfaction.</li>
<li>Increase overall sales.</li>
<li>Ease relationships with suppliers.</li>
</ul>

<p><span class="full-image-block ssNonEditable"><span><img src="/storage/uploads/2010/05/2010-05-29_salescast.png" alt="Lokad Salescast"/></span></span></p>

<h2>How was it Built?</h2>

<p>Salescast is <strong>running on Windows Azure platform</strong> and was architected to take full advantage of the cloud computing features it provides. For Lokad this meant coming up with the architecture principles, development approaches and frameworks that could allow to leverage all the potential efficiently.</p>

<p><span class="full-image-block ssNonEditable"><span><img src="/storage/uploads/2010/05/2010-05-30_122310.png" alt="Windows Azure Platform"/></span></span></p>

<p>Principles were based on the adaptation of <a href="/tags/cqrs/">CQRS and DDD principles</a> for the Windows Azure, great tools and frameworks that Microsoft provides with it. In order to fill some (temporary) gaps in this ecosystem, custom Enterprise Service Bus for Azure was created.</p>

<p><strong>We are planning to share</strong> experience, technological principles and frameworks with the community, just like it has been done with <a href="http://abdullin.com/shared-libraries/">Lokad Shared Libraries</a>, <a href="http://code.google.com/p/lokad-cloud/" target="_blank" class="offsite-link-inline">Lokad.Cloud</a> and the other projects. For those, who are following <a href="http://abdullin.com/xlim/">xLim line of research and development</a>, this will match with version 4: <em>CQRS in the Cloud</em>.</p>

<p>At the moment, let's focus briefly on the <strong>business value all this technology creates</strong> for the customers.</p>

<h2>Handling any Scale</h2>

<p><strong>Salescast has implicit capabilities of scaling out</strong>. It does not matter, how large is the inventory of customer or history of the sales. Starting from a few hundred products, up to hundreds of thousands and above - Salescast can handle it.</p>

<p>So if you are a large retailer, you don't need to sign a large contract in order to just try how the solution works for your network of warehouses. Neither you need to wait for development teams to scale architecture and procure the hardware resources. </p>

<p>It's all already there, powered by the scalability of CQRS architecture, ESB for Azure and virtually unlimited cloud computing resources of Windows Azure.</p>

<h2>Anticipating the Unexpected</h2>

<p><strong>Salescast can work reliably and incrementally with any data sources.</strong> If sales and inventory management solution is persisted within SQL Azure - great. If it is an eCommerce shop running on mySQL in shared environment that tends to timeout from time to time - we are designed to handle it without stressing the other end. </p>

<p>We understand that <em>unexpected things can happen in the real world</em>. More than 95% of possible problems will be handled automatically and gracefully. If something goes really wrong (i.e.: eCommerce server is changed or firewall rules - changed), then we'll know about the problem, will be able to handle it on case-by-case basis and then continue the process from where it stopped.</p>

<p>Principles of enterprise integration and reliable messaging with ESB on top of Azure Queues help to achieve this.</p>

<h2>Designed for Evolution</h2>

<p><strong>Salescast is designed for evolution.</strong> </p>

<p>We understand, that customers might use rare systems, custom setups or unique in-house solutions. They could need some specific integration functionality in order to handle specific situations. </p>

<p>In order to provide successful integration experience in this context, Salescast will have to evolve and adapt, get smarter. In fact, future evolution of this solution is already built into the architecture and implemented workflows. </p>

<p>For example, if there is some popular eCommerce solution that we didn't think of integrating with, we'll teach Salescast how to handle it, for free. The next customer that attempts to optimize sales managed by a similar solution, will get it auto-detected and integrating instantly. This applies for the new versions and flavors of these systems as well. </p>

<p>Basic principles of efficient development, <a href="http://abdullin.com/wiki/inversion-of-control-ioc.html">Inversion of Control</a>, pluggable architecture and some schema-less persistence helped to achieve this. Domain Driven Design played a significant role here as well.</p>

<h2>Cost-Effective</h2>

<p><strong>Salescast is designed to be cost-effective</strong>. In fact, it's effective to the point of being provided for free. This comes from the savings that are passed to the customers. They are based upon:</p>

<ul>
<li>environment allowing to have efficient and smart development that is fast and does not require large teams;</li>
<li>efficient maintenance that is automated and requires human intervention only in exceptional cases;</li>
<li>elastic scaling out that uses only the resources that are needed;</li>
<li><a href="http://www.microsoft.com/windowsazure/pricing/" target="_blank" class="offsite-link-inline">pricing of the Windows Azure Platform</a> itself.</li>
</ul>

<p>Obviously you still need to pay for the consumption of Lokad Forecasting Services. But their <a href="http://www.lokad.com/pricing.ashx" target="_blank" class="offsite-link-inline">pricing is cost-effective</a>, as well (to the point of being 10x cheaper than any competition). So there are some tangible benefits for the money being spent.</p>

<h2>Secure and Reliable</h2>

<p>Salescast, as a solution, is based on the features provided by the Microsoft Windows Azure Platform. This includes:</p>

<ul>
<li><a href="http://www.microsoft.com/windowsazure/sla/" target="_blank" class="offsite-link-inline">Service Level Agreements</a> for the computing, storage and network capacities.</li>
<li>Hardware reliability of geographic distribution of Microsoft data centers.</li>
<li>Regular software upgrades and prompt security enhancements.</li>
</ul>

<p>Lokad pushes this further:</p>

<ul>
<li>Secure HTTPS connections and industry-grade data encryption.</li>
<li>Redundant data persistence.</li>
<li>Regular backups.</li>
<li>Reliable OpenID authentication.</li>
</ul>

<h2>Summary</h2>

<p>This was a <em>quick technological overview</em> of Salescast solution from Lokad, along with features and benefits it is capable of providing just because it is <a href="http://en.wikipedia.org/wiki/Standing_on_the_shoulders_of_giants" target="_blank" class="offsite-link-inline">standing on the shoulders of giants</a>. Some of these giants are:</p>

<ul>
<li>Windows Azure Platform for Cloud Computing and the ecosystem behind.</li>
<li>Time-proven principles of development and scalable architecture.</li>
<li>Various open source projects and the other knowledge shared by the development community.</li>
</ul>

<p>Lokad will <a href="http://www.lokad.com/developers.ashx" target="_blank" class="offsite-link-inline">continue sharing and contributing back</a> to help make this environment even better.</p>

<p>From this point you can:</p>

<ul>
<li>Check out <a href="http://blog.lokad.com/journal/2010/5/28/salescast-sales-forecasting-made-way-easier.html" target="_blank" class="offsite-link-inline">official public announcement of Salescast</a> and <a href="http://blog.lokad.com/journal/rss.xml" target="_blank" class="offsite-link-inline">subscribe to Lokad company blog</a> to stay tuned in for a company updates.</li>
<li><a href="/atom.xml">Subscribe to the updates</a> of this Journal on Efficient Development</li>
<li>Check out xLim materials to see what is already shared within this <a href="http://abdullin.com/xlim/">body of knowledge on efficient development</a>.</li>
</ul>

<p>I'd also love to hear any comments, thoughts or questions you've got!</p>

