---
aliases:
- /journal/2010/7/11/importance-of-tooling-and-statistics-in-cqrs-world.html/index.html
date: 2010-07-11
tags:
- xLim
- Lokad
- CQRS
title: Importance of Tooling and Statistics in CQRS World
---
<p>Tooling is extremely important in debugging and managing application. This is especially true for solutions based on Command-Query Responsibility Segregation (<a href="/tags/cqrs/">CQRS</a>) or any other message-based enterprise architecture.</p>

<p>That's how, for example, we approach the problem in Lokad:</p>

<p><span class="full-image-block ssNonEditable"><span><img src="/storage/uploads/2010/07/2010-07-11_170825.png" alt=""/></span></span></p>

<p>Or, if we take a closer look at the event message (rendered from the binary Lokad Message Format into the human-readable text):</p>

<pre><code>       Topic: ReportCreatedEvent
ContractName: ReportCreatedEvent
      Sender: https://salescast.queue.core.windows.net/salescast-log
    Identity: 2c2e7f77-a62d-4540-8079-9db000a2bc47
  CreatedUtc: 5245830405928397257

{
  "ReportId": "646211a6-fe78-4ccc-9536-9db000a2bb9e",
  "SolutionId": 251,
  "ReportType": 3,
  "Name": "Excel Report",
  "StorageContainer": "https://salescast.blob.core.windows.net/salescast-solution-000251/",
  "StorageReference": "report-646211a6-fe78-4ccc-9536-9db000a2bb9e.xlsx",
  "ContentType": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "FileName": "SalescastReport.xlsx",
  "ReportSize": 8746,
  "Stats": [
    {
      "Key": 71,
      "Value": 475
    },
    {
      "Key": 72,
      "Value": 8746
    }
  ]
}
</code></pre>

<p>Tooling helps us here to:</p>

<ul>
<li>better understand and visualize dependencies and interactions within the solution;</li>
<li>derive custom reports and run queries against the events that happened during the application lifetime;</li>
<li>debug and troubleshoot potential issues that happened in the past;</li>
<li>replay commands, script environment and automate certain tasks;</li>
<li>capture information needed for discovering and eliminating performance bottlenecks (Stats structure holds primary execution statistics associated with the processing of the command message).</li>
</ul>

<p>The last bullet-point actually replies to the question I've promised to answer a long time ago - on <strong>tracking statistics related to the message lifecycle</strong> as it passes through the system. </p>

<p>So we manually <strong>capture the necessary statistics in the context of the message</strong> and append them to the appropriate events. Statistics could include things like:</p>

<ul>
<li>Number of records processed;</li>
<li>CPU resources used;</li>
<li>Upload/download speed;</li>
<li>Merge-diff statistics.</li>
<li>Etc</li>
</ul>

<p>These statistics might not make a lot of sense on their own. For example, download speed means different things, when we are retrieving information from SQL Azure in North-Europe or mySQL database on shared hosting in Moscow. That's why we are capturing and persisting them along with the domain events, which are bound to the time-line and provide context of the situation.</p>

<p>When the event is consumed by some component (i.e.: to update denormalized UI View) we would probably ignore these statistics - they will play out later.. </p>

<p>Events are stored in the domain log available for the queries <em>a la</em> <a href="http://abdullin.com/journal/2010/6/3/time-machines-should-support-linq.html">Time Machine</a>. Then, when we need to actually figure out some performance bottle-neck or understand specifics of some situation, it'll be just a matter of doing event stream analysis (there's plenty of literature on that one already) and writing proper queries.</p>

<p>Once we have statistics in the context of actual domain events, nothing prevents us from getting answers to the questions like:</p>

<ul>
<li>What's the average item retrieval speed from mySQL databases? How often do we encounter timeouts and deadlocks?</li>
<li>How many seconds does it take to sync 100k products from SQL Azure database in the same data-center?</li>
<li>What's the average upload speed to Lokad Forecasting API for datasets larger than 10k series, after that API upgrade in the last iteration?</li>
</ul>

<p>Theoretically, if we combine these statistics with Time Machine Queries (or continuous queries) and real-time logging - we should be able to do some nice things with CQRS solutions:</p>

<ul>
<li>Monitor health state and attach notifications to the key performance indicators of our distributed solutions.</li>
<li>Detect potential problems in real-time or even ahead of time (if coupled with the forecasting).</li>
<li>Analyze the real impact of performance optimizations.</li>
</ul>

<p>All in all this helps to <strong>better understand</strong> the realm of the solution, as it evolves in ever changing reality. This allows to <strong>reduce resources</strong> (developers, time and budget) required for the delivery, while <strong>keeping high quality</strong> of project deliverables.</p>

<blockquote>
  <p>This article is a part of <a href="http://abdullin.com/xlim/">xLim 4 Body of Knowledge</a>. You are welcome to <a href="/atom.xml">subscribe to the updates</a> and leave any feedback!</p>
</blockquote>

