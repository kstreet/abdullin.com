---
aliases:
- /journal/2011/12/27/example-of-self-documenting-unit-test-with-event-sourcing.html/index.html
date: 2011-12-27
tags:
- tdd
- DDD
- Domain Event
title: Example of Self-documenting Unit Test with Event Sourcing
---
<p>One of the biggest advantages of <a href="http://bliki.abdullin.com/event-sourcing/">event sourcing</a> approach is it's inherent <strong>capability to turn unit tests into a living documentation</strong>. Below is an example of specification that I've worked my way through today (that's how NUnit prints it out).</p>

<pre><code>registrations: duplicate email fails - Passed

Environment: 
  index includes email("contact@lokad.com")

When: Register 'd6e64e':
        Customer Name: Lokad
        Contact Email: contact@lokad.com
        Date:          2011-12-27

Expectations:
  [Passed] Registration 'd6e64e':
             Customer Name: Lokad
             Contact Email: contact@lokad.com
             Date:          2011-12-27
  [Passed] Registration 'd6e64e' failed:
             Email 'contact@lokad.com' is already taken.
</code></pre>

<p>And here's how actual NUnit code looks like:</p>

<pre><code>public Specification duplicate_email_fails()
{
    var info = new RegistrationInfoBuilder("contact@lokad.com", "Lokad").Build();
    var index = new MockUniquenessService();

    return new RegistrationSpec(index)
        {
            Before = {() =&gt; index.includes_email("contact@lokad.com")},
            When = new CreateRegistration(reg, info),
            Expect =
                {
                    new RegistrationCreated(reg, info),
                    new RegistrationFailed(reg, new[]
                        {
                            "Email 'contact@lokad.com' is already taken."
                        })
                },
            Finally = index.Clear
        };
}
</code></pre>

<p>All was achieved without any special magic or even fancy tools. I've just pulled over sources of <a href="https://github.com/gregoryyoung/Simple.Testing">SimpleTesting</a> and <a href="http://comparenetobjects.codeplex.com/">CompareObjects</a> for additional readability.</p>

<p>For those who are interested in <code>RegistrationSpec</code> class, it is just a simple snippet wiring together dependencies of aggregate root to a strongly-typed specification deriving from <code>TypedSpecification</code> in <code>SimpleTesting</code>:</p>

<pre><code>public sealed class RegistrationSpec : AggregateSpecification&lt;RegistrationId&gt;
{
    public RegistrationSpec(IRegistrationUniquenessService service)
    {
        Factory = (events, observer) =&gt;
            {
                var state = new RegistrationAggregateState(events);
                return new RegistrationAggregate(state, observer, service, 
                    new TestPassword(), 
                    new TestIdentity());
            };
    }
}
</code></pre>

<p>Explicit strong-typing of aggregates (as described in <a href="http://bliki.abdullin.com/event-centric/aggregates-2">bliki</a>) works all the way back in unit test specification by allowing to benefit from  compiler-time checking and IntelliSense support. In other words: you <strong>don't need to navigate through hundreds of messages</strong> to figure out which ones are actually applicable in test.</p>

<p><span class="full-image-block ssNonEditable"><span><img src="/storage/uploads/2011/12/2011-12-27_event_sourcing_test.png?__SQUARESPACE_CACHEVERSION=1324998719605" alt=""/></span></span></p>

