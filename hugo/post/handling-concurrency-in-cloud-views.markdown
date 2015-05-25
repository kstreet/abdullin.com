---
aliases:
- /journal/2011/1/24/handling-concurrency-in-cloud-views.html/index.html
date: 2011-01-24
tags:
- xLim
- Azure
- Cloud Computing
title: Handling Concurrency in Cloud Views
---
<blockquote>
  <p>Let's expand on the topic of views in the Cloud Architectures (CQRS) by introducing concurrency handling. This is an update to the <a href="http://abdullin.com/journal/2011/1/19/scalable-and-simple-cqrs-views-in-the-cloud.html">original article on Views</a> (it was changed accordingly) that comes as a response to Olav's question (thanks!)</p>
</blockquote>

<p>How do we handle concurrency conflicts with the views: when the <strong>same view being accessed by more than thread simultaneously</strong>? </p>

<p>Actually we don't care a lot about cases with multiple readers and a single writer at once, since cloud storages providers generally ensure atomicity at this level.</p>

<p>There are two major approaches for handling concurrency while updating views by multiple writers: simplistic and logical.</p>

<p>The <strong>simplest approach</strong> is too keep updates of a single view entity limited to a single thread. For example, you can start with a single worker thread processing all view updates. As your application grows, increasing load and availability requirements, you can split updates of the different view types and entities between different threads and workers. In other words, you will partition views by type and/or view ID. </p>

<blockquote>
  <p>Note, that we don't need to scale out actual view persistence, since it is generally handled by the cloud storage provider, to start with. However, such scaling tends to be limited by the world region (i.e.: North Europe) and we still might need to enable CDN or manually replicate data between multiple cloud centers. This is relatively easy to do just by streaming domain events to these data centers.</p>
</blockquote>

<p>As long as you pass entity ID in message headers (recommended in distributed systems), it will be easy to route domain event messages between different queues/workers.</p>

<blockquote>
  <p>Just a quick clarification of terms. <strong>View Type</strong> is a message contract or the POCO class, while <strong>view entity</strong> is a single instance of this type, as identified and tracked by its unique identity. This identity serves as a primary key used to store and retrieve the actual view data. In the case of singleton views we have a single entity per type.</p>
</blockquote>

<p>Eventually you might encounter the need to allow multiple concurrent threads (whether hosted in a single worker or different ones) to be able to update the same view entity at once. This is where <strong>optimistic concurrency control</strong> comes in. </p>

<p>We just need to modify our view writer implementations to keep track of blob's ETag (analogue of version ID), while downloading it. Then, after executing local update, we upload it back, while passing last known ETag back to the server. Azure Blob Storage (just like any other cloud storage) is aware of this feature and will update view data only if the ETags match. If they don't (somebody else managed to concurrently update our view) - update will fail and we'll get an exception.</p>

<p>This exception will captured by the service bus, which will retry the actual update operation later. If such an update fails more than 4 times at once, this would mean some heavy concurrency issues probably coming from really complex update operations.</p>

<blockquote>
  <p>This article is a part of R&amp;D series on <a href="http://abdullin.com/xlim/">Practical Distributed Architectures and Clouds</a> (aka CQRS in Cloud). You can <a href="/atom.xml" target="_blank" class="offsite-link-inline">subscribe to the news feed</a> to stay tuned for more updates.</p>
</blockquote>

