---
title: "Beware of base64 encoded strings"
date: "2024-04-15"
tags: "guide, note, learnings, web, til, tech, programming"
---

I just encountered a fun little bug that I thought is worth sharing.

**TL;DR**: Here's the commit that fixes the issue:

<img width="1588" alt="image (3)" src="https://github.com/garritfra/garrit.xyz/assets/32395585/dba76692-c89f-44da-b70a-f6732a406d75">


It started when we noticed that a cronjob that used wget to regularly call an endpoint failed on one specific environment. The endpoint uses [Basic Auth](https://en.wikipedia.org/wiki/Basic_access_authentication), which is essentially a header with a [Base64](https://en.wikipedia.org/wiki/Base64) encoded representation of a username and password. [Curl](https://curl.se/) has this functionality [built in](https://curl.se/docs/manpage.html#-u), but to keep the attack surface as small as possible, we decided to stick to [wget](https://www.gnu.org/software/wget/), which is part of busybox, to keep the container image size under 1 MB (!). After all, all we want to do is ping an endpoint.

This is the command we used up to this point:

```
wget --post-data="" -O - --header="Authorization: Basic $(echo -n $BASIC_AUTH_USERNAME:$BASIC_AUTH_PASSWORD | base64)" http://endpoint:8080/v1/cache
```

We noticed that the request worked fine on non-prod environments, but it failed on production with the following error:

```
The HTTP header line [b2verlk1rwjsnutbcapkjh==] does not conform to RFC 7230. The request has been rejected.
```

After digging around for a while and separating out the individual pieces of the commands, I noticed that the subcommand to build the header value (`echo -n $BASIC_AUTH_USERNAME:$BASIC_AUTH_PASSWORD | base64`) behaved differently on prod vs. non-prod. The password on prod is way longer compared to the other environments. Let's run this command with a short input:

```sh
/ $ echo -n someuser:somepassword | base64
c29tZXVzZXI6c29tZXBhc3N3b3Jk
/ $
```

And again with a long input:

```sh
/ $ echo -n someuser:somepasswordthatswaylongerthanthefirstonebutalsoverysecureandsafe | base64
c29tZXVzZXI6c29tZXBhc3N3b3JkdGhhdHN3YXlsb25nZXJ0aGFudGhlZmlyc3RvbmVidXRhbHNv
dmVyeXNlY3VyZWFuZHNhZmU=
/ $
```

Bingo! There's a rogue newline character in the output of `base64`. The fix is very straight-forward. Using the `-w0` [flag for base64](https://www.man7.org/linux/man-pages/man1/base64.1.html), we can force the output to be on the same line:

```
/ $ echo -n someuser:somepasswordthatswaylongerthanthefirstonebutalsoverysecureandsafe | base64 -w0
c29tZXVzZXI6c29tZXBhc3N3b3JkdGhhdHN3YXlsb25nZXJ0aGFudGhlZmlyc3RvbmVidXRhbHNvdmVyeXNlY3VyZWFuZHNhZmU=
```

This eventually fixed the issue. Not something I would've ever thought of!
