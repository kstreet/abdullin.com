---
aliases:
- /journal/2012/2/18/when-not-to-use-cqrs.html/index.html
- /cqrs/
date: 2012-02-18
tags:
- Lokad
- CQRS
- Story
title: When NOT to use CQRS?
---
<p>CQRS is an approach to structure, design and deliver a small and focused part of a system. It is a set of patterns and techniques that help to deal with the entire vertical stack of such focused part in a relatively simple way, starting from persistence and up to the continuous UIs. While doing that we can also opt-in for some practical benefits like cloud-capabilities, scaling of development effort and low friction.</p>

<p>However, if you don't have your system decoupled into small and focused parts, then don't rush into CQRS right away. Instead of helping you, it is likely to increase complexity without any noticeable benefits. My recommendation is to start by finding clear boundaries along which a problem can be broken into small and manageable pieces. In the old times this <em>divide et impera</em> strategy was practically applied with some success by people like like Caesar and Napoleon.</p>

<p>In my opinion, the best approach to find these boundaries and manage them is called Domain Driven Design (that's the blue book by Eric Evans). CQRS patterns evolved in the world of DDD practitioners and produce the best results when applied to problem space that is explored and explained with DDD methodology. There is simply too much synergy.</p>

<p>If we continue with military analogy:</p>

<ul>
<li><strong>Strategy</strong> explains how to wage a war. DDD is one of the viable strategies in software war and it is particularly good in dividing and conquering complex domains.</li>
<li><strong>Tactics</strong> deals with winning a battle (there could be a lot of these in a war). CQRS is a flexible software tactics that is particularly fit for the DDD strategy.</li>
</ul>

<p>Obviously, you can try to take CQRS patterns and <strong>apply mechanically to any system</strong>. Sometimes this might work and sometimes this might be as awkward as using SQL Stored Procedures for business logic. Either way you have a better chance of success if this system is decoupled into separate focused pieces, that can be handled individually on case-by-case basis.</p>

<p>So if you have a large monolithic application that can't be clearly divided into small focused slices, then trying to apply CQRS would have lower probability of getting benefits (and higher chance of actually hurting badly).</p>

<p>So. <strong>Don't use CQRS in your system, if you have more important things you can do first</strong>. Like breaking it apart into small and focused slices that can be dealt with separately.</p>

<p>Likewise, if you are using CQRS to determine architecture of your entire system (and if the system is complex enough), then you are heading into some problems. CQRS is a tactical implementation detail, don't confuse it with strategy.</p>

