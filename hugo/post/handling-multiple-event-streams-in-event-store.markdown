---
aliases:
- /journal/2011/12/24/handling-multiple-event-streams-in-event-store.html/index.html
date: 2011-12-24
title: Handling Multiple Event Streams in Event Store
tags:
- event-driven
---
<p>Writing and reading 300000 events is fast even in VM running on MacBookAir (as fast as appending ProtoBuf serialized data with SHA1 hash on top). However the problems start, when you get thousands of individual aggregate streams to be written along the way. This keeps me thinking about the potential design options for an event store that could get decent performance even on low-end machines (i.e. these ARM-powered platforms that <a href="http://twitter.com/#!/kellabyte">Kelly Sommers</a> had been playing recently with).</p>

<p>The culprit is that we want to have data reliably on disk as fast as possible. At the same time, we might be pushing thousands of event-sourced Aggregate Roots (AR+ES) to a single event store partition (served by one thread). And we want to keep these AR+ES instances separate. As you probably know, switching between files can reduce performance a bit (unless you are writing directly to disk, although even then would be seek penalty). </p>

<p>The simplest solution is actually dead-simple: "What if we introduce a slight delay between the moment data is persisted on disk and moment it actually is persisted in a separate file"?</p>

<p><span class="full-image-block ssNonEditable"><span><img src="/storage/uploads/2011/12/2011-12-24_event-store-streams.png" alt=""/></span></span></p>

<p>The tricky part might be in reading events back per stream (since we would need to replay them for AR rehydration). One of the solutions is to route them to servicing threads that read individual entity streams. We can afford blocking read queries a little bit, if individual stream has not been updated to reflect the latest data. We can easily figure this out by checking up on absolutely consistent in-memory pointer which is updated by the ring writer (essentially just a dictionary of persisted streams and their latest versions).</p>

<p>Interesting culprit is that we can actually speed up the performance of writer by configuring it (and all the slaves) to persist the main buffer in the memory. In this case, if master fails or crashes - we can always fail-over to one of the slaves (while letting the former master to catch up)</p>
