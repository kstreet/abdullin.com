---
aliases:
- /journal/2010/11/3/cqrs-architecture-and-definitions.html/index.html
date: 2010-11-03
tags:
- xLim
- CQRS
title: CQRS Architecture and Definitions
---
<p>CQRS principle, in it's core form, merely introduces separation of reads from writes. This simple approach brings following benefits:</p>

<ul>
<li>denormalized query persistence is optimized for the reads (which usually make up the most of the persistence IO) resulting in better performance and user experience;</li>
<li>we can optimize our read side for the needs of the UI (i.e.: fetching dashboard for the user in a single query) which will result in better development experience and less risk of breaking something on the write side.</li>
<li>read side can be put on some cloud storage, which is inherently optimized for the reads, could be partitioned, replicated and even distributed via CDN;</li>
<li>by offloading data reads to synchronous queries we automatically increase the performance of the write side - now it has lower stress and lower probability of hitting a deadlock (which you should still account for).</li>
</ul>

<blockquote>
  <p>Deeper introduction and more learning materials are available for study in <a href="/tags/cqrs/">CQRS Starting Point</a></p>
</blockquote>

<p>What about things that you hear in any CQRS talk: commands, events, DDD, eventual consistency and almost-infinite scalability? These are <strong>distinct architectural patterns</strong> with their own benefits and peculiarities. These patterns play so nicely with CQRS principle (separation of reads from the writes), that they are <strong>often perceived as one thing</strong>.</p>

<p>So when we say "CQRS" this often means: "CQRS Principle" + "Message-driven architecture with commands, events and queries" + "Domain-Driven Design Methodology". This combination is one of the most frequent variations of "CQRS Architecture" (sometimes Event Sourcing is included there by default as well). Success of this variation is the reason why there is so much buzz and hype around the original CQRS term.</p>

<p>So here's what we have here: </p>

<ul>
<li><strong>CQRS</strong> - buzz-word that could mean a lot of things; also <a href="http://groups.google.com/group/dddcqrs/browse_thread/thread/b263bc52d485076d" target="_blank" class="offsite-link-inline">name of the "cult"</a>.</li>
<li><strong>CQRS Principle</strong> - principle that dictates separation of reads from writes in your system.</li>
<li><strong>CQRS Architectures</strong> - specific architectural designs based upon the CQRS Principle and a few other time-proven methodologies and approaches. They usually come with a clear evolution path enabling migration of live application to more elaborate design, if needed.</li>
<li><strong>DDDD</strong> (Distributed Domain-Driven Design) - one of the <em>CQRS Architectures</em>, as presented by Greg Young. It is based upon "CQRS Principle" + "DDD" + "Message-based architecture" + "Event Sourcing". <a href="http://cqrsinfo.com/documents/" target="_blank" class="offsite-link-inline">Documents on the CQRS Info site</a> cover this in greater detail.</li>
</ul>

<p>Obviously, multiple architectural designs could be established on top of CQRS Principle, DDDD is just one of them (see my <a href="http://abdullin.com/journal/2010/10/22/top-10-reasons-to-do-cqrs-in-a-pdf.html">CQRS Roadmap</a> for some other possibilities). I believe, when the CQRS book finally comes out, a few designs will be covered there. Meanwhile, here are the options that I'm aware of:</p>

<ul>
<li><strong>DDDD</strong> - CQRS Principle + DDD + Message-based architecture + Event Sourcing</li>
<li><strong>Cloud CQRS Architecture</strong> - CQRS Principle + DDD + Message-based architecture + Elastic Scaling + NoSQL persistence on top of cloud storage. </li>
<li><strong>CQRS with Relational DB</strong> - CQRS Principle + Service Bus (NServiceBus/MassTransit) + ORM (NHibernate).</li>
</ul>

<p>Each category has it's own variations and possibilities as well. For example, while evolving your legacy application towards the DDDD Architecture, you could have at some point Event Store and RDB+ORM persistence, where the latter could be dropped in some areas of the system a bit later on. In fact, enterprise system, being build with real-life approach for CQRS, would probably contain a mix of various architectures. We would be picking whatever makes the most sense for each specific business case and subsystem (basically optimizing for the highest mid/long-term business value for the development effort invested).</p>

<p>Better categorization of real-life CQRS architectures, their peculiarities, challenges and recommended evolution paths would probably require a bit more research. This could include gathering feedback from people practicing various CQRS flavors and structuring it on top of the theory with the formal methodologies used in universities during the PhD studies (for both learning and presenting). Maybe some time later I'll be up to this challenge.</p>

<p>Meanwhile, you can <a href="/atom.xml">stay tuned to this blog</a> and also RSS feed of <a href="http://cqrsinfo.com" target="_blank" class="offsite-link-inline">CQRSInfo.com</a> (it will get more lively a bit later).</p>

