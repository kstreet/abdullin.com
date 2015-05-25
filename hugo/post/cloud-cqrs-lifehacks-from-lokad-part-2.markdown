---
aliases:
- /journal/2010/12/12/cloud-cqrs-lifehacks-from-lokad-part-2.html/index.html
date: 2010-12-12
tags:
- xLim
- Lokad
- Azure
- Cloud Computing
- CQRS
title: Cloud CQRS Lifehacks From Lokad - Part 2
---
<p>Let's talk about some more practical lessons learned at Lokad, while running and evolving Cloud CQRS system deployed at Windows Azure.</p>

<p>In the previous <a href="http://abdullin.com/journal/2010/10/2/cqrs-lifehacks-from-lokad-production.html">Cloud CQRS Lifehacks article</a> we've talked about:</p>

<ul>
<li>"Real-time" CQRS Server Debugger</li>
<li>Immediate Email Error Notifications</li>
<li>Detailed Error Logs</li>
<li>Domain Log History</li>
<li>Excel + Domain Log</li>
<li>Exploring your own domain</li>
</ul>

<p>In this article I would like to continue the topic and focus on the recent tricks that helped to improve performance, scaling, stability and development efficiency of our systems.</p>

<h2>Publish Performance Stats in Domain Events</h2>

<p>This is one of the best things I've done recently:</p>

<ul>
<li>Putting as much performance statistics into the domain events as possible (YAGNI does not apply here).</li>
<li>Making these stats <strong>human-readable within the domain log</strong>.</li>
</ul>

<p><span class="full-image-block ssNonEditable"><span><img src="/storage/uploads/2010/12/2010-12-12_domain_event_performance.png" alt="Performance Stats embedded into the Domain Events"/></span></span></p>

<blockquote>
  <p>By the way, note how we are using human-readable translations of digits as well. "5 minutes" might be less precise than "00:05:17.1803", but it surely is much easier to read. This saves a few brain CPU cycles along the way and really helps in the long run.</p>
</blockquote>

<p>These performance stats are available within seconds after being processed in the cloud. They are captured in the code manually via a few simple helper classes (no voodoo magic here):</p>

<pre><code>using (stats.MeasureMs(SyncStat.UploadDatasetPart_UploadMs))
{
    UpsertTimeSeriesParallel(client, task.Dataset, history, false);
}
using (stats.MeasureMs(SyncStat.UploadDatasetPart_CommitMs))
{
    operation.MemorizeDatasetInput(history);
    operation.Commit();
}
</code></pre>

<p>These stats aren't actually human-readable in the real world, since they are encoded with ProtoBuf-net serializer (fastest and most compact .NET binary serializer). However, for the display purposes I'm using Json formatter to make message contents look readable. </p>

<p>This required defining a few custom Json Converters for classes that do not look nice in plain JSON, but this essentially was it.</p>

<h2>Use Consistent Color Coding</h2>

<p>It is really amazing, how a simple color coding can speed up data comprehension by a human brain. In essence visual elements (when they are not excessive) serve as mental hints or some sort of the index; they allow our conscience to skip actual reading and see high-level patterns.</p>

<p>My life became a little bit simpler after color coding was added to the domain log. </p>

<p><span class="full-image-block ssNonEditable"><span><img src="/storage/uploads/2010/12/2010-12-12_color_coding_cqrs_domain_log.png" alt="Color coding CQRS domain log"/></span></span></p>

<p>These colors directly map to the legend from my previous CQRS articles like:</p>

<ul>
<li><a href="http://abdullin.com/journal/2010/9/19/domain-driven-design-event-sourcing-rx-and-marble-diagrams.html">Domain-Driven Design, Event Sourcing, Rx and Marble Diagrams</a></li>
<li><a href="http://abdullin.com/journal/2010/9/26/theory-of-cqrs-command-handlers-sagas-ars-and-event-subscrip.html">Theory of CQRS Command Handlers: Sagas, ARs and Event Subscriptions</a></li>
</ul>

<p>The legend is:</p>

<p><span class="full-image-block ssNonEditable"><span><img src="/storage/uploads/2010/12/2010-12-12_cqrs_color_code_legend.png" alt="CQRS Color code legend"/></span></span></p>

<p>Real-time domain log monitor follows the same pattern as well:
<span class="full-image-block ssNonEditable"><span><img src="/storage/uploads/2010/12/2010-12-12_domain_log_monitor.png" alt="CQRS Domain Log Monitor"/></span></span></p>

<p>Essentially with this approach, I do not need to read names of the commands (and recall their intents) in order to see the bigger picture.</p>

<h2>Optimize Management UI for the Touch</h2>

<p>This was unexpected, but recently I had to do a bit of monitoring via an iPad connected to a work-station via RDP. I don't have a habit of carrying a laptop around on weekends, while iPad is rather lightweight and is usually within the reach.</p>

<p>However, native desktop interfaces are not necessarily a good fit for working with via Tablet devices. All this can add a bit of friction to the experience:</p>

<ul>
<li>context menus;</li>
<li>keyboard shortcuts;</li>
<li>unnecessary text-based controls</li>
<li>blocking operations.</li>
</ul>

<p>You can really feel the friction as you struggle with your own UI on iPad. Natural urge is to reduce this friction in the areas, where you spend a lot of time. Surprisingly enough, while design gets "optimized" for touch interfaces, it also becomes more clear and explicit, serving as an explanation to itself.</p>

<p><span class="full-image-block ssNonEditable"><span><img src="/storage/uploads/2010/12/2010-12-12_cqrs_maintenance_in_lokad.png" alt="CQRS Maintenance in Lokad"/></span></span></p>

<h2>Monitor Stale Messages</h2>

<p>Unexpected things can happen in software systems. In the distributed cloud deployments they always do happen. Actively looking out for them and reacting immediately is the only way to handle the unpredictable.</p>

<p>In addition to reporting poison messages directly to the email inbox, I've recently added another life-saver (as it turns out) feature to our systems. There is a scheduled task that checks all queues every few minutes. When it finds any with stale or delayed messages (essentially messages that were not processed within the designated amount of time) - an email is dispatched to support.</p>

<p><span class="full-image-block ssNonEditable"><span><img src="/storage/uploads/2010/12/2010-12-12_stale_messages.png" alt=""/></span></span></p>

<p>Message can be stale for a number of reasons: full queues, threading issue, deadlock, low performance etc. However, if you know that such issues will be detected and reported fast, a certain amount of peace and tranquility will come to you.</p>

<p>Of course, all these lifehacks are still separate hacks that do not compose a true self-healing and self-tuning <a href="http://abdullin.com/xlim">Cloud CQRS system</a>, but we will get there eventually. Stay tuned!</p>

<p>PS: The next article in the series is: <a href="http://abdullin.com/journal/2010/12/13/helpful-domain-logs-of-cqrs.html">Helpful Domain Logs of CQRS</a>. It takes color-coding idea one step further.</p>

