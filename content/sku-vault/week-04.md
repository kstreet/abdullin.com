---
date: 2014-12-07
title: "Message Vault"
tags:
- micro-services
- event-driven
- azure
form: story
story: sku-vault
storyIndex: 104
---


This week with SkuVault was 10 hours long, like the previous one. It
was purely dedicated to long-term design evolution.

After going through a series of scenarios we ended up with the
following plan:

1. Introduce _Message Vault_ - a simple pub/sub message streaming
   systems for Windows Azure.
2. Make all existing modules publish events to _Message Vault_.
3. Extract some projection code from the existing SkuVault code and
   move them into simple modules with API on top: `Search`, `Reports`,
   `ProductViews` etc. Cover these modules with use-cases.
4. One by one, start migrating aggregate logic from existing SkuVault
   codebase to the new design. Remove commands and simplify
   aggregates, where appropriate.

> Implementing _Message Vault_ is the biggest step here.  All the
> other steps are going to be smaller and more incremental.

## Message Vault

Message vault provides **publish-subscribe with replay and batching
for Windows Azure**.

It is heavily inspired by Apache Kafka. However, it is going to be a
lot more simple than that. We are going to simply add a thin wrapper
around Azure Blob Storage, to act as an API and write synchronization
point. Windows Azure is going to do all the heavy-lifting.

We need to embrace Windows Azure in order to keep the implementation
simple, yet scalable.

> At the moment of writing, SkuVault stores more than 100000000 events
>with total size above 25GB.


Semantics are going to be similar to Apache Kafka (this way we could
migrate to Apache Kafka or any other implementation of a distributed
commit log, _if needed_).  Producers push messages to the Vault which
serves them to consumers. Consumers can replay events from any point
in time or chase the tail.

We partition messages by streams. Each stream is an immutable and
ordered sequence of messages. All messages in a stream get a unique
_offset_ and timestamp. Absolute order between messages in different
streams is not guaranteed, but we can still sort by timestamps (within
the time drift on Azure).

> Message Vault is not going to be an _Event Store_, it is not
> designed for _event sourcing with aggregates"_ (you need
> [NEventStore](http://neventstore.org/) or
> [EventStore](http://geteventstore.com/) for that).

### Design Trade-offs

Message Vault makes following trade-offs:

* optimize for **high throughput** over _low latency_;
* optimize for message streams which are gigabytes large;
* prefer **code simplicity** over _complex performance optimizations_;
* **http protocol** instead of binary protocol;
* **rely on Windows Azure** to do all the heavy-lifting (this
  simplifies code, but couples implementation to Azure);
* **high-availability via master-slave setup** (uptime limited by
  Azure uptime, no writes during failover);
* **no channel encryption** (if needed, use SSL with Azure Load
  Balancer or your load balancer);
* **no authorization schemes** (if needed, configure your load
  balancer or add a proxy on top);
* **implemented in imperative C#** (.NET runtime is heavy, but Windows
  Azure optimizes for it);
* **client library is intentionally simple** (view projections and
  even checkpoints are outside the scope);
* **each stream is a sepate page blob** (they can grow to 1TB
  out-of-the-box, having thousands of streams isn't a good idea).

### Implementation

Implementation should be rather straightforward, since we brutally
optimize the implementation for the task at hand (SkuVault project
itself). We allocated 20 hours for that.

![MessageVault on Azure](/images/2014-12-07-sku-vault__message-vault.jpg)

> The most tricky part is going to be: write and test master-slave
> failover (we need high availability) and handling writes between the
> moment the master goes down and moment, when azure lock expires.


By the way, awesome folks from AgileHarbor (company behind the
SkuVault) agreed to make the project open-source under the New BSD
license. The project will be hosted on
[github](https://github.com/agileharbor/messageVault).

<blockquote>
New BSD License (or _3-clause BSD_) allows you almost unlimited
freedom with the code as long as you include the copyright
notice. You don't need to share your code. You cannot use the names
of the original company or its members to endorse derived products.
</blockquote>

## Evolution

Once we have MessageVault in place, we could start extracting some
view-based logic into new modules. This will help us:

* we reduce complexity of existing codebase;
* new modules are designed for new performance requirements, take off
  the load from the existing codebase;
* new modules (at least the ones with pure denormalization logic) are
  going to be brutally simple.

Eventually, we are planning to have SkuVault composed from the modules
like this one:

![.NET Micro-service](/images/2014-12-07-sku-vault__component.jpg)

In essence, this is an application of "event-driven micro-services"
paradigm to .NET environment.

SkuVault C# modules are probably going to be "larger" than equivalents
in erlang or golang. That is because C# .NET ecosystem is shaped by
_enterprise_ mindset. As a side-effect, everything tends to be bigger
on .NET: libraries, classes, variable names and build times.
