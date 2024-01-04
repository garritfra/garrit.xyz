---
layout: post
title: "PSA: RSS feed changes"
date: "2023-07-06"
tags: "100DaysToOffload, note, meta, rss"
---

If you're subscribed to this blog via [RSS](/rss.xml), you will soon likely see
a bunch of my posts re-appearing in your feed. For that, I apologize in advance!

I'm planning to make two modifications. Firstly, I want to add a `id` property
to all entries. So far, your reader has been likely been relying on the URL slug
to identify an entry. Adding the `id` property makes this more flexible, but it
also means that your reader will think that there are new entries in the feed.
This will only happen once.

Secondly, I want to reduce the amount of the entries. If you look at the
[feed](/rss.xml), you'll see a lot of junk from way back, containing every word
I wrote on this blog. Remember that this page is fetched periodically (usually
every hour for most readers) by **every** subscriber. That's a lot of traffic
that could be better put to use somewhere else. Not that it costs me anything -
this site is hosted on [GitHub Pages](https://pages.github.com/) - but if this
helps reduce the carbon footprint of the site even by one gram, it's worth the
effort.

As of the time of writing this post, by restricting the number of posts to 10,
we reduce the amount of traffic per client per hour from 272 kB down to to 24
kB. That's over **2 GB** of traffic saved each year **per subscriber**!!

That's all - just a heads up. Thanks for your patience, you're awesome! ✌️

---

This is post 071 of [#100DaysToOffload](https://100daystooffload.com/).
