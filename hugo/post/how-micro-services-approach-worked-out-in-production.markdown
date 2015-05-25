---
aliases:
- /journal/2014/1/20/how-micro-services-approach-worked-out-in-production.html/
date: 2014-01-20
tags:
- popular
- design
- use-case
title: How Micro-Services approach worked out in production
---
<p>Last week we released a new version of business backend at Lokad. </p>

<p><strong>Previous version</strong> was based on message-driven design with heavy use of CQRS principle, event sourcing and queues. There is a case study on that at <a href="http://msdn.microsoft.com/en-us/library/jj591556.aspx">Microsoft CQRS Journey</a>. As I've discovered soon after, this architecture was a big pain in the ass due to being too monolithic and dogmatic. There was a lot of unnecessary ceremony involved in the simplest actions. Back then it didn't feel as such, since literally everything in .NET world involves a lot of ceremony. Yet, after gaining initial exposure to the world outside of .NET, my perspective has changed. The concept of decomposing a complicated system into a bunch of tiny and simple components that work together and yet evolve separately - was refreshing and liberating.</p>

<p>Current version of business backend at Lokad grew upon these ideas, while adapting them to the .NET reality (making things slightly more monolithic, where it was absolutely necessary). Still the result is quite nice:</p>

<ul>
<li>13 backend components which have on average 4-5 classes and the same number of public methods;</li>
<li>2 thin UI components (simple ASP.NET MVC web sites);</li>
<li>public API : JSON over HTTP; ability to subscribe to events from components;</li>
<li>no overreaching architecture in each component, although event sourcing with in-memory views shows up quite often;</li>
<li>all components are designed in a way which allows to have multiple instances running behind load balancer.</li>
<li>almost no unit tests, since the components are extremely simple.</li>
</ul>

<p>If I were to draw a map of all backend components, it will look nothing like my previous monolithic designs:</p>

<p><img style="display:block; margin-left:auto; margin-right:auto;" src="/storage/uploads/2014/01/sample.jpg" alt="Temp" title="temp.jpg" border="0" width="550" height="405" /></p>

<blockquote>
  <p>arrows point in direction from upstream component (provides services/data) to downstream component (uses services/data).</p>
</blockquote>

<p>Many of these components were rewritten multiple times from scratch, as the system was gradually evolving from legacy monolithic design towards deeper insight. This often happened in situations when we felt that there was a better way to decompose business capabilities into components. Sometimes "better" meant "simpler". </p>

<p>The fact that previous version of the system was running event sourcing allowed to migrate functionality to new design in small steps. For example, at some points in time events were flowing from the old version to the new one. At other points in time, legacy code in the old system was calling directly newly established components that were already running within the boundaries of the new system.</p>

<p>Basically, effort to decompose existing business capabilities into small chunks started paint off immediately : it became easier to think and reason about evolution of the design. It also became possible to break down work in really small steps (which minimised risks), while still maintaining reasonable development throughput (because multiple components were developed in parallel).</p>


<p>I quite like the final result - so far the system is extremely simple and there were surprisingly few problems with the migration (due to the fact that the system is quite simple).</p>

<p><strong>Performance is not an issue</strong>. Current configuration could easily handle the load even if number of Lokad users increases a few hundred times (if it goes beyond that - we'll need to ask Azure to deploy one more server instance). This happened because performance of each component is measured along with its usage. In cases when components were frequently used and reasonably slow (as proven by stats from the production), they were tuned to better performance.</p>

<p>Ultimate performance tweak for reads was about serving reads from an in-memory cache which is kept up-to-date via persistent TCP subscription to event stream with changes (just an event projection that subscribes to event store and stores projected results in memory). Ultimate performance tweak for writes was about putting command messages to a queue and processing them in background (work is shared across all nodes).</p>

<p>If you remember my previous posts about Lokad.CQRS building blocks, you would recognise some of the patterns. The biggest change from "Lokad.CQRS architecture" is that there is no longer a uniform architecture in this new design. There are a few design constraints (e.g.: home components communicate or max size of the components), yet the internal implementation details are private to each component.</p>

<p>Such an approach leads to situation, where each component can be tailored specifically for the job at hand. It does not need to follow a unified way to access data or handle failures. This might lead to a greater diversity. Yet, the lack of unnecessary ceremony allows to get right to the core of the problem in the most simple and efficient way possible. Hence components can be diverse and simple at the same time, just like cells in human body.</p>

<p>Probably, the system could be made even more simple, if it were taken outside of common .NET stack.</p>


<h3>What infrastructure do we use?</h3>
<p>There is no real infrastructure, we mostly use some external libraries for our needs:</p>
<ul>
<li>ServiceStack for hosting app services (web services made easy)</li>
<li>Metrics.NET for performance measurement</li>
<li>Event Store of Greg Young to store events and to push them to all subscribers</li>
<li>Windows Azure to host backend workers and frontend</li>
<li>ASP.NET MVC 4 for Web UI</li>
</ul>
