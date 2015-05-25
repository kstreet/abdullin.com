---
aliases:
- /journal/2010/9/9/the-best-way-to-learn-cqrs-ddd-and-event-sourcing.html/index.html
date: 2010-09-09
tags:
- xLim
- DDD
- CQRS
title: The Best Way to Learn CQRS, DDD and Event Sourcing
---
<p>The best way to learn something by heart is to try to reinvent it yourself. You'll either give up or will learn all the problems and trade-offs  really well. That's what I'm planning to do, while sharing my thoughts and practical experience with you.</p>

<p>To catch up with <em>Command-Query Responsibility Segregation</em> you can check out the <a href="/tags/cqrs/"><strong>Getting Started</strong> with CQRS</a> (includes videos, sample project references and articles by brilliant people like Greg Young and Udi Dahan). Ultimately my own articles, thoughts and notes from the production will go into the <a href="http://abdullin.com/xlim/">xLim 4: CQRS in Cloud</a> series.</p>

<p>Ok, let's get started.</p>

<p>So far the <em>learn by doing</em> approach had been working extremely well for me. At the moment I'm learning how to make CQRS solutions leverage their potential by going the path of the Domain-Driven Design and Event Sourcing and while keeping in mind constraints of the infinitely scalable systems by <a href="/pat-helland/">Pat Helland</a>. I'm also trying CQRS outsourcing potential (or rather potential for efficiently distributing development effort in parallel) and attempt to figure out methodology of continuously integrating DDD/ES solutions with the legacy CRUD systems. Latter is really important since, that's what I've been doing a lot recently in <a href="http://abdullin.com/journal/2010/5/29/salescast-scalable-business-intelligence-on-windows-azure.html">Salescast</a>.</p>

<p>All this goodness just requires getting at least one more developer, Mercurial repository and spending a few evenings building your spike project and evolving it.</p>

<p>This teaches a lot. Yet sometimes development just happens to deviate away from the common design patterns (for "common" - see Reference Implementations of Greg and Mark in the <a href="/tags/cqrs/">CQRS section</a>). In a strange way. </p>

<p>That's how my command handlers look like:</p>

<pre><code>public sealed class ProjectHandler : IHandleCommands
{
  readonly EventStorePartition _store;

  public ProjectHandler(EventStorePartition store)
  {
    _store = store;
  }

  public IDisposable Subscribe(IQbservable&lt;DomainCommand&gt; observable)
  {
    return observable
      .WherePartitionIs(_store.Partition)
      .Subscribe(Handle);
  }

  void Handle(DomainCommand d)
  {
    _store.Update&lt;ProjectAggregateRoot&gt;(
      d.AggregateId, 
      r =&gt; DomainInvoker.RouteToDo(r, d.Command), 
      d.Command is CreateSolution);
  }
}
</code></pre>

<p>Or if we need to ensure for this AR that commands should not be based on stale data, then Handle transforms to:</p>

<pre><code>void HandleWithConcurrencyCheck(DomainCommand d)
{
  _store.Update&lt;ProjectAggregateRoot&gt;(
    d.AggregateId,
    r =&gt; {
        if (d.Version != r.Version)
          throw new InvalidOperationException(
             "Uhm. Root was changed since client last saw it");

        DomainInvoker.RouteToDo(r, d.Command);
      },
    d.Command is CreateSolution);
}
</code></pre>

<p>Event handlers suffer in the same way. Yet they potentially benefit from IQbservable even more, since we could <em>theoretically</em> <strong>filter interesting events at the server</strong>, by using <a href="http://channel9.msdn.com/shows/Going+Deep/Bart-De-Smet-Observations-on-IQbservable-The-Dual-of-IQueryable/" target="_blank" class="offsite-link-inline">.NET Observable Query Provider</a> capable of instructing AMQP server to send us (this specific event handler running within this partition) only specific events for this partition.</p>

<p>Another interesting thing is how <strong>event store</strong> looks like, when developed in .NET 4.0 with the observable goodness:</p>

<pre><code>// read events from file within partition
// ... skipped...
var subject = new Subject&lt;Change&gt;();
var aggregateRoot = (TAggregateRoot) factory(subject);

// apply events to domain
foreach (var change in history)
{
  aggregateRoot.Apply(change.Event);
}

// subscribe to any changes produced by our actions
var newChanges = new List&lt;Change&gt;();
using (subject.Subscribe(newChanges.Add))
{
  update(aggregateRoot);
}

// nothing changed
if (newChanges.Count == 0) return;

try
{
  // turn changes into domain events capable of crossing partition boundaries
  var events = newChanges
    .Select(c =&gt; new DomainEvent(id, c.Event, c.Version, DateTimeOffset.Now))
    .ToArray();
  // naive approach to persisting event history for now. Easy to improve
  var allEvents = history.Concat(events).ToArray();
  storageItem.Write(stream =&gt; _formatter.Serialize(stream, allEvents), condition);
}
catch (StorageConditionFailedException ex)
{
  // normally this should never happen, since commands are processed by a single
  // processor per partition, but just in case...
  var msg = string.Format("Record was modified: '{0}'; Id: '{1}'", type, id);
  throw new OptimisticConcurrencyException(msg, ex);
}
</code></pre>

<p>Yet one more interesting thing is how easy it turns out to <strong>turn CQRS solution</strong> with a message server (Erlang-powered RabbitMQ, for example) into a <strong>desktop application</strong> with in-memory event bus. You just need to swap messaging libraries with ConcurrentQueue from .NET 4.0, swap partitionable event and view storage for file-based and ask .NET 4.0 TPL to keep pumping events and commands, while the application is running:</p>

<pre><code>var commands = new ConcurrentQueue&lt;DomainCommand&gt;();
var events = new ConcurrentQueue&lt;DomainEvent&gt;();

var data = new FileStorageContainer("data").Create();
var views = new FileStorageContainer("views").Create();

var cts = new CancellationTokenSource();

var sender = new DelegateSender(commands.Enqueue);
var viewStore = new ViewStore(views);

using (var form = new Form1(sender, viewStore))
{

  var tasks = new List&lt;Task&gt;
  {
    Task.Factory.StartNew(() =&gt; ProcessCommands(commands, events, data, cts.Token, form.Replay)),
    Task.Factory.StartNew(() =&gt; ProcessEvents(events, views, cts.Token))
  };

  Application.Run(form);

  cts.Cancel();
  Task.WaitAll(tasks.ToArray());
}
</code></pre>

<p>Essentially this proved to me that CQRS architecture (or some portions of it) can be bundled into a single Windows Forms Application (or whatever desktop UI you are using), scaling everything down to a single process and keeping event bus, event and command handlers inside. What's more important, all these processes still run in different threads (effectively leveraging multi-core capabilities to pre-render views), yet they are simple to understand and isolate (I didn't have a single UI threading issue, which tend to show up frequently whenever I start developing any async UI).</p>

<p>Theoretically CQRS for the desktop is the same MVC pattern with additional explicit constraints on organizing controllers and distributing their logic in async manner.</p>

<p>PS: for the latest articles in the CQRS/DDD series see <a href="http://abdullin.com/xlim/">xLim 4: CQRS in Cloud</a>.</p>

