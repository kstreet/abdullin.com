---
date: 2014-11-17
title: "Getting started"
tags:
- design
- ddd
form: story
story: sku-vault
storyIndex: 101
---

In the beginning we discussed with Slav the most immediate challenges
related to software, maintenance and ongoing business growth.

* **Short-term** challenges revolve around _logging_ and _statistics_
aggregation.
* **Mid-term** challenges are about _scaling the software_ in response
to business growth and _improving performance_.
* **Long-term** objectives: _simplifying the design_ of front-end and
back-end, making it easier to add some required features.

## Logging and Statistics

**SkuVault generates hundreds of megabytes of logs each day**, mostly
related to integrations with 3rd party systems. At the moment they are
just saved to local storage on back-end worker roles (there are many
instances running).

Slav wants to bring these logs into one central place for searching
and convenient audits. Given the sheer size of logs, he was interested
in ElasticSearch and Kibana. They are already used in the industry
with a great success.


> [ElasticSearch](http://www.elasticsearch.org) is an open source,
> distributed, real-time search and analytics engine. Kibana is
> ElasticSearch’s data visualization engine.

The only trouble would be about feeding logs from the numerous Azure
Worker Roles to one central location. We want to have an easy interop
with .NET code, ability to perform logging even if ElasticSearch
server is not available. Ideally, everything should work
out-of-the-box, reusing existing solutions.

I performed a quick background check for the stack and
interoperability with the existing software.  For log ingestion we
could use Mozilla Heka, launching a daemon on each worker role to
ingest log files produced by `NLog`.

> [Heka](http://hekad.readthedocs.org/) is a high-volume logging
> infrastructure developed by Mozilla. It is written in go and hence
> requires very little resources. It runs as a statically compiled
> native code on many Operating Systems and processors.

Another alternative for log ingestion is
[Logstash](http://logstash.net) (the most popular one, part of ELK
stack). However Heka seems to be a better fit, because:

* It runs as a native code and doesn't require any runtime (Logstash
  is JRuby), making it easier and cheaper to launch inside Azure
  Worker Roles.
* Heka can accept StatsD protocol out-of-the box, forwarding
  performance metrics to something like Graphite.
* Heka is a drop-in replacement for Logstash.

Drawback of running Heka: it is a newer project with less production
exposure and fewer plug-ins. However, if Heka doesn't work for some
reason, replacing it with logstash is straightforward.

## Performance Metrics

**Improving performance and scalability of SkuVault** is an important
concern. In order to do that in the most effective manner,
we need to answer following questions:

* What are the biggest bottlenecks and how exactly do they affect
  software?
* How do our code changes change performance (if they do)?

These **answers have to be based on real data** - performance timers
and counters from the software running in production.

Fortunately, Heka does support StatsD format over UDP and there is a
.NET library for sending metrics this way.

> Reporting performance metrics via UDP is used frequently in
> software. It is fast and doesn't slow down the software
> much. Besides, UDP is fire-and-forget: if the statistics aggregating
> process goes down, this will not affect actual application.

This week I'll spend a few hours to setup a dedicated Windows Azure VM
with ElasticSearch, Kibana and Graphite. Then I'll produce a sample
Azure Worker Role, configured to send logs and statistics to that
server through Heka.

Team at SkuVault will then take their time to reconfigure existing
servers to publish logs and stats to this new infrastructure. Ideally,
that would require minimal changes to the existing code.

Then, we could use captured data to **understand behavior of the
system, reason about it and plan next steps**.
