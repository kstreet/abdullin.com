---
aliases:
- /journal/2012/3/9/building-blocks-in-cqrs-world-a-la-lokad.html/index.html
date: 2012-03-09
tags:
- Lokad
- Azure
- CQRS
- Story
title: "Building Blocks in CQRS world \xE0 la Lokad"
---
<p>Once you have broken your systems into separate subsystems (bounded contexts) and introduced Command-Query Responsibility Segregation inside each one, there are multiple paths to take from there.</p>

<p>Each path depends on your background, familiar technologies and available developers.</p>

<h2>Two Primary View Points</h2>

<p>I think that all views on building distributed systems in .NET world can be organized in two groups.</p>

<p>Developers from <strong>Udi Dahan/NServiceBus</strong> world tend to structure systems with CRUD aggregates (persisted in SQL or RavenDB) and SOA Services, implement business workflows with sagas that look almost like aggregates. Choice of persistence usually is restricted to transactional systems (MSMQ being the star here). There is a smart usage of caching and internet infrastructure to deal with scaling.</p>

<p>People with preference for Greg's ideas tend to express business behaviors with event-sourced aggregates, avoid use of "orchestration" term and structure flows with either state machines or stateless document sagas. Views are usually rebuilt by replaying events. Choice of persistence does not matter and transactions are much less important.</p>

<h2>à la Lokad</h2>

<p>I'm personally closer to Greg's side, but a lot more constrained (startup environment and hybrid hosting environments took their tall). Primary differences (for the latest projects) is that I do not use any sagas (there is no such term) and there are no future messages.</p>

<p>Let's highlight primary domain building blocks that are used in post-CQRS world according to Lokad:</p>

<ul>
<li>Aggregate Roots</li>
<li>Workflows</li>
<li>Projections</li>
<li>Domain Services</li>
<li>Processes</li>
</ul>

<h2>Aggregate Roots</h2>

<p><strong>Aggregate Roots</strong> with event sourcing (or AR+ES) - have complex behaviors, are easily tested and persistence - ignorant. They serve as consistency boundary and are partitionable by Id.</p>

<p>When command arrives to the server, it is passed to the command handler, which loads the aggregate root (and any relevant services) and executes an action against that aggregate root. That action results in events that both change state of the aggregate and are published as messages to all subscribers.</p>

<p>One of the simple mental patterns of <strong>implementing AR+ES entities</strong> revolves about splitting state and behaviors in two distinct classes: aggregate state and behavior. </p>

<p>Aggregate State class contains structural representation of AR+ES, that can be mutated only by applying events to it.</p>

<pre><code>public class CustomerAggregateState
{
  public CustomerAggregateState(IEnumerable&lt;IEvent&lt;IIdentity&gt;&gt; events)
  {
    foreach (var @event in events)
    {
       Apply(@event);
    }
  }

  public int Version { get; private set; }
  public bool ConsumptionLocked { get; private set; }

  public void Apply(IEvent&lt;IIdentity&gt; e)
  {
    RedirectToWhen.InvokeEventOptional(this, e);
    Version += 1;
  }

  public void When(CustomerLocked e)
  {
    ConsumptionLocked = true;
  }
  public void When(CustomerUnlocked e)
  {
    ConsumptionLocked = false;
  }

  // ETC...
}
</code></pre>

<p>Actual aggregate class contains behaviors that are usually executed in response to commands sent. In order to carry them out, aggregate uses it’s own state and any available domain services. Any changes are passed down to state as events. They will also be saved in unit of work, then - committed to event store (which will publish them afterwards). </p>

<pre><code>public class CustomerAggregate
{
  Action&lt;IEvent&lt;CustomerId&gt;&gt; _unitOfWork;
  CustomerAggregateState _state;

  public void LockCustomerForAccountOverdraft(IPricingModel pricing)
  {
    if (_state.ManualBilling)
        return;
    var balance = pricing.GetPaymentThreshold(_state.Currency).Convert(d =&gt; -d);
    if (_state.Balance &gt; balance)
    {
      Context.Explain("Balance {0} is above threshold of {1}. Don't lock", 
        _state.Balance, balance);
    }
    else
    {
      LockCustomer("Overdraft");
    }
  }

  public void LockCustomer(string reason)
  {
    if (_state.ConsumptionLocked)
      return;
    Apply(new CustomerLocked(_state.Id, reason));
  }

  // ETC

  void Apply(IEvent&lt;CustomerId&gt; e)
  {
    _state.Apply(e);
    _unitOfWork(e);
  }
}
</code></pre>

<p><strong>Command handler</strong> deals with bringing all this together:</p>

<pre><code>/// This command handler can be replaced by a set of lambdas
public class CustomerHandler
{
  IAggregateStore&lt;CustomerId, CustomerAggregate&gt; _store;
  IPricingModel _pricing;

  public void When(LockCustomer c)
  {
    _store.Update(c.Id, a =&gt; a.LockCustomer(c.Reason));
  }

  public void When(LockCustomerForAccountOverdraft c)
  {
    _store.Update(c.Id, ar =&gt; ar.LockCustomerForAccountOverdraft(_pricing));
  }
  // ETC...
}
</code></pre>

<h2>Domain Services</h2>

<p>IPricingModel from the code above is actually a sample of <strong>domain service</strong>. It is acquired by command handler and then passed to aggregate root to provide all sorts of rich functionality. If Aggregate Roots (with their complex behaviors and advanced structural persistence) are brains, then domain services are actually the muscles. Here are some samples:</p>

<ul>
<li>index lookups;</li>
<li>pricing calculators;</li>
<li>mail messaging;</li>
<li>integration with payment systems.</li>
</ul>

<h2>Workflows</h2>

<p><strong>Workflows</strong> are the corner stones for interactions in our bounded contexts (or sub-systems). They subscribe to all sorts of events that happen in the environment both outside and inside the bounded context and define immediate reactions to these in form of commands that will be sent to players inside.</p>

<pre><code>public sealed class BillingWorkflow 
{
  readonly IFunctionalFlow _flow;
  public BillingWorkflow(IFunctionalFlow flow)
  {
    _flow = flow;
  }

  public void When(CustomerBillChargeAdded e)
  {
    _flow.ToCustomer(new WriteCustomerInvoiceForBill(e.Id, e.BillId));
  }

  public void When(CustomerInvoiceWritten e)
  {
     _flow.ToCustomer(new RequestCustomerInvoicePayment(e.Id, e.InvoiceId));
  }

  public void When(InvoicePaymentReceived e)
  {
     _flow.ToCustomer(new AddCustomerInvoicePayment(e.CustomerId, e.InvoiceId, 
        e.GrossAmount, e.PaymentCode, e.PaymentId));
  }
  // etc
</code></pre>

<p>This code is extremely simple and serves one and one purpose alone - to explicitly define events that this bounded context reacts to. These reactions will then be carried out by our command handlers which will load appropriate aggregate roots (brains) and let them operate domain services (muscles), while remembering what happened for future generations.</p>

<p>Explicit difference from sagas is:</p>

<ul>
<li>Term "saga" is completely overloaded. Initially it was introduced for managing long-lived database transactions and then got hijacked by Udi Dahan and NServiceBus.</li>
<li>Sagas usually allow complicated business logic structured around internal state. Workflows usually don't have any logic and serve merely as a way to explicitly define events which this Bounded Context subscribes and reacts to.</li>
</ul>

<p>If we bring all this into one picture, that's what will show up:</p>

<p><span class="full-image-block ssNonEditable"><span><img src="/storage/uploads/2012/03/2012-03-09_213726.png" alt=""/></span></span></p>

<h2>Projections</h2>

<p>OK, this picture is nice, but dealing with events outside of Aggregate Roots can be complicated (unless you enjoy querying event streams). That's where <strong>projections</strong> come into play. They allow to project event streams into any structural representation (view or persistent read model). This view is eventually consistent and persistence - ignorant (in other words, it can live in any key-value store with decent consistency guarantees).</p>

<p>Projections are usually way too simple to require any testing.</p>

<pre><code>public class CustomerInvoicesProjection
{
  IAtomicWriter&lt;CustomerId, CustomerInvoicesView&gt; _writer;
  public CustomerInvoicesProjection(IAtomicWriter&lt;CustomerId, CustomerInvoicesView&gt; writer)
  {
    _writer = writer;
  }
  public void When(CustomerInvoiceWritten e)
  {
    _writer.UpdateEnforcingNew(e.Id, i =&gt; i.AddInvoice(
       e.InvoiceId,
       e.Totals.Total,
       e.Header.CreatedUtc));
  }

  public void When(InvoicePaymentReceived e)
  {
    _writer.UpdateOrThrow(e.CustomerId, i =&gt; i.AddPayment(
       e.InvoiceId, e.GrossAmount, e.PaymentId));
  }

  public void When(CustomerInvoiceClosed e)
  {
    _writer.UpdateOrThrow(e.Id, i =&gt; i.CloseInvoice(e.InvoiceId, e.Reason));
  }
}



[DataContract]
public class CustomerInvoicesView
{
  [DataMember(Order = 1)]
  public IDictionary&lt;long,CustomerInvoice&gt; Invoices { get; set; }
  public CustomerInvoicesView()
  {
    Invoices = new Dictionary&lt;long, CustomerInvoice&gt;();
  }

  public void AddInvoice(InvoiceId invoiceId, CurrencyAmount total, DateTime createdUtc)
  {
    Invoices.Add(invoiceId.Id, CustomerInvoice.Create(invoiceId, total, createdUtc));
  }

  public void AddPayment(InvoiceId invoiceId, CurrencyAmount grossAmount, string paymentId)
  {
    Invoices[invoiceId.Id].ApplyPayment(grossAmount, paymentId);
  }

  public void CloseInvoice(InvoiceId invoiceId, string reason)
  {
    Invoices[invoiceId.Id].Close();
  }
}
</code></pre>

<p>On our diagram they would look like this:</p>

<p><span class="full-image-block ssNonEditable"><span><img src="/storage/uploads/2012/03/2012-03-09_215004.png" alt=""/></span></span></p>

<p>Where the service (that provides query capabilities over the view) could be located in the client (Web UI) or inside server-side bounded context. For instance I could maintain an eventually consistent list of all outstanding invoices in my payment processing BC, so that when a payment comes, I could map it to the invoice by reference number.</p>

<h2>Processes</h2>

<p>These 4 building blocks can be combined in various ways to define a system that passively reacts to external events (which could be caused by user) and publishes responding events outside. How do we proactively do something to drive world around us?</p>

<p>Let's code us our virtual user that will be running loops over the projected data and carrying out actions, when he finds something interesting. These actions will come either as events published to everybody ("FraudTransactionDetected") or commands to a command handler within the same bounded context ("TryClosePendingInvoice").</p>

<p><span class="full-image-block ssNonEditable"><span><img src="/storage/uploads/2012/03/2012-03-09_221252.png" alt=""/></span></span></p>

<p>In some other teams people would use "sagas with state machines and future messages" in order to implement this simple user. In our case, this is just a simple process that accesses some service in a loop. The service can be our own read model or some 3rd party system that we are polling.</p>

<pre><code>while (!token.IsCancellationRequested)
{
  try
  {
    var doc = _reader.GetOrNew();

    foreach (var cmd in GetOverdraftSuspects(doc))
    {
      _endpoint.ToCustomer(cmd);
    }
    token.WaitHandle.WaitOne(waitPeriod);
  }
  catch (Exception ex)
  {
     Context.Debug(ex);
     // to avoid overloads
     token.WaitHandle.WaitOne(TimeSpan.FromMinutes(5));
  }
}
</code></pre>

<p>But, unlike sagas, this process is not a pain in the neck, when matter comes to debugging, maintenance and upgrades in real world.</p>

<h2>Bounded Context</h2>

<p>All these 5 blocks from above can be combined together within a bounded context to express any kind of desired behavior. For instance, let's say we are defining a BC for managing access of users to some cloud service. This BC would be responsible for:</p>

<ul>
<li>telling service fabric, which users are granted access to to it (and with which keys)</li>
<li>receiving fine-grained usage statistics from service fabric;</li>
<li>aggregating these statistics on a periodical basis into consumption bills for actual billing process.</li>
</ul>

<p>Such BC would have following components:</p>

<ul>
<li><strong>Workflow</strong> that subscribes to outside account management events (from other BCs) and passes them as commands to internal <strong>command handlers</strong> (which will have <strong>aggregates</strong> for consumption tracking);</li>
<li>these command handlers would also call <strong>domain service</strong> for service fabric management API to add/remove access keys for users;</li>
<li>there will be a continuously running <strong>process</strong> to poll management API of service fabric for any new consumption details and pass them to consumption aggregates.</li>
<li>there will be a <strong>projection</strong> that maintains a list of all accounts along with their respective billing periods.</li>
<li>this projection will be scanned once in a while by a <strong>process</strong> that will look for accounts that should have their consumption bills settled. For each of these, it will send a command to internal aggregate, instructing it to close them.</li>
</ul>

<p>Somewhere in bounded contexts far far away, there could also be:</p>

<ul>
<li>a billing process in some other bounded context, that is interested in events about closed cnosumption bills (using them to charge customer's balance)</li>
<li>Web Admin UI that displays a view with last 500 resources consumed and top consumers (kindly populated by corresponding projections)</li>
<li>Web client UI that displays for the customers detailed break-down of the resources they have consumed within the last billing period.</li>
<li>etc...</li>
</ul>

<p>But these are different bounded contexts, with different story, purpose, tech requirements and combination of these 5 core building blocks.</p>


<h2>Update</h2>

<p>This article has been improved upon with: <a href="/post/anatomy-of-distributed-system-la-lokad">Anatomy of Distributed System à la Lokad</a></p>

