---
aliases:
- /journal/2013/8/8/essay-on-messaging-and-design-patterns.html/index.html
date: 2013-08-08
title: Essay on Messaging and Design Patterns
tags:
- design
---
<blockquote>
  <p>Use messaging to tackle complexity of reactive applications.</p>
</blockquote>

<p>Development ecosystem is a constantly changing battlefield, affected by various forces: software vendors, technological improvements, buzzwords and new ideas. One of recent changes involves transition towards  <a href="http://www.reactivemanifesto.org/">reactive applications</a>.</p>

<blockquote>
  <p>Application requirements have changed dramatically in recent years. Only a few years ago a large application had tens of servers, seconds of response time, hours of offline maintenance and gigabytes of data. Today applications are deployed on everything from mobile devices to cloud-based clusters running thousands of multicore processors. Users expect millisecond response times and 100% uptime. Data needs are expanding into the petabytes.</p>
</blockquote>

<p>Let's explore one of the ways to approach reactive designs. We'll talk about a <strong>specific flavour of in-memory messaging</strong> which is present in open-source software projects like:</p>

<ul>
<li><a href="http://geteventstore.com/">EventStore</a> from <a href="http://goodenoughsoftware.net/">Greg Young</a> and his team.</li>
<li><a href="https://github.com/beingtheworst/btw-gtd">Getting Things Done Task Manager</a> from <a href="http://beingtheworst.com/">BeingTheWorst Podcast</a>.</li>
<li><a href="http://lokad.github.io/lokad-data-platform/">Data Platform Sample</a> from <a href="http://www.lokad.com/aboutus">Lokad</a></li>
</ul>

<p>These systems implement in-memory messaging to tackle complex reactive domains. Benefits are:</p>

<ul>
<li>Break down some application functionality into separate components;</li>
<li>Improving testability of these components and the entire application;</li>
<li>Explicitly expressing and handling time-based concepts, which would be hard to deal with otherwise;</li>
<li>Delivering new features incrementally without disrupting existing codebase;</li>
<li>Simplifying concurrency;</li>
<li>Delivering systems that can degrade gracefully under load, instead of failing completely.</li>
</ul>

<h2>What is Messaging?</h2>

<p><strong>Messages are named data objects designed to capture some concepts and ideas</strong>. In code they could look as simple as that:</p>

<pre><code>public class RegisterCustomer
{
  public string FirstName;
  public string LastName;
  public string Email;
}
</code></pre>

<p>Messaging itself is about design where we send messages between components to drive system in reactive way. This is much like using emails to drive business workflows in a company. Similar to emails, passing messages is non-blocking - we fire message without any expectations about when it will be handled and by whom exactly.</p>

<p>This definition seems to be both obvious and too vague. Understanding "What messaging is?" does not give a slightest clue on how to apply it and gain some benefits. Blindly implementing system where any component could send anything to everybody is likely to end up in a complicated mess. Actually, this happened many times before. Eventually developers started noticing common patterns that were present in successful projects. </p>

<p>These messaging patterns were small, simple and focused enough to be useful and reusable. They helped to structure complicated software and make it understandable for outside developers. Eventually they got catchy names, too. </p>

<h2>Example of Some Messaging Patterns Working Together</h2>

<p>Let's try to gain better understanding of messaging by taking a look at design patterns for messaging used in EventStore, GTD Task Manager and Lokad Data Platform: </p>

<p><img src="/storage/uploads/2013/08/2013-08-08-image1.jpg" alt="2013 08 08 inmemory design" title="2013-08-08-inmemory-design.jpeg" border="0" width="550" height="388" /></p>

<p>Within this specific flavour we can identify distinct building blocks with different roles and capabilities. </p>

<ul>
<li>Queue</li>
<li>Main Controller</li>
<li>Publishing Bus</li>
<li>Subscribing Components</li>
</ul>

<p><strong>Queue</strong> in this diagram is an in-memory message queue aggregating all incoming messages. Messages might potentially come from different threads. Should system be under the load, queue is the place that will hold messages till they can be processed.</p>

<p><strong>Main Controller</strong> - main message handling class that is responsible for taking messages from the queue one by one and reacting to them. It serves as main entry point for messages and system coordinator. </p>

<p>Main controller can sometimes be implemented as a <a href="http://en.wikipedia.org/wiki/Finite-state_machine">finite state machine</a> (FSM) which would handle messages differently in different states. For example, we might discard all external requests while system is in <code>StartingUpState</code> or <code>ShuttingDownState</code> starts up or shuts down, while passing them through to the dedicated handlers in <code>WorkingState</code>.</p>

<p>In this design, even though messages come from different threads, they will be processed by Main Controller on one thread. This is a perfect synchronisation point. Of course, if we find out that certain operations take too much time (e.g. CPU or IO) we could route related messages down to dedicated handlers which would have their own pool of threads.</p>

<p><strong>Bus (publisher)</strong> - maintains a list of subscribers interested in different messages. This list is usually defined at application startup and stays immutable since then. When a new message is passed down from the controller to the bus, it will be immediately (and synchronously) handed over to each subscriber. </p>

<p>For example, if we are implementing event-driven reactive desktop application, various view controllers could be implemented as components that:</p>

<ul>
<li>subscribe to interesting events on the bus;</li>
<li>update their corresponding views in response;</li>
<li>put UI messages back to the main queue when user clicks buttons, enters text or interacts in any other way.</li>
</ul>

<p>This would allow developers to add more features to the system by implementing new controllers (along with the corresponding views) and plugging them in.</p>

<h2>More Messaging Patterns</h2>

<p>There, obviously could be other, more specialised messaging patterns like timeout managers, process managers,  forwarders or reply envelopes. Each comes with a well-defined role and place in the overall design.  </p>

<p><a href="http://www.enterpriseintegrationpatterns.com/">Enterprise Integration Patterns</a> might be a good start for learning more about established terminology and time-proven techniques.</p>
