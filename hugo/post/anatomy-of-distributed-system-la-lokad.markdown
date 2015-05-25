---
aliases:
- /journal/2012/3/31/anatomy-of-distributed-system-la-lokad.html/index.html
date: 2012-03-31
tags:
- Lokad
- DDD
- CQRS
- Domain Event
- Story
title: "Anatomy of Distributed System \xE0 la Lokad"
---
<p>This is an update of my previous post on <a href="/post/building-blocks-in-cqrs-world-la-lokad/">Building Blocks à la Lokad</a>. It is based on improvements of the understanding and terminology thanks to <a href="http://vaughnvernon.co/">Vaughn Vernon</a>. It also shamelessly borrows from the subject of my continuous fascination: biology and nature itself.</p>

<h2>Bounded Contexts</h2>

<p>Let's start with the high-level overview of a Software-as-a-Service company (SaaS). This company could employ a range of systems needed to deliver its services to customers. Systems will be separate to reduce coupling and reduce the friction, as company evolves and grows (smaller the company is, more important this becomes). </p>

<p>Each system is a separate Bounded Context (<a href="http://domaindrivendesign.org/node/91">BC term</a> comes from DDD), which could have different implementation details: teams, technologies, language, lifecycle, deployment and maintenance specifics. Below are some examples of BCs in a SaaS company.</p>

<p><span class="full-image-block ssNonEditable"><span><img src="/storage/uploads/2012/03/2012-03-31_anatomy_1_bcs.jpg" alt=""/></span></span></p>

<p>Please keep in mind, that each <strong>bounded context is a modeling concept</strong> and not an indication of how system is implemented. For example, Client Portal could be implemented as a stateless web farm with ASP.NET MVC3, redis-based state server and cloud-hosted processing logic, accessible by desktop and mobile clients. Or, it can be a single Windows Server with IIS, file-based state and a few console processes running in background.</p>

<p>This is similar to how a human body is composed of a set of <a href="http://en.wikipedia.org/wiki/Biological_system">biological systems</a>, where each one serves specific purpose and can be built from specialized organs, cells and tissues.</p>

<h2>Events: Forming Digital Nervous System</h2>

<p>These separate bounded contexts need to communicate with each other.  It happens by publishing <em>events</em> by each bounded context to an outside infrastructure. Each <strong>event is just a serializable message</strong> that complies with certain guidelines and is routed by messaging systems. Each <strong>event tells about something that has already happened</strong>: <em>Invoice Created</em> or <em>Invoice Possibly Expired</em>.</p>

<p>Events streams form digital <a href="http://en.wikipedia.org/wiki/Nervous_system">nervous system</a> of a company, where bounded contexts act as biological system.</p>

<p><span class="full-image-block ssNonEditable"><span><img src="/storage/uploads/2012/03/2012-03-31_anatomy_2_bc_connected.png" alt=""/></span></span></p>

<p>Image above reflects event flows in an imaginary company. It might look complex in this specific representation, however, this doesn't always need to be perceived this way. </p>

<p>While publishing, sender does not even know about existence of its recipients, however recipients can subscribe to any publishers, they are interested in. This traditional PUB/SUB approach simplifies the picture a lot, since we can focus on specific bounded context with its dependencies. It also makes it similar to <a href="http://www.uic.edu/classes/bios/bios100/lectures/neuron.jpg">information flow through biological neuron</a>.</p>

<p><span class="full-image-block ssNonEditable"><span><img src="/storage/uploads/2012/03/2012-03-31_anatomy_3_subscribe.png" alt=""/></span></span></p>

<p>Each bounded context can subscribe to events in two distinct ways: by declaring <em>event receptors</em> or with <em>view projections</em>.</p>

<h2>1. Event Receptor</h2>

<p><strong>Event Receptor</strong> is a simple declaration of events that the specific bounded context is interested in and will react to by sending <em>commands</em> to <em>application services</em> of this context.</p>

<p><span class="full-image-block ssNonEditable"><span><img src="/storage/uploads/2012/03/2012-03-31_anatomy_4_receptor.png" alt=""/></span></span></p>

<p>In code such receptors are usually grouped together in classes, according to their purpose:</p>

<pre><code>public sealed class ReplicationReceptor
{
    // 'Domain' is the name of the primary Bounded Context
    // in this system
    readonly DomainSender _send;
    public ReplicationReceptor(DomainSender send)
    {
        _send = send;
    }

    public void When(SecurityPasswordAdded e)
    {
        _send.ToUser(new CreateUser(e.UserId, e.Id));
    }
    public void When(SecurityIdentityAdded e)
    {
        _send.ToUser(new CreateUser(e.UserId, e.Id));
    }
    // more receptor methods skipped
</code></pre>

<h2>2. View Projection</h2>

<p><strong>View Projection</strong> subscribes to events, which are projected to a view (or persistent read model) that is structured in a way that will be easy to query by components within this specific bounded context.</p>

<p><span class="full-image-block ssNonEditable"><span><img src="/storage/uploads/2012/03/2012-03-31_anatomy_5_projection.png" alt=""/></span></span></p>

<p>In code, projection elements are grouped together in classes based on the view they keep updated.</p>

<pre><code>public sealed class InvoiceDeliveryProjection
{
    readonly IDocumentWriter&lt;unit, InvoiceDeliveryView&gt; _docs;

    public InvoiceDeliveryProjection(IDocumentWriter&lt;unit, InvoiceDeliveryView&gt; docs)
    {
        _docs = docs;
    }

    public void When(CustomerInvoicePaymentRequested e)
    {
        var mark = new InvoiceDeliveryMark
            {
                AccountId = e.Id, 
                Created = e.RequestedOn,
                InvoiceId = e.InvoiceId
            };
        _docs.UpdateEnforcingNew(view =&gt; view.Invoices[e.InvoiceId] = mark);
    }

    public void When(CustomerInvoiceClosed e)
    {
        _docs.UpdateEnforcingNew(view =&gt; view.Invoices.Remove(e.InvoiceId));
    }
</code></pre>

<p>Both <strong>View Projections</strong> and <strong>Event Receptors</strong> are intentionally made extremely simple and easy to change. This is required, since they are coupled to external bounded contexts which can be controlled by different teams with different level of agility and technological capabilities. </p>

<p>Actual business behaviors and complex logic reside within <em>Application Services</em> and <em>Tasks</em>, which are safely isolated from the change shocks by projections and receptors.</p>

<h2>3. Application Service</h2>

<p><strong>Application Services</strong> are interfaces which are remotely accessible for calls within their bounded context. Normally these calls happen by sending a command towards one of these application services (this command can be either explicit command message, or it can be carried by infrastructure in form of remote procedure call).</p>

<p>So each <strong>application service</strong> is just a set of command handling methods, which are executed when a specific message arrives. These command handlers are grouped together according to intent and design guidelines. Each one deals with one command and publishes events afterwards. It can call upon various service clients in the process as well.</p>

<p><span class="full-image-block ssNonEditable"><span><img src="/storage/uploads/2012/03/2012-03-31_anatomy_10.png" alt=""/></span></span></p>

<p>Examples of service clients that are usually used by command handlers:</p>

<ul>
<li>SQL client;</li>
<li>NoSQL database client (e.g. key-value store with views that are projected within this bounded context);</li>
<li>Connection to an Event Store;</li>
<li>Integration endpoint with 3rd party;</li>
<li>Business Logic client;</li>
<li>Command sender to an application service within the same bounded context.</li>
</ul>

<p>Implementations of command handlers within application services can be different:</p>

<ul>
<li>Stateless processing of incoming commands into events (functional style).</li>
<li>Handling commands by executing certain behaviors and calling domain services (e.g.: CRUD-style Aggregate Roots).</li>
<li>Aggregate Roots with Event Sourcing (AR+ES) and Domain Services (favorite).</li>
</ul>

<p>Here’s an example code for AR+ES implementation:</p>

<pre><code>public class CustomerApplicationService
{
    // domain services initialized from constructor
    IEventStore _store;
    IPricingService _pricing;
    IInvoiceCalculator _invoicing;

    // handler for command SettleCustomerInvoice
    public void When(SettleCustomerInvoice cmd)
    {
        DispatchAndMergeConflicts(cmd.Id, 
            cust =&gt; cust.SettleInvoice(cmd.InvoiceId, _pricing, _invoicing))
    }

    // skipped other command handlers

    // helper method that dispatches call to an aggregate root loaded
    // from event stream. If there were any concurrent changes, we’ll 
    // check server changes for merge conflicts and try to rebase our changes
    void DispatchAndMergeConflicts(IIdentity id, Action&lt;Customer&gt; action)
    {
        while (true)
        {
            var stream = _store.LoadEventStream(id);
            var agg = new Customer(stream.Events);
            action(agg);

            try
            {
                _store.AppendToStream(id, stream.Version, agg.Changes);
                return;
            }
            catch (EventStoreConcurrencyException e)
            {
                // verify our changes for merge conflicts
                foreach (var clientEvent in agg.Changes)
                {
                    foreach (var serverEvent in e.StoreEvents)
                    {
                        if (ConflictsWith(clientEvent, serverEvent))
                            throw new ConcurrencyException(e);
                    }
                }
                // there are no conflicts and we can rebase
                _store.AppendToStream(id, e.StoreVersion, agg.Changes);
            }
        }
    }
}
</code></pre>

<h2>4. Task</h2>

<p><strong>Task</strong> is the last element of a distributed system (a la Lokad). It essentially is a method call that is executed at specific moments in time.  It can call upon various service clients (e.g.: query views or check up on 3rd party integration systems) and publish events. Task implementation is generally similar to application service, except for the trigger part. Here’s an example of task that continuously checks on list of invoices, detecting invoices that need additional action.</p>

<pre><code>var remindIn = TimeSpan.FromDays(15);
while(!server.IsCancellationRequested)
{
    var pending = _docs
       .Get&lt;InvoiceDeliveryView&gt;().Invoices.Values
       .Where(x =&gt; (x.CreatedOn + remindIn) &lt; DateTime.UtcNow);
    foreach (var x in pending)
    {
        _events.Publish(new InvoicePossiblyExpired(
            x.AccountId, x.InvoiceId, x.CreatedOn));
    }
    server.WaitHandle.WaitOne(TimeSpan.FromMinutes(15));
}
</code></pre>

<h2>Example</h2>

<p>In the snippet above, we actually handle piece of bigger invoice delivery and reminder process that would probably be implemented in bounded context, using all 4 elements: Event Receptor, View Projection, Application Service and Task.</p>

<p>For instance, you can track invoices as part of <em>customer</em> <strong>application service</strong>. This application service would use <em>customer repository</em> and <em>currency converter service</em> as its dependencies in order to <strong>handle</strong> commands like:</p>

<ul>
<li>Create Invoice</li>
<li>Add Payment To Invoice</li>
<li>Expire Invoice</li>
<li>etc</li>
</ul>

<p>Some of these commands will be sent to <strong>application service</strong> by <strong>receptors</strong> of bounded context in response to events:</p>

<ul>
<li><strong>When</strong> <em>Invoice Payment Arrived</em> <strong>then</strong> tell customer application service to <em>Add Payment To Invoice</em></li>
<li><strong>When</strong> <em>Invoice Possibly Expired</em> <strong>then</strong> tell customer application service to <em>Expire Invoice</em></li>
</ul>

<p>On picture this would look like:</p>

<p><span class="full-image-block ssNonEditable"><span><img src="/storage/uploads/2012/03/2012-03-31_anatomy_7.png" alt=""/></span></span></p>

<p>We can also keep track of all open invoices by creating a <strong>projection</strong> for <em>Outstanding Invoice View</em>. This view will be used by <em>Invoice Expiration Tracker</em> <strong>task</strong>, which will once now and then rescan list to detect outstanding invoices that were created too much time ago. For each one, it will publish <em>invoice possibly expired</em> event.</p>

<p><span class="full-image-block ssNonEditable"><span><img src="/storage/uploads/2012/03/2012-03-31_anatomy_8.png" alt=""/></span></span></p>

<h2>Purpose</h2>

<p>Purpose of all this separation is simple: to have a set of simple building blocks from which more complex systems can be composed in a reliable fashion that allows change without much friction and regressions. Rules of such composition should be rather straightforward and hopefully clear. I will be talking about them and implementation details in following materials.</p>

<p>This approach is what I have arrived (so far) while working on various projects at <a href="http://www.lokad.com/">Lokad</a>. This is also what shapes future development of our small but rather interesting Software-as-a-service company. Even if it keeps on growing in complexity, I see no big problem in following up with the supporting infrastructure. After all, this has already been done by nature billions of times. </p>

<p>As you have probably noticed, I keep on shamelessly borrowing concepts and approaches from her, because it is all well-documented and:</p>

<blockquote>
  <p>Human subtlety will never devise an invention more beautiful, more simple or more direct than does nature because in her inventions nothing is lacking, and nothing is superfluous. </p>
</blockquote>

<p><strong>Leonardo da Vinci</strong></p>

<h2>Update</h2>

<p>This discussion continues in another blog post: <a href="http://abdullin.com/journal/2012/4/7/birds-eye-view-of-a-distributed-system-context-map.html">Bird's-eye view of a Distributed System - Context Map</a>, which tries to take into consideration real world environment around such system.</p>

