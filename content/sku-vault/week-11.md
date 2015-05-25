---
date: 2015-02-10
title: Simplifying Web UI
tags:
- design
- web
- api
form: story
story: sku-vault
storyIndex: 111
idea: Simplifying Web UI - next chapter of a design improvement story at SkuVault
---

During my last few weeks at SkuVault I focused on three areas:

1. Find a way to simplify existing application design, scale it and
   introduce an API.
2. Work on a new SkuVault feature (time-bound) implemented with API
   and a new UI prototype to back it up.
3. Plan and prepare infrastructure bits needed to start rolling things
   out to the Production.

So far, as it looks like, all design changes seem to come together
rather nicely. Most of the credit here goes to Slav and his team for
making everything event-driven from the start (the story would’ve been
much less interesting, if the product was centered around the
database).

Plan for the backend is quite simple: gradually replace existing
modules with API modules, while covering API with specifications and
simplifying the internal implementation. A lot of commands and views
will become obsolete. Language and platform of the new code would stay
the same - .NET.

While working on the new feature, we came to the idea of how to deal
with the Web UI as well. SkuVault UI already reflects a lot of
complexity from the underlying domain, while ASP.NET MVC, Lokad.CQRS
and Angular.JS don’t necessarily make things easier.

> Fun domain fact: you can’t really prohibit a warehouse worker from
> doing something in the application. If really needed (as in: “manager
> just told him so”), he will do whatever is needed. However without the
> ability to record that change in the app, discrepancies will start
> accumulating.

Solution to that problem couldn’t involve the _Big Rewrite_, because
of the time-frames and the risk. Eventually, we came up with a simple
idea:

* Start implementing new features as tiny single-page Web applications
that talk to the HTTP API.
* Make sure that if you are
logged into one feature, you are logged into the entire application.
* Any JS framework could be used to implement a feature. It all works,
as long as it renders into a static JS bundle.
* Since a feature is implemented as a static single-page application,
it could be hosted on any platform that can serve static files (Azure
Web Sites, CDN, Amazon S3).
* Existing app could serve these features as well, and that’s how
we will migrate the UI - replace existing code with small features
that are versioned and served separately.

> Although, if React.JS is used to implement a feature, visual widgets
> from the shared library could be reused. Folks at Facebook use that
> a lot.

This approach actually has a few **additional benefits**:

* UI Features could be developed, deployed and tested in parallel,
  without stepping on the toes of each other.
* We could have a setup, where a git push of a new version of a
  feature `product-search` to a branch `smart-auto-complete` will
  actually deploy that feature to a website under the url
  `/product-search-smart-auto-complete/`. That could speed up the
  development and QA cycle.
* We have a clean separation of concerns between the stateful API
  (handles scaling and domain complexity) and the stateless UI
  (focuses on user interactions).
* A/B testing and gradual feature roll-out to customers also become
  quite easy to implement.

While working on new functionality, I started implementing UI this way
because it was much faster to prototype. However, once we discovered
additional benefits of that approach and a simplicity of integration
with the existing UI, we might give it a try.

These changes could take some time but should bring the entire product
into a rather technically boring stack: HTML + JS frontend and .NET
services in the backend. Boring, if you forget ReactJS, possibility of
React Native, event-driven backend services and the scalability
challenges :)

Within the upcoming weeks we plan to roll out new MessageVault
integration and API bits to work with the events coming from the
production (got to test realistic workloads). I’ll be focusing on the
new feature most of the time.
