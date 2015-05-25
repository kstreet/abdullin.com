---
aliases:
- /journal/2009/4/14/why-is-cloud-computing-important-for-us.html/index.html
date: 2009-04-14
tags:
- Azure
- Cloud Computing
title: Why is Cloud Computing important for us?
---
<blockquote>
  <p>This post is a reply to an extensive <a href="/journal/2009/4/11/cloud-computing-could-windows-azure-catch-up-with-amazon.html#comments">comment  by Sean Kearon</a> to the previous <a href="http://abdullin.com/journal/2009/4/11/cloud-computing-could-windows-azure-catch-up-with-amazon.html">Cloud Computing post</a>.</p>
</blockquote>

<p>I agree that the availability of decent distributed computing resources is not crucial to success. Yet, having opportunity of leveraging <a href="http://abdullin.com/wiki/cloud-computing.html">cloud computing</a> could save a few resources for the customer. And sometimes this is a success factor.</p>

<p>For example, one of my past projects had to be developed in a situation where customer’s resources were extremely constrained. That was actually one of the reasons why I was interested in that project back then – scarce resources can give you plenty of ideas for the highly-efficient project development and delivery.</p>

<p>It was a simple implementation of <a href="/xlim/">xLim</a> approach with modular desktop Smart Client and a web dashboard.</p>

<p>Production version was living fine on a plain web hosting account. We didn’t even need to scale out to multiple hosting accounts (although this option was embedded in the architectural design as a cheap way of expanding capacity). In the end everyday costs for the customer were quite low.</p>

<p>Yet, eventually there was a need for a customer to go to the dedicated server for two reasons: documents data store grew beyond 4Gbs of size (we hit a hosting limitation) and an automation engine had to be introduced. This has obviously raised monthly bill for the customer.</p>

<p>Windows Azure (if it existed in a mature form at the moment) could’ve saved from these unnecessary expenses simply by providing a scalable storage and a worker role on the pay-as-you-go basis.</p>

<p>This kind of expenses optimization is obviously possible in more complex and costly projects (at a larger scale). Although there <strong>always</strong> will be specific situations when it is cheaper and more efficient to invest into owned and hosted computing resources, they do not make it into a high percentage.</p>

<p>One of the points of the cloud computing as a business model is optimization of the expenses. This happens from two sides of the story:</p>

<p><strong>Consumers of the cloud computing services</strong> don’t have to invest into the resources up-front (where resources could be from a dedicated server to a data center) in order to have the capacities and functionality meeting their demands. Neither do they have to over-invest in order to have the capacities meeting their peak demands (i.e.: having these extra few servers in a rack just to handle holiday sales spikes). </p>

<p>Consumers are also saved from the maintenance-related expenses and gain the flexibility of getting rid of the resources, should such a business need arise. Getting rid of a data center is a bit harder. </p>

<p><strong>Providers of the cloud computing</strong> (any large hosting provider with his data own datacenter is a possible candidate for that) could utilize their existing computing resources more efficiently by shifting them into the cloud and linking with flexible pricing strategies.</p>

<p>For example, say, we have a lot of idle CPU cycles scattered around the data center on weekend nights in USA. Would not it be more efficient to sell them for the computing purposes (at a flexible rate) instead of just letting the resource sit around? </p>

<p>This ability to optimize usage of resources at various levels of the picture is one of the primary factors why the cloud computing hype is more than a temporary buzzword (<strong>energy bills</strong> represent the second factor).</p>

<p>Basically one could say that the cloud computing is a development of the virtualization story that could work at a higher level of detalization.</p>

<p><strong>Utility computing</strong>, that allows (or would allow in near future) efficient distributed computing on-demand for CPU-intensive or data-intensive operations, is just one of the extreme examples of the opportunities provided by the idea of cloud computing. It has its benefits but certainly 90% of the companies don’t even need it at the moment. </p>

<p>High entry barrier in front of this technology (especially for .NET scenarios) further lowers its usability.</p>

<p><strong>Hosted development environments</strong> could obviously also be considered as some form of cloud computing that helps to optimize developers' expenses. This market niche is evolving quite fast. </p>

<p>For a $7-$15 per month one could get the following pre-configured setup:</p>

<ul>
<li>Issue Tracker</li>
<li>Version Control System</li>
<li>Wiki and documentation management</li>
</ul>

<p>For $60+ per month one could get a brand new Windows Server 2008 virtual machine that could host all these above and an integration server. </p>

<p><em>Comments, thoughts?</em></p>

<p>If you are interested about development of cloud computing solutions under the .NET stack - <a href="http://abdullin.com/xlim/">check out xLim 4</a>.</p>

<p><strong>Related Posts:</strong> </p>

<ul>
<li><a href="http://abdullin.com/journal/2010/5/4/microsoft-is-reinventing-cqrs-for-windows-azure-but-without.html">Microsoft is Reinventing CQRS for Windows Azure, but without DDD</a></li>
<li><a href="http://abdullin.com/journal/2010/3/23/dddd-cqrs-and-other-enterprise-development-buzz-words.html">DDDD, CQRS and Other Enterprise Development Buzz-words</a></li>
</ul>

