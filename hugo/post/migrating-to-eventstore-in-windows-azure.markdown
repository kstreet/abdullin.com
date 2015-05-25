---
aliases:
- /journal/2013/7/26/migrating-to-eventstore-in-windows-azure.html/index.html
date: 2013-07-26
tags:
- Azure
- Domain Event
title: Migrating to EventStore in Windows Azure
---
<p>We have a number of systems at Lokad, which use various versions of Azure EventStore from Lokad.CQRS. Our in-house store is nice, but has performance limitations and some administrative burden.  </p>

<p>Currently I'm working on gradual migration of our systems towards centralised <a href="http://geteventstore.com/">EventStore</a> on Windows Azure. Some community members expressed an interest in the process, so I'm sharing my <strong>current thoughts</strong>.</p>

<h2>Administration</h2>

<p>Here are a few considerations and assumptions that affect our requirements for Event Store server setup:</p>

<ul>
<li>Uptime with many nines is not critical for at the moment.</li>
<li>Built-in Azure replication is more than enough for us at the moment.</li>
<li>We'd prefer to use single-node deployment of Event Store at the time being (with built-in Azure replication).</li>
<li>We're hosting event store in Widows Azure, exposing it to the entire world.</li>
</ul>

<p>There are two main deployment options that fit:</p>

<p><strong>Option 1: Install Event Store as Windows Azure Worker Role.</strong> This setup requires a little bit of coding but is more native to Azure. However, single-node configuration would require use of CloudDrive (XDrive) to mount Azure Blob storage as Windows Disk visible to Event Store. I've heard people were having problems with this setup in production (data corruption).</p>

<p>If we were to switch to clustered version of Event Store, then worker role setup (with local transient disks) would be the preferred approach, without any doubt. Much better performance, too.</p>

<p><strong>Option 2: Install Event Store as windows service on Windows Azure Virtual Machine</strong>. This option uses host-managed disks to mount the same Azure Blob storage as Windows Disks. These are the same disks that are used to host operating system itself, so they are more reliable.</p>

<p>Option 2 is our current path at Lokad right now. Additional setup tweaks include:</p>

<ul>
<li><p><strong>Host Event Store db on a separate VHD drive</strong>, making sure that it has read-caching turned on. Logging is better to go to a separate transient disk (so that NLog would not compete for IO with event storage). Write-caching is better to be turned off.</p></li>
<li><p><strong>Expose port 1113 to internet as public endpoint</strong>. This port hosts TCP protocol of Event Store, which has just got per-stream security available. </p></li>
<li><strong>keep port 2113 as private</strong>. This port serves Web UI and projections via REST API. </li>
</ul>

<h2>Migrating systems</h2>

<p>Theoretically, switching systems to new event storage would be rather simple:</p>

<ul>
<li>Replace current event store implementation in code with adapter that uses .NET client to Greg's Event Store;</li>
<li>Migrate all data to a new server.</li>
</ul>

<p>In theory this should work. In practice, blindly jumping to a new setup would be reckless. I expect a number of edge cases that might surface simply from the fact that <strong>such Windows Azure setup is not native for EventStore</strong>:</p>

<ul>
<li>Event Store unavailability due to VM restarts by Azure. This is expected but has to be dealt with.</li>
<li>Transient network issues while communicating with EventStore server via .NET client.</li>
<li>Changes in network topology by Windows Azure (e.g. EventStore server is no longer located on the same IP).</li>
</ul>

<p>Technically, EventStore deals with many problems via graceful degradation (as opposed to simply giving up). E.g. if it can't connect to EventStore, then it will retry connecting internally. </p>

<p>However, in practice, components using EventStore must be designed with this degradation kept in mind, they should degrade gracefully as well (as opposed to simply giving up).</p>

<p>So the <strong>migration process</strong> would be:</p>

<ol>
<li>Keep existing production systems on Lokad's Event Store, which is battle-tested on Azure.</li>
<li>Setup replication to Greg's Event Store and start moving non-critical projections and components there. Let them run there for a while.</li>
<li>If the setup holds - gradually move existing productions systems to the new Event Store.</li>
</ol>

<h2>Long-term Strategy</h2>

<p>If things hold well on Azure, I expect to have a number of design simplifications in Lokad systems. Some examples are:</p>

<ul>
<li>Use event store instead of Lokad.CQRS messaging adapter (Files / Azure queues) and avoid Azure message throttling.</li>
<li>Switch to catch-up projections, gaining ability to store projected views on any storage (not just azure-hosted blobs). This would massively improve performance and simplify client applications.</li>
</ul>

<p>Interestingly enough the same design improvements allow to make system less coupled to constrains of Windows Azure. In my experience, this is a really good thing.</p>

<h2>Feedback?</h2>

<p>I know that some of my readers are already using EventStore in production on Windows Azure. <strong>Would you kindly share your setup and problems encountered?</strong></p>

<h2>Update 1: using RAID for better speed</h2>

<blockquote>
  <p>This is an update by Ryan A.</p>
</blockquote>

<p>You might want to take a look at creating a RAID 0 of 4 disks for Medium (8 disks for Large, 16 for XL) within the VM. This will allow you to utilize all of the IOs allocated to your VM. There is a MAX of 500 IOPS per disk.</p>

<p><a href="http://msdn.microsoft.com/library/dn197896.aspx">Virtual Machine and Cloud Service Sizes for Windows Azure</a></p>

<p>In some initial tests, I was able to get <code>WRFL 10 1000000 --&gt; 5576/s</code> running the test client from an external machine in the same datacenter. Albeit, the host was a Extra Large (8 cores, 14 GB memory) with 16 5GB disks in RAID 0</p>

<h2>Update 2: Doubtful performance of Cloud Drive</h2>

<blockquote>
  <p>This is an update by <a href="http://zimarev.com/">Alexey Zimarev</a></p>
</blockquote>

<p>CloudDrive is still based on SDK 1.8 and according to Msft people "<strong>the future of CloudDrive is now being discussed</strong>". I was busy deploying RavenDb in a worker role and it works with the StorageClient assembly, which is now seems to be a wrapper around the new Storage 2.0 client. However we can never be sure what Msft will decide to do with CloudDrive. Also there were some reports about performance of the CloudDrive versus VHD although it must be the same, but still. </p>

<p>One of the issues with data stored on a CloudDrive in worker roles is a scaling up problem when you increase the number of instances for your worker role and it is unable to get write access to the database file since it is on exclusive lock. </p>

<p>In this fashion VMs are much more controllable since you instantiate each machine separately and have separate disks and you setup replication between the VMs in a way you want it.</p>

