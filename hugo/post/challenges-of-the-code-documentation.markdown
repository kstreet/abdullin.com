---
aliases:
- /journal/2010/7/30/challenges-of-the-code-documentation.html/index.html
date: 2010-07-30
title: Challenges of the Code Documentation
tags:
- design
---
<p>Here's the interesting problem.</p>

<p>There are numerous situations, when <strong>code contains a lot of important information</strong>. This important code can change really frequently too.</p>

<p>Let's say that we need to relay this important information for somebody who is not intimately familiar with the codebase. For example:</p>

<ul>
<li><strong>Researchers</strong> depending on the conventions and transformations in some data pumping project.</li>
<li><strong>New users</strong> being introduced into some project via articles with a lot of samples.</li>
<li><strong>Managers</strong>, requiring knowledge of some business constants and rules.</li>
<li><strong>3rd party Developers</strong>, that have to integrate with some API, while having the access to the latest samples, restrictions and constraints.</li>
</ul>

<p>Needless to say, that <strong>important code pieces could be scattered</strong> across multiple projects, <strong>adding friction</strong> to people that need to have a look at them fast.</p>

<p>We do want to have this <strong>friction at minimum</strong>! This way we increase the chances that some questions could be resolved by looking at the documentation, instead of wasting time and potentially involving somebody else into this quest for the answers. Saved time essentially translates in reduced expenses and faster reaction of an organization (resulting in improved ability to compete on the market).</p>

<p>There also might be some important contextual information about this code. It might or might not be valuable for the certain party, but developers would want to write it somewhere (enabling them to forget details and free <a href="http://en.wikipedia.org/wiki/The_Magical_Number_Seven,_Plus_or_Minus_Two" target="_blank" class="offsite-link-inline">Brain RAM</a> for the other tasks). Comments usually help here, but they have to stay with the code and are limited to the plain-text (no graphs, images, tables or even bold).</p>

<p>One common way of relaying this information (in some specific context) is to <strong>document the code in external docs</strong>, while including the latest snippets. However, the <strong>code tends to change a lot</strong>. This is especially true for fast-paced environments with tight feedback loops and low-friction development (and deployments).</p>

<p>So we have got ourselves a problem here:</p>

<ul>
<li>we either need to waste time and concentration on updating the documentation after every significant code change (i.e.: a few times a day);</li>
<li>or we have to accept the fact that the documentation is out-of-date and essentially useless;</li>
<li>or we have to include links like: <em>"for the actual details look in the method DoomsdayMachine.RefreshWorld() and any other methods it might call"</em>. We'll also need to remember to update the links, should the class be renamed or moved.</li>
</ul>

<p>One logical solution is to have <strong>auto-generated documentation</strong> that could be compiled from some text, while automatically linking to the code sources. And it has to survive refactoring and class renames.</p>

<p>I know that Lokad researchers use <a href="http://en.wikipedia.org/wiki/LaTeX" target="_blank" class="offsite-link-inline">LaTeX</a> with some scripts for such tasks. However the whole LaTeX thing looks a bit of overkill here, plus I'm not sure it can bind to some MSIL-level markers within the .NET code, while providing common publishing functionality.</p>

<p>Ideally this would work like this:</p>

<ul>
<li>Project has documentation files stored and versioned side-by-side with the sources (ideally in the same solution).</li>
<li>These documentation files are expressive enough to contain graphs, images, tables and all the other nice publishing things, while referencing some code blocks in the project. </li>
<li>Editing the documentation would be <a href="http://en.wikipedia.org/wiki/WYSIWYG" target="_blank" class="offsite-link-inline">WYSIWYG-friendly</a>, while the original document format would be friendly to the <a href="http://abdullin.com/wiki/version-control-system-vcs.html" target="_blank" class="offsite-link-inline">version control</a> (and seeing the changes).</li>
<li>Changing the original code (i.e.: adding a few lines in the beginning of the file, or moving method around) should not break the documentation.</li>
<li>Whenever needed (or continuously on the integration server) these separate doc files are assembled and rendered to the desired publishing format (i.e.: online docs or PDF).</li>
<li>Any document-level compilation problems are detected immediately (i.e. when building documentation).</li>
</ul>

<p><em>Does anybody have similar problems and ways of solving them? What do you think?</em></p>
