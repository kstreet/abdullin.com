---
aliases:
- /journal/2013/3/10/domain-driven-design-and-organizational-politics.html/index.html
date: 2013-03-10
tags:
- DDD
title: Domain-Driven Design and Organizational Politics
---
<p>Domain-Driven Design can often lend a helping hand in diffusing a tight political situation in a conservative organisation (to our benefit).</p>

<p>Consider case, when business processes of company are backed up by a bunch of IT teams responsible for different software systems. More often than not, these IT teams would be not so friendly to each other, trying to protect their data and software from any unfreindly influence, changes or even access to the data. This creates noticeable friction for any new initiatives, which need access to this data or simply integration with the software. At Lokad we've seen this pattern on more than one occasion.</p>

<p>One way of solving this situation is to leverage Domain-Driven Design methodology to identify most important factors, risks and stakeholders at play (see context mapping). Then, once we identified and prioritized separate areas, specific development methodologies can be applied to shift the odds each battle to our favor.</p>

<p>For example, teams fighting for their projects, can reduce cost of change and focus on real problems by evolving their domain models in collaboration with domain experts. Scalability issues (quite common in legacy CRUD domains) can be worked around by applying patterns like <em>Domain Events</em> and <em>Command-Query Responsibility Segregation</em>. This would put such teams in more favorable position, compared to other teams. Business owners like those who deliver fast and build trust. More favorable position can be leveraged to gain more influence, personal freedom or other bonuses.</p>

<p>Another example would be about fighting off teams of SQL Database Administrators who resist any change in database schema. Let them have their database for reporting purposes, while persisting everything internally with event sourcing. We'll simply propagate our own changes to their databases via projection of events to SQL tables. It will not be our fault if SQL database can't keep up with the performance of event-sourced backend. Then, at some point, we could simply offer to replace entire pretty expensive Oracle cluster with a bunch of Redis servers running on some commodity hardware without the need of expensive SQL tuning. Such approach can massively reduce costs in a company, which is a strong polical leverage for further improvements.</p>

<p>In other words, <strong>DDD helps to come up with consistent strategy for dealing with complexity, friction and inefficiency</strong> in organisations. Various tactical patterns and architectural styles could be applied locally to support this strategy in different specific situations.</p>

