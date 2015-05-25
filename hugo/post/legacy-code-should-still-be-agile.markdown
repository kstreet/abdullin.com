---
aliases:
- /journal/2009/7/22/legacy-code-should-still-be-agile.html/index.html
date: 2009-07-22
title: Legacy Code should still be Agile
tags:
- design
---
<p>We all have faced numerous situations with the legacy code and brownfield applications. General feeling towards these is "there is too much development friction, it would be easier to scrap the code and start a new version".</p>

<p>For a long time I've been a believer in this approach as well. This "long time" actually goes towards the beginning of my development career. Yet. despite the urge to rewrite everything, most of the times the situation went to restraining myself and gradually evolving the codebase. </p>

<p>This path initially feels to be much harder than a simple rewrite, simply because there are more variables software architect has to consider (as we all know a person can keep in mind only 5 +/- 2 distinct entities at a time). There are a few solid advantages, though:</p>

<ul>
<li>Code stays in production-ready state. This keeps the business value at a steady level and does not break the communication loop.</li>
<li>Evolving code guarantees that there will not be any missing features or other small-but-important details that tend to go missing in the first rewrite version.</li>
<li>Evolving code will stay within the feedback loop of quality assurance teams and customers. This would make it much harder for the codebase to go astray (which tends to happen when we, developers, close up in our dens to write the next version from scratch).</li>
<li>Pushing existing codebase is quite hard, due to all the momentum complex systems accrue. However, it creates a much better understanding of domain and applied technology at hand.</li>
</ul>

<p>So the resume is "dropping legacy code is bad, evolving is better". <strong>How do we do it</strong>?
.
Here's a simple approach I've came to:</p>

<ul>
<li>Isolate logical portion of the code that has to be evolved in the iteration. </li>
<li><p>Ensure that the scope of iteration is limited and understandable. You might want to use Project Management templates while documenting the scope.</p>

<p>Documentation part might be extremely important (even if it is merely about a few paragraphs), since it helps to clarify and settle down vision of the iteration. Written document would also serve as a nice restraining factor preventing the <em>scope creep</em>.</p></li>
<li><p>Ensure that it is covered with <a href="http://abdullin.com/wiki/unit-testing.html">unit tests</a> and other types of tests, if applicable.</p></li>
<li><p>Implement the prototype</p>

<p>This might take some limited time (and a few rewrites), since we will be seeking for the right ideas and implementation concepts</p></li>
</ul>

<p>Component-driven development will help.</p>

<ul>
<li>Merge the prototype</li>
<li><p>Write down for yourself somewhere:</p>

<ul>
<li>Lessons learned</li>
<li>Perspective</li>
</ul></li>
</ul>

<p>Basically, code itself does not really matter. Ideas and logic behind it are the real value. I'm not talking about the "business value" at this point (which is the development driver and focal point), but rather about architecture, patterns and composition. They are unique for every single domain.</p>
