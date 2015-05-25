---
aliases:
- /journal/2013/1/24/essence-of-domain-driven-design-re-explained.html/index.html
date: 2013-01-24
tags:
- DDD
title: Essence of Domain-Driven Design - Re-Explained
---
<p>This question came from the latest episode of <a href="http://beingtheworst.com/2013/episode-21-linguistic-cartographers">Being The Worst: Linguistic Cartographers</a> from Johan. In that episode Kerry and I tried to apply DDD to the exploration of new domain.</p>

<blockquote>
  <p>First of all thanks for a great podcast series, I’m always looking forward to the next episode! I’m just a little confused when it comes to bounded contexts, domains and services (SOA term). From what I understand when listening to an episode of the “Distributed Podcast” with Udi Dahan, bounded contexts in DDD terms are more or less interchangeable with services in SOA terms. If I remember it correctly Udi also said that you should only use CQRS in those BCs/services that are in a collaborative domain. In DDD terms the BC is a linguistic boundary (am I right?) which makes sense when I look at your context map. What I don’t really understand is what Udi means when he says that CQRS should (only) be used in certain <em>BCs</em>. To me it seems like CQRS may be used in a certain <em>domain</em> (like a core domain) that resides inside a certain BC. Other domains in the same BC may or may not use CQRS. Have I understood it correctly or am I misstaken?  Sorry if the question is a bit off topic.</p>
</blockquote>

<p>We will be talking about some of these concepts in later episodes (some already recorded), but let's get this straight in writing. We'll try to stick to the original definitions as heard from Eric Evans, Vaughn Vernon and Gregory Young. Here's my interpretation, which tries to stay as close to the origins as possible.</p>

<p>We <strong>apply Domain-Driven Design to help solving problems in some vast and complicated problem space</strong>. This problem space is called <strong>Domain</strong> or "the Business" - how people actually do things in the real world.</p>

<p>While doing DDD, we try to divide the large problem space in smaller and more manageable regions, which can be conquered separately. We identify these regions just like how cartographers identify places - by looking at some shared traits. In our case: language used by experts, organisational boundaries, existing common knowledge etc. These regions are called <strong>bounded contexts</strong>.</p>

<p>We identify existing solutions (applications, components, projects) and plan our new solutions. Usually existing solutions are developed without the regard to bounded contexts. Ideally, new solutions would fit precisely into the problem regions we identified. However existing solutions can overlap or have various sorts of ugly shapes. These solutions are called <strong>subdomains</strong>.</p>

<p>The process of first identifying problem space and currently existing solutions, then, mapping it to some picture is called <strong>context mapping</strong>. It is extremely important, since it provides you with the strategic overview of your battlefield, helping to prioritise and make decisions. Context Map is not a view of the future, but rather a current state.</p>

<p>One of the most important traits used in identifying boundaries is language of the problem space, choice of terms and words, which are used by experts. We would try to use the same language while talking with them, with domain experts and all the way through the solution process. This will drastically reduce the confusion. Language is called <strong>Ubiquitous Language</strong>. The idea is to use this language as a way to explore our Domain and, with the help of the Domain experts, capture it in a <strong>Domain Model</strong> - a useful abstraction of the business, captured in the code.</p>

<p>While building new subdomains for the identified bounded contexts, we try to develop them in such a way, that the solution would be tightly linked to the original problem. This will make it more robust, understandable and evolution-tolerant; real, in other words. Ideally, language of the problem space (along with the boundaries) will find it's way into the solution, including name of projects, classes and methods. Being The Worst podcast talks about the practical side of such development quite a bit.</p>

<p>We can't address all problems at once, so different solutions will have different priorities. They will also have different possible implementations. Hence, we can differentiate in subdomains:</p>

<ul>
<li><strong>Core domain</strong> - the most important subdomain, which is essential for the business. Without it the business would fail. If you ever need to pick the first solution to implement - start with the core domain. </li>
<li><strong>Supporting subdomain</strong> - subdomain, which is less valuable for business than Core domain. Without it business may be can even survive for some time. But it still is quite important (supports core domain), it also is specific for the domain and has to be developed. In this case, for some reason, we can't buy an existing software or component to solve the problem.</li>
<li><strong>Generic subdomain</strong> - subdomain which is less valuable for business than Core domain. It also is generic enough to allow buying it off the shelf (unlike <em>supporting domain</em>). </li>
</ul>

<p>While building solutions for the specific problems, we can optimise our solutions by picking the best tooling, approaches, methodologies from the available. For example, CQRS with Event Sourcing might be a good fit for the Core Domain, while CRUD SQL system can be the best fit for another. These different methodologies will not conflict or confuse people, since we explicitly keep them within the subdomain boundaries.</p>

<p>Also, while talking about Context Maps, we can identify <strong>relations between different subdomains</strong>, based on the real-world situation. It might include politics, organisational boundaries, personal distrust between teams or tight budgets. Considering these factors can help to identify potential issues in advance, while also baking in work-arounds and contingency plans into the actual software being developed. We can also identify potential integration and extensibility points. Here are some of the common terms used:</p>

<ul>
<li><strong>Published Language</strong> - linguistic elements (e.g. command and event contracts) that are frozen and made visible outside of the subdomain. This way other subdomains can interact with it.</li>
<li><strong>Shared Kernel</strong> - part of the subdomain implementation that is frozen and extracted (so that the others can reuse and integrate with it better).</li>
<li><strong>Anti-Corruption Layer</strong> - Code, which explicitly protects logical model of a subdomain from messy logic or changes in other subdomains, it has to integrate with.</li>
</ul>

<p>Once again, <strong>Essence of Domain-Driven Design is not about some patterns</strong> (i.e.: repositories, value objects, event sourcing etc), it is about looking at complex real world problems, learning how to break them down into smaller pieces and then solving them in the most efficient way. DDD teaches methodologies that help to move along this process.</p>

<p><strong>Ideally, for each bounded context, there will be one subdomain</strong> that fit's it perfectly. Although this might work for green-field projects, in reality the situation can be different. This especially is true in legacy systems.</p>

<p>In legacy systems, entire problem space can be treated as one big and complex problem, with a few solutions thrown there and there without any explicit reasoning or boundaries. In this case we can have one messy and confusing bounded context with a bunch of subdomains stepping on each other's toes. DDD also provides guidance on gradually getting out of this mess.</p>

<p>Please, keep in mind, that these definitions are my own personal interpretations, presented in the simplified form. If you want to go to the roots - check out the Blue Book by Eric Evans</p>

<p>PS: And no, Bounded Contexts are not interchangeable with services in SOA terms. The former is the problem, the latter is the solution.</p>

<p>Update: there is an <a href="http://beingtheworst.com/2013/episode-23-spaghetti-free-terminology">episode of Being the worst podcast</a> which goes into more detail on this topic.</p>

