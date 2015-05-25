---
aliases:
- /journal/2011/11/24/importance-of-good-domain-models.html/index.html
date: 2011-11-24
tags:
- DDD
- CQRS
title: Importance of Good Domain Models
---
<p>You might find that I will be writing less about the technical side of event centric systems (with all the CQRS, ES and cloud aspects) along with the problems of scaling and improving their performance. This is because all that is a solved problem in the industry (the only question is about costs and risks of any given solutions).</p>

<p>There is a more important problem at hand - coming up with <strong>proper domain models</strong> that actually represent useful abstraction of the real world and allow event centric systems to be delivered. Or, in other words, coming up with a description of problem domain, that is structured in such a way, that you could easily build a system with that.</p>

<p>DDD might sound like less exciting topic for discussion as compared to elastic scalability, clouds or why LMAX can get millions of messages. However the former is just the implementation detail, if you have adequate model. Unless you are doing something really specific with the technology, all problems you would face - have already been solved by many people. That's <strong>pure engineering</strong> (albeit not the one with a lot of documentation on top of that). You can have more-or-less predictable results, given the initial design in almost any field (aside from areas where technology is so important that it starts melding into the domain field - there really cool things start showing up).</p>

<p>Design of domain models is something more of an art or a craft. Given the domain field, you are not guaranteed to arrive at satisfactory model. You are not guaranteed anything at all. Hence it is more of a problem that needs solution.</p>

<p>However, if you arrive at something satisfactory, you would get domain model that could easily outlast any technological changes, while even making them less relevant (less expensive and less risky)</p>

