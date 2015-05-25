---
aliases:
- /journal/2012/7/23/structure-of-dddes-solution-in-visual-studio.html/index.html
date: 2012-07-23
tags:
- xLim
- DDD
- Domain Event
- Story
title: Structure of DDD+ES Solution in Visual Studio
---
<p><a href="https://twitter.com/kcstreet">Kerry Street</a> has recently raised really interesting question:</p>

<blockquote>
  <p>Speaking of vocabulary, how do you view and speak about the first "D" in DDD? "Domain" itself can be overloaded.</p>
</blockquote>

<p>Yes, indeed, I tend to use domain interchangeably. This can lead to potential confusion. The primary meaning of "domain" is just "some <strong>problem space</strong> that has to be addressed via modeling and then expression in software".</p>

<p>When I start a project, it usually has a single "Bounded Context", which matches the problem space. Hence, it seems natural to call this BC "Domain" simply because they match in this specific situation. However, as solution grows, new BCs are discovered and added. In the end, this leads to rather ambiguous solution structure:</p>

<p><span class="full-image-block ssNonEditable"><span><img src="/storage/uploads/2012/07/2012-07-23_174044.png?__SQUARESPACE_CACHEVERSION=1343043761867" alt=""/></span></span></p>

<p>Now, that I think about it, "Domain.BC" in this case would be better named "Orchestration BC" or at least "Tenants BC". Sorry for the confusion and thanks for brining this issue up. I'll need to correct samples and my own projects to clear this up.</p>

<p>While we are at this topic, image above, displays Visual Studio solution structure for the second version of <a href="http://www.lokad.com/salescast-sales-forecasting-software.ashx?From=safety-stock-calculator-software">Lokad Salescast</a> (big data inventory optimization platform). As you can see, there is nothing really peculiar there and it matches pretty closely structure in Lokad.CQRS Sample.</p>

<p>The only non-obvious tidbit is that "Worker" project is both an executable console (using file system for local runs) and a WorkerRole implementation (used for Azure deployments). Like-wise, both web projects would feel natural running locally (using file-based event streams and persistence) and in Windows Azure.</p>

