---
date: 2015-01-17
title: "Delivering First Bits to QA"
tags:
- design
- dev-process
- event-driven
- azure
form: story
story: sku-vault
storyIndex: 104
---

## Deploying MessageVault

This week we finally pushed our MessageVault project to QA
deployment. It will live there for some time, before going to
production.

> To remind you, _MessageVault_ is a simple message storage server
> that runs on Windows Azure. It is inspired by Apache Kafka. This
> server allows saving messages as streams to page blobs on Windows
> Azure Storage. Streams can reach terabytes and go beyond. Once we
> persisted messages to Azure Storage, we could read them directly
> from there, MessageVault server is not needed for that. You can have
> any number of consumers reading them or even replaying from the
> start.

All events that are recorded in QA deployment of SkuVault, get pushed
to dedicated streams on MessageVault. It is **easy to consume them
from any code** at this point. From now we could start migrating some
existing logic to dedicated modules to do reporting, exports, serve as
API etc.

The most important benefit of MessageVault setup is that it would
allow to:

1. Implement some of the existing functionality as stand-alone modules
with API.

2. Scale out the solution by batch processing messages, and adjusting
implementation of each module according to the use-case.

3. Experiment with writing new modules without risking the integrity
of the existing solution.

4. Simplify existing solution, by replacing _integration via commands
and views_ with _integration via crafted domain events_.

5. Introduce testability of API modules as one whole.

6. Simplify front-end (no need to query multiple key-value
documents in order to display one simple report or a view).

What's more important - these **changes could happen incrementally
without big rewrites to the system**. At least that's the plan. We'll
see how the things would work out in the next weeks.

> You might get an impression that we are going to transform a large
> application into a crowd of small micro-services in .NET. This is
> not entirely true. In fact, the number of projects could even go
> down, as we reduce coupling and duplication of view logic.

We had to learn limitations, week points and scaling possibilities of
MessageVault. So it went through some intensive stress-testing before
the QA. The best approach was to deploy the system and test it in
different scenarios.

For example, these are the throughput numbers (transactions per second
and messages per second) and latencies while running it on Large,
Medium and Small instances of Windows Azure Role.

![MessageVault Graphite](/images/2015-01-17-message-vault-graphite.png)

As you can see, MessageVault doesn't handle long-term load well, if
deployed as Small Azure Service. It handles load better (and with
lower latencies), if deployed as Large Azure Service.

These performance numbers are preliminary, **there are things that
could see improvement** (e.g. improving scheduler for high-throughput
scenarios). However, we are going to do an internal code-review of the
project before moving forward with it.

> This approach follows the mantra: first make it work, then make it
> beautiful; afterwards make it fast.

You could check out the sources and performance for yourself.
MessageVault is
[available on github](https://github.com/agileharbor/messageVault)
as part of AgileHarbor repository. It includes libraries for
the client and server along with examples and an Azure
deployment you can use.

## Hekad Gateway

Graphite statistics on the image above are a courtesy of our dedicated
devops server. The same server also provides a nice UI to access and
search logs in real-time.

![MessageVault Graphite](/images/2015-01-17-graphite.png)

In order to benefit from these capabilities, a code has to know how to
push data to this devops server. Integration between .NET and Linux
proved to be the most tricky part. However today, we pushed to QA a
first deployment of SkuVault with real-time statistics and logging
enabled.

> SkuVault codebase itself isn't instrumented with performance
> counters yet. However, it became easy to do so. This will allow to
> learn behavior of the system in real-time, understand the
> bottlenecks and improve performance for the users.

The integration project for pushing logs and statistics from .NET code
to Hekad is
[available as open source](https://github.com/agileharbor/hekadGateway). It
is probably too specific for reuse, but it could serve as sample.

## Breaking the Build

Fun fact: in the process of QA deployment I broke the build half a
dozen times. The project didn't compile on my machine due to a private
dependency I didn't have. So I had to be pretend to be a compiler and
MSBuild, verifying my own changes in the head before pushing them to
the build server.

It all worked in the end, but I probably didn't leave a good
impression of a first-time committer to the core codebase :)

## SkuVault Record

Obviously, the development effort in SkuVault didn't focus just on
DevOps and messaging middleware. The team was busy improving user
experience and stability of the rapidly growing product.

By the way, during last Black Friday, SkuVault storage broke the
record of 100M events stored in the system. At this point in time,
there were more than 4.5M sales created in SkuVault in total
(throughout the history) and 2.3M sale items picked. Kudos to the team
of SkuVault for reaching these impressive numbers and exceeding them.

## Next Steps

In the next weeks we'll be working on migrating some of the existing
logic to a simpler event-driven design, as well as planning and
prototyping new features for the product.
