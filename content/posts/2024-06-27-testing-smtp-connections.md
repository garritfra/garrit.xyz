---
title: "Testing SMTP connections"
date: "2024-06-27"
tags: "infrastructure, guide, note, learnings, tech"
---

Just a quick note to my future self on how to test a SMTP connection with nothing but a tiny busybox container.

In my case specifically, I tested the connection from inside a Kubernetes cluster. Here's the quickest way to get a temporary pod up and running:

```
kubectl run -n backend -i --tty --rm debug --image=busybox --restart=Never
```

Busybox comes with telnet installed, which we can use to establish a connection to the server:

```
/ # telnet smtp.mydomain.com 25
Connected to smtp.mydomain.com
220 mail.mydomain.com ESMTP Postfix (SMTP)
```

Next, we can issue the SMTP commands through the open TCP connection to send a test mail. Lines beginning with a status code are server responses:

```
HELO smtp.mydomain.com
250 smtp.mydomain.com
MAIL FROM:<noreply@mydomain.com>                         
250 2.1.0 Ok
RCPT TO:<receiver@foo.com>
250 2.1.5 Ok
DATA  
354 End data with <CR><LF>.<CR><LF>
From: [noreply] <noreply@mydomain.com>
To: [Receiver] <receiver@foo.com>
Date: Thu, 27 Jun 2024 10:08:26 -0200
Subject: Test Message

This is a test message.

.
250 2.0.0 Ok: queued as 2478B7F135
```

In case there's a firewall issue, you might not be able to establish a connection in the first place, or you won't get a reply to your TCP commands. In our case, everything worked fine.

I hope this is useful!
