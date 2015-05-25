---
aliases:
- /journal/2011/9/28/golden-rule-of-technology.html/index.html
date: 2011-09-28
tags:
- management
- Lokad
title: Golden Rule of Technology
---
<p>The rule says: <strong>1 new technology goes into codebase only after 1 old technology goes out</strong>.</p>

<p>This is a <em>simple empirical rule</em> that we've coined with <a href="http://vermorel.com/">Joannes</a>, while talking about business and managing technology. As it turns out, this rule makes a really nice guideline for planning future development.</p>

<p>The rule can apply to all sorts of things: new technological concepts, frameworks, ideas, tools and software. Basically, a <strong>technology</strong> in this list is <em>anything that a new Junior Developer will have to learn about the project, before he can productively work the assignments</em>.</p>

<p>This approach encourages <em>technology pruning</em> and explains how to structure technological evolution of your company, almost turning this process into a game. This is quite important, since otherwise it will be hard to "embrace the change" and leverage new technologies and tools, as opposed to being hit hard by every new "revolution". Essentially it helps to define your own <a href="http://www.thoughtworks.com/radar">Technology Radar</a> at the project level.</p>

<p>For instance, we have the following evolution path for the User Interfaces in the world of Microsoft .NET Framework: </p>

<ul>
<li>Windows.Forms</li>
<li>Silverlight/WPF</li>
<li>Windows 8/HTML5/some Metro UI</li>
</ul>

<p>If you treat these UI technologies as something to focus completely on, then every new change might be quite expensive (i.e. from Silverlight to HTML5), because of the way the problem is being structured:</p>

<blockquote>
  <p>We are going to develop new eCommerce suite with Silverlight. </p>
</blockquote>

<p>However, treating technologies as something transient and replaceable can reduce costs and even improve architecture (making it more resilient to risks and changes). Consider this way to structure a problem:</p>

<blockquote>
  <p>We are going to deliver eCommerce suite, while using Silverlight for UI for the time being.</p>
</blockquote>

<p>Obviously, this approach requires an architecture that favors decoupling and simplicity (i.e.: <a href="/tags/cqrs/">CQRS/DDD/ES methodology</a>). However, this is not limited by the software architecture alone. Here are some samples:</p>

<ul>
<li>Frameworks</li>
<li>Version Control Systems</li>
<li>Testing Approaches</li>
<li>Project Management Concepts</li>
<li>Integration Servers</li>
<li>Deployment Strategies</li>
<li>Serialization Formats</li>
</ul>

<p>Another interesting side effect of this Golder Rule of Technology is that it <strong>encourages developers to simplify and refactor</strong> in order to be able to try some new cool things in the project.</p>

<p>And sometimes, when you get rid of an old technology, there already is so much improvement, that you don't even want to add anything instead. One example of such replacement in place is gradual migration from traditional SQL-driven persistence to <a href="http://abdullin.com/journal/2011/9/27/why-event-sourcing.html">Event Sourcing</a> at <a href="http://www.lokad.com/aboutus.ashx">our place</a>. It allows us to discard quite a few items from the current stack:</p>

<ul>
<li>NHibernate with all the related binary dependencies </li>
<li>SQL Servers along with the entire concept of relational database and <a href="http://en.wikipedia.org/wiki/Object-relational_impedance_mismatch">object-relational impedance mismatch</a></li>
<li>Evolutionary databases and managing them (including upgrade scripts and unit tests working against mock databases to verify behaviors on continuous integration servers)</li>
</ul>

<p>Another practical sample would be - planned replacement of API implemented as REST via WCF (with SOAP and all sorts of weird configuration problems) towards a dead-simple implementation on HttpListener.</p>

<p>An interesting thing is that I never really considered complexity of technologies related to a feature till starting to think about that in terms of "Return on Technology Introduced". As it turns out:</p>

<ul>
<li>Usage of technologies is extremely overrated (sometimes attributed to the marketing hype related to certain buzz-words).</li>
<li>Usage of additional technologies tends to increase both burden and complexity of a project at hand. Emprical evidence suggests that linear increases in these - lead to exponential rise in project costs. </li>
</ul>

<p>The process of complexity increase can continue till the project becomes so expensive that it stalls. By reducing the number of non-essential technologies used, we can have better management of overall complexity (fighting delays, quality problems and costs).</p>

<p>In essence, <strong>simplicity is a technology of its own</strong>. But it does not count as one.</p>

