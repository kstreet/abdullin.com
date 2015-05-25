---
aliases:
- /journal/2011/1/19/scalable-and-simple-cqrs-views-in-the-cloud.html/index.html
date: 2011-01-19
tags:
- xLim
- Lokad
- C#
- Azure
- Cloud Computing
- DDD
- CQRS
title: Scalable and Simple CQRS Views in the Cloud
---
<p>In this article we'll talk briefly about the CQRS views (read model) implementation for the Cloud Computing environment. This material is based on a research and development at <a href="http://www.lokad.com/" target="_blank" class="offsite-link-inline">Lokad</a> (which took more than a month for this case), followed by the actual production usage of the concepts. So this is something validated by real project.</p>

<p>The article continues <a href="http://abdullin.com/xlim/">Cloud CQRS (xLim 4)</a> R&amp;D articles. Here are <strong>some of the previous highlights</strong> (see xLim page for a lot more references):</p>

<ul>
<li><a href="http://abdullin.com/journal/2010/11/3/cqrs-architecture-and-definitions.html">CQRS Architecture and Definitions</a></li>
<li><a href="http://abdullin.com/journal/2010/9/23/command-handlers-without-2pc-and-with-various-levels-of-reli.html">Command Handlers with Various Levels of Reliability</a></li>
<li><a href="http://abdullin.com/journal/2010/9/26/theory-of-cqrs-command-handlers-sagas-ars-and-event-subscrip.html">Theory of CQRS Command Handlers: Sagas, ARs and Event Subscriptions</a></li>
<li><a href="http://abdullin.com/journal/2010/10/2/cqrs-lifehacks-from-lokad-production.html">CQRS Lifehacks from Lokad Production - Part 1</a></li>
<li><a href="http://abdullin.com/journal/2010/12/12/cloud-cqrs-lifehacks-from-lokad-part-2.html">CQRS Lifehacks from Lokad Production - Part 2</a> </li>
<li><a href="http://abdullin.com/journal/2010/12/13/helpful-domain-logs-of-cqrs.html">CQRS Lifehacks from Lokad Production - Part 3</a></li>
</ul>

<p>Let's get started with the basics.</p>

<h2>Basics</h2>

<p><strong>CQRS Views</strong> are also sometimes called "denormalized views" or "read models" in the world of distributed systems. They usually represent data that is:</p>

<ul>
<li>stored somewhere (anywhere, starting from SQL tables to cloud-based key-value storage);</li>
<li>optimized for reads from the perspective of <strong>simplicity, scalability, or both</strong>;</li>
<li>is <strong>populated by event handlers</strong> that subscribe to events coming from the domain (and hence is eventually consistent in most of the cases);</li>
<li>is a <strong>logical dual of data caching</strong> mechanism (in classical layered architectures), with the primary difference being: here we don't retrieve information on first request, but rather pre-populate view store immediately after the corresponding event is published; this potentially leads to better performance and less staleness, as compared to caching;</li>
<li>optimized for the reads and hence <strong>reduces performance and complexity stress on the write side</strong>.</li>
</ul>

<p>It is important to note, that in order to get these benefits, you don't necessarily need to employ messaging infrastructure or have full-blown CQRS architecture. For example, even in a classical 3-tier architecture you can do something like:</p>

<ul>
<li>have a separate set of SQL tables optimized for reading, that are populated along with saving changes to the data tables (implementation will be somewhat tangled and complex, but it might be worth to improve performance of a few select tight spots);</li>
<li>push JSON files to CDN for direct consumption by the browser client;</li>
<li>have a distributed cache that is kept up-to-date by subscribing to data change notifications being published from the write side.</li>
</ul>

<p>However, only by explicitly decoupling our business logic from the read models by domain events, can we achieve overall simplicity, while not sacrificing the scalability opportunities.</p>

<h2>Views with Cloud Flavor</h2>

<p><a href="http://abdullin.com/cloud-computing/">Cloud computing</a> environment creates additional <strong>challenges and benefits</strong> for the distributed systems. </p>

<p>We gain immense benefits of:</p>

<ul>
<li>development flexibility (ability to procure and deploy any combinations of systems);</li>
<li>cost efficiency (paying only for what you use);</li>
<li>elastic scalability (storage, queues and virtual machines can automatically scale);</li>
<li>reduced operational burden (things like scaling, backups, configuration - are managed by the cloud service provider).</li>
</ul>

<blockquote>
  <p>This, for example, allows a small company like Lokad to do <a href="http://www.lokad.com/Products.ashx" target="_blank" class="offsite-link-inline">really interesting things</a> with a tiny development team. </p>
</blockquote>

<p>The primary limitation of the approach - it requires a shift from the DB-oriented mindset towards the <a href="http://abdullin.com/journal/2010/8/22/space-travel-and-infinitely-scalable-solutions.html">mindset of distributeds system in eventually consistent world</a>. Fortunately, <em>CQRS Architecture approach</em> creates a simple foundation for such way of thinking.</p>

<p>So, when we combine Cloud Computing environment with the CQRS Views (read models), one implementation option could be:</p>

<ul>
<li>Cloud Views are stored in Windows Azure Blob Storage (Amazon S3, or any storage with key-value capabilities) as simple deserialized files with arbitrary schema.</li>
<li>View Handlers (domain event consumers responsible keeping views up-to-date) are just some running server processes subscribed to certain domain event messages. They are hosted within Azure Worker Roles, Amazon EC2 instances, Rackspace VMs or whatever.</li>
<li>Client-side, in order to display cloud views, just needs to know view contracts and be able to read them from the storage (usually available via REST in the cloud environments).</li>
</ul>

<h2>Technology: Azure, JSON, Simplicity</h2>

<p>In Lokad production scenario implementation details are: Azure blob storage, being populated by <a href="http://code.google.com/p/lokad-cqrs/" target="_blank" class="offsite-link-inline">Lokad.CQRS</a> Event handlers running in Azure Worker Roles.</p>

<p>Clients, consuming cloud CQRS views(Web and desktop) perform user authentication on their own and directly access Azure Blob storage (more elaborate security models could easily be added as needed).</p>

<p>Serialization format - JSON (just for the sake of readability and simpler debugging), it could easily be swapped for ProtoBuf for more compact encoding.</p>

<p>Logically views are cheap and disposable. Development infrastructure automates complete and partial view regeneration (performance is not an issue here). Whenever a view structure is changed or a new one is added - just repopulate the corresponding data.</p>

<p>Code implementation makes view handling logic part of the development language, it was designed to simplify automated view repopulation, maintenance and operations (just an attempt of proper OO programming that worked surprisingly well).</p>

<p>Since cloud views are based on the key-value abstraction (i.e.: given a key, you get a view, but you can't list or query them), some concerns had to be handled explicitly. So secondary indexes and lists are just eventually consistent views as well.</p>

<p>From the mental perspective, transition from NHibernate-hosted views resulted in:</p>

<ul>
<li>there is more code, but it is simple, clean and completely decoupled;</li>
<li>development friction reduced significantly: no need to handle SQL update scripts for the read side in production/staging/development, simpler deployments, more freedom to refactor and experiment for simplicity;</li>
<li>since views are disposable, and it is extremely easy to rebuild them for the production (a few mouse clicks), client UI is easier to evolve towards more usable implementations;</li>
<li>less worries about operational costs (Azure blob storage is roughly 100x cheaper that SQL Azure for this kind of scenario);</li>
<li>absolutely no worries about the scalability - Azure blob storage scales automatically and is optimized for the reads (plus we can always plug the CDN around the globe or replicate views across the datacenters, if needed);</li>
<li>reduced complexity on the clients (no need to use some weird API or bring in NHibernate, it's just true POCO) and the server.</li>
</ul>

<p>The primary problem with the new approach - since now I have reduced development friction, I want to roll out production upgrades more often. 15 minute upgrade delay for Azure Worker Role becomes a frustrating experience.</p>

<h2>Implementation Details</h2>

<p>Actual implementation is dead-simple. It's not even fair to call it a framework - just a few interfaces and a simple wiring. Design and Windows Azure do the actual heavy-lifting.</p>

<p>Although eventually "framework" will be included into the <a href="http://code.google.com/p/lokad-cqrs/" target="_blank" class="offsite-link-inline">Lokad.CQRS for Azure</a> open source poject, here are some details to give you better perspective.</p>

<p><strong>Views are defined as simple POCO classes</strong>, that can have any structure as long as they are serializable:</p>

<pre><code>public class UserDetailView : IViewEntity&lt;long&gt;
{
  public virtual long UserId { get; set; }
  public virtual long AccountId { get; set; }
  public virtual string Username { get; set; }
  public virtual string Email { get; set; }
  public virtual string RegistrationToken { get; set; }      
}
</code></pre>

<p><strong>Base view interfaces</strong> are <em>just a convenience</em> for stronger typing and automated regeneration:</p>

<pre><code>/// &lt;summary&gt;
/// View entity that has an identity (there can be many views
/// of this type)
/// &lt;/summary&gt;
public interface IViewEntity&lt;TKey&gt; : IViewBase {}

public interface IViewBase{}

/// &lt;summary&gt;
/// View singleton (there can be only one document).
/// &lt;/summary&gt;
public interface IViewSingleton{}
</code></pre>

<p>Serialized view will look just like a file "view-userdetailsview/150.json":</p>

<pre><code>{
  "UserId": 150,
  "AccountId": 74,
  "Username": "abdullin",
  "Email": "some email",
  "RegistrationToken": "some identity"
}
</code></pre>

<p>View entities are stored in folder named after type of the view (derived automatically), singleton views (have only instance per view type) are grouped together in a single folder as well. </p>

<p><strong>Secondary indexes are just serialized dictionaries</strong> (simplest thing that works) saved as view singletons. If there ever will be performance problems with index sizes, there are multiple dead-simple improvements to make. So far we stick with:</p>

<pre><code>public sealed class UserByRequestIndex : IViewSingleton
{
  public readonly IDictionary&lt;Guid, long&gt; Index = 
    new Dictionary&lt;Guid, long&gt;();
}
</code></pre>

<p>Event handlers responsible for populating views are dead-simple and auto-wired:</p>

<pre><code>public sealed class UserDetailViewHandler :
  ConsumerOf&lt;UserCreatedEvent&gt;,
  ConsumerOf&lt;UserActivatedEvent&gt;,
  ConsumerOf&lt;UserDeletedEvent&gt;
{
  readonly IViewWriter&lt;long,UserDetailView&gt; _operations;

  public void Consume(UserCreatedEvent message)
  {
    var view = new UserDetailView
      {
        AccountId = message.AccountId,
        UserId = message.UserId,
        Username = message.Username,
        Email = message.Email,       
        RegistrationToken = message.RegistrationToken,
      };
    _operations.AddOrUpdate(message.UserId, view, x =&gt; { });
  }
</code></pre>

<p>Accessing views is dead-simple as well. Say, in Web client, powered by ASP.NET MVC 2, you have this hook to IoC Container and IViewReader:</p>

<pre><code>public static class AzureViews
{
  static Maybe&lt;TView&gt; Get&lt;TKey,TView&gt;(TKey key) where TView : IViewEntity&lt;TKey&gt;
  {
    return GlobalSetup.BusInstance.Resolve&lt;IViewReader&lt;TKey, TView&gt;&gt;().Get(key);
  }

  static TSingleton GetOrNew&lt;TSingleton&gt;() where TSingleton : IViewSingleton, new()
  {
    return GlobalSetup.BusInstance.Resolve&lt;IViewSingletonReader&lt;TSingleton&gt;&gt;().GetOrNew();
  }
</code></pre>

<p>Then querying a view by a primary key just becomes a matter of:</p>

<pre><code>public static Maybe&lt;UserDetailView&gt; GetUser(long userId)
{
  return Get&lt;long, UserDetailView&gt;(userId);
}
</code></pre>

<p>Or, if you need to access it by an eventually consistent index:</p>

<pre><code>public static Maybe&lt;UserDetailView&gt; GetUserByRequest(Guid requestId)
{
  return GetOrNew&lt;UserByRequestIndex&gt;()
    .Index.GetValue(requestId)
    .Combine(GetUser);
}
</code></pre>

<p>If the syntax looks a bit weird - just check out <a href="http://abdullin.com/journal/2009/10/6/zen-development-practices-c-maybe-monad.html">Lokad Maybe helpers</a>.</p>

<p>For the sake of completeness, here's the <strong>design of view reader and writer interfaces</strong> (they are simple but took the most time to get them right, will likely evolve further):</p>

<pre><code>public interface IViewWriter&lt;TKey, TView&gt; where TView : IViewEntity&lt;TKey&gt;
{
  void AddOrUpdate(TKey key, Func&lt;TView&gt; addFactory, Action&lt;TView&gt; update);
  void AddOrUpdate(TKey key, TView newView, Action&lt;TView&gt; update);
  void UpdateOrThrow(TKey key, Action&lt;TView&gt; change);
  bool TryUpdate(TKey key, Action&lt;TView&gt; change);
  void Delete(TKey key);
}

public interface IViewReader&lt;in TKey, TView&gt; where TView : IViewEntity&lt;TKey&gt;
{
  Maybe&lt;TView&gt; Get(TKey key);
  TView Load(TKey key);
}

public interface IViewSingletonWriter&lt;TView&gt; where TView : IViewSingleton
{      
  void AddOrUpdate(Func&lt;TView&gt; addFactory, Action&lt;TView&gt; updateFactory);
  void Delete();
}

public interface IViewSingletonReader&lt;TView&gt; where TView : IViewSingleton
{
  Maybe&lt;TView&gt; Get();
}
</code></pre>

<p>These interfaces make it extremely simple to implement <strong>automatic view discovery and wiring</strong> for the purposes of infrastructure and management:</p>

<p><span class="full-image-block ssNonEditable"><span><img src="/storage/uploads/2011/01/2011-01-19_rebuild-cqrs-views.jpg" alt="CQRS Views Maintenance"/></span></span></p>

<p>Here's how the tree was built:</p>

<ul>
<li>Inspect the assemblies for all event handler types. Since ConsumerOf[T] inherits from IConsume, it is just a matter of selecting non-abstract types deriving from the consumption interface.</li>
<li>Select only view handler types (they have constructor with a single argument: strongly-typed IViewWriter or IViewSingletonWriter).</li>
<li>Get the generic type argument out of these argument types - this will be the type of the view handled by the argument class.</li>
</ul>

<p>Actual interface implementations are simple. <a href="http://abdullin.com/wiki/inversion-of-control-ioc.html">Inversion-of-control Container</a> (Autofac) configuration just exploits generic registrations. Server-side module:</p>

<pre><code>public sealed class ViewWriterModule : Module
{
  protected override void Load(ContainerBuilder builder)
  {
    builder
      .RegisterGeneric(typeof (AzureViewContainer&lt;,&gt;))
      .As(typeof (IViewWriter&lt;,&gt;))
      .SingleInstance();
    builder
      .RegisterGeneric(typeof (AzureViewSingletonContainer&lt;&gt;))
      .As(typeof (IViewSingletonWriter&lt;&gt;))
      .SingleInstance();
    builder
      .RegisterType(typeof (ViewContainerInitialization))
      .As&lt;IEngineProcess&gt;()
      .SingleInstance();
  }
}
</code></pre>

<p>Where <em>ViewContainerInitialization</em> is just a start-up task for Lokad.CQRS engine, that creates view folders, if needed.</p>

<p>Client-side module:</p>

<pre><code>public sealed class ViewReaderModule : Module
{
  protected override void Load(ContainerBuilder builder)
  {
    builder.RegisterGeneric(typeof(AzureViewContainer&lt;,&gt;))
      .As(typeof(IViewReader&lt;,&gt;))
      .SingleInstance();

    builder.RegisterGeneric(typeof(AzureViewSingletonContainer&lt;&gt;))
      .As(typeof(IViewSingletonReader&lt;&gt;))
      .SingleInstance();
  }
}
</code></pre>

<h2>Concurrency</h2>

<p>How do we handle concurrency conflicts with the views: when the <strong>same view being accessed by more than thread simultaneously</strong>? Actually we don't care a lot about reading and writing at the same time, since cloud storages providers generally ensure atomicity at this level.</p>

<p>There are two major approaches for handling concurrency while updating views: simplistic and logical.</p>

<p>The <strong>simplest approach</strong> is too keep updates of a single view entity limited to a single thread. For example, you can start with a single worker thread processing all view updates. As your application grows, increasing load and availability requirements, you can split updates of the different view types and entities between different threads and workers. In other words, you will partition views by type and/or view ID.</p>

<blockquote>
  <p>Note, that we don't need to scale out actual view persistence, since it is generally handled by the cloud storage provider, to start with. However, such scaling tends to be limited by the world region (i.e.: North Europe) and we still might need to enable CDN or manually replicate data between multiple cloud centers. This is relatively easy to do just by streaming domain events to these data centers. </p>
</blockquote>

<p>As long as you pass entity ID in message headers (recommended in distributed systems), it will be easy to route domain event messages between different queues/workers.</p>

<blockquote>
  <p>Just a quick clarification of terms. <strong>View Type</strong> is a message contract or the POCO class, while <strong>view entity</strong> is a single instance of this type, as identified and tracked by its unique identity. This identity serves as a primary key used to store and retrieve the actual view data. In the case of singleton views we have a single entity per type.</p>
</blockquote>

<p>Eventually you might encounter the need to allow multiple concurrent threads (whether hosted in a single worker or different ones) to be able to update the same view entity at once. This is where <strong>optimistic concurrency control</strong> comes in. </p>

<p>We just need to modify our view writer implementations to keep track of blob's ETag (analogue of version ID), while downloading it. Then, after executing local update, we upload it back, while passing last known ETag back to the server. Azure Blob Storage (just like any other cloud storage) is aware of this feature and will update view data only if the ETags match. If they don't (somebody else managed to concurrently update our view) - update will fail and we'll get an exception.</p>

<p>This exception will captured by the service bus, which will retry the actual update operation later. If such an update fails more than 4 times at once, this would mean some heavy concurrency issues probably coming from really complex update operations.</p>

<h2>Summary</h2>

<p>In this article we've briefly covered concepts of CQRS Views (also known as <em>eventually consistent read models</em> or <em>denormalized views</em>) as applied to the Cloud Computing environment for the additional benefits of simplicity, scalability and cost-efficiency. There also were some high-level details describing experience of the actual implementation in the Windows Azure environment.</p>

<p>This article is a part of <a href="http://abdullin.com/xlim/">CQRS in Cloud (xLim4)</a> Research and Development series. You can <a href="/atom.xml" target="_blank" class="offsite-link-inline">subscribe to the news feed</a> to stay tuned for more updates. </p>

<p>All comments and questions are welcome and appreciated!</p>

