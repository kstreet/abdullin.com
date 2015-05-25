---
aliases:
- /journal/2009/9/21/concurrency-programming-is-like-thinking-in-5-dimensions.html/index.html
date: 2009-09-21
title: Concurrency Programming is Like Thinking in 5 Dimensions
tags:
- essay
---
<p>Concurrency is about thinking in 5 dimensions at once. </p>

<p>Let's consider a single code class to be a 2D space. In the end, it's flat and fits on one display.</p>

<p>File organization (either flat or with multiple folders) add another dimension - third one.</p>

<p>These are static dimensions, just like the height, width and depth in the real world.</p>

<p>Fourth dimension, time, has it's own analogue in the code world - execution of the code within a single thread. This is were the code comes to life and shines in its dynamics.</p>

<p>Concurrency brings another dimension to the mix - the fifth one, since you have to deal with multiple threads being executed. They are just like parallel dimensions in the real world. That brings us somewhat close to 5D.</p>

<p>So delivering reliable concurrent code is about thinking in 5 dimensions:</p>

<ul>
<li>it takes a bit of time and exercise to get used to to it;</li>
<li>it is rather hard to visualize;</li>
<li>you may want to keep the basic logical pieces as simple as possible in order to manage and evolve the entire system efficiently in your head.</li>
</ul>

<p>Adding distributed systems could pump the dimensionality count up a little bit as well, increasing the complexity and excitement of the delivery.</p>

<p>NB: thinking about an entity (software system, in our case) from completely different angles helps to find simpler solutions to existing problems and challenges in the code.</p>
