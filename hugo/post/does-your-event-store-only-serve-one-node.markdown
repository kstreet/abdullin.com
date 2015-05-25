---
aliases:
- /journal/2013/3/6/does-your-event-store-only-serve-one-node.html/index.html
date: 2013-03-06
tags:
- Lokad
title: Does your event store only serve one node?
---
<p>In reply to the question from Stacy:</p>

<blockquote>
  <p>Does your event store only serve one node type? Or does your event store serve any and all nodes?</p>
</blockquote>

<p>I did it in various ways, since different scenarios might require different deployment strategies. Here are some cases that worked out.</p>

<p><strong>1 event store for multiple subdomains</strong>, hosted within the same worker process. Event Store is hosted in the same worker process as well (with in-memory cache) and accessible via direct calls to application services from these subdomains. Worked nicely.</p>

<p><strong>1 event store per node</strong> for our scalable FTP proxy for Azure project. Each node writes to it's own event store (hosting the engine). Event consumers (if there are any) join events together. Technically, in this case one could have one central event store, accessible by multiple nodes, but I didn't want to bother with complex deployment at this phase of the project. Plus, more dependent servers you have - higher risk of failure and problems.</p>

<p>Multiple distinct applications, hosted in <strong>different nodes, with each of their own event stores</strong>. They can exchange information by sending commands or by pushing views with well-known schema to a well-known location. Event stores are kept private.</p>

<p>So generally I treat event store as something private to the application. In single-node projects - one event store per application, in multi-node environments - one event store per node (or have multiple nodes share the same event store in case of some partitioning and load balancing).</p>

<p>Obviously, this ratio does not involve various replication scenarios (e.g. master-slave), where replicas don't count towards the event store score (they still contain the same information).</p>

