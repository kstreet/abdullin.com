---
aliases:
- /journal/2010/9/17/scenario-based-unit-tests-for-ddd-with-event-sourcing.html/index.html
date: 2010-09-17
tags:
- xLim
- DDD
- CQRS
- Domain Event
title: Scenario-based Unit Tests for DDD with Event Sourcing
---
<p>I'm still in the process of learning Domain-Driven Design for CQRS coupled with the Event Sourcing.</p>

<p>One of the things I really like about this approach is the ability to thoroughly and reliably unit test even complex domains. As I've tried yesterday in a learning project, a unit test is basically a simple scenario (txt) file that looks like this:</p>

<pre><code>Given
.ContextCreated
{
  "ContextId": "10000000-0000-0000-0000-000000000000",
  "Name": "Name",
  "Rank": 12
}

When
.RenameContext
{
  "ContextId": "10000000-0000-0000-0000-000000000000",
  "Name": "New Name"
}

Expect
.ContextRenamed
{
  "ContextId": "10000000-0000-0000-0000-000000000000",
  "Name": "New Name"
}
</code></pre>

<p>Or if we are expecting an exception:</p>

<pre><code>Given
When
.RenameContext
{
  "ContextId": "10000000-0000-0000-0000-000000000000",
  "Name": "New Name"
}

Expect
.InvalidOperation
{     
}
</code></pre>

<p>Basically each unit test ensures that:</p>

<ul>
<li><strong>Given</strong> certain events in the past (they determine state of the Aggregate Root)</li>
<li><strong>When</strong> we call a single command (that's the behavior we are testing)</li>
<li><strong>Expected</strong> outcome is expressed as either 0..N events or an exception. These events are determine both the state of the AR and what is published to the bus (for further consumption by CQRS architecture).</li>
</ul>

<p>These tests are generated by hand (or from the UI or by recording sessions). You <strong>just drop them into the folder</strong> of your liking inside the test project (this feels like a reduced dev friction as compared to .NET unit tests). There is even no need to launch Visual Studio and add item references. Build will pick scenarios up automagically via the means of of slightly modified project file:</p>

<pre><code>&lt;Target Name="BeforeBuild"&gt;
 &lt;CreateItem Include="Scenarios\**\*.txt"&gt;
   &lt;Output ItemName="EmbeddedResource" TaskParameter="Include" /&gt;
 &lt;/CreateItem&gt;
&lt;/Target&gt;
</code></pre>

<p>The output will be a nice Project.Tests.Scenarios.dll that contains all the scenarios as <em>embedded resources</em>. Afterwards, you just need to generate tests (one test for each resource). In NUnit you can do something like this (note how Rx makes things so elegantly simple):</p>

<pre><code>[Test, TestCaseSource("LoadScenarios")]
public void Test(Scenario scenario)
{
  if (null != scenario.LoadingFailure)
    throw scenario.LoadingFailure;

  var observer = new Subject&lt;Change&gt;();
  var root = new SolutionAggregateRoot(observer.OnNext);

  foreach (var @event in scenario.Given)
  {
    root.Apply(@event);
  }
  var interesting = new List&lt;Change&gt;();
  using (observer.Subscribe(interesting.Add))
  {
    DomainInvoker.RouteCommandsToDo(root, scenario.When);
  }
  var actual = interesting.Select(i =&gt; i.Event);
  ScenarioManager.AssertAreEqual(scenario.Expect, actual, scenario.Description);
}
</code></pre>

<p><em>TestCaseSource</em> is <em>NUnit native attribute</em> that generates a unit test for each argument that is passed by the referenced collection factory. The latter could look like:</p>

<pre><code>public static IEnumerable LoadScenarios()
{
  var assembly = Assembly.GetExecutingAssembly();
  var clean = "Kensho.Domain.Scenarios.Scenarios.";
  foreach (var name in assembly.GetManifestResourceNames().OrderBy(n =&gt; n))
  {
    using (var stream = assembly.GetManifestResourceStream(name))
    using (var reader = new StreamReader(stream))
    {
      Scenario scenario;
      var testName = name.Replace(clean, "").Replace(".txt","");
      try
      {
        scenario = ScenarioManager.Parse(reader);

      }
      catch (Exception ex)
      {
        scenario = new Scenario {LoadingFailure = ex};
      }

      var data = new TestCaseData(scenario)
          .SetName(testName)
          .SetDescription(scenario.Description);

      var failure = scenario.Expect.OfType&lt;IFailure&gt;().FirstOrDefault();
      if (failure != null)
      {
        data.Throws(failure.GetExceptionType());
      }
      yield return data;

    }
  }
}
</code></pre>

<p>Given all this, a folder like that:</p>

<p><span class="full-image-block ssNonEditable"><span><img src="/storage/uploads/2010/09/2010-09-17_DDD_scenario_unit_tests.png" alt="DDD Scenarios as unit tests"/></span></span></p>

<p>Would be translated into NUnit test suite like this:</p>

<p><span class="full-image-block ssNonEditable"><span><img src="/storage/uploads/2010/09/2010-09-17_DDD_scenarios_NUnit.png" alt="DDD scenarios when loaded as NUnit unit tests"/></span></span></p>

<p>I'm still not sure if it is possible to affect NUnit tree structure via the attributes, making it more sensible and clean.</p>

<p>A few notes:</p>

<ul>
<li>Latest Resharper does not work properly with these attributes (they probably haven't upgraded to the latest NUnit engine, yet).</li>
<li>In this case NewtonSoft JSON serializer is used to persist messages for the scenario purposes.</li>
<li>Adding new tests is really low-friction task. It's easy to have lot's of them or delete unneeded ones.</li>
<li>Running unit tests is <strong>extremely fast</strong> and it does not require anything other than the AR assembly and message contracts assembly. Persistence ignorance is at rule here.</li>
<li>Essentially unit tests form <strong>specifications for the domain</strong> here. Theoretically they could be captured with the help of UI (when some undesired behavior occurs) by people that are not familiar with the specific programming language. In essence we might be separating domain knowledge from the platform/language used to actually code this AR. This should provide some <strong>development parallelization and outsourcing opportunities</strong> that compliment native CQRS features in this area.</li>
<li>AR unit tests in this case are not really fragile (they test only explicit behaviors) and should protect against regressions really well, while allowing to move forward incrementally and reliably with <strong>developing AR implementations for complex scenarios</strong> (something that I've been stuck with so far).</li>
</ul>

<p>All in all this experience is just based on my attempt to learn <a href="http://abdullin.com/journal/2010/3/23/dddd-cqrs-and-other-enterprise-development-buzz-words.html">CQRS/DDD/ES</a> by the means of running a learning project. You need to stay ahead of the current development requirements in a fast-paced environment like <a href="http://www.lokad.com" target="_blank" class="offsite-link-inline">Lokad</a>. Yet so far this scenario-based approach (inspired by using Fiddler recording sessions to unit test REST APIs) seems to look quite good, despite the fact that it was formalized and implemented just last night.</p>

<p>Yet I'm really interested if there are any ways to improve the experience (esp. reducing friction-per test). So here are a few <strong>questions to the readers</strong>:</p>

<ul>
<li>Does anybody know any simpler serialization format for messages, than JSON?</li>
<li>How do you test your domains? Are there more simple ways to organize, manage and run tests? What naming and organizing conventions to you use?</li>
<li>How do you organize your tests (both code-based and scenario-based) and keep them in sync with the big-picture requirement descriptions?</li>
<li>Any hints on improving this testing experience?</li>
</ul>

<p>PS: You can check out <a href="http://abdullin.com/xlim/">xLim 4: CQRS in Cloud</a> series for any latest materials on this topic.</p>

