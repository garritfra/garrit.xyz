---
title: Self-hosted software I'm thankful for
date: "2022-09-26"
tags: "note, 100DaysToOffload, infrastructure, homelab, tech"
---

Self-hosting software is not just rainbows and sunshine. I used to self-host a lot of my tools, but after some time the burden of maintaining those tools made me switch to hosted alternatives.

However, there are a few projects that I stuck with over the years, and which I think deserve a deep appreciation.

## Miniflux

[Miniflux](https://miniflux.app/) is a very minimal, self-hostable RSS reader. It's been rock-solid since they day I started using it. The data for the application entirely lives In a Postgres database, which makes migrating the application to new infrastructure setups an absolute breeze. I've been meaning to support the author for quite some time now, but the cost of maintaining an instance yourself is basically zero, so I've yet to find the time to switch to their paid hosted instance.

## Plausible Analytics

[Plausible](https://plausible.io/) is another tool that just keeps on running. I haven't had any issues with it whatsoever, and I can't remember the last time I had to do a manual intervention. Just like Miniflux, there's a paid instance, which supports the author, and just like Miniflux, the software is so good that I haven't had a reason to switch to it yet. Oh, the irony.

## BirdsiteLIVE

While my instance of [BirdsiteLIVE](https://birdsite.slashdev.space/) is currently in a bad shape, this is not at all the fault of the software. There are limitations to the amount of Twitter API requests you can make, and I did a poor job managing the users on that instance. It's currently very overloaded and just very few tweets make it through. I will have to set aside some time to fix this, but the software itself has been rock solid since the day I started using it.

## Synapse (Matrix)

I was hesitant to mention [Matrix](https://matrix.org/) on this list. I had my ups and downs with Synapse (their Python implementation of a Matrix server), but the fact that my instance is still running after multiple infrastructure transitions and even a migration from SQLite to Postgres says something about the quality of the software. I have a feeling that Synapse is fairly resource-hungry, but if you feed it with enough RAM and disk, it will keep running indefinitely.

## Homeassistant

You can throw [Homeassistant](https://www.home-assistant.io/) on a Raspberry Pi and everything works out of the gate. I even migrated my instance from a RPi 3 to a RPi 4 via their backup and restore functionality. It's absolutely flawless.

## Dead projects

I think it's fair to also mention the software that I no longer self-host.

### E-Mail

Just don't roll your own email.

### Mastodon

Too power hungry for my taste. No easy way to host inside docker, which made it a pain to keep running. I'm very happy with [Fosstodon](https://fosstodon.org/), and don't see a reason to switch to a self-hosted instance any time soon.

### FreshRSS

I tried replacing Miniflux once, but failed. Nothing beats Miniflux.

### Prometheus + Grafana

Monitoring **_inside_** your infra works until the infra goes down, at which point you're essentially driving blindfolded. I switched to Grafana Cloud, which includes a very generous free tier.

This is post 038 of [#100DaysToOffload](https://100daystooffload.com/).
