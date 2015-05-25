---
aliases:
- /journal/2012/1/29/handling-big-data-in-cloud.html/index.html
date: 2012-01-29
tags:
- Azure
- Cloud Computing
title: Handling Big Data in Cloud
---
<p>Big Data is one of the new hype terms that is gradually gaining popularity. No big surprise - amount of data around us is gradually growing and by properly mining it we can get competitive advantage and eventually make more money. Money attracts money. </p>

<p>Usually by term <strong>big data</strong> we mean a <em>collection of datasets that are so large, that they become too hard to be processed on a single machine</em>. This data can even be so big, that it takes hours or days to process it in a data warehouse.</p>

<p>Fortunately, cloud computing comes to the rescue. It provides following resources:</p>

<ul>
<li>nearly unlimited scalable storage capacity for data (i.e. Azure Blob storage or Amazon S3)</li>
<li>elastic compute capacity to process this data (i.e. Azure Worker Roles or Amazon EC)</li>
<li>network capacities and services to transfer data and coordinate processing (queues and actual networks).</li>
</ul>

<p>These resources are elastic (you can get as much as you need) and paid-on-demand. Latter is really important, since you pay only for what you use. </p>

<blockquote>
  <p>I'm assuming here, that in your business model, <strong>more data processed</strong> means <strong>more money</strong> made.</p>
</blockquote>

<p>There are three distinct approaches in handling big data, based on the specific challenges. </p>

<h2>Batch Processing</h2>

<p>First one is about <strong>batch processing</strong>, where you <em>do not need extremely fast computation results</em> but have terabytes and petabytes of data. This is essentially about implementing <a href="http://en.wikipedia.org/wiki/MapReduce">MapReduce</a> functionality in your system, often resorting to hacky but extremely practical tricks. Below I'll talk about some of the lessons learned in this direction in Lokad (we <a href="http://www.lokad.com/forecasting-technology.ashx">provide forecasts</a>  as a service without any hard limit on amount of data to process).</p>

<p>Obviously, storage of this data becomes a primary concern with this approach. Fortunately starting companies can leverage already existing cloud computing resources, starting from <a href="http://arstechnica.com/business/news/2012/01/the-big-disk-drive-in-the-sky-how-the-giants-of-the-web-store-big-data.ars/1">Google's GFS and up to Azure Store</a>. Or if you are big enough (and this is worth it), you can roll a data center of your own. Idem for computing and network capacities.</p>

<h2>Stream Processing</h2>

<p>Second approach deals with cases, where you need <strong>high-throughput</strong> and <strong>consistently low latency</strong> on gigabytes of data. High-frequency trading is one of the most known domains here (various real-world telemetry systems being the second one). Abusing event streams and ring buffers (like in <a href="http://martinfowler.com/articles/lmax.html">LMAX</a>) along with partitioning - helps to deal with the challenge.</p>

<p>Due to latency requirements, cloud computing might be not the best choice for latency-sensitive solutions. It is more efficient to roll out fine-tuned infrastructure of your own including specialized hardware and soft (things like <a href="http://en.wikipedia.org/wiki/InfiniBand">InfiniBand</a> and <a href="http://en.wikipedia.org/wiki/Application-specific_integrated_circuit">ASIC</a> or even Mixed-signal chips).</p>

<p>However if you are OK with a bit of latency and are more interested in high-throughput continuous computation, then the flexible network and CPU resources provided by cloud are a good match.</p>

<h2>Realtime Batch Processing</h2>

<p>Third approach to Big Data involves dealing with more complex requirement - providing <strong>real-time capabilities over vast amounts of data</strong> (so we have to be both fast and capable of handling petabytes of data). Twitter is a vivid example here - it needs to provide (almost) real-time analysis over billions of tweets around the world (although fortunately it does not to go at microsecond level).</p>

<p>This challenge can be solved by actually mixing first two approaches: we would use slower batch-processing for dealing with actual bulk of data (tricks like preprocessing, append-only storage and MapReduce work here), while latest data will be handled through the real-time streams (stream processing and continuous computation). Results are merged as they come out of these two data pipes. Over the course of time (i.e. daily) latest data is pushed from "hot" zone into the bulk data.</p>

<p>More often than not, real-time data processing is done by simplified approximating algorithms that deal with subset of data. Batch processing is more through and precise (at the cost of being slower). By pushing real-time data back to the bulk data, results of the computations are actually corrected, as they are recomputed by batch algorithms. <a href="http://engineering.twitter.com/2011/08/storm-is-coming-more-details-and-plans.html">Twitter's Storm</a> project features nice overview of this approach.</p>

