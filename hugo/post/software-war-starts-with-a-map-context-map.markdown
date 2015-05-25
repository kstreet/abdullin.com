---
aliases:
- /journal/2012/4/14/software-war-starts-with-a-map-context-map.html/index.html
date: 2012-04-14
tags:
- Lokad
- DDD
- Story
title: Software War Starts with a Map, Context Map
---
<blockquote>
  <p>Let us continue revisiting the big picture overview of all DDD and CQRS things, based on the things I've learned recently in collaboration with <a href="http://goodenoughsoftware.net/">Gregory Young</a> and <a href="http://vaughnvernon.co/">Vaughn Vernon</a>. We will start with the most important things.</p>
</blockquote>

<p>Let's imagine that you are a software manager challenged with a new project to deliver. The project is really interesting and challenging, customer can talk about it for hours. Sometimes there will be references to similar projects to copy and cool technologies that should help. You and your team are already itching to start flush out some specs and start developing.</p>

<p><strong>Is it really where you start?</strong> Wrong.</p>

<p><strong>Complex software project is a war</strong> - it is unpredictable and brutal fight to hit moving target, while always running short on time and resources.</p>

<blockquote>
  <p>NB: I'm currently talking about "startup" environments. Enterprise situations with available resources and preallocated budgets are a different story that we are not interested right now.</p>
</blockquote>

<p>You don't enter software war with low-level details. You don't start with detailed tech specifications or strategies (unless you want to have perfectly planned and failed <em>blitzkrieg</em> on your hands). First <strong>you need a strategic map</strong> with bird's-eye view of the current situation at hand. Maybe this war is not even worth entering?</p>

<p><span class="full-image-block ssNonEditable"><span><img src="/storage/uploads/2012/04/2012-04-13_russia.png?__SQUARESPACE_CACHEVERSION=1334292365690" alt=""/></span></span></p>

<p>One of the approaches of getting such map is to make your way through "Domain-Driven Design: Tackling Complexity in the Heart of Software" by Eric Evans (just make sure to read it this way: chapter 11 - END; Beginning - END).</p>

<p>Domain Driven Design (DDD) is a special way to look at core business concepts that exist in a real world and deeply connect them to evolving domain model, that could be easily implemented in software to solve specific problems. In other words, it can help to look at real world, understand it and divide into a set of separate territories that can be conquered separately, step by step.</p>

<blockquote>
  <p>“One step at a time, ... I can walk around the world. Watch me.” (c) L.M.Bujold</p>
</blockquote>

<p>Separate territories are called "<em>bounded contexts</em>", while the big map is called "<em>context map</em>".</p>

<p>We use DDD toolset (set of rules, hints and guidelines) to look at the complex mess of important business concepts and identify natural boundaries around some of them. These natural boundaries would be discovered in the real world and then transferred to our "context map". Area within the boundary will be called "bounded context"</p>

<p>This process is equivalent to geography or geology, where explorers map the terrain and draw borders around areas that look the same according to some arbitrary criteria. Criteria for finding such natural boundaries can be extremely different and will depend on your situation (synonym to "situation" is "context"). As it has always been: drawing maps is a challenge, especially when half of the territory is terra incognita (or covered by the "fog of war").</p>

<p>Please keep in mind, that Context Map is not a plan of some distant future. It is merely a reflection of current situation that we have in our software project or a company. It is a map of terrain that has to stay updated and real, in order to be of any use.</p>

<p>Let me be clear: you don't necessarily need to map all the terrain of software project on a context map, before starting to work on it (sometimes research and development is the only way to move forward). However, <strong>staying aware of the business situation</strong> (context), uncharted areas, and potential unknown risks, <strong>will make you more prepared for unexpected changes</strong> in the future. Being able to divide complex problem area into a set of separate bounded contexts will make it easier to think through the situation and approach it.</p>

<p><span class="full-image-block ssNonEditable"><span><img src="/storage/uploads/2012/04/2012-04-07_context-map-2.png" alt=""/></span></span></p>

<p>The biggest advantage of separate bounded contexts is about their explicit separation from each other. <strong>Once we have clear boundaries, we can consciously focus on the situation inside</strong> in relevant isolation. For each specific context within a boundary, we can pick the most efficient combination of technologies, teams and development approaches.</p>

<p>For example, given a SaaS battlefield and a new secret "Product XYZ", the latter could allow division into two separate bounded contexts. One specific bounded context (highly complicated and requiring special approach) can be handled by a special research and development team, while the other neightboring BC could be delegated to a team specializing in solving diverse and messy situations.</p>

<p>As you can already see, our context map not only allows to start tackling problem space, but also enable considering the allocation of limited resources over a seemingly endless battlefield of possible projects to deal with. Same works with risk mitigation, time and long-term campaign planning. At certain moments in the course of software war, you can even identify situations, where certain projects could be worth a sacrifice, risky spike, massive refactoring (or all of these at once).</p>

<p>It might be really boring to read all this text without any mention of cool technologies (e.g. self-rebuilding CQRS view projection host with unlimited scalability for reads), however <strong>technology choices are mostly irrelevant on a higher level</strong>. Technology or an architecture style can be an enabling factor or even a strategic asset, but they are never the ones that drive the campaign.</p>

<p>One of the best places to learn such things in practice is by working in a startup. Such places tend to have rapidly changing battlefield and rather low tolerance for stupid decisions. In war of startups you win or you die.</p>

