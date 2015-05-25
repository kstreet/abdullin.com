---
aliases:
- /journal/2012/2/5/people-dont-think-in-tables.html/index.html
date: 2012-02-05
tags:
- Lokad
title: People Don't Think in Tables
---
<p>Within the last few years I've seen major change in UI approaches in the systems I build. The change is caused by a shift from relational databases as persistence to something that does not require an SQL server (or DB server at all). </p>

<p>Take a look at this old UI of mine. It's pretty powerful (huge amount of buttons proves that), is intuitive for geeks and scary for normal people. </p>

<p><span class="full-image-block ssNonEditable"><span><img src="/storage/uploads/2012/02/2012-02-05-grid-ui.png" alt=""/></span></span></p>

<p>What's more curios, this UI is shaped by the relational persistence model that was created in mainframe days, when storage was expensive, memory even more so, and data had to be heavily normalized. However, technology has advanced slightly since then, and we no longer need to fit our UIs to something that is so spreadsheet-like. We can prevent user from overexposure to underlying data complexity, especially when data itself is simple, but just happens to be stored in a computer-optimized way.</p>

<p>Think of it again. <strong>We turn UI experience of users in sudoku game just because we know how to store data in a way that was good 20 years ago</strong>. No wonder Apple is making so much money - at least they don't try to turn every UI into spaceship control panel:</p>

<p><span class="full-image-block ssNonEditable"><span><img src="/storage/uploads/2012/02/2012-02-05_183201.png?__SQUARESPACE_CACHEVERSION=1328445201388" alt=""/></span></span></p>

<p><strong>People don't think with tables</strong>. They would prefer something that is more simple, even if it does not benefit from a fancy styled UI framework. Something that does not involve solving <a href="http://en.wikipedia.org/wiki/Sudoku">sudoku puzzle</a> every time you need to find a simple answer to your question or do your job.</p>

<p><span class="full-image-block ssNonEditable"><span><img src="/storage/uploads/2012/02/2012-02-05-facebook-ui.png" alt=""/></span></span></p>

<p>or where we have the most simple way to search complex structured info, as patented and proven to be useful by google:</p>

<p><span class="full-image-block ssNonEditable"><span><img src="/storage/uploads/2012/02/2012-02-05-search-ui.png" alt=""/></span></span></p>

<p>It is surprising, how <strong>underlying technologies affect what we build with them</strong>, is not it?</p>

<p>As you can guess, first 2 screenshots depict UI that runs on some sort of SQL, while the other UIs were influenced by a simple NoSQL storage model (to be precise: CQRS/DDD+ES model that uses for UI persistence blobs for cloud persistence and plain files for on-premises deployments). </p>

<blockquote>
  <p>BTW, I know that quite a lot of people are using Lucene to provide full text search capabilities for their read models. However in the simplest case (esp. with cloud deployments), it's easier to write a few lines of code as opposed to dealing with one more dependency.</p>
</blockquote>

<p>Another side effect is that with the change of underlying tech from SQL (and more importantly - thinking model), there is <strong>less need to resort to data-aware UI frameworks</strong> (mostly used on conjunction with desktop apps) in order to provide rich user experience. This allows to have web-based applications that don't force framework installations  (good luck with getting .NET or Java on all machines in some large organization with a lot of momentum) or complex upgrade routines (i.e. ClickOnce auto-update or automatic MSI updates).</p>

<blockquote>
  <p>I'm not talking about development simplicity and cloud-scalability - these come for free, and we don't really value things unless we struggle for them.</p>
</blockquote>

<p>Obviously, as you can see from screenshots above, my UI skills are still below that of a kid with a box of <a href="http://en.wikipedia.org/wiki/Crayon">crayons</a> but lately <a href="http://twitter.github.com/bootstrap/">Bootstrup</a> and jquery have provided a really nice experience, especially, when you can reuse some great ideas and frameworks.</p>

<p><span class="full-image-block ssNonEditable"><span><img src="/storage/uploads/2012/02/2012-02-05_cqrs-case-studies.png" alt=""/></span></span></p>

<p>Wait, till we start getting into mobile experience with HTML5. It actually comes almost for free as well, since latest web layout frameworks provide a lot of mobile experience out-of-box.</p>

<p>NB: In no way I'm implying that this second approach is anywhere near close to being reasonably simple. And it's obviously bad looking (especially UIs that I hack together), but I think this is going in the right direction. At least, less time is wasted on writing UI docs and providing support.</p>

