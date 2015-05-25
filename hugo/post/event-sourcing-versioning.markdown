---
aliases:
- /event-sourcing/versioning
date: 2011-09-26
tags:
- xLim
- DDD
- CQRS
- Domain Event
title: Event Sourcing - Versioning
---
A while ago we've started talking about the basics of event sourcing and reasons when to use it (or not to use it). Let's proceed to the most frequent question related to this subject: How exactly do we handle changes in event contracts: renaming fields, adding new members or even performing a complete refactoring.

## Contracts

**Event contract** is simply a definition of event, that could explain how to serialize some object into a transportable data structure and then rehydrate the object back. Usually contracts are defined as POCO classes. For example, here's one option:

    [DataContract]
    public partial class RequestPaypalPayment : ICommand<PaymentId>
    {
        [DataMember] public PaymentId Id { get; set; }
        [DataMember] public InvoiceDefinition Definition { get; set; }
        [DataMember] public Email Billing { get; set; }
    }

Logical meaning behind the contract (how the name is chosen, what fields are used etc) comes from the world of Domain-Driven Design, applied to CQRS and Event sourcing.

The problem comes from the fact, that it's nearly impossible to get these contracts right from the first attempt in building a system. And even if you manage to, there is a significant chance that our own perception of domain model will change, creating the need to adjust the contract as well.

So **contracts change**. These changes can break our ability to read previously saved events (and previous history can easily go years back), or cause logical data corruption.

Let's go over various types of changes in contracts and ways to handle them.

## Minor Corrections

The easiest kind of change to event contracts deals with correcting typos and changing naming of class members. All these are completely painless and transparent, if your contract serializer is evolution-friendly. 

For instance, in you can use Google ProtoBuf Serializer, which does not care about names, relying on integral tags instead. In .NET world POCO contract would look like:

    [ProtoContract]
    public partial class RequestPaypalPayment : ICommand<PaymentId>
    {
        [ProtoMember(1)] public PaymentId Id { get; set; }
        [ProtoMember(2)] public InvoiceDefinition Definition { get; set; }
        [ProtoMember(3)] public Email Billing { get; set; }
    }

By the way, there is an interesting trick with this serializer. Instead of using attributes from `ProtoBuf.dll`, you can leverage attributes of `DataContractSerializer`, which is a part of .NET BCL. This will make your contract libraries decoupled from non-BCL code (reducing change of dependency hell).

    [DataContract]
    public partial class RequestPaypalPayment : ICommand<PaymentId>
    {
        [DataMember(Order = 1)] public PaymentId Id { get; set; }
        [DataMember(Order = 2)] public InvoiceDefinition Definition { get; set; }
        [DataMember(Order = 3)] public Email Billing { get; set; }
    }

From now on, when we will be talking about event contracts, **simplified contract definition syntax** will be used. For instance the above contract could be represented as:

    PaypalPaymentReceived(PaymentId id, string paymentId, invoice, account, amount)

This explanatory syntax is not only more compact, but it could also be used to build actual contract classes for any platform, given a DSL parser. Alternatively, you can just pass them to a Junior Developer and he'll be able to code them in.

So the first type of changes to event contract deals with minor corrections (renaming members). Good serializer will handle this natively. If you don't have such serializer, or the change is more deep - you can use in-memory upgrader, discussed below.

## Enriching Events

More common versioning scenario with event contracts involves enriching events by adding new fields. Consider following event:

    UserDisabled(Guid id, string reason)

Imagine we have a system in production, that uses this event. However, at some point a request comes from the business to create a web view that would list names of disabled users for each account.

There are multiple approaches to solve this problem. Some of them involve writing complex read-models (capturing a wide variety of events in order to persist some additional info). 

However, it will be much easier if we were to publish this event:

    UserDisabled(Guid id, string reason, string name)

Given this definition, writing a view handler would be much easier. It is also quite easy to start publishing these events from the domain model. However, if we were to replay history to rebuild views, we would have events with `null` name.

That's where domain in-memory upgraders come to the rescue. They are responsible for encapsulating this upgrade logic. Upgraders are defined like implementations of this interface:

    public interface IUpgradeDomainEvents
    {
        IEnumerable<IDomainEvent> Upgrade(IDomainEvent @event, string messageId);
        DateTime DefinedOn { get; }
    }

Where `DefinedOn` is the hard-coded date on which this upgrader was implemented (this is used to order upgraders within the chain).

Actual upgrade method returns an `IEnumerable` to handle cases, when a single event is split into multiple events, or when we are compressing multiple events into one.

Implementations of these upgrade methods are usually located and distributed within the contracts library (so they are part of the schema). Any code (or a node in distributed system) that stores history events and reprocesses them later - could easily locate and load these upgraders by a simple reflection.

Potential implementation might look like:


    public class EnrichUserDisabled : IUpgradeDomainEvents
    {
        readonly IDictionary<Guid, string> _userNames = …
    
        public DateTime DefinedOn 
        { 
            get { return new DateTime(2011,10,4); }
        }
    
        public IEnumerable<IDomainEvent> Upgrade(IDomainEvent e, string id)
        {
            // if this is event with info, capture it.
            var named = e as UserNamed;
            if (null != named) 
            {
                _userNames[named.Id] = named.Name;
                yield return e;
                yield break;
            }
            // if this is target event - enrich it
            var d = e as UserDisabled;
            if (null != d)
            {
                if (string.IsNullOrEmpty(d.Name))
                {
                    yield return new UserDisabled(d.Id, d.Reason, _userNamed[d.Id]);
                    yield break;
                }
             }
             // otherwise just pass it through
             yield return e;  
        }
    }

Please keep in mind, that upgraders are just a convenience short-cut that prevents views (or any other event consumers) from being "contaminated" by logic to handle versioning of event contracts and their upgrades.

Since upgraders are a shortcut, we can discard them altogether This is done by taking existing event streams, running them through the upgraders and overwriting source streams with results.

## Deep refactoring

There are scenarios, when event has to be replaced completely or even split into multiple events. 

For example, after evolving our system, we might find out that `AccountRegisteredEvent` now becomes three distinct events:

* AccountCreatedEvent;
* UserAddedEvent;
* UserActivatedEvent.

`IUpgradeDomainEvents` can handle such cases as well. You just return three different events in this case:

    yield return new AccountCreatedEvent(e.AccountId, ...
    yield return new UserCreatedEvent(userId, e.AccountId, ...
    yield return new UserActivatedEvent(userId, e.AccountId, ...

Upgrader approach can also be used to **merge events**, if really necessary. You just need to push first event on the stack, when it comes, and then replace the second event with the result.
