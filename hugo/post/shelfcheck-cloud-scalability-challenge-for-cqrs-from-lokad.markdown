---
aliases:
- /journal/2011/6/19/shelfcheck-cloud-scalability-challenge-for-cqrs-from-lokad.html/index.html
date: 2011-06-19
tags:
- Analytics
- Lokad
- Azure
- Cloud Computing
title: Shelfcheck - Cloud Scalability Challenge for CQRS from Lokad
---
<p>If you have been following <a href="http://code.google.com/p/lokad-cqrs/" target="_blank" class="offsite-link-inline">Lokad.CQRS docs</a>, you've seen that we openly publish use cases of internal projects that are based on this architectural approach.</p>

<p>Another massive project is going to be added to this case library in due time. <a href="http://blog.lokad.com/journal/2011/6/19/shelfcheck-on-shelf-availability-optimizer-announced.html" target="_blank" class="offsite-link-inline">Shelfcheck, on-shelf availability optimizer</a> has been announced by Lokad today. You can read the official news blog entry, or just bear with me for more technical details.</p>

<p>Retail industry (all kinds of shops, stores, hypermarkets etc) has one long problem that has plagued it for years: <strong>out-of-shelf problems</strong>. You as a customer can frequently discover them while doing grocery shopping and discovering that store is out of your favorite brand of beer, preferred snack or some specific type of diapers for the newborn. This small frustration can cause you to get a substitute product, delay the purchase or even go to the competing store. That's a small problem that roughly <strong>accounts for 100 billion USD losses for the retail industry worldwide</strong>.</p>

<p>Solving that problem, among all other options, requires tracking and analyzing data at every point-of-sale (shop, hypermarket, etc) to detect out-of-stock issues as soon as possible. Previously this seemed to be impossible due to the <em>sheer amount of number crunching involved</em>. In order to run almost real-time analysis for thousands of stores in a retail network, where each store can have inventory of 10k-100k products, you either need a huge data-center... or a cloud.</p>

<p>Now, that's where Lokad comes in with <strong>Shelfcheck</strong>, <em>on-shelf availability optimizer</em>. We plan to deliver highly affordable service that will be provided as a subscription with pay-as-you-go pricing. Naturally, the project will be deployed into the cloud, in order to handle all the load; with elastically scalable architecture. This would allow really efficient use of resources to keep the operational costs and prices extremely low.</p>

<p>Technologically the project does not seem to be extremely challenging, given <a href="http://code.google.com/p/lokad-cqrs/" target="_blank" class="offsite-link-inline">Lokad.CQRS</a> and <a href="http://code.google.com/p/lokad-cloud/" target="_blank" class="offsite-link-inline">Lokad.Cloud</a> to support this endeavor. However it should provide better insight into designing, building and running systems of such scale in the cloud. </p>

<p>I'm personally really excited about the scope of the problem we are trying to solve for the industry with <em>Shelfcheck</em>. Stay tuned for more details.</p>

