---
date: 2014-12-01
title: "DevOps and Event-Driven Design"
tags:
- design
- ddd
form: story
story: sku-vault
storyIndex: 103
---

My third week with SkuVault was 10 hours long. It involved both
infrastructure concerns and software design.

First, I had to secure our new devops server:

* encrypt TCP traffic with logs and performance stats;
* serve web dashboards via HTTPS;
* add authentication to the web UI.

Afterwards we started planning evolution of software design at
SkuVault.


## TLS for Heka


Fortunately, encryption is easy to setup with Heka. It works
same way on Windows and on Linux.

All `Heka` communications now go through TLS connection, using
self-signed client-server certificates. That secures both log messages
and performance stats.

> Golang is picky about certificates. You need to generate
> certificates with `TLS Client` extension. Heka would refuse to
> connect otherwise.

## HTTPS

SkuVault already had a wild-card certificate bought for their
domain. Securing the web UI was just a metter of copying certificate
chains and keys to devops PC, then telling _Nginx_ to accept only HTTPS
connections.

> Nginx is an open-source reverse proxy server with capabilities for
> load balancing and web caching. It is performant and
> battle-tested. Besides, it runs on a operating system that can
> install updates without rebooting.

We also perform HTTP redirect to HTTPS for all insecure connections.

Along with that I added basic HTTP authentication to devops server. It
is good enough, since we encrypt all traffic anyway.

## Event-Driven Design

During the week we started planning design improvements with Slav. We
had in mind following requirements in mind:

1. Better scalability to sustain business growth.
2. Higher availability.
3. Simplify existing code.
4. Make all changes in small steps (no big rewrites).
5. Leverage strong points of Windows Azure.

> Big software rewrite can be appealing, yet it is a risky option. We
> all know stories where a long-term rewrite project turned out to be
> a complete waste of time and money. The purpose of a software design
> process is to find ways to gradually improve existing software.

At the current moment SkuVault consists from **multiple modules
representing bounded contexts in the domain and running as individual
azure worker roles**. Modules are event-sourced, their interchange
contracts shaped by CQRS principles. Each module has its own private
event store and a set of projected views, which are publicly
accessible.

![CQRS at SkuVault](/images/2014-12-04-skuvault-cqrs.jpg)

> Being the author of `Lokad.CQRS` library, I'm guilty of creating a
> .NET framework which introduces design concepts leading to complex
> code in the long term. They say, there is a special place in hell
> for people like me.

We can make this design more steady and decoupled by shifting from
_integration by sending commands and querying view state_ to
_integrate modules via events and crafted APIs_.

This shift would mean that:

* We hide internal state of the servers from the outside world, making
  it easier to evolve them and change the implementation.
* We can replace the majority of the commands in existing design with
  synchronous API calls. This would also simplify client code.
* APIs would act out as a natural Anti-Corruption Layer, besides we
  need to start introducing public APIs to the sytem anyway.
* Events are less fragile than commands (if crafted properly), they
  work well in pub/sub integration.

> Asynchronous code can promise better scalability and performance,
> yet in practice it introduces complexity, unpredictable execution
> and weird bugs that can drive other developers crazy. This can be
> especially dangerous, if they own weapons and know home address of
> the author. It is better to play safe and limit asynchrony to
> well-defined places, while keeping the rest of the code simple and
> synchronous.

Ideally, we would introduce all these changes in small steps. Longest
iteration would be 2 weeks.

One way to start this process is to introduce a small piece of
software, responsible for gathering events from all the private event
stores and publishing them to all interested subscribers.

This software will need to be simple, fast and highly available.

At the end of the week I had 3 possible implementation options for
this piece in mind:

> Fourth option was Apache Kafka. This highly scalable distributed
> commit log would be a good fit for a project with Java stack. In a
> .NET company it would look like an Englishman in New York.

1. FoundationDB + Golang event storage.
2. Implementation on top of Azure Blob Storage (essentially, next version of `Lokad.CQRS` event store).
3. Thin layer on top of Azure Table Storage.

Each option has its own set of trade-offs. We would need to pick one
that fits SkuVault project the best. That is what the next week going
to be about.
