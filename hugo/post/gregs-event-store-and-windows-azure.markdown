---
aliases:
- /journal/2013/6/17/gregs-event-store-and-windows-azure.html/index.html
date: 2013-06-17
title: Greg's Event Store and Windows Azure
tags:
- azure
---
<h1>About Event Store</h1>

<p>As you probably already know, Greg Young built a file-based <a href="http://geteventstore.com/">Event Store</a> with a team in Ukraine. The product was publicly announced last September and now they are moving towards the second version. Single-node is open source and free to use (and it's a wonderful learning material for C# developers). </p>

<p>If you want to have more failure-tolerance, then multi-node version is available. It uses negotiation protocols to ensure that cluster of Event Store nodes will stay up and keep all the information as long as half of the machines in it are alive (if I recall it properly, they actually use chaos monkey testing to ensure that, among other things).</p>

<p>This store can get you thousands of persisted transactions per second on rather slow notebook. There is a javascript projection host built into this event store (currently it's in beta and hence has to be enabled manually). Alternatively you can define your own chasing projections and connect them to the store.</p>

<p>ES offers HTTP REST API (designed to be scalable for reads using commodity building blocks like reverse proxies) and high-performance TCP API.</p>

<h1>With Windows Azure</h1>

<p>Here's what I currently know about behaviour of Greg's Event Store on Windows Azure (this question seems to be the recurring theme).</p>

<p>Event Store works really closely file system, where the data is kept broken into chunks. Whenever possible these chunks are loaded into unmanaged memory to speed up read operations (which are really cheap). If you want to ensure certain degree of write durability, then these writes will be almost as fast as you can flush to your disk controller. </p>

<p>This setup makes ES really performant, and also prevents it from getting the same level of performance in single-node configurations on Windows Azure. </p>

<p>Single Event Store node can run on Azure in 2 major configurations:</p>

<ol>
<li><p><strong>Data is stored on a local hard-drive</strong>. In this case, writes will be fast (thousands of tx) but there are no guarantees, that data on local drive will not disappear at some points. Local drives can serve only as temporary caches. This scenario is <strong>fast but less reliable</strong>.</p></li>
<li><p><strong>Data is stored on page blob mounted as VHD drive</strong>. In this case writes will be passed to the operating system and then flushed to Windows Azure Blob storage (where they will be replicated between multiple machines). Azure VHDs are guaranteed to stay there, however this comes at a cost (<strong>reliable but slow</strong>): </p>

<ul>
<li>you can expect roughly 125 writes per second to page blob on a single thread (afaik, ES currently needs multiple writes to commit a single transaction, which will yield even less than 125 transactions per seconds).</li>
<li>when EventStore starts up (e.g. after a node is restarted by Fabric Controller), it needs to read from VHD, which can take minutes, during which the store will be unavailable for writes or reads.</li>
</ul></li>
</ol>

<p>Luckily, for small scenarios:</p>

<ul>
<li>Windows Azure does not restart machines that often (how often do you need to roll out Windows update which needs a machine restart?)</li>
<li>You can run Event Store on a Linux machine, which requires even less restarts.</li>
</ul>

<p>Depending on your business case, resulting performance might be enough for your scenario, or more tweaking would be needed. Only measurements will tell.</p>

<h1>Getting Better Performance</h1>

<p>You can theoretically get higher tx write throughput with some crash guarantees by:</p>

<ul>
<li>running event store with a local drive.</li>
<li>adding a small background process which will incrementally copy ES to the blob.</li>
<li>on a startup, before even starting ES, if local drive is empty - grab latest backup of event store from Azure.</li>
</ul>

<p>Alternatively, with a single node scenario, you can try to optimise performance of event store on Azure via enabling host caching for your VHD data disk (it's enabled for durable OS drives, but disabled for additional data drives). </p>

<p>If the business grows, then it also might eventually be beneficial to sign-up for paid version of event store (putting event store data on transient disks in different fault domains). In this case, replication will be managed and guaranteed by Event Store engine. And Windows Azure will try to guarantee that nodes in different fault domains would not go down together.</p>
