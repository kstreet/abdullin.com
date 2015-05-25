---
title: Workshop on Event-Driven Design in Madrid
date: 2015-03-04
form: essay
tags:
- talks
- event-driven
- design
- feedback
idea: "Report about workshop on Event-Driven Design in Madrid for h4ckademy"
url: /talks/2015-03-04-event-driven-design-workshop-madrid/
---

A few days ago I ran a small workshop on software design for the
awesome folks at h4ckademy.

> [h4ckademy](http://www.h4ckademy.com/) - 6 weeks of immersive code
> retreat in Madrid, inspired by HackerSchool. It's designed for
> programmers that want to become better professionals. Israel
> Gutiérrez is one of the organizers of the event.

**Audience was very diverse** - heterogeneous backgrounds, different
levels of experience (recent college graduates and professionals with
10+ years in software) and different minds (from designers to console
hackers).

We decided to run a **crash course in software design, focusing on
the practical ideas that could be explained quickly and in a coherent
manner**.



![EDD Workshop in Madrid](/images/2015-03-04-edd-madrid.jpg)

The plan looked like this:

1. **Essence of software design** - principles of Domain-Driven
   Design, fast iterations, importance of feedback, focus on contexts,
   boundaries and contracts. Divide and conquer. Domain events and API
   contracts as the core part of interchange contexts.
2. **Event Storming Session** - collaborative exercise on analyzing a new
   business domain and building a useful model: contexts, domain
   events, API contracts.
3. **Practical application** of event-driven model - split domain
   implementation into modules; capture behaviors with runnable
   specifications expressed via domain-events and API contracts; scale
   design to handle more features, team members and higher loads; high
   availability.
4. **CQRS Beers** - an informal discussion, focused on QA, actual code
   and implementation details. We talked about ReactJS/Flux vs
   AngularJS and the other MV* frameworks, career paths of a
   developer, building reputation, working remotely and dealing with
   burn-outs.

The workshop went well, I enjoyed presenting to such a diverse
audience and doing exercises together. Many thanks to _Israel
Gutiérrez_ for inviting me over for such an event.

## What could be improved

To make this workshop better:

* **allocate more time** for the same amount of material (we had to
  rush through some concepts) **or reduce the amount of material** for
  this time-frame;
* **explore more than one problem domain** in exercises, switching
  people between teams;
* dedicate a block of ~15-20 minutes to front-end problems and designs.

Things that worked out very well and should be kept:

* **mixing presentations with QA and collaborative exercises** -
  this allows to keep people more involved in the process, cover more material;
* **CQRS Beers** - that format works very well for relaxed discussions (as
proven by the years of experience :) );
* **event-storming** - it is one of the best parts of the design
  process, thanks to the EU DDD community, there is a lot of fun and
  interactivity;
* following the reasoning sequence from "foundational design principles at
  bird-view" to "collaborative design exercise" and then to "practical
  applications"; maybe it could be extended with hand-on exercises for
  longer workshops.


## References

These additional materials contain more information on the topics
covered during the workshop. They can also provide answers to some
questions we didn't have time to address.

> [Download slides](http://media.abdullin.com/blog/2015/2015-02-02-edd-hacker-school.pdf) (PDF). Slide 3 is the most important one there.

* [HappyPancake Story](http://abdullin.com/happypancake/) - story of a
  HappyPancake project, covering many aspects of event-driven design,
  "micro-services", specifications and event-driven UI. Check this story, the others and simply browse the site.
* [Being The Worst](http://beingtheworst.com) - light-hearted podcast
on domain-driven design, implementation patterns and learning how to
build a task manager. We are still doing it.
* [Domain-driven Design](http://www.amazon.com/Domain-Driven-Design-Tackling-Complexity-Software/dp/0321125215) -
  the foundational book by Eric Evans on DDD methodology and related
  patterns. Start reading it with the chapter on context Mapping. Keep in mind that "Domain Events" weren't considered to be very important when the book was written (things have changed since then).
* [Implementing DDD](http://www.amazon.com/Implementing-Domain-Driven-Design-Vaughn-Vernon/dp/0321834577) - newer book by Vaughn Vernon, addressing some
  concerns and questions which appeared since the "Blue Book" came
  out. Don't read the appendix on Event Sourcing, material there is
  very outdated.
* [Ziobrando's Lair](http://ziobrando.blogspot.com/) - blog by Alberto
Brandolini, a great guy and an experienced DDD practitioner that
coined term "event storming".
* [Sample TODO app in ReactJS/Flux](https://github.com/abdullin/gtd) -
  front-end sample that I showed during the CQRS Beers. It is work in
  progress.
* [Sample modular backend for TODO app](https://github.com/abdullin/omni) -
  work in progress, but already includes these specification tests I
  showed during the workshop.

References above are most closely aligned with the material given
during the workshop. If you have more specific questions, please don't
hesitate to get in touch.

## Responses

[h4ckademy](https://twitter.com/h4ckademy/status/572431295084675074):
<blockquote><p>
Very funny workshop about event-driven design with @abdullin Enjoying it a lot!
</p></blockquote>

[h4ckademy](https://twitter.com/h4ckademy/status/573427455496699904):
<blockquote><p>
... A lot of fun and learning, both at the workshop and the beers!
</p></blockquote>

[Ruben H](https://twitter.com/rubendjon/status/572701970668134400):
<blockquote><p>
Great fun yesterday learning EDD with @abdullin at @h4ckademy
</p></blockquote>


## Feedback

**Anonymous:**

* _What did you like the most?_ When you explained how to implement a
  microservices architecture with a DDD approach.
* _What else would you like to hear about?_ More in depth event
  treatment, techniques and tools.

**Anonymous:**

* _What did you like the most?_ I liked a lot a general map of how the
  architecture is made. It was very clear, and interesting. Also i
  enjoyed play with the architecture over the table splitted in teams
  of a company, it's great to have a hands-on game.
* _What could make this workshop better for you?_ The workshop was
  excellent, but to make it even better, maybe could be possible to
  make a little application or at least the basic architecture of
  event driven design, just to have a feeling with the architecture.
* _What else would you like to hear about?_ I would like to know more
  use cases and maybe a real stories of implementing this kind of
  architecture in real projects.

[Ruben H](https://twitter.com/rubendjon):

* _What did you like the most?_ First part, where you explained how
  to design an app/software using DDD.
* _What could make this workshop better for you?_ More time on
  event-storming session.
* _What else would you like to hear about?_ Compare DDD to other
methods that also allow to design and implement app/software.

[Víctor Pérez](https://twitter.com/viperey):

* _What did you like the most?_ It gives you a general overview of how
  to join bussiness and development worlds in a verbose way.
* _What could make this workshop better for you?_ Maybe longer, but it
  was already adjusted to our needs, so maybe there's no reason for
  changes.

[Rubén Antón](https://twitter.com/rubocoptero):

* _What did you like the most?_ The explanation was really good and
  easy to follow for everyone. But the part I liked the most was the
  event storming one. It showed off how valuable can be in order to
  understand the domain and the acceptance tests we could write later
  on.
* _What could make this workshop better for you?_ I'd love to hear
  more about the architecture inside the microservices.
* _What else would you like to hear about?_


If you were at the workshop and want to share your feedback, please
don't hesitate to get in touch with me via twitter
[@abdullin](http://twitter.com/abdullin) or email:rinat@abdullin.com.
