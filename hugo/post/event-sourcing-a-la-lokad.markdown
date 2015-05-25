---
aliases:
- /journal/2011/6/26/event-sourcing-a-la-lokad.html/index.html
date: 2011-06-26
tags:
- xLim
- Lokad
- Azure
- Cloud Computing
- DDD
- CQRS
- Domain Event
title: Event Sourcing a la Lokad
---
<p>I've seen quite a few ways of doing Aggregate Roots and event sourcing. Here's the dead simple approach that works for me. </p>

<p>For the sake of simplicity, we logically separate aggregate root (event generation from commands, given certain internal state to make the decisions) from the aggregate state (building state from the events).</p>

<pre><code>public interface IEvent {}
public interface ICommand{}

public interface IAggregateState
{
    void Apply(IEvent e);
}
public interface IAggregateRoot
{
    void Execute(ICommand c);
}
</code></pre>

<p>Given that, an <strong>aggregate state looks like a view handler</strong>, while <strong>aggregate root itself resembles a command handler</strong> (from the scenarios, where ES is not employed at all). That's actually the point.</p>

<p>Let's define a simple aggregate, that tracks opened bills for the customer. First, we define contracts for our commands and events (I'm using a <a href="http://code.google.com/p/lokad-message-contracts-dsl-sample/" target="_blank" class="offsite-link-inline">VS T4+ANTRL Combo</a> here to avoid writing message contract classes by hand or bloating this post):</p>

<pre><code>let customerId = CustomerId CustomerId;

CreateBill? (customerId, DateTime startDateUtc)
BillCreated! (customerId, DateTime startDateUtc)

CloseBill? (DateTime closeDateUtc)
BillClosed! (customerId, DateTime closeDateUtc)

AddServicesToBill? (int serviceCount)
ServicesAddedToBill! (int serviceCount)
</code></pre>

<p>Then, we proceed to write the aggregate state. It should know, how to build itself from the events.</p>

<pre><code>public sealed class BillAggregateState : IAggregateState
{
    public CustomerId Customer { get; private set; }
    public DateTime Opened { get; private set; }
    public DateTime Closed { get; private set; }
    public int Services { get; private set; }

    public void Apply(IEvent @event)
    {
        RedirectToWhen.InvokeEvent(this, @event);
    }
    public void When(BillClosed e)
    {
        Closed = e.CloseDateUtc;
    }
    public void When(BillCreated e)
    {
        Customer = e.CustomerId;
        Opened = e.StartDateUtc;
    }
    public void When(ServicesAddedToBill e)
    {
        Services += e.Services;
    }
}
</code></pre>

<p>The only "magical" place here is the RedirectToWhen helper, which is actually quite simple (<a href="https://gist.github.com/1047419">see gist</a>).</p>

<p>Given the state, we can define our aggregate as:</p>

<pre><code>public class BillAggregate : IAggregateRoot
{
    readonly BillAggregateState _state;
    readonly Action&lt;IEvent&gt; _observer;

    public BillAggregate(Action&lt;IEvent&gt; observer, BillAggregateState state)
    {
        _state = state;
        _observer = observer;
    }
    void Apply(IEvent e)
    {
        _state.Apply(e);
        _observer(e);
    }
    public void Execute(ICommand c)
    {
        RedirectToWhen.InvokeCommand(this, c);
    }
    public void When(CreateBill bill)
    {
        Apply(new BillCreated(bill.CustomerId, bill.StartDateUtc));
    }
    public void When(AddServicesToBill c)
    {
        Apply(new ServicesAddedToBill(c.ServiceCount));
    }
    public void When(CloseBill e)
    {
        Apply(new BillClosed(_state.Customer, e.CloseDateUtc));
    }
}
</code></pre>

<p>Having said all that, here's how the "event sourcing magic" actually works:</p>

<pre><code>IEnumerable&lt;IEvent&gt; givenEvents = ...;
IEnumerable&lt;ICommand&gt; whenCommands = ...;

// load state from the event history
// or, if you have snapshot - load it here first
// we will not do the latter here
var state = new BillAggregateState();
foreach (var e in givenEvents)
{
    state.Apply(e);
}    
var thenEvents = new List&lt;IEvent&gt;();
var ar = new BillAggregate(thenEvents.Add, cs);
foreach (var c in whenCommands)
{
    ar.Execute(c);
}
// do something with the events that were produced.
// for example - append them to the history and then publish in async
// or do both at once and face 2PC
return thenEvents;
</code></pre>

<p>That's, basically, it. Note, that we are not relying on any frameworks, code or interface definitions outside the scope of this article.  A few caveats:</p>

<ul>
<li>aggregate identities are carried outside of the commands/events and passed by the message bus via strongly-typed message contexts (see <a href="http://code.google.com/p/lokad-cqrs/downloads/list" target="_blank" class="offsite-link-inline">Lokad CQRS PDF</a> for detail). Aggregates don't care about their own identity.</li>
<li>versioning and version checks are not within the scope of this article, yet they could be added to the snippet above as needed.</li>
<li>all commands that come in, are joined by a logical transaction; obviously your message bus must support command batching in order for this to work.</li>
</ul>

<p>This is the current approach of Lokad to Event Sourcing in the distributed world. It's likely to evolve a bit further, if we find ways to make it even more simple and straightforward.</p>

<p>BTW, the situation gets even more interesting if we assume that:</p>

<ul>
<li>all messages (commands and events alike) carry unique identifier that is used at all steps of message processing to enforce message deduplication (required for repartitioning or cloud environment in general).</li>
<li>entity identities (i.e.: aggregate root identifiers) that are carried in the trasport headers, not only simplify our contracts (while still being exposed to the domain code in a decoupled way), but also provide simple foundation for message routing and aggregate re-partitioning.</li>
<li>if we keep track of the message causality (event X was caused by command batch Y) in the transport headers along with client vectors, this provides us with the foundation to do partial message ordering (for the cases where cloud environments are really stressed and tend to mess up order a lot).</li>
</ul>

<p>This topic is continued in the post on <a href="http://abdullin.com/journal/2011/7/4/tape-storage-in-lokadcqrs-for-event-sourcing.html">Tape Storage</a>, which serves as persistence foundation for event sourcing and also enable fully portable systems to be <a href="http://abdullin.com/journal/2011/7/4/fully-portable-scenario-in-lokadcqrs.html">developed and deployed with Lokad.CQRS</a>.</p>

