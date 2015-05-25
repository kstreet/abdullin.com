---
aliases:
- /journal/2011/6/6/messages-and-distributed-systems.html/index.html
date: 2011-06-06
tags:
- xLim
- Lokad
- Cloud Computing
- CQRS
title: Messages and Distributed Systems
---
<p>Messages are essential to building robust and distributed systems, so let’s talk a bit about them.</p>

<p><strong>Message</strong> is a named data structure, which can be sent from one distributed component to another. Components can be located on the same machine or on different sides of the Earth.  </p>

<p>The basic real-world example of message is an email. It has a sender, subject and one or more recipients. This email might take some time to reach the designation. Then it gets to the inbox, where it could spend even more time, before recipient finally gets time to read it and may be even reply.</p>

<p>Messages, just like emails, might take some time to reach recipient (it could be really fast but it is not instantaneous), and they could spend some time in the message queues (analogue of inbox), before the receiving side finally manages to get to work on this message.</p>

<p>The primary disadvantage of messages and emails is their asynchronous nature. When we send email or message, we expect the answer some time later, but we can never be sure that we will get it right away. Direct phone calls (or direct method calls) are much better here – once you get the person on the phone, you can talk to him in real time and get results back almost immediately.
Despite all these disadvantages, messages could be better than calls for building distributed and scalable systems.</p>

<p>With phone calls and method calls you:</p>

<ul>
<li>Can get response immediately, once your call is picked up.</li>
<li>Must be calling, while the other side is available (greater distance you have, harder it is to negotiate the call).</li>
<li>More stressed the other side is, more time it will take before your call will be picked up. And this does not guarantee, that you will get the answer (when the other side is really stressed you are likely to get: we are busy right now, call next millennia).</li>
</ul>

<p>With messages you:</p>

<ul>
<li>Can send a message and then get back to your work immediately.</li>
<li>Must organize your work in such a way, that you will not just sit idle waiting for the response.</li>
<li>Can send a message any time, the other side will receive and respond, as soon as it gets to the job.</li>
<li>More stressed the other side is, more time it takes to receive the answer. No matter what the level of stress is, the other side will still be processing messages at its own pace without any real stress.</li>
</ul>

<p>Since we are mostly interested in building distributed and scalable systems (which can handle stress and delays) messages are a better fit for us, than the direct method calls in the majority of the cases. They allow decoupling systems and evenly distributing the load. Besides, it is easy to do with messages such things like: replaying failing messages, saving them for audit purposes, redirecting or balancing between multiple recipients.</p>

<p>Note, that there are cases, where direct calls work better than messaging. For example, querying in-memory cache does not make sense with messaging. Cache is fast and you want to have the response immediately.</p>

<p>For an overview of how messaging works together with a scalable distributed system, check out <a href="http://abdullin.com/journal/2011/5/12/distributed-decide-act-report-model.html">Decide-Act-Report</a> model.</p>

