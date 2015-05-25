---
aliases:
- /event-sourcing/projections
date: 2011-09-26
tags:
- DDD
- CQRS
- Domain Event
- popular
title: Event Sourcing - Projections
---
Projection is an important concept while building event-centric systems. At the same time, it is extremely simple.

**Projection is about deriving current state from the stream of events**.

For instance, consider a situation, where a stream of events is published out by a server to all subscribers. These events are related to user registrations and look like:

    UserAddedToAccount 
    {
        UserId = 150,
        AccountId = 47,
        Username = "spam-me-not",
        RegistrationToken = "27fa3h…" 
    }

    UserVerifiedEmail
    {
        UserId = 150,
        Email = "rinat.abdullin@gmail.com"
    }
    UserRenamed
    {
        UserId = 150,
        NewName = "abdullin"
    }

We can attach a subscriber to stream of these events to project this stream into a persistent read model, used to serve user details in a Web UI. 

Final read model could look like:

    {
      "UserId": 150,
      "AccountId": 74,
      "Username": "abdullin",
      "Email": "rinat.abdullin@gmail.com",
      "RegistrationToken": "27fa3h..."
    }

And projection logic could look like this (in pseudocode):

    if (e is UserAddedToAccount)
    {
        store.Save(new UserView
        {
            UserId = e.UserId,
            AccountId = e.AccountId,
            Username = e.Username,
            RegistrationToken = e.Token  
        });
    }
    if (e is UserVerifiedEmail)
    {
        var view = store.Load<UserView>(e.UserId, Lock.Enforce);
        view.Email = e.VerifiedEmail;
        store.Update(view);
    }
    // etc

As you can see, this pseudo-code is rather straightforward (and quite boring). It probably uses something like ORM to do the actual persistence.

However, there is an important concept behind this simplicity. **Given the stream of events, we can project them to any structural representation**. _Structural representation_ here refers not only to the schema of a read model, but also to the implementation details of how this model is stored and accessed. 

Here are some possibilities:

* SQL database (MS SQL, mySQL, Postgres or any other relational database, including cloud counterparts like Azure SQL or Amazon RDS);
* NoSQL database (CouchDB, MongoDB, RavenDB or any other document database);
* No database (serialized files on a file system, including cloud counterparts of Amazon S3, Azure Cloud Storage or Rackspace CloudFiles);
* No persistence (blazing-fast in-memory store, which is rebuilt from local event stream whenever server is rebooted).

Obviously, in either way these read models will **always be kept-up-to-date**. Since, we are projecting new events to the read model, as soon as they come in. In a sense such read models are nothing more than an **almost perfect cache** (the one that is updated as soon as the change comes in).

Now consider the fact that we can multiplex event stream and have multiple similar projections subscribed to it in parallel. This is the reason, why we can have **almost-infinite scalability on read side** with our projected read models.

Another reason why projections are important: exactly the same concepts apply not only to the persistent read models, but also to aggregate roots implemented with event sourcing. **An aggregate root can have it's own private state, which is projected from the same events that it creates**. These similarities help to make event-centric distributed systems to look more simple and consistent.

## Terminology 

Let's get our terminology straight.

**Projecting** is process of converting (or aggregating) a stream of events into a structural representation. This structural representation (which is being updated as we traverse the stream) can be called many names: persistent read model, view or a state.

Process of projecting is executed by a set of **event handlers**, which essentially are just methods executed whenever a specific type of event comes in. These methods perform CRUD operation upon the persistent read model.

For the convenience, we will be grouping all event handlers into **projection classes** based on the read model that they are working with.

## Simple Scenario

Let's talk explore writing and managing projections on a simplified scenario (which actually works in practice for the majority of projects in cloud and on premises). It is based on assumption, that each read model is a single document that can be accessed and modified as a whole.

For instance, in a simple task-tracking system you could have following read models (which map to the screens in different UIs):

* TodoListView - single document listing all tasks that are yet to be done
* TaskDetailView - a document per task with all the details
* TasksPerDayView - a document per day, that lists all tasks scheduled for a given day.
* TasksCompletedLastMonth - a document of tasks that were completed last month.

The list can go on. It's actually not that relevant, since we can always add new projections and reconstruct read models by running event history through.

Here's how the projection class might look like:

    TODO: Projection class from FarleyFile

If you have been working with service buses, you would notice familiar `IConsume` interface. It is a marker interface that is recognized by infrastructure, which will be responsible for calling appropriate methods, whenever the corresponding event comes in. Obviously, the entire auto-wiring could be replaced by a little bit of manual code as well.

The only new interface here is IAtomicWriter, which can be defined as: 

    public interface IAtomicWriter<in TKey, TEntity>
    {
        TEntity AddOrUpdate(TKey key, Func<TEntity> addFactory, Func<TEntity, TEntity> update);
        bool TryDelete(TKey key);
    }

As long as your persistence supports these two methods, you can 

The only subtle moment here is the atomicity of the updates. We should be able to write updated view if somebody else has already modified it in parallel. Fortunately, this is supported by the majority of persistence providers. Relational databases provide transactions, while no-sql systems feature either conditional operations (as in "update if version is still X") or  provide direct support for simple atomic changes.



## Rebuilding

Quite often you would want to change your projections or add completely new ones to the system. Obviously we would want to go back in time and make everything look like these changes were there since the beginning of time.

This is where replaying events come into play.

In order to be able to do that, we should set up our system to record all passing events into a separate event log for the domain. This **event log is completely separate from aggregate event streams** (should these be used in the system). It's sole purpose is to simplify event replays for projections.

To do that we simply add an additional subscriber that would listen to all events and append them to that log:

    if (!log.TryAppend(streamer.SaveEnvelopeData(message)))
        throw new Exception("Failed to save to domain event log");
Whenever time comes to rebuild a certain projection, you could stop the system (this could be done without stopping, but the procedure would be a bit more complex then), drop all view models and then recreate them by pushing events through the projections once more.

If you are using some simple persistence for your views (i.e.: documents, files or blobs), then the procedure could be simplified by a bit.

1. Download latest domain event log (or simply sync local copy with the remote version)
2. Manually wire up projections to use local store (files or even memory) for persisting view models. Normally this is done in a helper tool without any bus or messaging infrastructure. We just sequentially read messages from file and pass them to the manually constructed instances of projection classes.
3. Once the rebuild is complete, upload views to the new container in production, overwriting the old views.

Obviously this works for a simple systems with low traffic, ones that can be stopped while we perform upgrades. However, if needed, an upgrade can be performed with zero (or little downtime). It involves having parallel deployments for the client and projection hosts. We will have:

* `ProjectionHost_v1` - a subsystem that projects incoming events to a store `Views-v1`. There will be a `Client-v1` (ie UI) configured to use `Views-v1`. 
* `ProjectionHost_v2` - a subsystem that uses store `Views-v2` but is currently empty. `Client-v2` wil be configured to use that store.
* Load balancer will be configured to redirect all web requests to `Client-v1`.

We perform upgrade by:

* Bring `ProjectionHost-v2` online and subscribe it to events queue (but do not consume yet, just keep in memory).
* Tell `ProjectionHost-v2` to run all events from the domain event log, and afterwards start consuming all events from the events queue (there is a subtle chance of message duplication here, that will be handled by the sliding cache).
* Once projection host catches up with all the events, we simply tell LoadBalancer to switch from `Client-v1` to `Client-v2`. Afterwards all `v1` elements could be dropped.

> TODO: mention role of upgraders
> TODO: separated from bounded contexts

## Technological Options

> TODO: Cloud Flavor, Local persistence, in-memory analysis and rebuilding, NoSQL and SQL

> TODO: use http://abdullin.com/journal/2011/1/19/scalable-and-simple-cqrs-views-in-the-cloud.html
