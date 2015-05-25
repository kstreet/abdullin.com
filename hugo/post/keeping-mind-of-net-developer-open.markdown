---
aliases:
- /journal/2011/3/1/keeping-mind-of-net-developer-open.html/index.html
date: 2011-03-01
tags:
- Lokad
- Azure
- Cloud Computing
title: Keeping Mind of .NET Developer Open
---
<p>Yesterday I've bought a new laptop, replacing the old one (video output to LCD got fried). I used to stick with DELLs (robust and can take almost any beating), yet this time, there wasn't much time or pocket cash to spend on the upgrade. So, without even thinking a lot, I went for Lenovo laptop with the slowest i7 processor, 4 GB of RAM and a home upgrade to 120GB Corsair SSD (Force) that came a week earlier.</p>

<p>This upgrade (and OS reinstall) was an opportunity for me to start rethinking my development approaches and the whole CPU MHz race (in which any dev with VS 2010 and R# eventually ends up). I used to be jealous of blog posts and videos of developers working on blazingly fast Linux IDE environments and still staying really productive. </p>

<p>At the same time, development story at Lokad has been going in a slightly opposite direction. Our build, integration and deployment scenarios are becoming so complex, that the big picture and evolution path tend to blur. Even usual everyday handling of dev and integration tasks on a dev box adds a bit of a mental burden and friction. Windows Azure with it's "lightweight" build and deployment process does not make things easier.</p>

<p>My gut feeling, based on the limited development experience, came up with the rule of the thumb: </p>

<blockquote>
  <p>If you need to keep solving same problem (in slight variations) over and over again, then you are going in the wrong direction. Think outside the box. Look on the other side of the fence, if you need any hints.</p>
</blockquote>

<p>Here's an example - optimizing database calls was rather a common routine for me a year ago. I used to spend days on tasks like writing smart SQL bulk inserts with high performance, adding small caching layers and optimizing queries. Needless to say, that all these "features" took a lot of time, increased complexity and were eventually thrown out of the codebase later. Perf problems were solved at the conceptual level by a simple paradigm shift from coupled data-driven models to message-based cloud architectures.</p>

<p>I believe, same could be achieved with the distributed development targeting cloud architectures as well. Classical approach of having high-end dev machine, build server with regular deployments and central version control system - is too coupled and, well, centralized. We should be able to improve the big picture both in simplicity and friction. The latter is extremely important to me for two reasons:</p>

<ul>
<li><p><strong>Reduced friction means faster reaction time</strong> (and ability to get rich feedback loop). For the business, having low-friction development means ability to execute faster, eventually outperforming competitors and getting the most out of the opportunities showing up.</p></li>
<li><p><strong>Reduced complexity leads to better decisions</strong>. Less moving parts you need to keep in mind, easier it is to come up with solutions that consider all primary factors and future probabilities (risks and opportunities alike). This starts from the development, but, for a software-oriented company, goes all the way up to the organizational and policy levels.</p></li>
</ul>

<p>In a sense, switch to the Cloud Computing and Cloud Architectures (CQRS + DDD + etc), was a big step for Lokad in the last few years. Lot's of lessons learned. Yet there are more potential reductions to be gained in order to keep progress steady and stress levels - reasonable.</p>

<p>In order to keep my mind open to such opportunities, while learning as much as possible, I've decided to switch to Linux as my primary day-to-day OS (currently - Ubuntu 10.10), while keeping .NET Microsoft Development isolated within VMs. Integration dev will still stay where it is now - remote and cloud servers.</p>

<p>A few insights from less than a day of using Ubuntu with VirtualBox-ed Win7:</p>

<ul>
<li>It takes a few minutes to install Linux distro to HD and Win7 in a VM, provided you use SSD.</li>
<li>Linux forces you to be ready to learn new things (acceptance). </li>
<li>Seamless mode of VirtualBox is an interesting experience, never thought this to be possible.</li>
<li>I tend to use mouse less, which is a bit frustrating (all the keystrokes to learn), but speeds things up in a way similar to R# jedi tricks.</li>
<li>Mercurial is really painful and slow for cloning large repositories. </li>
</ul>

<p>I was thinking about upgrading to 8GB of RAM. I'm not sure any more if it's even worth the effort of going to the shop. Linux host stays as responsive as ever (meaning, I can work emails, documents, code) even when Win7 in VM tries to stress machine by doing large compile or NGening .NET 4.0. Needless to say, that I gave away 75% of CPU and RAM to Win7.</p>

<p>Thinking "How can I keep evolving projects to simplify development without VS10?" already brings up ideas on organizing, testing and integrating large multi-project solutions in a simple and straightforward way within the VS10 stack (before that, there was no coherent picture). Nothing really new - just the common principles of proper component development, applied at the project ad solution levels. It feels good to have a plan, though. Organizational structures and processes layer on top of that in a rather straightforward manner as well.</p>

<p>PS: The discussion continues (with some nice comments) in the following posts:</p>

<ul>
<li><a href="http://abdullin.com/journal/2011/3/16/linux-setup-tweaks-of-net-developer-with-ssd.html">Linux Setup Tweaks of .NET Developer with SSD</a></li>
<li><a href="http://abdullin.com/journal/2011/4/13/why-even-bother-trying-linux.html">Why Even Bother Trying Linux</a></li>
</ul>

