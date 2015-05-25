---
aliases:
- /journal/2013/3/4/aggregate-design-and-security.html/index.html
date: 2013-03-04
tags:
- Lokad
title: Aggregate Design and Security
---
<p>Answering a question from the community:</p>

<blockquote>
  <p>How do you handle security concern of sending aggregate id to the web client? What'd you do to ensure I can't, from the browser or another client, manually send aggregate id that belongs to another client to either get some data about it or send some commands to mess things up?</p>
</blockquote>

<p>Each specific system scenario would lead to the specific design. If our specific scenario is:</p>

<ul>
<li>business logic is hosted on Application Server (e.g. hosted in Lokad.CQRS) which we control trust;</li>
<li>client UI is hosted on Web server UI which we control and trust; Web server accesses application server (by sending commands and polling views) and renders HTML to user's browser.</li>
</ul>

<p>Then the solution to the security concerns problem is:</p>

<ul>
<li>We don't trust client browser anything (except from keeping unique token)</li>
<li>we trust Web server UI to authenticate user (ensuring that he is who he claims to be). In this web App we will ensure that client sends only commands to the aggregates he is allowed to access (while checking commands as well). </li>
<li>In app service we don't do any deep security checks and just carry out the commands.</li>
</ul>

<p>This scenario works well in simple situations where we have an app server and a few Web UI servers (alternatively with REST API servers), managed by the same team and hosted in the same controlled environment.</p>

<p>If we have a different environment (e.g. application server can't trust web server), then a different separation of responsibilities might be needed. For example, we might need to perform <strong>authentication</strong> within the methods of Application service (checking that <strong>user is who he claims to be</strong>), while pushing <strong>authorisation</strong> down to method calls on an aggregate (<strong>checking that user can do what he attempts to do</strong>). </p>

<p>In this scenario, authorisation might be encapsulated within an instance of <em>domain service</em>, passed down by <em>application service</em> to <em>a method on aggregate</em>. This service would have access to permission maps (or any other way of representing role/permission information), aggregate would call it's methods to find out if the specific user can perform requested actions on the requested resources.</p>

<p>Naturally, in this case, Web UI must still ensure that we don't send illegal commands to the server. The difference from the first scenario is - we don't trust the web server to be diligent.</p>

<p>These and other specifics of project environment, team organisation and trust can have a great impact on development process and product design.</p>

