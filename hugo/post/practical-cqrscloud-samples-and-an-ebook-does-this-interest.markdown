---
aliases:
- /journal/2010/10/20/practical-cqrscloud-samples-and-an-ebook-does-this-interest.html/index.html
date: 2010-10-20
tags:
- Azure
- Cloud Computing
- CQRS
title: Practical CQRS/Cloud Samples and an eBook&#58; Does This Interest You?
---
<p>One of the things I've learned from the production experience was the extreme value of getting feedback for your project as soon as possible. This might save you wasting a lot of effort, time and resources later on (or even save the project).</p>

<p>There is thing that I wanted to share for the same reasons - to get an early feedback.</p>

<p>As probably some of you know, in addition to my Lokad work (focusing on Windows Azure, Lokad.CQRS, high scalability and all sorts of fun stuff) I'm currently playing with various learning CQRS+Cloud projects in my free time (or of what remains of it). The goal is to learn continuously and keep personal development ahead of what is required by Lokad projects (this allows to work around potential problems and capture some nice opportunities). </p>

<p>Besides, real-world experience also helps to straighten the theoretical conclusions by polishing them with the practice. Some things might look great on paper and diagrams but be completely useless in the production. The only way to find them is by trying. </p>

<blockquote>
  <p>Preferably the first practice should not happen in high-importance production projects, so this is another reason to try and keep learning separate from production. </p>
</blockquote>

<p>Each logical step or concept that is figured out, helps either to make the next step in scalability, complexity and flexibility of your projects. Or you can just make your existing projects simpler and less expensive. Salescast project, that I've been mentioning a couple of times in this blog, benefits from both. Just like a few others.</p>

<p>For example, compare concepts from xLim 1 of year 2007 (at the bottom of the <a href="http://abdullin.com/xlim/">xLim section</a>) and the latest articles (<a href="http://abdullin.com/xlim/">xLim 4: CQRS in the Cloud</a>). I think there was some subtle progress made by figuring out the theory, field-testing it in production and learning from it.</p>

<p>Right now I'm thinking about <strong>developing a few quick projects</strong>, that target some <strong>real-world business scenarios</strong> in a quick, dirty, but cheap and reliable way. Something like "Practical Cloud with a dash of CQRS". No <a href="http://abdullin.com/journal/2010/9/26/theory-of-cqrs-command-handlers-sagas-ars-and-event-subscrip.html">complex ivory-tower theoretical constructs</a> but rather implementations on top of this logic with hacks, where this makes sense. Eventually I'm planning to <strong>release these projects as open source</strong>. </p>

<p>In parallel I'm also thinking about composing an <strong>eBook on the subject with detailed dive into these projects</strong>, explanations of how, why, theoretical references and recommendations on handling extreme scalability and complexity cases (backed by the actual Lokad production experience). Basically, a <strong>quick learning course about practical Cloud/CQRS</strong> the way I would've given it if I were back at the university.</p>

<p>For the projects I'm deliberately trying to pick some niche where it's easy to get an application running and there is potential for lots of visitors coming for some free service (hence, creating real random stress, testing and verifying the underlying foundations of CQRS and Cloud development). It'll be probably non-Azure implementation as well (Azure is currently a perfect fit for Lokad, but for an ISV with extreme constraints on resources and friction it currently would not work out that well due to a number of reasons).</p>

<p>eBook itself <strong>will come for a price</strong> and will be more convenient, detailed and guided alternative to finding your way through the xLim/CQRS articles as they jump through various topics (original articles and materials will still be published and shared in the usual manner). Again, just like a learning course.</p>

<blockquote>
  <p>BTW, those that want to <strong>start learning CQRS/Cloud right now</strong> - you can just check out <a href="/tags/cqrs/" target="_blank" class="offsite-link-inline">CQRS references section</a> (links to various videos, blogs, articles and blogs that I've gathered), dive into first <a href="http://code.google.com/p/lokad-cqrs/wiki/GuidanceSeries" target="_blank" class="offsite-link-inline">samples and tutorials from Lokad.CQRS for Azure</a> and work you way through the <a href="http://abdullin.com/xlim/">xLim series</a> (from bottom to the top). Greg's documents, video and project are probably the <strong>most valuable reference of them all</strong>.</p>
</blockquote>

<p>Now these are just thoughts. Nothing is in motion (except for the first learning project which was an inspiration and foundation for the latest articles on CQRS and xLim series).</p>

<p>I wonder:</p>

<ul>
<li>What do you think? (even <em>Yay</em> or <em>Nay</em> would be helpful)</li>
<li>What questions about practical CQRS/Cloud are the most pressing and important for you know?</li>
<li>What do you think about projects? Would such samples (published as open source) help you out in your endeavors and how?</li>
<li>Do you have any ideas about areas, where a simple CQRS application would help to solve some problem and would face a bit of scalability stress while dying so (preferably the stress would be dynamic)?</li>
<li>There are quite a bit of materials on CQRS. Would you still be interested in such eBook that explains and walks over the theory, practice and experience in a structured and organized way fit for learning (focusing on practice and implementations)?</li>
</ul>

