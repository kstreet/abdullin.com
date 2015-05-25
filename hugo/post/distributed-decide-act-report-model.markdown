---
aliases:
- /journal/2011/5/12/distributed-decide-act-report-model.html/index.html
date: 2011-05-12
tags:
- xLim
- CQRS
title: Distributed Decide-Act-Report Model
---
<p>Yesterday I gave a talk on CQRS with Windows Azure at Copenhagen GOTO Conference (<a href="http://abdullin.com/storage/publish/2011-05-11-CQRS-and-Azure-CPH.pdf" target="_blank" class="offsite-link-inline">slides, PDF</a>). </p>

<p><a href="http://blog.ploeh.dk/" target="_blank" class="offsite-link-inline">Mark Seemann</a> (who was the very reason of me coming to Copenhagen) provided invaluable feedback on the talk. He really liked the analogy for explaining relations between commands, events and views in the cloud architectures. So let's go over it in this blog post. </p>

<p>Let's think, how some real-world organizations might function like. With some imagination you can identify 3 roles:</p>

<ul>
<li>Managers, that run organization; they read paper reports or call assistants, <strong>decide</strong> and issue orders for the  workers below them to execute.</li>
<li>Workers, that receive orders, <strong>act</strong> upon them (where they can and have the resources) and notify various departments about the job done.</li>
<li>Assistants, that gather together all these notifications, mails and memos into various <strong>reports</strong>, making them available to anybody, who has to make the decision. </li>
</ul>

<p>Obviously, the entire iterative process of decide-act-report takes some time. It is not instantaneous, because humans are slow. However, this somehow seems to works in the real world. Companies seem to make right decisions that guide them through the ever-changing business world. They even manage to grow into large organizations (with more complex structures).</p>

<p>In short, this structure - works. Now, take a look at the image below.</p>

<p><span class="full-image-block ssNonEditable"><span><img src="/storage/uploads/2011/05/2011-05-12_decide-act-report.jpg?__SQUARESPACE_CACHEVERSION=1305214602381" alt=""/></span></span></p>

<p>Does this "Decide-Act-Report" resemble a bit the classical distributed architecture implemented with <a href="/tags/cqrs/">CQRS</a> in mind?</p>

<p>In this world, users are the managers, who <strong>decide</strong>, what to do in the UI. They use the latest reports available to them in form of <em>Views</em> (aka <em>Read Models</em> or <em>Projections</em>) in a way, that makes it simple to make a decision. User interface captures their intent in the form of <em>command messages</em>, that order server to do some job.</p>

<p>Servers, then, work hard to do the job, <strong>acting</strong> upon the <em>commands messages</em> sent to them. Upon the completion (or any other outcome), notifications are sent to all interested parties in form of <em>events messages</em> published via pub/sub.</p>

<p><em>View event handlers</em> (<em>Projection Hosts</em>) receive these notifications, building <em>Views</em> to <strong>report</strong> their data to the user. They work even harder to keep these up-to-date, updating them upon every event message. Since these reports are kept up-to-date, any interested party can  query and an immediate result, without the need to wait for the report to be computed.</p>

<p>Everything is rather straightforward, as you can see. At the same time, some of the analogies from the real world can still apply. For example:</p>

<ul>
<li>There could be multiple managers, operating the same organization at the same time == multiple users can work concurrently with an application.</li>
<li>If there is too much work, you can hire some more workers == if there are too many commands, you can add more servers.</li>
<li>Actual reports can be copied and distributed around the organization, JIC if manager needs them right now == you can spread read models around the globe to keep them close to the client (or even keep them at the client).</li>
<li>Manager, workers and reporting assistants could be in the same building or they could be spread across the continents, while exchanging mail between each other == distributed application with messaging can have all components as in a single process or it can spread them across the data centers.</li>
</ul>

<p>So, again:</p>

<ul>
<li>User - looks at views, decides and issues commands</li>
<li>Command Handlers - receive commands, act upon them and publish notifications</li>
<li>View Handlers - receive interesting notifications and update views, immediately reporting them to the interested parties per request.</li>
</ul>

<p>Does this analogy make things a little bit simpler in the distributed <a href="/tags/cqrs/">CQRS world</a> with users, command handlers and event handlers?</p>

