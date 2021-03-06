---
aliases:
- /journal/2012/9/18/specification-testing-for-event-sourcing.html/index.html
date: 2012-09-18
tags:
- Lokad
- C#
- DDD
- Domain Event
- Story
title: Specification Testing For Event Sourcing
---
<p>When you no longer need to worry about persistence of A+ES entities, their captured behaviours tend to get more complex and intricate. In order to deliver software reliably in such conditions we need non-fragile and expressive way to capture and verify these behaviours with tests, while avoiding any regressions. </p>

<blockquote>
  <p>A+ES stands for <strong>Aggregates with Event Sourcing</strong>. This topic is covered in great detail in <a href="http://beingtheworst.com/category/podcasts">episodes of BeingTheWorst podcast</a>.</p>
</blockquote>

<p>In other words we need to ensure that:</p>

<ul>
<li>tests will not break as we change internal structure of aggregates;</li>
<li>test should be expressive to capture easily any complex behavior;</li>
<li>they should match mental model of aggregate design and be understandable even by junior developers.</li>
</ul>

<p>One solution is to focus on specific use cases using “specifications” or “given-when-then” tests. Within such tests we establish that:</p>

<ul>
<li><em>given</em> certain events;</li>
<li><em>when</em> a command is executed (our case);</li>
<li><em>then</em> we expect some specific events to happen.</li>
</ul>

<p>Primary difference between specification and normal unit test is that the former explicitly define and describe a use case in a structured manner, while the latter just executes code. Each A+ES specification can be executed as a unit test, while the reverse is not necessarily true.</p>

<p>Due to strong synergy with DDD and no coupling to internal structural representation of A+ES entity, <strong>these tests capture intent and are not affected by internal refactorings</strong> (something common to CRUD-based Aggregate implementations)</p>

<p>In C# you can express such test case as:</p>

<pre><code>[Test]
public void with_multiple_entries_and_previous_balance()
{
  Given(
    Price.SetPrice("salescast", 50m.Eur()),
    Price.SetPrice("forecast", 2m.Eur()),
    new CustomerCreated(id, "Landor", CurrencyType.Eur, guid, Date(2001)),
    new CustomerPaymentAdded(id, 1, 30m.Eur(), 30m.Eur(), "Prepaid", "magic", Date(2001)),
    ClockWasSet(2011, 3, 2)
  );

  When(
    new AddCustomerBill(id, bill, Date(2011, 2), Date(2011, 3), new[]
    {
      new CustomerBillEntry("salescast", 1),
      new CustomerBillEntry("forecast", 2),
      new CustomerBillEntry("forecast", 8)
    })
  );

  Expect(
    new CustomerBillChargeAdded(id, bill, Date(2011, 2), Date(2011, 3), new[]
    {
      new CustomerBillLine("salescast", "Test Product 'salescast'", 1, 50m.Eur()),
      new CustomerBillLine("forecast", "Test Product 'forecast'", 10, 20m.Eur()),
    }, 2, 70m.Eur(), -40m.Eur(), Date(2011, 3, 2))
  );
}
</code></pre>

<p>Test above is based on Lokad's version of A+ES Testing syntax, which was pushed to the master branch of <a href="https://github.com/Lokad/lokad-cqrs">Lokad.CQRS Sample Project</a>. Look for spec_syntax class there.</p>

<p>Please note, that these specifications test A+ES entities at the level of application services (they accept command messages instead of method calls). This means that any Domain Services (helper classes that are passed by application service down to aggregate method call) are handled by the application service as well. </p>

<p>In this case we can use test implementations of domain services, configuring them via special events. Such events would be generated by helper methods (e.g.: <code>Price.SetPrice("salescast", 50m.Eur())</code> or <code>ClockWasSet(2011, 3, 2)</code>). This allows us to reduce test fragility and also gain implicit documentation capabilities.</p>

<h2>Specifications as Living Documentation</h2>

<p>There are a few more side benefits of using specifications for testing business behaviours. First of all, specifications can act as a living documentation, which is always up-to-date. For instance, rendered documentation for the specification above would look like:</p>

<pre><code>Test:          add customer bill
Specification: with multiple entries and previous balance

GIVEN:
  1. Set price of salescast to 50 EUR
  2. Set price of forecast to 2 EUR
  3. Created customer Customer-7 Eur 'Landor' with key 29c516fb-bdaf-48f5-a83d-d1dca263fdb6...
  4. Tx 1: payment 30 EUR 'Prepaid' (magic)
  5. Test clock set to 2011-03-02

WHEN:
  Add bill 1 from 2011-02-01 to 2011-03-01
    salescast : 1
    forecast  : 2
    forecast  : 8

THEN:
  1. Tx 2: charge for bill 1 from 2011-02-01 to 2011-03-01
       Test Product 'salescast'       (1 salescast): 50 EUR
       Test Product 'forecast'        (10 forecast): 20 EUR

Results: [Passed]
</code></pre>

<p>This can be achieved by merely overriding ToString() methods of event and command contract classes. Open source SimpleTesting sample can provide more details.</p>

<p>Detailed documentation of AR+ES behaviours that is defined in form of specifications, always stays up-to-date and in sync with the code changes.</p>

<h2>Specifications as Design Tool</h2>

<p>If we push this concept of living documentation further down the road, specifications can be used to communicate with business experts upon the use cases, using Ubiquituous Language and domain models. You can either express use cases in text as “Given-When-Then”, have junior developer code them as unit tests and then ask domain experts to implement functionality.</p>

<p>Additional practical usage scenarios for specifications include:</p>

<ul>
<li>You can print out all specifications as a really thorough list of use-cases for signing off by project stakeholders.</li>
<li>Specifications can easily be visualized as diagrams and graphs. They could help in better understanding of your domain, finding non-tested or complicated spots and driving development in general. </li>
</ul>

<p>For instance, such diagram could look like:</p>

<p><span class="full-image-block ssNonEditable"><span><img src="/storage/uploads/2012/09/2012-09-18_103700.png?__SQUARESPACE_CACHEVERSION=1347943056122" alt=""/></span></span></p>

<p>Hope, this helps. I plan to cover this topic in greater detail in upcoming episodes of <a href="http://beingtheworst.com/">BeingTheWorst podcast</a>.</p>

