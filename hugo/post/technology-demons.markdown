---
aliases:
- /journal/2012/6/8/technology-demons.html/index.html
date: 2012-06-08
tags:
- Lokad
title: Technology Demons
---
<p><em>Manuel</em> posted an interesting question to post on <a href="http://abdullin.com/journal/2012/6/5/design-observations-on-big-data-for-retail.html">Design Observations on Big Data for Retail</a>:</p>

<blockquote>
  <p>Ok, but if you delete all of these technologies from your design, what technologies you'll use ? and how you substitute them?</p>
</blockquote>

<p>The answer is two-fold. </p>

<p><strong>First</strong> of all, below a quick list of technologies that I try to <strong>avoid at all costs</strong> in my projects lately. Only when there are strong external forces, I agree to resort to these demons: </p>

<ul>
<li>SQL Databases (instead: plain files and noDB)</li>
<li>NoSQL Databases (instead: plain files and noDB)</li>
<li>DTC and anything that requires it (instead: design eventually consistent systems)</li>
<li>SOAP and XML (instead: binary formats, JSON and text)</li>
<li>Windows Communication Foundation (instead: messaging, HttpListener or sockets via ZeroMQ)</li>
<li>IoC Containers (instead: design systems to avoid all need in IoC Containers)</li>
<li>WPF and desktop apps in general (instead: HTML5 + CSS + javascript)</li>
<li>Windows Workflows Foundation (instead: proper domain-driven design)</li>
<li>anything non-Git for distributed version control (instead: git)</li>
<li>Aspect Oriented Programming with code weaving (instead: design the software properly)</li>
<li>Mocking frameworks (instead: use simple strongly-typed code; <a href="http://thinkbeforecoding.com/post/2012/06/14/Make-it-simpler-%3A-get-rid-of-Mocking-Fx">Jeremie wrote post</a>)</li>
<li>N-tier architectures (instead: shallow systems partitioned along boundaries of <a href="http://abdullin.com/journal/2012/4/14/software-war-starts-with-a-map-context-map.html">bounded contexts</a>)</li>
<li>frameworks like log4net, AutoMapper, ELMAH etc (instead: write a few lines of code tailored for your situation).</li>
</ul>

<p><strong>Second</strong>, I don't hold anything against these technologies (except for the cases where tech is being marketed as silver bullet, but that's what demons in all religions are expected to do anyway). I just happen to believe in value that is gained by designing my systems to be independent of these them. </p>

<p>After all, technology should be relevant to the design only when the core problem absolutely necessitates going into this detail. For example, reducing transfer and storage costs via extreme compression of big data or enabling new business scenarios via elastic scalability in cloud). </p>

<p>If however, we are doing something that is not particularly peculiar, then bringing technology to the table (context map) would just complicate everything. I consider to be non-peculiar cases to be, for example, when you have under 100 transactions per second in a single partition, under a few GB of total data for random reads and a few hundred GBs on top for BLOBs - essentially things that you can have deployed at the cost of a few hundred USD per month (including replication and load-balancing). I believe, vast majority of the business scenarios fit this description pretty well.</p>

<p>Yes, this means that <strong>vast majority of businesses can easily run on a smartphone</strong> (or a cluster of smartphones, if you need continuous replication off-phone)</p>

<p>So, in cases, where tech is not important, why should we couple our designs tightly to the most expensive and complex options among the available ones?</p>

