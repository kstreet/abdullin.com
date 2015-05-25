---
aliases:
- /journal/2010/8/21/rx-works-nicely-with-ddd-and-event-sourcing.html/index.html
date: 2010-08-21
tags:
- xLim
- Lokad
- C#
- Azure
- Cloud Computing
- DDD
- CQRS
title: Rx works nicely with DDD and Event Sourcing
---
<p>Yesterday I finally got to the point of trying to build <a href="/tags/cqrs/">Command-Query Responsibility Segregation</a> solution for <a href="http://abdullin.com/wiki/cloud-computing.html">Cloud Computing</a> environment that uses Domain Driven Design and Event Sourcing (<a href="http://abdullin.com/journal/2010/3/23/dddd-cqrs-and-other-enterprise-development-buzz-words.html">quick overview of these buzz words</a>). The whole purpose of the project is to learn, so there's a freedom to experiment upon the accepted patterns and practices.</p>

<p><a href="http://twitter.com/MarkNijhof" target="_blank" class="offsite-link-inline">Mark Nijhof</a> put together really <a href="http://elegantcode.com/2009/11/20/cqrs-the-domain-events/" target="_blank" class="offsite-link-inline">thorough article on the Domain Events in CQRS.</a> It has a lot of code and information packed in. Let's take it from there, but with a slightly different and highly experimental route.</p>

<p>Usually Aggregate root implementations have all sorts of interfaces and methods helping the surrounding infrastructure to pick them up and handle. This makes the <strong>domain code look a bit complex</strong> for me.</p>

<p>However it seems that these AggregateRoots are a native candidate for leveraging <a href="http://msdn.microsoft.com/en-us/devlabs/ee794896.aspx" target="_blank" class="offsite-link-inline">Reactive Extensions for .NET</a>. AR might need to inherit and implement just a single interface (snapshots might require the second one, though):</p>

<pre><code>public class ProjectAggregateRoot : ISubject&lt;IEvent,Change&gt;
</code></pre>

<p>Where <em>ISubject</em> is an interface from <em>System.Reactive</em> that merely says:</p>

<pre><code>public interface ISubject&lt;in T1, out T2&gt; : 
  IObserver&lt;T1&gt;, IObservable&lt;T2&gt;
</code></pre>

<p>How does it affect our aggregate design? Not much, we just slightly extend the "Apply Event" method, naming it "OnNext" and adding the ability to accept <em>IEvent</em> and publish <em>Change</em>:</p>

<pre><code>Subject&lt;Change&gt; _subject = new Subject&lt;Change&gt;();

public void OnNext(IEvent value)
{
  EventInvoker.Apply(this, value);
  Interlocked.Increment(ref _version);

  _subject.OnNext(new Change(_version, value));
}

public IDisposable Subscribe(IObserver&lt;Change&gt; observer)
{
  var subscribe = _subject.Subscribe(observer);
  return subscribe;
}
</code></pre>

<blockquote>
  <p>Note: As you know, Reactive Extensions were designed for the asynchronous operations (i.e.: cloud computing interactions or UI events). Thus they work tightly with PFX. However, since I don't know anything about this integration and side effects, I'm dispatching and executing everything in sync so far.</p>
</blockquote>

<p><em>Change</em> is just an event that was applied and thus has a version number:</p>

<pre><code>public sealed class Change
{
  public readonly long Version;      
  public readonly IEvent Event;

  public Change(long version, IEvent @event)
  {
    Version = version;
    Event = @event;
  }

  public override string ToString()
  {
    return string.Format("r{0:####}: {1}", Version, Event.ToString());
  }
}
</code></pre>

<p>What does this give us? We can drop all event subscription and management interfaces and functionality, letting Linq-2-Events to do all the handling in rich and tested way:</p>

<ul>
<li><em>LoadFromHistory</em> methods are equivalents of IObserver[TEvent]</li>
<li><em>GetChanges</em> functionality is fulfilled by subscribing to IObservable[Change]</li>
</ul>

<p>What's more important, our aggregate can avoid referencing any custom interfaces, since both <em>IObservable</em> and <em>IObserver</em> are in .NET 4.0 BCL. This also provides a wide range of extension methods available.</p>

<p>Given that, it becomes rather simple task to write store that works like this:</p>

<pre><code>// somewhere in IoC init
var store = new HybridStore(serializer, storage);
store.RegisterEventSource&lt;ProjectAggregateRoot&gt;();

// somewhere in the handler we perform atomic update
// if there is a concurrency problem, service bus will be
// responsible for reapplying changes later
store.Update&lt;ProjectAggregateRoot&gt;("project123", e =&gt;
{
  e.AddTask("t1", "Satori Project");
  e.AddTask("t2", "Build Simple Domain");
  e.AddTask("t3", "Build Simple Sync reader");
  e.CreateTaskReference("t2", "t1");
});
</code></pre>

<p>For the sake of consistency, here's how the actual persistence (highly prototypical) looks like:</p>

<pre><code>public void Write(Type type, object key, 
  AddEntityDelegate addEntityDelegate, 
  UpdateEntityDelegate updateEntityDelegate)
{
  var item = MapTypeAndIdentity(type, key);

  Func&lt;object, ISubject&lt;IEvent, Change&gt;&gt; factory;
  if (_factories.TryGetValue(type, out factory))
  {
    var condition = StorageCondition.None;
    var domain = factory(key);
    var changes = new List&lt;Change&gt;();

    using (domain.Subscribe(changes.Add))
    {
      try
      {
        item.ReadInto((props, stream) =&gt;
        {
          var source = (Change[])_serializer
            .Deserialize(stream, typeof(Change[]));
          foreach (var change in source)
          {
            domain.OnNext(change.Event);
          }
          condition = StorageCondition.IfMatch(props.ETag);
        });
      }
      catch (StorageItemNotFoundException) { }
      var version = changes.Count;

      using (domain.Subscribe(_subject))
      {
        updateEntityDelegate(key, domain);
      }
      if (version == changes.Count)
        return;
    }

    try
    {
      item.Write(stream =&gt; _serializer.Serialize(changes.ToArray(), stream),
        condition);
    }
    catch (StorageConditionFailedException ex)
    {
      var msg = string.Format(
        "Record was modified concurrently: '{0}'; Id: '{1}'. Please, retry.",
        type, key);
      throw new OptimisticConcurrencyException(msg, ex);
    }
  }
}
</code></pre>

<p>Since we are forced to deal with the event streams, it's easy to subscribe and do things like:</p>

<pre><code>using (store.Subscribe(Console.WriteLine))
{
  store.Update&lt;ProjectAggregateRoot&gt;("project123", e =&gt;
  {
    e.CreateTaskReference("t2", "t3");
  });
}
</code></pre>

<p>The listener subscription above will reveal us that creating task reference in this case actually results in two events:</p>

<pre><code>r5: Domain.TaskRemovedFromParentTask
r6: Domain.TaskAddedToParentTask
</code></pre>

<p>Since Reactive Extensions for .NET are built upon the event streams I think that doing all sorts of related operations operations (writing event denormalizers, merging streams, writing behavioral unit tests) might be simplified in Domain Driven Design with the Event Sourcing.</p>

<p>Such abstraction allows to separate different concerns rather clearly. For example the actual implementation of the underlying <em>storage</em> passed to <em>HybridStore</em> could be <em>FileStorageContainer</em> or <em>BlobStorageContainer</em> for Windows Azure from <a href="http://code.google.com/p/lokad-cqrs/" target="_blank" class="offsite-link-inline">Lokad.CQRS</a> since both allow atomic updates and optimistic concurrency locking (or any reasonable RDB or NoSQL).</p>

<p>It's interesting to note, that these storage container implementations were actually developed for the project without any hint of DDD or ES. Yet, since we have such a nice persistence ignorance in <a href="/tags/cqrs/">CQRS/ES</a> architectures, they could be plugged in without problems.</p>

<p>Also, it is rather simple to implement <em>partitioning</em> in this scenario, since all access to the storage goes with the entity key (identity). If you add into the mix  cloud infrastructure capable of doing <em>dynamic repartitioning</em> (i.e. Windows Azure storage) and providing <em>computing capacities on demand</em> - you'll get foundation for building <strong>almost-infinitely scalable solution</strong> (although message queues still need proper support for transactional sending and ACKs). CQRS will provide high-level <em>approaches for shaping the architecture</em> and evolving it in scalable and cost-effective manner; while DDD holds the <em>methodology for designing and managing the business core</em> of the solution. </p>

<p>All in all, <strong>future looks quite exciting</strong>, doesn't it?</p>

