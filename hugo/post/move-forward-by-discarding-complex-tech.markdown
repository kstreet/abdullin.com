---
aliases:
- /journal/2012/5/5/move-forward-by-discarding-complex-tech.html/index.html
date: 2012-05-05
tags:
- xLim
- Lokad
title: Move Forward by Discarding Complex Tech
---
<p>Good things are either well-forgotten past or a complete rip-off from the nature. It seems that at Lokad we are going all the way back in time ourselves as well.</p>

<p>Over the course of the last few days we had really interesting times at Ufa office, while <strong>migrating entire event replication infrastructure to a new model</strong>. If you wish, you can call this infrastructure as <em>bounded context of digital nervous system</em> that is represented by <a href="http://abdullin.com/journal/2012/4/7/birds-eye-view-of-a-distributed-system-context-map.html">green arrows in our context maps</a>. This is a really interesting place for us, since it "touches" multiple other bounded contexts and actually crosses 2 clouds and 1 additional datacenter deployment-wise. Change shocks are mesmerizing to observe. </p>

<p>Now, instead of a mixture of Azure queue delivery and ZeroMQ streaming, our applications just <strong>push large event streams over hand-made HTTP replication protocol</strong>. This effectively uses HttpListener and WebRequests, which are:</p>

<ul>
<li>rather performant;</li>
<li>dead-simple and well understood;</li>
<li>have minimal friction of introducing replication to new projects (ZeroMQ is pretty invasive here, if you go for Azure);</li>
<li>can be debugged with a lot of HTTP-based tools.</li>
</ul>

<p>The design is rather simple, practical and works well for streams of half a million of events (albeit performance could be improved a lot). This was really important, since we have now a number of bounded contexts to integrate together and the volume of event streams just keeps on growing.</p>

<p>It is curious, how our movement forward towards better and simpler designs happens concurrently with <strong>stepping back from complex technologies to much simpler ones</strong>. In other words, we <strong>gain by discarding things</strong>.</p>

<p>Another example of such behavior is related to our recent decision to <strong>discard ProtoBuf as the storage format for large data objects</strong>, while <strong>replacing ProtoBuf+Gzip with TSV+Gzip</strong>. This applies specifically to <a href="http://abdullin.com/journal/2012/5/2/processing-big-data-in-cloud-a-la-lokad.html">bounded contexts that deal with big data</a>. Reasons for that being:</p>

<ul>
<li>ProtoBuf by default loads all objects directly into the memory at once (imagine a dataset of 1 GB), while the default behavior of text files is streaming;</li>
<li>For numerical data TSV+Gzip compresses better than ProtoBuf+Gzip, since archivers were initially designed and optimized specifically for handling text data;</li>
<li>You can read and parse TSV dataset with tools on any platform, including scripts and Excel. While with protobuf, some intermediate dancing would be required.</li>
</ul>

<p>So, if I can reduce a number of technologies in a given bounded context, while making it more practical and performant, then that's a clear choice.</p>

<p>As you can see, <strong>in certain scenarios</strong>, we are stepping back from cool and smart tech towards something more practical and simple. This "stepping back" actually enables us to solve certain problems that exist in this specific scenario. Surprisingly enough, this brings us closer to the Unix philosophy: </p>

<blockquote>
  <p>Write programs that do one thing and do it well. Write programs to work together. Write programs to handle text streams, because that is a universal interface.</p>
</blockquote>

<p>I certainly didn't expect to see this happening before, not even theoretically. However, <strong>in practice, there is a big difference between theory and practice</strong>.</p>

<h2>Caveats</h2>

<p>Please, keep in mind, that:</p>

<ul>
<li>we are aware of ProtoBuf capability to read items sequentially.</li>
<li>we still will be using ProtoBuf for serializing messages, including events that are used for our event sourcing scenarios (leveraging for .NET development a wonderful library by <a href="http://code.google.com/p/protobuf-net/">Marc Gravell</a>)</li>
<li>these examples just serve the purpose of illustrating possibility of cases, where you can move forward by discarding a technology. Specific decisions might not be applicable directly to your case.</li>
</ul>

