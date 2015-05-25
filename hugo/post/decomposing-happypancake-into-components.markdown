---
aliases:
- /journal/2014/05/07/decomposing-happypancake-into-components/
date: 2014-05-07
tags:
- design
- DDD
title: Decomposing HappyPancake into components
---
Last night we had a really productive pairing session with [Pieter][Pieter],
discussing the design of HPC2 and trying to decompose it into a bunch
of components aligned with the use cases.

**Components are represented by golang packages** composed of a bunch of small files each. Examples of such packages are:

- auth
- register
- profile
- notify
- poke
- etc

This maps to C# projects in .NET world but with a lot less ceremony,
which feels really good.

Terms "domain" and "bounded context" came up in the discussion along
with the question to how they relate to these components. I think,
these terms represent much higher level of abstraction which is
simply absent from our case.

Domain of HappyPancake is quite simple for now. It is just a dating
social network with a bunch of small features.

Massive kudos go here to [Tomas][Tomas] who is continuously pruning features
and keeping core product lean and focused. He pushes this to the
level I've never experienced before in projects.

We can say that HappyPancake, at this point of its life-cycle, has
only one domain and a single bounded context. Later on we will
probably see things like "ad integration domain" and "mobile
notifications" showing up.

Domain of HPC2 is initially captured via a set of use cases. We have
to complete these in order to deliver a first beta. While working
with [Pieter][Pieter] yesterday, we tried to map these use cases to golang
packages. As he said:

> Packages should reflect functional model, not technical.

With this approach we **apply Domain-Driven Design principles at the
strategic level** (identifying domains, establishing vocabulary, dealing
with domain boundaries and interactions), while **design of the domain itself
is refined with tactical approaches** (related to "micro-services" movement these days):

- decompose domain into components;
- components work together in order to implement use cases;
- components expose a public contract (e.g.: events, http handlers,
  service contracts) and have a private implementation;
- it is impossible to get component map right from the first attempt;
- deeper insight into the domain will emerge as we evolve components
  and their boundaries.

Benefits of domain decomposition into small components (represented by
golang packages in the code) were summarized nicely by [Pieter][Pieter] last
night:

- packages can be built and tested in isolation;
- less merge conflicts (since developers usually work on use cases
  and these are aligned with our packages);
- packages map to the use cases (functional model), which makes it
  easier to reason about things;
- names become more verbose or more refined (e.g. compare
  `hpc.handlers.ProfileHandler` vs `hpc.profile.handler`);
- components can grow independently and be developed in collaboration;
- there is much less context switching while working on a use cases
  (no need to jump across the solution);
- golang tooling is focused around packages and supports this kind of
  development really well (`godoc`, `looper`).


>In words of
> [Tomas][Tomas]: _Opinions opinions opinions, none should be considered
> authoritative for your domain and your context..._

Such an approach has an additional benefit (as apposed to layered
implementation of the domain) - each component exists in its own
context, enforced by the packaging design of golang. This helps to be
more opinionated in the implementation of each component, without
suffering from syndrome of "pattern over-application".




[Pieter]: https://twitter.com/pjvds
[Tomas]: https://twitter.com/ptomasroos
