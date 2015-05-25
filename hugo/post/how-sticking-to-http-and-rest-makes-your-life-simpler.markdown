---
aliases:
- /journal/2013/9/10/how-sticking-to-http-and-rest-makes-your-life-simpler.html/index.html
date: 2013-09-10
title: How sticking to HTTP and REST makes your life simpler
tags:
- design
- story
- essay
---
<p>As I discovered recently, stepping back from unnecessary technologies can lead you to a more happy path. </p>

<p>For example, consider a simple system running business systems for a small startup. Previously I'd try to design it as a composite backend server and a bunch of front end UI applications. They would send commands via some messaging middleware, while retrieving read models from some cloud storage.</p>

<p>This was pretty scalable and seemed rather simple. Still, there were a few problems:</p>

<ul>
<li>Special tools are needed to diagnose and inspect the system (custom test clients, cloud storage explorers etc)</li>
<li>Special tools are needed to interact with these systems and script them.</li>
</ul>

<p>As Greg Young once said, <em>the need of special tooling might indicate a bigger problem</em>. <strong>Sometimes you don't even realise that there is a problem, till you try an approach that avoids it</strong>.</p>

<p>Taking a business backend and switching from some middleware (which was not justified in that case) to use JSON over HTTP for communications suddenly gave much deeper insight into the system. For example, we could use Fiddler to see what's happening inside the backend:</p>

<p><img src="/storage/uploads/2013/09/2013-09-10-fiddler.jpg" alt="Screen Shot 2013 09 10 at 12 57 16" title="Screen Shot 2013-09-10 at 12.57.16 .png" border="0" width="550" height="333" /></p>

<p>Automagically you get a plenty of existing tooling for logging requests, performance tracking, analysing sessions etc. I'm not even talking about ability to leverage existing internet infrastructure with all the intermediaries.</p>

<p>It is a huge enabling factor to have an ability to take any given request, edit and replay it at will. Of course, we can do all that with special middle-ware tools (or write out our own). However, they will probably be less polished and numerous than open source tools for debugging HTTP requests.</p>
