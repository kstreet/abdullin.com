---
date: 2014-08-25
tags:
- DDD
- analytics
- Domain Event
title: Behavioral Analytics
---
## What is Behavioral Analytics?

**Behavioral analytics focuses on how users behave, and why.** This
covers a wide range of applications, starting from online shops and up
to connected devices in your smart home. **Deep understanding of the
behavior allows to optimize for future circumstances, serving
customers better or optimizing the use of resources**. There is a lot
of good that can be done here.

For example, a smart restaurant might use weekly visitor patterns,
combined with information about reservations and some forecasts to
plan for the daily cooking routine and product replenishment. Smart
online store could provide personalized product recommendations, just
like Amazon does (or do it even better). Smart houses can help to
reduce energy consumption or warn on various dangerous situations
(e.g. unexpected spike in energy consumption at night or unusual
person entering from the window).

## Design Requirements

Behavioral analytics is one of these areas where multiple interesting
software requirements are present at the same time:

- **responsive and high-load** (we don't want to degrade performance
during the holiday shopping rush);
- **personalized** (we need to track events at level of a single
  user);
- **large scale data mining** is required, since we have to process
all the accumulated date in order to create new models, verify them
and track their performance);
- **user interactions** have to be captured and quantified properly
in order to have some data to process.

All this might sound high-tech and complicated, however it is quite
easy to start approaching such problems. Devil is still in the
details, though.

It all starts with domain events.

## Role of Domain Events

User interactions with a system could be represented as a sequence of
events in a stream. For example, in online store we could have such
sequence:

{{% img src="events.jpeg" %}}

> The methodology of capturing such events is well-known and
> documented around the DDD related articles: event-storming, domain
> modeling sessions with experts, event-driven use cases etc. The
> story of [HappyPancake](/long/happypancake/) covers all benefits of
> that in great detail.

If a system emits events, these could be captured and persisted in an
event store, suitable for further processing and integration.

## Towards a Deeper Insight

With event store, it is quite easy to start using events for greater
benefit (aside from integrating different modules and 3rd party systems).

First of all, we could to set up a dashboard with various reports
derived from such events and updated in real-time. Or easier yet - we
could project events to some OLAP system and let managers slice and
dice the data as they see fit. Even Excel has such capabilities.

{{% img src="system.jpeg" %}}

Given this initial insight, domain experts could come up with
interesting ideas for improving user experience and getting more
revenue out of the system.

Then, we could run batch processing across the event streams
to verify new theories or fine-tune existing models. These could later
be expressed in form of rules that will run in real-time and interact
with users, reacting to their behaviors.

> Back in my economics R&D days I used to run evolutionary algorithms
> across historical datasets to capture dependencies between available
> data. This information was used to remove less relevant data from
> datasets and build refined models. They were used for forecasting
> and running various "what if" scenarios.

Not only we could execute various rules in real-time (with extremely
low latency), but we could adjust their behavior and verify them
through **A/B testing**. This approach, perfected by Amazon, involves
splitting user base into multiple groups and giving each group
slightly different experience. Nature of the experiment is recorded
along with the user behavior captured in events. These are later
compared to pick the most efficient approach.

With A/B testing you could verify various theories:

- What is the best location of an advertisement on a page?
- Which promotion offers for users buying product A drive more sales?
- Which room brightness is the most comfortable for people in the
  evening?

Evolutionary process of iterating over theories, models and real-time
rules is a reflection of a usual software development process to a
slightly different field. The purpose of this process is still the
same though: **gain deeper insight into the domain**. One might even claim
that the principles of domain-driven design could still apply here.

## To be continued

Behavioral analytics and its application to various aspects of our
life is something that interested me for a long time. I hope to continue
this topic in a series of posts.

If you have some comments, insights or interesting ideas to share,
please don't hesitate to get in touch.
