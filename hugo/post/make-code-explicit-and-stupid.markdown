---
aliases:
- /journal/2012/2/6/make-code-explicit-and-stupid.html/index.html
date: 2012-02-06
title: Make Code Explicit and Stupid
tags:
- design
- patterns
---
<p>There is one thing that surprises me in software development.</p>

<p>We, as developers, go at great lengths, explaining how event-centric architectures are so better than CRUD-based ones: you don't need to reverse engineer behaviors from state, since you <strong>express them explicitly</strong> (as events) and can project to any structural form.</p>

<blockquote>
  <p>At Lokad we leverage this heavily for web UIs, that tend to be <a href="http://abdullin.com/journal/2012/2/5/people-dont-think-in-tables.html">slightly more intuitive</a> because of that.</p>
</blockquote>

<p>However, when things get to the code, we suddenly change our minds to the opposite and vastly favor implicit conventions and smart heuristics to discover and wire components in an application. </p>

<p>Maybe this is because, <strong>we are so good with solving complex problems, that we see them in every single problem</strong>? </p>

<p><span class="full-image-block ssNonEditable"><span><img src="/storage/uploads/2012/02/2012-02-06_smart2.png" alt=""/></span></span></p>

<p>(this is only a part of the picture, component instantiation is in another class).</p>

<p>We say, that such approach is smart, generic and reduces friction (when such approach is pushed to extreme, it is called <em>Inversion of Control Container</em>). That it generally is a better alternative than this:</p>

<p><span class="full-image-block ssNonEditable"><span><img src="/storage/uploads/2012/02/2012-02-06_proj-boring.png" alt=""/></span></span></p>

<p>Seriously, is it?</p>

<p><strong>An important remark</strong>: Both pieces of code were written by me. At the moment of writing of each one, I was extremely proud of the approach being used :)</p>
