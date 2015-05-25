---
aliases:
- /journal/2010/10/20/what-is-your-project-like-titanic-or-a-street-dog.html/index.html
date: 2010-10-20
title: What is your project like - Titanic or a street dog?
tags:
- design
- essay
- dev-process
---
<p>One of the things I've learned from the production experience was the extreme value of getting feedback for your project as soon as possible. This might save you wasting a lot of effort, time and resources later on (or even save the project).</p>

<blockquote>
  <p>Actually getting feedback for the project should start even before the design and architecture were started. However talks about proving business value and verifying customer expectations are slightly outside of this blog, so we'll skip it (there are a lot of excellent materials on the subject, starting with the classical Project Management), assuming that this was done and project either solves some current problem or the one that is bound to show up shortly. </p>
</blockquote>

<p>It's impossible to build some perfect design that will last and stay unchanged through the life-time of your project (at least I'm not capable of doing so in the rapidly changing business context I'm working, which is one of the most enjoyable parts of the job). Life always has some unexpected discoveries, challenges and opportunities waiting for you down the road.</p>

<p>If you miss challenge or fail to manage a risk - they will result in potential losses and wasted resources. Likewise, failure to leverage an opportunity results in some potential benefits that you failed to reap (which could count as a failure if your competition was not that sloppy).</p>

<p>Ok, so the world is ever changing and unpredictable place. Some of it's areas are even more volatile and potentially rewarding than the others. Obviously this leads that any software project in the area will be the subject of rapidly changing requirements. Project vision, roadmaps and actionable items could change within months, weeks and even days (especially given peculiarities of human mind to miss some bits of information, have lags in communications and decision making).</p>

<p>How can you deliver software in such environment and be successful? Here are just some ideas.</p>

<p><strong>Continuously learn about the environment</strong> - technological and business conditions constantly change, evolving from potential probabilities to something that has already happened. There is not much literature (I haven't seen any so far and would love the pointer) about embedding knowledge about probable threats and potential opportunities into your project. However just keeping the big picture of the environment (and potential future) in mind while making decisions - helps a lot. Besides it brings this wonderful feeling, when a plan comes together.</p>

<p><strong>Continuously learn about your project</strong> - as project environment changes along with the usage patterns, previously known and stable components might exhibit strange and unpredictable behaviors. This becomes even worse in the modern world of OOP, elaborated versions of DLL hell and ever-present issues of concurrency and coordination. Things that might help: real-time indicators, profiling, warning notifications, data-mining etc.</p>

<p>If you push this far enough, you might be able to fix unpredictable issues before anybody really notices them.</p>

<p><strong>Have extremely low friction in your systems</strong> - fixing bug or adding a quick feature, updating a stable branch and deploying - should ideally take less than an 15-40 minutes. If it takes more - friction will be created, reducing actual rate of production deployments. This will result in ever growing disparity between real world and the ideal world that the current version of the code targets.</p>

<p>From my experience, high-friction projects tend to be like Titanic - they have ideal architecture, passing unit tests, rich lists of completed features and resolved issues. Releases happen once a few months (or even less frequently) and are feared because there will certainly be  a large number of critical issue reports afterwards.</p>

<p>There is another type of projects that I've had recently pleasure of encountering. Such projects rarely have a pure and straightforward design and long releases. They start as a hack for solving some immediate business need and go into the production right away. </p>

<p>There is no real need for tests - codebase never gets really stale and is usually covered by the best unit tests you could ever dream about - real-world users.</p>

<ul>
<li>Make everything as automated and smart as possible (every bit of reduced friction</li>
<li>Be smart with the automation and don't try to handle 100% of the cases. Automate 80% that require 20% of the effort. Leave remaining - to the real people.</li>
</ul>

<p>Don't you hate this?</p>

<p>Real-world project feedback does not necessarily include only some sort of pre-alpha deployments with real users (although such experience is extremely valuable as well). You can also test and verify:</p>

<ul>
<li>technological ideas and concepts - by building prototypes and spikes early to justify decisions and verify them;</li>
<li>architectural logic - by building system-wide prototype that spans multiple components/layers and has almost all real</li>
</ul>
