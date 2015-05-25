---
aliases:
- /event-sourcing/specifications
date: 2011-09-26
tags:
- xLim
- DDD
- CQRS
- Domain Event
- popular
title: Event Sourcing - Specifications
---
# Event Sourcing: Specifications

When you hear about [Event Sourcing](http://bliki.abdullin.com/event-sourcing/why), one of the mentioned advantages is ability to write expressive and non-fragile tests. This is done via specifications.

**Specification** is just a certain scenario that says: **Given** some preconditions, **When** something happens, **Expect** this.

Specifications are a rather nice and flexible way to express and verify certain behaviors. If you are developing with Microsoft .NET, check out a sample of generic Specifications framework see [SimpleTesting](https://github.com/gregoryyoung/Simple.Testing) by [Greg Young](http://twitter.com/#!/gregyoung). 

Obviously, specifications can be bound and executed via any unit testing engine (or using stand-alone runners). For NUnit bindings - see [snippet](https://gist.github.com/1109611) by [Yevhen Bobrov](http://twitter.com/#!/yevhen)

// TODO: update with my own snippet, which reduces friction a little bit more.

Coded specifications for ES might look like this:

    public Specification Creating_customer_opens_bill = new CustomerSpec
        {
            Before = () => Current.DateIs(2011,10,6),
            When = new CreateCustomer(cust, "Northwind"),
            Expect =
                {
                    new CustomerCreated(cust, "Northwind"),
                    new CustomerBillOpened(cust, 1, Date(2011,10,6))
                },
            Finally = Current.Reset
        };

## Testing Aggregates

Specifications act as a natural way to test complex business logic, which is [implemented with CQRS+ES way](http://abdullin.com/journal/2011/6/26/event-sourcing-a-la-lokad.html). This happens because behaviors in aggregates are coded like:

* **Given** a certain events in the past (used to rebuild the state)
* **When** a command is passed
* **Generate** certain events. 

Hence, we can easily test any single command in various scenarios, by providing preconditions (events that happened before) and comparing actually produced results with the expected ones.

// TODO: repeat spec snippet and include explanation

In certain cases we might also need to provide test setups and tear-downs within the specification. For instance, if aggregate uses some sort of `MyOverridableTime` static class to retrieve time in a testable way (and record it in an event), we could handle the situation like this:

    public Specification Creating_customer_opens_bill = new CustomerSpec
        {
            Before = () => MyOverridableTime.DateIs(2011,10,6),
            When = new CreateCustomer(cust, "Northwind"),
            Expect =
                {
                    new CustomerCreated(cust, "Northwind"),
                    new CustomerBillOpened(cust, 1, Date(2011,10,6))
                },
            Finally = MyOverridableTime.Reset
        };

## More complex scenarios

Sometimes, simple field-based specification syntax is not flexible enough for our needs. Or it can create a messy code. 

In this case you can actually define specifications in methods that return either an instance of `Specification` or  `IEnumerable<Specification>`

    // TODO: include sample snippet.

You can also use builders (either a stand-alone class or a method within the specification suite) to reduce repetitive code in your unit tests.

    // TODO: include snippet from testing bill-2-invoice conversion

If you want to push the scenario even further (*at the cost of higher fragility*), you can actually record Given-When-Then using some textual serialization. This would create a text file per specification. Then, while running unit tests, simply enumerate all files in a directory (or resources in an assembly), building a specification for each one.

## Organizing specifications

## Low Fragility

Lower fragility of specifications (for instance, compared to unit testing business logic bound to the database) comes from the fact that we are actually using [Ubiquitous Language](http://domaindrivendesign.org/node/132) to express behaviors of the subject under test. While doing that, we don't couple our tests with the actual implementations of these behaviors. For all we know, inner code can be wildly refactored, completely changing everything. Yet, as long as the behaviors stay the same - we don't care.

Another reason for lower unit test fragility - behaviors are expressed as messages which are structured around real-world language of the problem domain. This language does not change often. In fact, it requires a small revolution in order for this to happen. 

> events would still change, though. Although language doesn't really change, our understanding of it can evolve. I wrote an article recently about [versioning event contracts](http://bliki.abdullin.com/event-sourcing/versioning)

## Specifications as a Living Documentation

If you have a specification, you can easily and automatically convert it into a readable scenario document (SimpleTesting has a snippet showing how to achieve that).

    Creating customer opens bill - Passed
    
    Date Is(2011, 10, 6)
    
    When: Create customer 'Northwind' with id 7
    
    Expectations:
      [Passed] Created customer 7 'Northwind'
      [Passed] Opened bill 7/1 from 20111006

The simple trick that actually creates all these readable lines is about using `.ToString()` of each message (or any other equivalent).

So you can actually print out your entire unit test suite and then verify it with the business team. If you are delivering a project, acceptance can sign these scenario specifications (actually saying that they agree with how unit tests are run).

What's more interesting, these specifications (in their textual form) can be written by a business team. Then you can have a junior developer to convert them into the code. Another developer can actually start working on implementing the business logic in an aggregate. You could always measure this progress of this developer by calculating `implementedSpecifications / totalSpecifications`.

And while developer is coding in behaviors (which can be quite complex), another team can be actually working on UI and projections.



## Reusing specifications to test contracts.

Message contracts (both commands and events) are not fragile. Yet serializing them can yield unexpected results, especially if you are switching between different serializers.

For instance, `ServiceStack` serializer has issues with serializing almost all structs (except the primitive ones). Another example is limited support of `DateTime.Kind` by `ProtoBuf` and `ServiceStack`.

I used to verify (occasionally) contract serialization stability by creating unit tests that fill some objects with data, roundtrip via serializer and then compare results. This approach had some issues:

* not all messages are covered;
* tedious to create every single case of valid data.

However, if we are using CQRS+ES and Specifications for testing, there is a better way. We just need to scan the unit test assembly for all specifications available. Grab them, but do not execute. Instead, just aggregate all messages that ever were passed into `Given`, `When` or `Expect`. Voila, you already have a few populated message objects for each contract. Just round-trip them through your favorite serializers to see compatibility issues in advance.

If you are using NUnit, then a little bit of magic with [TestCaseData](http://www.nunit.org/index.php?p=testCaseSource&r=2.5.9) could give something like this:

<span class="full-image-block ssNonEditable"><span><img src="http://abdullin.com/storage/uploads/2011/10/2011-10-06_spec-abuse.png?__SQUARESPACE_CACHEVERSION=1317888233127" alt=""/></span></span>

And comparison code can be as simple as:

    [TestCaseSource("ListMessages")]
    public void GoogleProtoBuf(IEnumerable<object> msgs)
    {
        foreach (var exp in msgs)
        {
            var actual = Serializer.DeepClone(exp);
            var compare = CompareObjects.FindDifferences(exp, actual);
            if (!string.IsNullOrWhiteSpace(compare))
            {
                Assert.Fail(compare);
            }
        }
    }

Where CompareObject is just a plug to [CompareObjects.NET](http://comparenetobjects.codeplex.com/) (many thanks for [Yves Reynhout](http://twitter.com/#!/yreynhout) for pointing this project).

## Low-Friction Event Comparison

There are multiple approaches to compare events, while validating specifications. I usually perform deep comparison of event objects by using CompareObjects.NET.

If the events are different, then the actual member-by-member diff result might look too complicated for a human being to understand with a single glance:

    // TODO: put compare output snippet.

What we can do is to replace this output with `ToString` representations, which usually have a human-readable `string.Format` in them.

    // TODO: sample output of ToString compare

However, it could happen, that both string representations are equivalent (i.e. there are actually no `ToString` overloads, ir difference is detected in a field that is not presented within the string). Then we need to fall back to the usual diff produced by `CompareObjects`.

If you find yourself seeing a lot of member-by-member diffs, then this might be a symptom that your text representations of events could be refactored to reflect events better.

## Redirecting Context.Explain

In the document on writing plain AR+ES classes we've mentioned use of `Context.Explain` to capture and annotate non-trivial business decisions.

We can actually capture that information while running our specification. This will make our specifications more understandable for developers (while debugging and fixing tests) and to business people (while reviewing specifications).

    // TODO: include snippet of the same test with explain output  

Obviously, if you are using some logger (as a framework or an abstraction), you can achieve the same with slightly more complicated code. Just make sure, that running tests in parallel will not intermix their outputs between each other.
