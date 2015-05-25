---
aliases:
- /post/hpc-retrospective/
date: 2014-11-07
title: Retrospective
tags:
- popular
- design
form: story
story: hpc
storyIndex: 300
---


Our project at HappyPancake completed this week. We delivered a simple
and scalable foundation for the **next version of largest free dating
web site in Sweden** (with presence in Norway and Finland).


## Journey

Below is the short map of that journey. It lists technologies and
approaches that we evaluated for this project. Yellow regions
highlight items which made their way into the final design.

![Design Summary](/images/2014-11-07-summary.jpg)


## Project Deliverables

**Project deliverables** included:

* Deployable full-stack application with major features implemented.
* Domain model captured in software design (back-end and front-end)
and a set of declarative use-cases (acting as living documentation,
system outline and behavior test suite).
* Configured environments for development and continuous integration
(docker container).
* Strategies for further evolution and scaling of the system.
* Code for migrating existing production deployments to a new version
of software.

Final high-level **architecture is simple to reason about and
scale**. It was designed to be that way.

![Design](/images/2014-11-07-design.jpg)

Logically the entire solution consists from backend modules
(represented by golang packages) and elements of Facebook Flux
architecture (grouped together in namespaces by naming conventions).

Such structure helps to maintain the project as it grows in size and
complexity.

![Design](/images/2014-11-11-structure.jpg)

This design also helps to scale the deployment to handle higher loads.

We can **scale backend** by:

* moving individual modules to bigger servers;
* launching multiple instances of a single module;
* switching storage of an individual module to clustered solution,
moving it to bigger servers or even pushing to the cloud.

We can **scale frontend** by simply launching new instances behind the
load balancer.

![Scaling](/images/2014-11-11-scaling.jpg)

Solution structure also provides a natural way to split the work
between the developers. Given the established published language
(contracts of API and events), we can also bring in more developers,
assigning them to work on individual backend modules or frontend
namespaces.

## Lessons Learned

**Lessons learned**:

* Picking the right technology can reduce the development effort.
* In my next project I'll try to focus even more on divide and conquer
  approach - isolate a small part first and then evolve it, limiting
  the amount of work in progress.
* It is crucial to establish feedback loop as early as possible,
  involving all stake-holders. This builds trust and helps to avoid
  surprises.
