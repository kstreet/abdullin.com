---
aliases:
- /journal/2013/8/27/how-i-stopped-worrying-and-learned-to-love-the-www-and-unix.html/index.html
date: 2013-08-27
title: How I Stopped Worrying and Learned to Love the WWW and UNIX Way
tags:
- design
- story
---
<p>Lokad provides <a href="http://www.lokad.com/">big data analytics for retail as a service</a>. For a long time, in order to deliver this to our customers, we used to invent new technologies and frameworks to fit our "custom needs". <a href="http://lokad.github.io/">More than 20 public github repositories</a> are still out there, including custom Azure execution framework, ORM and message bus. This was a good journey with a lot of learning about distributed systems, event centric designs and big data processing. There were many challenges, too.</p>

<p>However, eventually we got tired of unnecessary challenges and became lazy ("we" as in "I"). This lead to one simple realisation: <strong>why do we even need to invent so much, if there already exists largest distributed system that we can learn from</strong> and reuse what others built? It is called World Wide Web. Surely, underlying principles might be not as sexy as some brand new "Enterprise stuff" (like AMQP or Azure Service Bus), yet they seem to work. Besides, WWW:</p>

<ul>
<li>has a huge amount of documented experience (more than any "Enterprise" software);</li>
<li>wide variety of tooling;</li>
<li>is frustratingly simple.</li>
</ul>

<p>In my current and limited experience, more we shift our design towards underlying principles of WWW (and away from latest sexy tech), more it feels like a huge relief and falling into the pit of success. </p>

<p>Current project that we are working on in Ufa office (rewrite of business and SaaS backend of Lokad) is nothing like the previous systems. It's composed of relatively small and stand-alone applications which communicate over simple protocols (JSON over HTTP) using constructs aligned with the established domain model. A lot of complex technology is gone.</p>

<p>For example, we ditched use of Azure Queues for communication between various components, replacing that with one-way RPC calls via JSON over HTTP (queueing can be plugged internally). All of a sudden, this:</p>

<ul>
<li><strong>reduces software complexity</strong> (e.g.: your backend server is only accepts one-way commands in JSON over HTTP and publishes events as JSON entities in ATOM feeds);</li>
<li>provides much <strong>better debugging and development experience</strong> (all of a sudden you can use tools like Fiddler or curl to interact and play with your backend server);</li>
<li>allows <strong>scaling writes without complicated message topologies</strong> (just queue up all your one-way HTTP PUT/POST/DELETE requests);</li>
<li>allows <strong>scaling reads by using dead simple force multipliers</strong> like reverse proxies;</li>
<li>actually allows to use more efficiently services provided by Windows Azure while reducing vendor lock-in.</li>
</ul>

<p>In fact, in this project we stopped using all of Azure storage and messaging capabilities, since they are no longer needed. The only thing still used is Azure hosting model: instances of Worker and Web Roles which are managed by Azure fabric and run behind load balancers. However, should there be need it would be easy to move to a different cloud provider or managed hardware.</p>

<p>Here are a few other new cool possibilities that opened:</p>

<ul>
<li>now it's possible to create integration tests for backend API by recording HTTP traffic with Fiddler and then replaying that;</li>
<li>backend API just became self documented and accessible via XML, JSON, SOAP, thanks to ServiceStack;</li>
<li>it's possible to rewrite some component using a completely new technology and nobody would ever notice;</li>
<li>design is suddenly more friendly for things like reactive programming and single-page applications;</li>
<li>it's much easier to deliver features by first implementing contract using hacky approach and then swapping that implementation for a proper code, whenever necessary.</li>
</ul>

<p>Things work out in such a way, as if we were trying to steer closer to <strong>UNIX Philosophy</strong>:</p>

<blockquote>
  <p>This is the Unix philosophy: Write programs that do one thing and do it well. Write programs to work together. Write programs to handle text streams, because that is a universal interface.</p>
</blockquote>

<p>In Unix world, small programs can be composed together to perform more complex tasks, communicating via the pipe or text files. Here's a beautiful example of installing Ruby Version Manager from a terminal:</p>

<pre><code>curl -L https://get.rvm.io | bash
</code></pre>

<p>In case of distributed systems, we can think of <strong>small and focused applications</strong> which <strong>communicate over  simple and human-friendly protocol</strong> (e.g. one-way JSON over HTTP in a RESTful way). If you <strong>align messages of this protocol with the domain model</strong>, like they do in Domain-Driven Design methodology, you'll have something that can <strong>withstand change pretty well</strong>. Keeping these applications really small and focused (like UNIX programs) would allow to reduce cost and friction of changing implementations so much that they could be easily thrown away and rewritten from scratch. Add <strong>immutability</strong> to the list of underlying design principles of these components and suddenly you get nice and <strong>predictable scalability and fault tolerance</strong>.</p>

<p>All of a sudden, my head hurts less.</p>
