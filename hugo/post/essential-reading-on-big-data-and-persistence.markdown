---
aliases:
- /journal/2012/6/7/essential-reading-on-big-data-and-persistence.html/index.html
date: 2012-06-07
tags:
- Lokad
title: Essential Reading on Big Data and Persistence
---
<blockquote>
  <p>In my previous post we've discussed <a href="http://abdullin.com/journal/2012/6/5/design-observations-on-big-data-for-retail.html">some design considerations for handling big data in retail</a>. Let's continue from here.</p>
</blockquote>

<p><em>Joannes Vermorel</em> has just completed a really interesting whitepaper on storing sales data in retail.   He outlines a few rather simple principles that allow to <strong>store 1 year of detailed sales history of 1000 stores on a smartphone</strong>. Both the <a href="http://media.lokad.com/www/PDF/Lokad-ReceiptStream-whitepaper-june-2012.pdf">white paper</a> (PDF) and <a href="https://github.com/Lokad/lokad-receiptstream">source code</a> are shared by <a href="http://lokad.com">Lokad</a> on github.</p>

<blockquote>
  <p>I'm not claiming, that this is a production-ready scenario, since it is missing things like continuous replication (to another smartphone), checksumming and BI capabilities. However the point here is that SQL server or generic No SQL server might not be necessarily be the best fit for this situation.</p>
</blockquote>

<p>Curiously enough, in scenarios when companies need to store similar amounts of sales history, they don't take simple and rather cheap approaches like this one. Instead, <strong>consultants sell them rather expensive</strong> Oracle, Microsoft (put any company in big data field) <strong>software and hardware setups that still fail to keep up with the throughput of the data</strong>. For some reason, if you can write 50000 ticket receipts per second to a file (where each receipt usually contains a dozen products), this does not necessarily mean that you can have the same throughput inserting rows to your favorite SQL database cluster. So why do we even use them?</p>

<p>I don't hold anything against SQL (or any other relational storage), except the fact that <strong>SQL DB is being sold as a silver-bullet</strong> for cases, where it is clearly not applicable. And I hate to see huge amounts of money wasted in a useless way (at least, donate them to a charity or noble cause instead).</p>

<blockquote>
  <p>By the way, check out this great paper by Erik Meijer and Gavin Bierman: <a href="http://queue.acm.org/detail.cfm?id=1961297">A co-Relational Model of Data for Large Shared Data Banks</a>. It provides nice insight into the nature of relational (SQL) and document (Not Only SQL) persistence options. </p>
</blockquote>

<p>So <strong>why do we keep on applying expensive sub-optimal solutions to problems that do not fit them</strong>? Probably, because "nobody get fired for buying IBM", while trying some non-conventional approach and failing is more risky to your career.</p>

<p>However this will not necessarily hold true in the next years. Economic and technology forces are too strong. Just read this amazing <a href="http://abdullin.com/storage/uploads/2012/06/GEN01_The%20Irresistible%20Forces%20Meet%20the%20Moveable%20Objects-071213b_pfd.pdf">white paper from Pat Helland</a>, which was written way back in 2007 (and don't get surprised if you find a lot of things that look like modern principles behind event sourcing and domain-driven design).</p>

<p>I do not intend to criticize SQL databases or any other product, but rather to give broader perspective - they are not the only data persistence solutions out there. There are more options. And sometimes, a few specialized lines of code can beat a generic product both hands down (simply because they can be more tailored to the problem, than a product would ever dream to be).</p>

