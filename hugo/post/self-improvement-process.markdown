---
aliases:
- /journal/2011/7/17/self-improvement-process.html/index.html
date: 2011-07-17
tags:
- xLim
- Lokad
title: Self-Improvement Process
---
<p>Lately I've been doing a little bit of new and well-forgotten old things, while trying to become a better me. They also help me to reduce work pressure by offering something new for the brain to chew on.</p>

<p>I just wanted to share these things (at least for the sake of writing down the links). We'll talk a little bit about:</p>

<ul>
<li>git;</li>
<li>vim;</li>
<li>LMAX and Martin Fowler;</li>
<li>VerseQ;</li>
<li>Lokad.CQRS and functional approach.</li>
</ul>

<h2>Git</h2>

<p>I've started using git on a number of new learning projects. As I've mentioned it on a couple of occasions already, I start liking git more than mercurial, despite its steeper learning curve.</p>

<p>By the way, Google Code has finally added git to their project support. Although they are way too much behind github both in usability and commits.</p>

<h2>Vim</h2>

<p>Subj, the good old editor coming from the terminal era. Exactly the one, where "the best way to generate a random string is to ask a student exit vim" (by the way, it is ":x" to exit with save-if-modified).</p>

<p>I find using it more and more for common text editing tasks. That's where I'm writing articles and blog posts these days.</p>

<blockquote>
  <p>And I'm getting really tempted to start replacing IDEs with vim in non-.NET environments. Developer's mind is better than any IDE anyway, especially when he or she deliberately keeps projects dead-simple.</p>
</blockquote>

<p>Now, if you got interested in vim, then that's what your <a href="http://symbolsystem.com/2010/12/15/this-is-your-brain-on-vim/">future will look like</a>. If this didn't scare you, here's a <a href="http://lucisferre.net/2011/07/15/vim-from-start-to-finish">quick intro</a> from the eyes of guy from VS environment.</p>

<h2>LMAX and Martin Fowler</h2>

<p>It seems that all this CQRS/ES stuff is getting mainstream, since Martin Fowler wrote a bliki post on CQRS and really good overview of LMAX architecture: the latter is essentially an in-memory circular buffer that also acts as a queue for the event sourcing messages; processed by a single writer and multiple readers. All workers have access to each other location pointers and this avoid any locks altogether. Predefined buffer size and one-writer-only approach allows to achieve high hardware affinity (in other words, CPU likes it a lot).</p>

<p>The study is highly <a href="http://martinfowler.com/articles/lmax.html">recommended for a read</a>. </p>

<p>By the way:</p>

<ul>
<li>bliki is term for versioned blog/wiki coined by Martin Fowler a while ago. These days people just use <a href="http://pages.github.com/">github with markdown</a> (for example, <a href="http://lokad.github.com/cqrs/case-studies/2011-07-11-humanrecord">this Lokad.CQRS Study</a> isn't a page, but just a markdown file in a github repository).</li>
<li>Don't read Martin's pounding on branch-per-feature. I believe he got it wrong (and got quite a bit of pounding from the community afterwards).</li>
</ul>

<h2>VerseQ</h2>

<p>To keep up with the learning process, I've stepped back on improving my keyboard typing skills. I believe it would be a wise investment of my time to improve on something that is so tightly related to the job and thinking as the typing is. This (when coupled with vim) feels like reducing VS development friction by introducing ReSharper.</p>

<p>For this task I'm currently sticking to <a href="http://www.verseq.com/">VerseQ</a>, which was recommended to me by <em>Vsevolod</em>. VerseQ tutor simply keeps on generating pseudo-random strings for you to type. However these strings are not entirely random:</p>

<ul>
<li>they include chords common to the language you practice (i.e.: "jg" is not common to English, while "li" is more common);</li>
<li>next random string is based on the statistics captured so far. It will force you to practice your slowest keys and key combinations (or most erroneous ones).</li>
</ul>

<p>Recommended to give it a try, if you are typing more than 50 lines of text per day (emails or code alike).</p>

<h2>Functional Stuff</h2>

<p>In the previous post I've mentioned that it is possible to get a whooping number of messages per second on a single thread in <a href="http://abdullin.com/journal/2011/7/17/lokadcqrs-getting-simpler-and-faster.html">Lokad.CQRS using lambda dispatchers</a>. This comes from a simple realization that everything is either an aggregate/saga or a function. For example, handlers are just functions partially resolved from the container and executed against the message.</p>

<p>Now, to be true with this kind of development you can easily achieve much higher throughput, if you switched to some other platform. I'm currently looking at akka for the small specific cases where extremely high performance would be needed (i.e.: message routing for Lokad.CQRS or doing some high-frequency data transfer). Fortunately enough, envelope and data formats of Lokad.CQRS are relatively cross-platform (protobuf to the rescue).</p>

<p>With <a href="http://akka.io/">akka</a> you can get something like a <a href="https://plus.google.com/u/0/112820434312193778084/posts/HdKFx4VQtJj">few millions of messages processed per second</a>. The latter might be another life-saving option for devs and start-ups (constrained on resources) who are using Lokad.CQRS and are hitting some throughput limitations on elements of a decoupled/cloud system that are a bit hard/expensive to scale (load balancers and routers, for instance).</p>

<p>Obviously I'm not planning to switch anything in Lokad.CQRS to akka and dead-simple functions editable in vim (no matter how tempting this might look, there always are real-world costs associated with such dreams). Yet, where possible to simplify things (i.e.: by throwing another framework out of the window) the experience and ideas will be reused in the approach. Especially, if they provide a clear and simple path of massively boosting performance of certain nodes in a decoupled app by switching them to the non.NET stacks.</p>

<blockquote>
  <p>PS: if you post a comment and it does not show up within a day, please <a href="http://abdullin.com/contact/">drop me a line</a>. I get the feeling Squarespace has messed up it's spam protection badly again.</p>
</blockquote>

