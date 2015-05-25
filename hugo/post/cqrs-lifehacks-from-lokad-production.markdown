---
aliases:
- /journal/2010/10/1/cqrs-lifehacks-from-lokad-production.html/index.html
date: 2010-10-01
tags:
- management
- Lokad
- Integration
- Azure
- Cloud Computing
- CQRS
title: CQRS Lifehacks From Lokad Production
---
<p>So far I've been talking purely about CQRS theory and attempts to settle it down in a logical way for projects of various scalability and reliability requirements. Here's what the recent posts were talking about (check <a href="/tags/cqrs/">CQRS</a> and <a href="http://abdullin.com/xlim/">xLim</a> sections for even older articles): </p>

<ul>
<li><a href="http://abdullin.com/journal/2010/9/10/the-best-way-to-learn-cqrs-ddd-and-event-sourcing.html">The Best Way to Learn CQRS, DDD and Event Sourcing</a></li>
<li><a href="http://abdullin.com/journal/2010/9/17/scenario-based-unit-tests-for-ddd-with-event-sourcing.html">Scenario-based Unit Tests for DDD with Event Sourcing</a></li>
<li><a href="http://abdullin.com/journal/2010/9/19/domain-driven-design-event-sourcing-rx-and-marble-diagrams.html">Domain-Driven Design, Event Sourcing, Rx and Marble Diagrams</a></li>
<li><a href="http://abdullin.com/journal/2010/9/23/command-handlers-without-2pc-and-with-various-levels-of-reli.html">Command Handlers without 2PC and with Various Levels of Reliability</a></li>
<li><a href="http://abdullin.com/journal/2010/9/26/theory-of-cqrs-command-handlers-sagas-ars-and-event-subscrip.html">Theory of CQRS Command Handlers: Sagas, ARs and Event Subscriptions</a></li>
</ul>

<p>Now it's time to <strong>switch back to the real world</strong> and this wonderful thing called production. I've seen a lot of CQRS/DDD/ES theory articles and abstract snippets out there (and attempted to contribute to this myself), but I can't recall any posts describing real-world production systems, their problems, challenges and various life-hacks.</p>

<blockquote>
  <p>By the way, if you know such articles or happen to share your experience, please drop a comment or twit me. I'll be sure to include reference to such material, so that everybody could benefit.</p>
</blockquote>

<p>Real-world systems are rarely pretty, they tend to contain a lot of hacks and miss potentially good improvements. Yet, they are real and they keep on surviving the best test out there - "natural selection" or "survival of the fittest". Theory can only prove itself to be correct by being implemented in such system and surviving long enough to evolve further.</p>

<p>I'll start by sharing a few recent CQRS-oriented development discoveries that helped me a lot on the battle-field within the last two weeks. There will be less of nice diagrams and more of  screenshots exposing ugly UIs that I hack for myself.</p>

<blockquote>
  <p>I'm probably reinventing the wheel here by trying something done already done by the other people. If you have something to add from your experience, please - share in the comments or in your blog. This will benefit the community immensely.</p>
</blockquote>

<h2>"Real-time" CQRS Server Debugger</h2>

<p><span class="full-image-block ssNonEditable"><span><img src="/storage/uploads/2010/10/2010-10-01_194826.jpg" alt="Real-time trace of CQRS system in Windows Azure Cloud"/></span></span></p>

<p>Essentially this is just a mere console that aggregates and gets all messages (events and commands alike) from the production system. </p>

<p>Actual system could be deployed somewhere in the cloud and have access is protected by the HTTPS+DevKey authorization. Since we are reading the past history (with the slight delay) from the cloud persistence (inherently scalable and optimized for reads), this has little impact on the performance (close to none). At the same time it provides almost real-time insight into distributed server-side processes as needed.</p>

<p>Each line is basically a string representation of a single message. Some messages get "ToString()" overloads to make them simpler to read. Other's just print their name.</p>

<pre><code>public override string ToString()
{
  return string.Format("Send mail ('{0}' to {1})", Subject, To);
}
</code></pre>

<p>For those of you that have been working with Windows Azure and using Trace display of the Azure Dev Farbic, this is almost the same experience. But it works with the production deployments in the cloud and I use it a lot more than IntelliTrace in Azure.</p>

<h2>Error Notifications</h2>

<p>One of the crucial differences between ivory-tower theoretical architectures (which might look good in spikes and lab tests) and abused production deployments is the simple fact: <strong>unexpected problems happen in real world</strong>. Since they are <em>unexpected</em>, we can't avoid them 100%. Yet we can do our best to learn about problems as soon as possible, have the information to fix and be able to deploy the fix as soon as possible.</p>

<p>Wiring email notifications to the poison queues is the simplest way to learn about errors fast.</p>

<p><span class="full-image-block ssNonEditable"><span><img src="/storage/uploads/2010/10/2010-10-01_195858.jpg" alt="CQRS Cloud Error notification by GMail"/></span></span></p>

<p>Such emails tend to help stabilize system really fast. This works especially well with the fragile integration points or external 3rd party systems that start behaving badly (timing out or returning unexpected results). If you start investigating issue as soon as possible, there is a chance to still catch such system at the crime scene. This makes it's easier to isolate the issue and prevent it from happening ever again by adding some smart behavior (i.e.: saga).</p>

<h2>Error Log Details</h2>

<p>Once there is information about error, you'd probably would want to fix it fast (preferably before this starts having impact on the customers). Detailed error log, referenced by the email notification, could help.</p>

<blockquote>
  <p>BTW, you might be tempted to send the entire exception details by the email. I strongly recommend to avoid this path, since it could accidentally (just like the recent padding oracle in ASP.NET) expose confidential information outside the system. It's better to provide unique message identifier in the exception notification, while keeping the actual details in the persistence in a secure way.</p>
</blockquote>

<p><span class="full-image-block ssNonEditable"><span><img src="/storage/uploads/2010/10/2010-10-01_201017.jpg" alt="Exception details from the Windows Azure"/></span></span></p>

<p>Once you've got exception details from the secure storage, you just need to copy exception stack trace, paste it to ReSharper ("Explore Stack Trace" feature) and jump to the failing point in the codebase.</p>

<h2>Domain Event History</h2>

<p>Sometimes information about the exception (no matter how detailed it is) is just not enough to solve the mystery of the problem at hand. Full domain message log (which comes native with the CQRS architecture) and append-only persistence are one of the best tools for <em>post-mortem analysis</em>.</p>

<p><span class="full-image-block ssNonEditable"><span><img src="/storage/uploads/2010/10/2010-10-01_202339.jpg" alt="Domain Event Log in CQRS for post-mortem analysis"/></span></span></p>

<p>At Lokad we tend to record all available information into the events, just because it is extremely easy to do. This includes (but is not limited to):</p>

<ul>
<li>performance statistics (time spent, number of records processed);</li>
<li>explicit details about the security context;</li>
<li>denormalized information from the AR.</li>
</ul>

<p>This yields following benefits at almost no cost:</p>

<ul>
<li>easier to write view denormalizers;</li>
<li>we've got perfect audit logs;</li>
<li>easier to track performance statistics and tendencies of the system.</li>
</ul>

<p>The latter part is extremely important, since CQRS systems tend to be rather complex and dynamically evolving (just because it is so easy to evolve them without hitting any complexity barriers). This forces the system to encounter various real-world problems and scalability limitations as it rapidly grows from the prototype and into the scaled full-blown solution integrating with dozens of various internal and external systems. As long as we track all information in the events, we could data-mine captured knowledge for hints of problems yet-to-happen. Reporting over domain log will help us here.</p>

<h2>Excel + Domain Log</h2>

<p>Microsoft Excel 2010 is one of the best tools for analyzing complex data with just a few lines of code.</p>

<p>We can take our domain log, write some denormalizing queries, run them through the history and dump resulting state directly into the Excel spreadsheets for charting, pivoting and looking for trends and potential problems.</p>

<p><span class="full-image-block ssNonEditable"><span><img src="/storage/uploads/2010/10/2010-10-01_204259.jpg" alt="Exploring domain log with Excel"/></span></span></p>

<p>Since such reports are extremely easy to create and run, this encourages for exploration and experimenting and leads to better understanding the system. In the end assumptions about the real-world behavior (in my case they tend to be off-scale, especially when I'm trying to assume bottlenecks and performance impact of some things) are replaced with simple knowledge.</p>

<p>For example, in order to mine all history for the report of all mail messages (presented above), one would just need to write a query like:</p>

<pre><code>var messagesPerDay = history.Messages
  .Where(m =&gt; m.Content is SendMailCommand)
  .GroupBy(me =&gt; me.GetCreatedUtc().Date, c =&gt; (SendMailCommand)c.Content)
  .Select(x =&gt; new
    {
      Date = x.Key.ToString("yyyy-MM-dd"),
      Internal = x.Count(m =&gt; m.To.Contains("lokad.com")),
      Public = x.Count(m =&gt; !m.To.Contains("lokad.com")),
    });
</code></pre>

<p>Infrastructure, reflection and some OpenXML will do the rest.</p>

<h2>Exploring your own domain</h2>

<p>Sometimes, in order to resolve the issue we would need to get really hacky and send raw messages directly to the system via some endpoint (at least SSL + dev key are recommended to secure such endpoint).</p>

<p>Home-grown UI utils, organizing commands and events in a nice way, will help to navigate all the messages and automate sending the right ones. </p>

<p><span class="full-image-block ssNonEditable"><span><img src="/storage/uploads/2010/10/2010-10-01_210125.jpg" alt="Exploring CQRS domain"/></span></span></p>

<p>Another use for such functionality is to resend the last failing message from the poison queue back to the command handler, after deploying fixes to production. I used to rely on such functionality a lot while fixing various integration issues. </p>

<blockquote>
  <p>What do you think? What hacks and tools do you use to evolve your systems past new scalability and feature requirements?</p>
</blockquote>

<p>PS: If you are interested, you might also <a href="http://abdullin.com/journal/2010/10/12/teach-visual-studio-your-own-language-easy.html">the next article in the series</a>. It shows how to "teach" Visual Studio a new language (in our case - DSL for specifying message contracts)</p>

<p>PPS: You can also jump directly to the <a href="http://abdullin.com/journal/2010/12/12/cloud-cqrs-lifehacks-from-lokad-part-2.html">next part of Lokad Lifehacks</a>.</p>

