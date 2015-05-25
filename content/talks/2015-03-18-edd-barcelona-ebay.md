---
title: Software Design in Barcelona at eBay Enterprise
date: 2015-03-18
form: essay
tags:
- talks
- event-driven
- design
- feedback
idea: "Event-Driven Design in Barcelona at eBay Enterprise"
url: /talks/2015-03-18-event-driven-design-barcelona-ebay/
---


A few days ago I had a chance to give a talk on software design in
Barcelona. The event was organized by Barcelona Software Craftsmanship
group and hosted by eBay Enterprise International.

![EDD Class in Barcelona](/images/2015-03-18-edd-barcelona-ebay.jpg)

> Photo by [Angel Rojo](https://twitter.com/rojo_angel).

The audience was quite diverse: folks with PHP, JavaScript, Java, C#
background, most of them are programmers, a few technical managers,
DevOps. There were people from eBay teams as well as the other members
of Barcelona software scene.

Plan for the class looked like this:

1. **Principles of software design** - principles of the Software
   Design Process, DDD and decomposition, importance of fast feedback
   loop and iterations, boundaries and contracts. Divide and conquer
   principle. Domain events and API contracts as the core part of
   interchange contexts and enforcing long-term stability.
2. **Event Storming Overview** - audience was too large to run an
   event-storming session within the conference. Instead we went
   though the theoretical aspects of event storming and various uses.
3. **Practical application** of event-driven model - split domain
   implementation into modules; capture behaviors with verifiable use
   cases expressed via domain-events and API contracts; scale design
   to handle more features, team members and higher loads; high
   availability.
4. **CQRS Beers** - an informal discussion, focused on QA, actual code
   and implementation details. We talked about CQRS/DDD principles,
   command buses, asynchronous UI updates, handling high load and
   ReactJS/FLUX.

I enjoyed the class and the beers afterwards. Many thanks to _Alvaro
García_, _Manuel Rivero_, _Cabre Barrera_ and _Villazala Gordo_ for
the invitation and organization of the event. Thanks to _Angel Rojo_
for the photo.

## References

These additional materials contain more information on the topics
covered during the workshop. They can also provide answers to some
questions we didn't have time to address.

> [Download presentation](http://media.abdullin.com/blog/2015/2015-03-18-edd-eBay-Barcelona.pdf) (PDF). Slide 3 is the most important one there.

* [Sample modular backend for TODO app](https://github.com/abdullin/omni) -
  work in progress, but already includes these use cases I
  showed during the workshop.
* [HappyPancake Story](http://abdullin.com/happypancake/) - story of a
  HappyPancake project, covering many aspects of event-driven design,
  "micro-services", specifications and event-driven UI. Check this
  story, the others and simply browse the site.
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

References above are most closely aligned with the material given
during the workshop. If you have more specific questions, please don't
hesitate to get in touch.

## Responses

[Angel Rojo](https://twitter.com/rojo_angel):
<blockquote><p>
I enjoyed a lot the talk by Rinat... Interesting round of Q&A after the session and thanks to eBay to provide the snacks and drinks!
</p></blockquote>

[Nacho Cabre](http://www.meetup.com/Barcelona-Software-Craftsmanship/members/19283991/):
<blockquote><p>
Masterclass on event driven design by @abdullin thanks for all the food for thought!
</p></blockquote>

[Félix Delval](https://twitter.com/fe_lix_/status/578285522889629696):
<blockquote><p>
...really enjoyed the presentation of @abdullin about event driven software
</p></blockquote>

[jhvaras](https://twitter.com/jhvaras/status/578313542186741760):
<blockquote><p>
The important is in the white spaces. Great talk. Thanks @abdullin @eBayESP @bcnswcraft
</p></blockquote>

[Francesc Gil](https://twitter.com/xescugc/status/578335725617340416):
<blockquote><p>
 @abdullin really good talk today at meetup ;)
</p></blockquote>

[Alvaro Garcia](https://twitter.com/alvarobiz/status/578888430555381762):
<blockquote><p>
@abdullin thanks for the very interesting and information-packed conference at @eBayESP about #DDD and #eventDriven
</p></blockquote>

## Feedback

> If you were at the workshop and want to share your feedback, please
> don't hesitate to get in touch with me via twitter
> [@abdullin](http://twitter.com/abdullin) or
> email:rinat@abdullin.com.

[Nacho Cabre](https://twitter.com/keoko/):

* _What did you like the most?_ I enjoyed a lot the explanation of
  emergent design from a DDD standpoint, event storming and all the
  discussion around domain events.
* _What could make this class better?_ It would be very interesting to
  explain all these concepts just working on a simple problem and
  following all the steps you described on the emergent design with
  the same problem. For instance, the typical TODO list application
  how it would be implemented following the DDD approach.
* _What else would you like to learn about?_ I think it would be very
  useful to do a practical workshop and work on a problem and practice
  event storming, context mapping, develop some component using
  tactical design patterns, measure and then, refactor it in a second
  sprint.
