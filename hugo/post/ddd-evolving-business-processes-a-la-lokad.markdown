---
aliases:
- /journal/2012/4/21/ddd-evolving-business-processes-a-la-lokad.html/index.html
date: 2012-04-21
tags:
- Lokad
- DDD
- CQRS
- Domain Event
- Story
title: DDD - Evolving Business Processes a la Lokad
---
<p>As you already know, there are multiple ways to express any given core business concept in the code via domain modeling (we discussed this topic in <a href="http://abdullin.com/journal/2012/4/17/ddd-from-reality-to-implementation.html">previous article</a>). These ways  usually depend on the architecture style selected for the bounded context, in which we are currently working.</p>

<p>For now, let's focus on one of such domain concepts: <strong>long-running business processes</strong>. </p>

<p>In a cloud-based SaaS company, we could have following business processes (among many other):</p>

<ul>
<li>if invoice has a non-zero amount and was not paid within 15 days, then send customer a reminder.</li>
<li>if customer balance stays below -5EUR for more than 30 days, then issue a lockdown.</li>
<li>if distributed computing process has not finished processing all data batches within 1 hour, then restart it once (except cases, when it was already restarted - then issue a termination alert)</li>
</ul>

<p>As you probably already noticed, these <strong>examples share a few similarities</strong>:</p>

<ul>
<li>they are aware of the passing of time and deal with it;</li>
<li>these processes express rather complex precondition that is based on current state of the system and leads to one or more <code>then</code> outcomes.</li>
</ul>

<p>Let's assume that we are dealing with a distributed system, where information about current state is shared with events. In such case, our business process might resemble a piece from complex event processing and would look this from the logical perspective:</p>

{{% img src="bp-1.jpg" %}} 

<p>How can we implement this "Business Process" box? There are multiple alternatives, depending on the architecture style you have chosen. </p>

<p>For example, you can use a state machine, where each instance of state machine would correspond to a specific process instance that you are tracking. Events would then be used to navigate an instance of the state machine across the nodes. It will also use external timer service to send messages "to future" (where message is put on hold till certain time comes).</p>


{{% img src="bp-st.jpg" %}} 

<p>State machines are good for formalized domains. You can learn more about such approaches in the materials provided by Gregory Young and Udi Dahan.</p>

<p>However, when we are dealing with business processes, that are rich with fuzzy logic, uncertainty and also happen to evolve rapidly, then a more simple solution might be needed. Especially, when you have almost no development time to spare.</p>

<p>What is the most simple solution in case with locking customer balance for overdrafts? For instance, we can project all events to a view, which will <strong>track</strong> all active customers that used our services and went below the threshold at some point. Then our <strong>execution</strong> will be responsible for regularly checking this view and sending "Lockdown" to every customer that had his balance below the threshold for too long.</p>


{{% img src="bp-2.jpg" %}} 

<p>This component would also need to keep in mind that certain customers require special handling and investigation before being locked out, while others can be locked right away. Naturally, these rules will be changing really often.</p>

<p>What is the fastest and most flexible way to implement such component in a rapidly growing and changing environment? </p>


{{% img src="bp-3.jpg" %}} 

<p>You simply wire view to the UI, attach a button to send "lockdown command" and <strong>ask a person</strong> from the business department to <strong>spend half an hour per week processing all late customers</strong>. This will save dev department hours on implementing these complex execution rules, testing them and then changing (as business discovers new corner cases). Essentially we let the rules evolve and change in the environment that shapes them: in the minds of business managers.</p>

<p>In other words, at this point <strong>we avoid large development effort with a little bit of human time</strong>. </p>

<p>Please, keep in mind, that once business processes are established and we have so many cases, that manually processing them takes too much time (that should be a profitable company by then), we can always <strong>rewrite these lockdown rules as a continuously running server-side task</strong> (rules would be mostly established by then). We could still keep the projection and a corresponding view.</p>

<p>At this point we <strong>invest a fixed amount of development to automate a large portion of manual work</strong>.</p>

<p>This gradual evolution of business processes is currently the recommended approach within Lokad.CQRS architecture style for delivery of non-formalized and rapidly changing business rules.</p>

