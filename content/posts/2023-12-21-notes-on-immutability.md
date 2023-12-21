---
title: "Notes on Immutability"
date: "2023-12-21"
tags: "100DaysToOffload, infrastructure, note, learnings, review, tech, papers"
---

> Published books are immutable. Accountants don't use erasers or they go to jail.

The paper [Immutability Changes Everything](https://www.cidrdb.org/cidr2015/Papers/CIDR15_Paper16.pdf) by Pat Helland talks about the trend towards immutability in data storage thoughout all layers of the stack. From append-only apps (Record changes, then derive the current state), down to how bits are stored on a hard drive (e.g. Copy on Write).

I stumbled upon this paper through the [Papers We Love](https://paperswelove.org/) collection. I was specifically looking for a paper that's short and easy to comprehend, since I don't have much experience in reading scientific papers. This is absolutely both short and easy to comprehend. If you're a beginner like me, I can highly recommend this one to you.

Key takeaways:

* Immutability enables clean replication
* Change logs (e.g. [write-ahead logs](https://en.wikipedia.org/wiki/Write-ahead_logging)) are the source of truth. The database is a cache of a subset of those change logs
* It's okay to consider violating [normalization](https://en.wikipedia.org/wiki/Database_normalization) rules to trade storage cost for read speed
* Modern SSDs minimize wear by storing new versions of data to other blocks instead of mutating the data in place
* The cost of immutability is increased storage

---

This is post 098 of [#100DaysToOffload](https://100daystooffload.com/).
