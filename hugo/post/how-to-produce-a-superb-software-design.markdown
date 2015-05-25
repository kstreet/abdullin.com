---
aliases:
- /journal/2013/9/22/how-to-produce-a-superb-software-design.html/index.html
date: 2013-09-22
tags:
- Story
title: How to produce a superb software design?
---
<p>It's impossible to arrive at a perfect design right from the start. There are far too many uncertainties and unknowns involved in the process. Hence, you can safely assume that some sort of iterative learning process would be required. </p>

<blockquote>
  <p>Software development is a learning process. Working code is a side effect. <br />
© Alberto Brandolini, Model Storming Presentation</p>
</blockquote>

<p><em>Lessons learned</em> could come in various forms:</p>

<ul>
<li>discovered requirements and constraints;</li>
<li>implemented features or fixed bugs;</li>
<li>written documentation (wiki articles, email threads, diagrams, napkin drawings, whiteboard photos, software guides etc).</li>
</ul>

<p>One of the most important goals of this learning process is to keep iteratively integrating newly discovered knowledge into already captured body of knowledge, while enriching it. This task might be more challenging than it seems at a first glance. </p>

<p>Let's step away from software for a moment. If you think of it, continuously adding <em>stuff</em> to any existing storage container could eventually lead to a situation when we not only ran out of the free space, but it becomes really challenging to do anything with things that are already stored there. Consider filling cabinet with papers or adding more tools into a small closet. Unless we somehow reorganize the space (add more filing cabinets, introduce more shelves in a closet), it will be hard to work with all the accumulated <em>stuff</em>. Another option would be to come with smarter way to organize papers (e.g.: alphabetically) or tools (e.g. put the ones that are used most frequently - upfront).</p>

<p>Same principle can apply to software design. Even though software size is rarely a limitation these days, our mind is quite limited in the number of things it can handle at once without the support of some sane mental model.</p>

<blockquote>
  <p>…number of objects an average human can hold in working memory is 7 ± 2. <br />
© Wikipedia, The Magical Number Seven</p>
</blockquote>

<p><strong>That's what happened in far too many projects that I've seen</strong>: new features were continuously added to the project without adjusting software design to handle increased complexity. Such situations lead to the point where software got so fragile that developers would spend more time fixing bugs than adding new features. Quite often resolving one bug would release a horde of new ones.</p>

<p>One of the most frequent solutions to this problem sounds like this: <em>"There is too much legacy. We can't add any more features to our software till we rewrite everything from the scratch in version two."</em> </p>

<p>In reality, approach of rewriting complex software from the scratch can be more problematic than it appears:</p>

<ul>
<li>rewrite costs time and money;</li>
<li>new bugs can be introduced in the process, since we are changing existing and working software for something new;</li>
<li>some really important requirements and features can be lost.</li>
</ul>

<p>Ideal solution to the problem of increasing complexity would be to avoid such bottlenecks in the first place. This can be done by:</p>

<ul>
<li>keeping software complexity as low as possible;</li>
<li>continuously evaluating fitness of design as more requirements and features are introduced;</li>
<li>continously adjusting design to stay meaningful and simple despite new features being added.</li>
</ul>

<p>In this case we can talk about iteratively integrating new insights (features, requirements etc) into the software, while also adjusting the design to handle increased complexity. At each step software would stay healthy enough to keep on pushing forward its evolution without much friction. I believe, this constitutes a superb software design.</p>

<p><strong>Hence: Arrive at healthy design by evolving it through a series of enriching transformations.</strong></p>

<p>This might sound like a lot of work. However, if we design for such continuous evolution upfront, then at each step we would need to deal only with a limited scope of change. This would reduce risk of introducing unexpected bugs or loosing an important requirement. Developers would stay sane, too.</p>

<p><em>Note: This blog post is a draft of one story for an ebook on healthy design and patterns. Stay tuned, if interested. All comments are welcome.</em></p>

