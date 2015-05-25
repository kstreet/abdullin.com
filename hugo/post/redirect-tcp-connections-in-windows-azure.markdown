---
aliases:
- /journal/2010/8/25/redirect-tcp-connections-in-windows-azure.html/index.html
date: 2010-08-25
tags:
- Lokad
- Azure
- Cloud Computing
title: Redirect Tcp Connections in Windows Azure
---
<p>I've just published a quick and extremely simple open source project that shows how to redirect TCP connections from one IP address/port combination to another in Windows Azure. It is sometimes helpful, when dealing with SQL Azure, cloud workers, firewalls and the like.</p>

<p><a href="http://code.google.com/p/lokad-azure-tcp-tunnel/" target="_blank" class="offsite-link-inline">Lokad Tcp Tunnel for Windows Azure</a> | <a href="http://code.google.com/p/lokad-azure-tcp-tunnel/downloads/list" target="_blank" class="offsite-link-inline">Download</a></p>

<p>Usage is extremely simple:</p>

<ul>
<li>Get the package.</li>
<li>Configure ServiceConfiguration to point to the target IP address/port you want to connect to (you can do this later in Azure Developer's Portal).</li>
<li>Upload the Deployment.cspkg with the config to the Azure and start them.</li>
<li>Connect to deployment.cloudapp.net:1001 as if it was IP:Port from the config.</li>
</ul>

<p>If you are <strong>connecting to SQL Server</strong> this way (hosted in Azure or somewhere else), then the address have to specified like this in Sql Server Management Console (note the comma):</p>

<pre><code>deployment.cloudapp.net,1001
</code></pre>

<p>Actual Azure Worker config settings should look similar to the ones below, when configuring TCP Routing towards SQL Server (note the 1433 port, that is the default one for SQL):</p>

<pre><code>&lt;ConfigurationSettings&gt;
  &lt;Setting name="Host" value="ip-of-your-SQL-server" /&gt;
  &lt;Setting name="Port" value="1433" /&gt;
&lt;/ConfigurationSettings&gt;
</code></pre>

<p>The project relies on <a href="http://www.boutell.com/rinetd/" target="_blank" class="offsite-link-inline">rinetd</a> to do the actual routing and demonstrates how to:</p>

<ul>
<li>Bundle non .NET executable in Windows Azure Worker and run it.</li>
<li>Deal with service endpoints and pass them to the processes.</li>
<li>Use Cloud settings to configure the internal process.</li>
</ul>

<p>Since core source code is extremely simple, I'll list it here:</p>

<pre><code>var point = RoleEnvironment.CurrentRoleInstance.InstanceEndpoints["Incoming"];
var host = RoleEnvironment.GetConfigurationSettingValue("Host");
var port = RoleEnvironment.GetConfigurationSettingValue("Port");

var tempFileName = Path.GetTempFileName();
var args = string.Format("0.0.0.0 {0} {1} {2}", point.IPEndpoint.Port, host, port)

File.WriteAllText(tempFileName, args);

var process = new Process
  {
    StartInfo =
      {
        UseShellExecute = false,
        RedirectStandardOutput = true,
        RedirectStandardError = true,
        CreateNoWindow = true,
        ErrorDialog = false,
        FileName = "rinetd.exe",
        WindowStyle = ProcessWindowStyle.Hidden,
        Arguments = "-c \"" + tempFileName + "\"",
      },
    EnableRaisingEvents = false
  };
process.Start();

process.BeginOutputReadLine();
process.BeginErrorReadLine();
process.WaitForExit();
</code></pre>

<p><a href="http://code.google.com/p/lokad-azure-tcp-tunnel" target="_blank" class="offsite-link-inline">Tcp Tunnel for Azure</a> is shared by <a href="http://lokad.com" target="_blank" class="offsite-link-inline">Lokad</a> in hopes that it will save a few hours or a day to somebody.</p>

