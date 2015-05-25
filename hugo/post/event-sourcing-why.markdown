---
aliases:
- /journal/2011/9/26/why-event-sourcing.html/index.html
- /event-sourcing/why
- /event-sourcing/
date: 2011-09-26
tags:
- xLim
- DDD
- CQRS
- Domain Event
- popular
title: Why Event Sourcing?
---
Event Sourcing is a concept that becomes increasingly popular day by day. Even ThoughtWorks has brought it into it's [latest Technology Radar](http://www.thoughtworks.com/articles/technology-radar-july-2011). Let's do a quick overview of ES one more time.

# Why Event Sourcing?

In essence event sourcing is about persisting data in a way that _preserves every single bit of information_. It's about **representing objects as a sequence of events** that took place through the time and led them to the current state.

For instance, if I were to persist information about my pocket money (i.e.: 67 EUR), I could simply save the latest state somewhere in a variable or database:

    Balance: 100 EUR

Now, whenever there is a change, we would overwrite this value with the new value (discarding the previous one). Then at some point in time we will have something like this:

    Balance: 67 EUR

Simple and elegant (and works perfectly in a large number of scenarios). However, we are performing a logical compression here (lossy one) and discarding some information. Let's see what would happen if we were to **preserve all the changes**:

    Got from ATM: 100 EUR
    Bought metro tickets: -12 EUR
    Grabbed a lunch: -8 EUR
    Found a coin: 1 EUR
    Took taxi: -14 EUR

Obviously, if we have such a sequence of events, we can always "reconstruct" the current balance, by doing a total:

    Balance: 100 - 12 - 8 + 1 - 14 = 67 EUR

In essence, the final state (Balance) is a left-fold function of the previous states (equivalent of `IEnumerable.Aggregate` in .NET, `std::accumulate` in C++ or `array.reduce` in JavaScript).

Now, you might ask yourself a question - _What's the point in storing all these intermediate steps, when you can just save the final balance?_ This way of persistence via event sourcing possesses some really interesting features. Below are some of these.

> By the way, if you are asking yourself about the performance of such an approach to storage, don't worry. It can easily beat relational databases in both scalability and throughput (ceteris paribus).

## Storage Ignorance

It is really easy to save data as a stream of events. All we need is to define POCO ([Plain Old CLR Object](http://en.wikipedia.org/wiki/Plain_Old_CLR_Object)) classes (one for each event) and then serialize them to one of many formats available: Google ProtoBuf, JSON, Binary, XML etc.

Now, before you say that it takes to much code to define events:

    GotMoneyFromAtm! (amount, transaction, time)
    BoughtMetroTickets! (count, amount, machine, time)
    GrabbedALunch! (amount, cost, time, menu, place)
    FoundACoin! (amount, gps, time)
    TookTaxi! (amount, rideDuration, taxiCompany, route, time)

That's how the definitions could look like for C# language, if you used some T4 of Visual Studio (see [code contracts](http://abdullin.com/journal/2010/10/12/teach-visual-studio-your-own-language-easy.html) explanation).

## Flexibility

Given the sequence of events, we can project them to any desired structural representation. This is an extremely important feature. For instance, we could write a projection that would summarize all our expenses and produce the latest balance.

However, we can do much more:

* Generate list of cities, in which coins can be found most often.
* Get a list of taxi companies that are the cheapest ones or fastest ones.
* List TOP 5 favorite places for having a lunch on Monday.

What's more interesting, we don't need any really complex queries in order to do that. Writing event projections (at least in C#) is something that is quire boring. Try doing that if you have just a single field of Balance, or even if you had a list of changes (credit/debit).

However, as long as you have a steam of events, you can project it to any form, even a conventional SQL database. For instance, my favorite approach is to project event streams into JSON documents stored in a cloud storage [Read more](http://abdullin.com/journal/2011/1/19/scalable-and-simple-cqrs-views-in-the-cloud.html)...

## Messaging Capabilities

Events represent a serializable and immutable data structures that are appended to an append-only stream. As such, they share all the capabilities of messages. So we can:

* Multiplex them to multiple subscribers (i.e.: have a list of 5 last restaurants visited by Lady Gaga; while keeping that list up-to-date and continuously replicated around the globe to load balance the pressure of fans).
* Implement redundancy and reliability (i.e.: write events to 3 different locations at once, where we have 1 master and 2 slaves).
* Support load-balancing (competing consumers) and parallel processing.
* Support incremental sync that fits in a few lines of code.

Here are these lines of code from the production system (we are replicating from `remote` to `cache`):

    var next = _cache.GetCurrentVersion();

    while (true)
    {
        var items = _remote.ReadRecords(next, BatchSize);
        if (items.Length == 0)
            break;

        next = items.Max(m => m.Version);

        _cache.AppendNonAtomic(items);
        logger(string.Format("Loaded {0} records", items.Length));
    }

Of course, in a more conventional system (that does not employ event sourcing) you can leverage something like [SQL Replication](http://www.techrepublic.com/blog/howdoi/how-do-i-configure-transactional-replication-between-two-sql-server-2005-systems/123) or [Microsoft Sync Framework](http://msdn.microsoft.com/en-us/sync/bb821992).

## Improve performance

Truth to be told, performance and scalability aspects are a by-products of inherent capabilities offered by event sourcing approach. In essence, we can get almost-infinite scalability on reads with blazing throughput and no deadlocks. All this is attributed to the following facts:

* events can be published as soon as they happen;
* it is dead-easy to precompute read models from the events (do a projection to some desired state);
* events can be processed in parallel;
* events can be multiplexed to multiple subscribers, where each one could maintain it's own copy of some read model.

> What is a read model? "Balance" is one sample of a read model; "List of favorite Gaga's restaurants" is another one. Essentially read model is some view (precomputed result of an SQL Query in SQL World).

Since we have more flexibility with projecting events and passing them around, we can easily do more interesting things, reaching up to the speeds of LMAX (which was [described by Martin Fowler](http://martinfowler.com/articles/lmax.html)):

* Keep read models (precomputed query results) directly in memory in some [MemCached](http://memcached.org/) instances (if server goes down, we can always repopulate cache from the history of the events).
* Run multiple processing units in parallel (if any one goes down - switch to the backup).
* Benefit from the real-time signal processing knowledge of robotics and critical systems (imagine, what could do an [FGPA](http://en.wikipedia.org/wiki/Field-programmable_gate_array)/[ASIC](http://en.wikipedia.org/wiki/Application-specific_integrated_circuit) optimized for parallel processing of events).

## Simplify Developer's Life

There are a few more interesting aspects of event sourcing:

* Simplifies deployment and maintenance (less SQL, upgrade scripts and versioning).
* Reduces expenses on both the hardware and software (no need to have extremely powerful and redundant servers or commercial databases).
* Integration between systems is more straightforward (all [Enterprise Integration Patterns](http://www.eaipatterns.com/) apply here directly).
* Since no data is ever lost, we gain full audit (plus the ability to go back at any point in time) and excellent debugging capabilities.
* Event Sourcing is a natural fit for software developers that want to capture the essence of business domains (especially the most complex ones) while staying decoupled from platform complexity or hard performance issues.
* ES approaches help to provide clear answers to some of the new challenges brought to us by the market and technology: Cloud Computing, Big Data processing, Mobile and occasionally connected systems, real-time business intelligence.

There also are some **financial and political benefits for project stakeholders** to be interested in. They all revolve around the ability to have better flexibility in project delivery, managing resources and risks.

Ability to keep things simple, defer important decisions and adapt business solutions can be a powerful enabler in large conservative organizations. Smaller companies (such as lean startups) can also gain more competitive advantage and reduce time-to-market with such approaches.

However, here we are getting already in the area of synergy effects with [CQRS/DDD](/tags/cqrs/) methodologies and their practical application to distributed environments (esp. clouds). This is a topic for a different blog post or a talk.


## Downsides

Obviously, **Event Sourcing is not a silver bullet**, it is just a different approach to think and represent changes and data. If you are a C# or C++ developer, then this feels like going back to assembler. If you are a project manager - it's like consciously going back from Microsoft Project Server to task lists and custom budgeting software.

This explains why there are quite a few problems with this approach.

**Defining these events is a complex art** of it's own, which requires skills in domain modeling (hint: if you have a lot of events with following words in their names, then you are doing something wrong: Create, Insert, Update, Delete, Set, Change, Add). Domain-Driven Design (as both a book and a body of knowledge) is an entry point into this skill.

There is **little software and hardware to support event sourcing**. Luckily, we need much less of that (as compared to SQL/NoSQL), but still. In the next few years we will see interesting solutions in this field.

At the time being, there is even bigger **lack of information and guidance** on this body of knowledge (to be fixed within the next year).

Since we have limited information, acceptance and software, naturally there is a **limited number of experienced developers** with true DDD/ES skills.

All these downsides are quite surprising, since the actual principles behind event sourcing are extremely old; they have been discovered and applied in multiple areas over and over again. Even the replication of SQL (transaction logs) uses similar principles.

## Concerns

There are a few additional concerns that might look like downsides of approach, but in fact are not that important.

**Extra storage costs** - are usually negligible, when compared to the business value that might be created. For instance, cost of storing 200k events in the cloud is roughly 10 cents per month. Oh, and I've counted this one 10 times just for the sake of having 10 replicas in different data centers for redundancy. If this negligible cost would have saved me at least a few days of development, then this could be a bargain. However, event sourcing saved much more than that.

**Slower performance** is not an issue, since we can optimize IO via snapshotting and persistent read models. And leveraging push-based nature of events, we can get immediately invalidating caches. In short, there are multiple technical solutions that could be _plugged later_, if there is such need.

**Fragility** (loosing an event in the past causes the entire stream to be corrupt) is not an issue, since you can determine yourself the levels of SLAs to go for (via replication and redundancy). Corruption in any single replica can be reliably detected using git's approach: event includes SHA1 signature computed against it's contents and signature of the previous event.

**Versioning** is sometimes perceived as a problem, since our systems tend to grow and event contracts (schemas) can gradually evolve to new formats that are incompatible with the old saved events. Yet, if approached consciously this can be solved (and solution is more elegant and simple than SQL migration scripts). I use a combination of 3 elements here:

* Using **serializer that is evolution-friendly** (i.e.: [Google ProtocolBuffers](http://code.google.com/apis/protocolbuffers/) is not only among the fastest serializers, it also allows you to rename class members without breaking anything).
* Using **in-memory upgraders** which are simple classes stacked on top of the event streams for replays and accessing history. They can split, merge, convert events or even fill in missing fields (if this data is available in the other events). Upgraders are just a lazy and quick replacement for rewriting the entire event stream history completely.
* Using **careful event modeling** (which is usually based on the Ubiquitous Language coming from DDD) to define events in a way that they will rarely change a lot (they will be based on concepts that do not change, no matter how their relations evolve).

## Further Reading

If I haven't scared you enough with the downsides of Event Sourcing, here is some further reading.

**CQRS Info by Greg Young**:

* [Events as a storage mechanism](http://cqrs.wordpress.com/documents/events-as-storage-mechanism/)
* [Building Event Storage](http://cqrs.wordpress.com/documents/building-event-storage/)
* [CQRS and Event Sourcing](http://cqrs.wordpress.com/documents/cqrs-and-event-sourcing-synergy/)

**A few of my own articles**:

* [Event Sourcing a la Lokad](http://abdullin.com/journal/2011/6/26/event-sourcing-a-la-lokad.html)
* [Scenario-based Testing for Event Sourcing](http://abdullin.com/journal/2010/9/17/scenario-based-unit-tests-for-ddd-with-event-sourcing.html) (and old article, to be replaced by a proper one on BDD testing).

**Some more materials**:

* [Event Sourcing and CQRS, Let's use it](http://thinkbeforecoding.com/post/2009/11/02/Event-Sourcing-and-CQRS-Lets-use-it) by Jérémie Chassaing (recommended read for C# guys)
* Really nice [EventStore](http://blog.jonathanoliver.com/2011/09/cqrs-eventstore-v3-0/) framework for .NET by Jonathan Oliver.
* Look for Event Sourcing within the [CQRS Starting Point](/tags/cqrs/) (there even are some reference implementations)
* Listen to the [distributed podcast](http://distributedpodcast.com/).


## Stories

As nicely said by *Mike Nichols* in DDD/CQRS mailing list:

<blockquote>

<p>My experience has been that ES and its promotion of
business semantics over technological terms has a way of bending my
mind toward modeling behaviors rather than essence.</p>
<p>
It also lets me avoid the ceremony of modeling state that doesn't contribute to behaviors.
</p>
<p>I see this as a good thing and as a side effect I probably use language the business person understands more.</p>
<p>I just can't find a reason to use ORM in my domain anymore. ES seems to let me more rapidly model ... having a change log/audit trail is about the furthest thing from my mind when I reach for it.</p>
</blockquote>
