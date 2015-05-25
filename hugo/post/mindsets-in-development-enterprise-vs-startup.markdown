---
aliases:
- /journal/2011/8/30/mindsets-in-development-enterprise-vs-startup.html/index.html
date: 2011-08-30
title: Mindsets in development - Enterprise vs Startup
tags:
- essay
- dev-process
---

<p>A while ago we were recording a distributed podcast with Udi Dahan (not yet published, I believe). In this podcast I quite enthusiastically opposed everything Udi said. The entire beginning of the podcast (one or two dozens of minutes) had to be cut out and redone because of that. I personally believe in a good argument (and enjoy one), but we didn't want to make the podcast look non-constructive or scare all the other potential guests away :)</p>

<p>This experience got me thinking for a while, making more aware of the arguments and collisions that happen in the software and business worlds these days; especially in parts of it, where new technologies and approaches meet something that has been working for decades. Opening dev center in Ufa provided some additional food for thoughts as well.</p>

<p>As it turns out, I was not conflicting with Udi's approaches directly (this also applies to my other ongoing critics of Microsoft or any other enterprise-level entity or solution). I still extremely value their experience and ability to solve problems I would've given up on. <strong>Root of the conflict</strong> is a bit deeper - in the <em>business environment and the way the problems are structured in it</em>.</p>

<p>Let us consider two extremes (exaggerating the slightly just for the sake of making the point).</p>

<p><strong>Corporate enterprise</strong> is on one of the extremes. It tends to have an extremely formal and regulated environment (it is the only way to keep big system from falling apart) with large budgets, slow processes and established teams. Such an organization usually wins its day if it keeps status quo.</p>

<p>All software projects will be affected by such environment. Developers are generally restricted to time-proven technologies, formal architectures and long development cycles. That is exactly the environment, where complex N-Tier designs, GUI tools and multi-page specifications come from, backed up by established stacks like MS SQL + MSMQ + BizTalk/NSB and armies of paid consultants to help whenever there is a problem.</p>

<p>Product managers in such conditions are restricted to time-proven technologies and approaches backed up by the books and solid authorities (nobody is fired for using Microsoft). Given the armies of stake holders and complex political games involved around any single project (they would make any <a href="http://en.wikipedia.org/wiki/Bene_Gesserit">Bene Gesserit</a> jealous), it is safer just to do everything in a slow and controlled manner, making the efficient use of the resources available (and there are a lot of these).</p>

<p><strong>Small start-up</strong> environment is on the other extreme. Such companies do not have a long history, stability of established routines and big budgets; but they possess founders who were crazy enough to favor unpredictability of a new business to a soothing comfort of established company. Start-ups are usually small companies below the profitability state, so they must fight every day just to have resources to move on. Staying in the office at evenings or pulling weekends is not unusual either, just like nervous break-downs. Lack of resources and time are usually compensated by enthusiasm and a lot of personal collaboration.</p>

<p>Such an environment has its own drastic effects on the IT projects that happen within. Business people tend to care less about all things that are "time-proven" and "as explained on the training by X". Keeping the company afloat and moving forward is what matters more. Hence IT departments (usually consisting of a single dev or even a founder himself) are allowed and encouraged to do whatever it takes to solve the problems at hand as efficiently as possible.  Technology and methodology do not matter as long as they work. It is even considered to be acceptable to sign a contract with devil or dump the entire stack into the cloud, if it would help to cut down cash burn rate or achieve a milestone. We did that, by the way.</p>

<p>Ok, this was just a brief overview of the differences in these extremes. There are much more complexities and details underneath the surface. Books are written about them.</p>

<p>The point that I'm trying to make is: <strong>these environments have completely different rules of the play</strong>. <strong>Things that get projects delivered in one of these extremes, are not guaranteed to work in the other</strong>. For example, start-up might give up on using some complex clustering or replication, because it is too complex and expensive for the job at hand, while enterprise might take extreme care before rushing into all these cloud things or hand-made linear scalability.</p>

<p>Same applies to all other things that are associated with a successful delivery of products, starting from management of development projects and up to selecting deployment and evolution strategies.</p>

<p>So when we are talking about any complex buzz-word and practical approaches for it (CQRS and DDD being an example), it is recommended to keep in mind this point. It will help to both avoid the confusion while listening and help to deliver the message while explaining. </p>

<p>If some explanation or approach does not highlight these specifics, then we can try to clarify the situation in our own minds by answering a few simple questions:</p>

<ul>
<li>what environment does the speaker come from, what are his financial interests, affiliations and expertise?</li>
<li>what context does the methodology or approach target? What constraints does it have in mind (resources, budgets, time, risks, skills, regulations etc)?</li>
<li>if some specific technologies are recommended, for which context were they developed? Which companies do have interest in them? What are the lock-down risks and costs?</li>
</ul>

<p>Just to make it clear, when I am personally talking about development efficiency and architectural approaches (for both cloud and on-premise environments), I'm doing that from the perspective of "start-up mindset" where:</p>

<ul>
<li>budgets and time are constrained; really constrained;</li>
<li>business does not care about the specific tech or regulate development, as long as the job is done;</li>
<li>it is not that hard to find and hire good developers (they tend to find you);</li>
<li>motivation and reach inter-personal collaboration tend to replace formal planning and various management practices (as written in the books);</li>
<li>there are not enough resources to allocate large teams to a project, one or two devs is all you can get (sometimes even less than one);</li>
<li>development can affect the business in order to structure the problem in a way that it will be solved more efficiently (by breaking into smaller steps or realigning business priorities);</li>
<li>there are no real requirements up-front, ever changing business environment dictates these, as the company moves forward;</li>
<li>it is more efficient to "reinvent the wheel" internally, rather than ask for the paid support.</li>
</ul>

<p>I personally believe such an environment is much more efficient and capable of delivering interesting and exciting solutions, if played out properly. It has the advantage of using the full potential of recent massively enabling technologies. High pressure, scarce resources and lack of formal regulation are among the obvious downsides (if you look at them this way).</p>

<blockquote>
  <p>A quick example might be helpful here to illustrate potential differences between the environments and mindsets. Corporate developer might consider data replication, backups and synchronization to be something really complex and extremely expensive (bringing thoughts here of SQL licenses, clusters and various sync frameworks). Another developer, that is used to event-centric architectures, would consider implementing data replication and streaming to be a boring task, that requires just a few lines of code and picking the properly certified cloud storage provider.</p>

  <p>Both viewpoints are valid, because they are based on the constraints and assumptions present in their respective environments. More than that, each of the developers has a decent chance of failing horribly in the other environment (unless they are flexible enough).</p>
</blockquote>

<p>My personal "environmental" beliefs, obviously, affect the way I structure problems or choose from various options and technology stacks, when given the luxury of choice. The same applies to all people that write, blog and preach these days. </p>

<p>Please, keep contextual and mindset differences while listening and learning from anybody.</p>
