---
aliases:
- /journal/2012/6/5/design-observations-on-big-data-for-retail.html/index.html
date: 2012-06-05
tags:
- Analytics
- Lokad
- Cloud Computing
- DDD
- CQRS
title: Design Observations on Big Data for Retail
---
<p>Change of technologies and approaches tends to bring a lot of challenges and problems (which eventually turn into "lessons learned"). This is especially true, when you probe paths that are not common.</p>

<blockquote>
  <p>Curiously enough, as Charles de Gaulle once noted, such less common paths are also the ones where you are likely to encounter much less competition.</p>
</blockquote>

<p>At the moment of writing, one of current projects at Lokad is about rewrite of our Salescast product, which is a cloud-based business intelligence platform for retail  (see <a href="http://cqrsguide.com/case:lokad-salescast">tech case study</a>).</p>

<p>This rewrite features <strong>better design which captures core business concepts at a deeper level</strong>. This allows to achieve simpler implementation, better cloud affinity and scalability, while discarding such technologies like IoC Container, SQL and NHibernate ORM.</p>

<blockquote>
  <p>If you are interested in <strong>reasons for discarding</strong> these technologies: SQL - too expensive and complex for dealing with bit data in cloud; ORM - complex and unneeded; IoC Container - I prefer simple designs that don't need it. Obviously such mess as WCF, WWF, Dynamic Proxies, AOP, MSMQ etc - are also something I try to avoid at all costs.</p>
</blockquote>

<p>One of the side effects is that this system <strong>no longer needs complex setups for local development</strong>: message queues, event stores, documents, BLOBs and persistent read models are stored in files. </p>

<p><span class="full-image-block ssNonEditable"><span><img src="/storage/uploads/2012/06/2012-06-05_s2-data.jpg" alt=""/></span></span></p>

<blockquote>
  <p>We are using event sourcing for the behavioral elements of the system, while "big data" number crunching is based on a <a href="http://abdullin.com/journal/2012/5/2/processing-big-data-in-cloud-a-la-lokad.html">different approach</a>.</p>
</blockquote>

<p>This approach has an interesting side effect that I didn't expect.</p>

<p>If anybody in the team discovers a problem in some complex data processing pipe (or any other logic, including business rules, map-reduce step, report generation etc), with exception bubbling up, then in order to <strong>reproduce the exact state of the system on a different machine</strong>: </p>

<ul>
<li>Stop the solution.</li>
<li>Archive data folder and send it to responsible person faulty for the problem (usually me).</li>
<li>Responsible person unarchives data folder and starts the solution.</li>
<li>Exception will bubble up.</li>
</ul>

<p>You see, when exception bubbles up in the development environment, the message still remains in the message queue (as a file in a folder). So when we transfer all data to another machine and start the solution - system will try to pick that same message up and reprocess it. Since all data dependencies are included in the data folder, this will lead to the same exception showing up.</p>

<p>Obviously, production deployment of such system is quite different (using cloud-specific implementations for data storage, messaging and event streams), yet principles would still work. This happens because I mostly store data either in append-only structures (BLOBs for large data and event streams for behavioral domain models) or this data is irrelevant (persistent read models that are automatically rebuilt from event streams).</p>

<blockquote>
  <p>I'm using <a href="http://lokad.github.com/lokad-cqrs/">Lokad.CQRS Sample Project</a> as a baseline for developing this and similar systems.</p>
</blockquote>

<p>Here are a few more technology-specific observations:</p>

<ul>
<li><strong>TSV + GZIP is quite good</strong> for storing large non-structured streams of data in table form and with little effort (plus, you don't need any tools to view and check such data);</li>
<li>When you need decent performance while storing sequences of complex structures with little effort (e.g. sequence of object graphs), then Google Protocol Buffers (prefix-based serialization) offer a fast approach (wrap it with GZIP and SHA1, if there are repetitive strings);</li>
<li>when it is worth a few days to optimize storage and processing of big data to insane levels (e.g.: for permanent storage), then some <strong>custom case-specific serialization and compression algorithm</strong> can do magic (rule of thumb: this might be needed only in 1 or 2 places);</li>
<li><strong>do not optimize till it is really necessary</strong>; quite often you can save massive amount of time by avoiding optimization and simply using a bigger virtual machine on the cloud (which is cheaper);</li>
<li>whenever possible <strong>stream big data through memory</strong>, as opposed to loading huge datasets entirely. You'll be surprised how much data your small machines will be able to process;</li>
</ul>

<p><strong>You don't need expensive licenses and hardware</strong> (e.g. Oracle, IBM, Microsoft setups usually offered by consultants) to store and process thousands of stores with years of sales history. Likewise, you don't need large teams or big budgets to get the thing ready and delivered. A lot of that can be avoided with the <strong>appropriate design</strong>. Especially, if that design factors in not only technological and organizational factors, but also shares affinity with business model of a company.</p>

