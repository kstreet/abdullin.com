---
aliases:
- /journal/2013/1/25/utility-classes-are-lesser-evils.html/index.html
date: 2013-01-25
tags:
- Lokad
title: Utility Classes are Lesser Evils
---
<p>Generally, code reusability (and <a href="http://en.wikipedia.org/wiki/Don't_repeat_yourself">Don't Repeat Yourself</a> principle) are a big evil, if used without constraint. They can
couple together really distant concepts, while increasing overall complexity of the code. </p>

<p>Did you ever have an utility class, which was introduced for a single purpose, but ended doing up everything at once?</p>

<p>That's why at Lokad we try to avoid utility classes. Especially if they have only a few uses spread across different parts of the project. Such code can be inlined instead.</p>

<p>However, sometimes, utility method is relatively complex and big. Plus, it can 
be used in too many places inside a single project. In such case we agree to
introduce utility class (which is internal for this project) and put it into
well-defined location (folder and/or namespace) called "LesserEvils", while 
adding "Evil" suffix to the class names.</p>

<p>Name somehow allows us to stay more conscious about abuse of common utility 
classes and potential coupling they can introduce into a project. Lesser of
evils is still an evil.</p>

