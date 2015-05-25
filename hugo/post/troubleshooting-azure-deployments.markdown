---
aliases:
- /journal/2010/12/4/troubleshooting-azure-deployments.html/index.html
date: 2010-12-04
tags:
- Lokad
- Azure
- Cloud Computing
title: Troubleshooting Azure Deployments
---
<p>Let's compile a list of <strong>common Windows Azure deployment problems</strong>. I will include my personal favorites in addition to the <a href="http://msdn.microsoft.com/en-us/library/gg465402.aspx" target="_blank" class="offsite-link-inline">troubleshooting tips</a> from MSDN (with some additional explanations).</p>

<h2>Missing Runtime Dependencies</h2>

<p>Windows Azure Guest OS is just a <a href="http://abdullin.com/wiki/what-is-virtual-machine-vm.html">Virtual Machine</a> running within Hyper-V. It has a set of preinstalled components required for running common .NET applications. If you need something more (i.e.: assemblies), <strong>make sure to include these extra dlls and resources</strong>!</p>

<ul>
<li><strong>Set Copy Local to True for any non-common assemblies</strong> in "References". This will force them to be deployed. If assembly is referenced indirectly and does not load - add it to the Worker/Web role and set Copy Local to True.</li>
<li>Web.config can reference assemblies outside of the project references list. CSPack will not be aware of them. These need to be included as well.</li>
<li>If you use some assemblies linking to the native code, make sure that native code is x64 bit and is included into the deployment as well. For example this was needed for running Oracle Native Client or SQlite on Azure Worker Role.</li>
</ul>

<h2>It's 64 Bit</h2>

<p>Again, <strong>Windows Azure Guest OS is 64bit</strong>. Make sure that everything you deploy will run there. You can reference 32 bit assemblies in your code, but they will not run on the cloud.</p>

<blockquote>
  <p>You might encounter case that Visual Studio IntelliSense starts arguing badly while you edit ASP.NET files referencing these 64bit-only assemblies. This is understandable since devenv is still 32 bit process. Well, I just live with that.</p>
</blockquote>

<h2>Web Role Never Starts</h2>

<p>If your web role never starts and does not even have a chance to attach IntelliTrace, then you could have a problem in your web.config. Everything would still work perfectly locally.</p>

<p>This could be caused by config sections that are known on your machines, but are not registered within Windows Azure Guest OS VM. In our case this was coming from uri section required by DotNetOpenAuth:</p>

<pre><code>&lt;uri&gt;
    &lt;idn enabled="All"/&gt;
    &lt;iriParsing enabled="true"/&gt;
&lt;/uri&gt;
</code></pre>

<p>This fixed the problem:</p>

<pre><code>&lt;configuration&gt;
  &lt;configSections&gt;      
    &lt;section name="uri" type="System.Configuration.UriSection, System, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089"/&gt;
</code></pre>

<h2>Windows Azure Limits Transaction Duration</h2>

<p>If your transactions require more than 10 minutes to finish, then they will fail no matter what settings you have in the code. 10min threshold is located in machine.config and can't be overridden from the code. <a href="http://abdullin.com/journal/2010/11/30/windows-azure-limits-transaction-duration.html">More details</a></p>

<blockquote>
  <p>This is a protective measure (protecting developers from deadlocking databases) coming from the mindset of a tightly coupled systems. I wish Microsoft folks were more aware of the architecture design principles that are frequently associated with <a href="/tags/cqrs/">CQRS</a> these days. In that world deadlocks, scalability, complexity and tight coupling are not an issue.</p>
</blockquote>

<h2>Temporary Files can'be larger than 100MB</h2>

<p>If your code relies on temporary files that can be larger than 100Mb, then it would fail with "Disk full" sort of exception. You will need to use Local Resources.</p>

<p>If you launch a library or process that rely on temporary files, then they could fail, too. This did hit me, when SQLite was failing to compact 2GB database file located within 512GB empty disk. As it turns out, the process used TEMP environment variable and needed ability to write to a large file.</p>

<p><a href="http://abdullin.com/journal/2010/11/29/windows-azure-sqlite-and-temp.html" target="_blank" class="offsite-link-inline">More details</a> are in another blog post.</p>

<h2>Recycling Forever </h2>

<p>Cloud fabric assumes that OnStart, OnStop and Run from "RoleEntryPoint" will never throw exceptions under normal conditions. If they do, they are not handled and will force the role to recycle. If your application always throws an exception on start up (i.e.: wrong configuration or missing resource), then it will be recycling forever.</p>

<p>Additionally, the Run method of a Role is supposed to run forever (when it returns, the role recycles). If your code overrides this method, it should sleep indefinitely. </p>

<blockquote>
  <p>BTW, if you consider putting Thread.Sleep, then I strongly encourage you to check out <a href="http://msdn.microsoft.com/en-us/library/dd460717.aspx" target="_blank" class="offsite-link-inline">Task Parallel Library</a> (aka TPL) within .NET 4.0 instead. Coupled with PLinq and new concurrent and synchronization primitives, it nearly obsoletes any thread operations in my personal opinion. Lokad Analytics R&amp;D team might not agree, but they have really specific reasons for reinventing PLinq and TPL on their own.</p>
</blockquote>

<h2>Role Requires Admin Privileges</h2>

<p>I personally never hit this one. However just keep in mind, that compute emulator (Dev Fabric) runs with the Admin privileges locally. Cloud deployment does not have them. If your code requires Admin rights to do something, it might fail while starting up or executing.</p>

<h2>Incorrect Diagnostics Connection String</h2>

<p>If your application uses Windows Azure Diagnostics, then for deployment make sure to update the setting to HTTPS credentials pointing to a valid storage account.</p>

<p>It is usually a separate setting named "DiagnosticsConnectionString". It's easy to forget that, when you usually work with "MyStorageConnectionString" or something like this.</p>

<h2>SSL, HTTPS and Web Roles</h2>

<p>In order to run a site under HTTPS, you must pass the SSL certificate to Windows Azure, while making sure that private key is exported and PFX file format is used.</p>

<p>By the way, if you applied to "Powered by Windows Azure" program logo, then make sure not to display it on the HTTPS version of your site. That's because the script is not HTTPS-aware and will retrieve resources using non-SSL channel. This will cause browsers to display warnings like the one below, which will be scary for the visitors.</p>

<p><span class="full-image-block ssNonEditable"><span><img src="/storage/uploads/2010/12/2010-12-04_powered_by_azure_logo_effect.jpg" alt="Powered by Azure Logo Effect"/></span></span></p>

<blockquote>
  <p>NB: as I recall site owners are not allowed to modify this script and fix the issue themselves. So we would probably need to wait for a few more months of constant email pinging till 10-line HTML tracking snippet is updated to use HTTPS when located within HTTPS, just like GA does. I know it's a tough task.</p>
</blockquote>

<h2>What Did I Miss?</h2>

<p>That's it, for now. Some of these less common issues cost us quite a bit of time to figure out and debug. Hopefully this post will save you some time in <a href="http://abdullin.com/cloud-computing-in-net/">.NET cloud computing</a> with Windows Azure. I'l try to keep this post updated.</p>

<p>Did I miss some common deployment problems that you've encountered and were able to work around?</p>

