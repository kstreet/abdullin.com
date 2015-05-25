---
aliases:
- /journal/2008/7/15/the-power-of-simplicity.html/index.html
date: 2008-07-15
tags:
- tdd
title: The power of simplicity
---
<p><em>Answer to a comment by <a href="/journal/2008/7/15/nunit-introduces-the-concept-of-row-tests.html#comment-541">Jeremy Gray</a> has started getting really long, so I'm putting the primary idea in a separate post.</em></p>

<p>As we all know, NUnit is one of the first unit testing frameworks for .NET. It is old, stable and quite conservative. At the same time, it's feature set is inferior to the functionality provided by some newer frameworks (or even frameworks for handling unit testing frameworks, like Gallio).</p>

<p>However, I'm still trying to stick to NUnit in my projects. Reasons for that are:</p>

<ul>
<li>It does not make reading tests challenging for new devs (unit tests are normally point of entry into the code, if they are present)</li>
<li>Unit tests are often considered to be usage samples for the code they test. We'd prefer to keep these simple, would not we?</li>
<li><strong>The most important reason for me:</strong> simple unit testing framework forces developer to write unit tests that are easily testable (just like TDD forces some good logical separation between the components)</li>
</ul>

<p>Imagine some really complex method that accepts quite a number of arguments and performs some black-box magic inside. If you have a data-driven unit testing framework at hand, you can simply create CSV file with valid entries and test this method against that. But if you do not have this functionality at hand, then you'd need to refactor the method to make it more simple and testable. </p>

<p>I like the last scenario. Even if it is not fun at the very start, it does pay off in the long term.</p>

