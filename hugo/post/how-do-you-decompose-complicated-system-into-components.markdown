---
aliases:
- /journal/2014/1/21/how-do-you-decompose-complicated-system-into-components.html/index.html
date: 2014-01-21
tags:
- design
- DDD
title: How do you decompose complicated system into components?
---
<p>The answer to the problem of finding a proper way to decompose existing complicated system into smaller components is two-fold:</p>

<ul>
<li>Use known methodologies for finding potential boundaries;</li>
<li>Iterate a lot to see if system system could be divided across these boundaries.</li>
</ul>

<p>Let's start with examples of  <strong>methods for finding potential boundaries</strong>:</p>

<ul>
<li>Look at the domain model from the <strong>perspective of Domain-Driven Design</strong>, seeking out bounded contexts and aggregate boundaries there (although classical DDDish BCs and aggregates could often be split in smaller focused parts as well).</li>
<li><strong>Separate domain-side problems</strong> (need domain expert) <strong>from implementation problems</strong> like scalability (in some projects performance might be part of the domain, too);</li>
<li><strong>Use domain events to capture state changes</strong> in some parts of your system; then <strong>identify related events and group them</strong> - they could be a core of a new component; non-related events could probably be put into separate components;</li>
<li>Look from the perspective of <strong>separating project between multiple teams and individual developers</strong>; </li>
<li>Look at <strong>transactional boundaries</strong> in your system. If there are that changes must absolutely happen together (or fail together) then they might be candidates for being put into a single component. If some changes don't really affect the others, then you could probably consider keeping them separately.</li>
<li>Search for processes which must be coupled tightly from the <strong>temporal perspective</strong> - they might belong to one component. At the same time, presence of queues might indicate potential component boundary.</li>
</ul>

<p>And, above all, simply keep on asking yourself one simple question - <strong>what things can be taken apart</strong>? <strong>How can we separate our software into atomic things that can be composed to solve the problem</strong>. </p>

<p>Decomposition is not simply about breaking some project into a bunch of tightly coupled modules. <strong>The idea is to identify the boundaries and invest effort into evolving them</strong>. </p>

<p>Methods for finding potential boundaries (like the ones listed above) only provide you with some hints and ideas. Your objective (as a designer) would be to play with these ideas, iterate and evolve system, while finding options that truly make it more robust, evolution-friendly and simple (put your priorities here).</p>

