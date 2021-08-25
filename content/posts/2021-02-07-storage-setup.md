---
title: My storage setup (Feburary 2021)
date: "2021-02-07"
---

I used to rely on Google Drive and Photos to store my entire data. Now, that [Google has decided to ditch unlimited photo storage in the near future](https://blog.google/products/photos/storage-changes/) and Google basically being the devil himself, I decided to step up my game and get my hands dirty on a DIY storage solution.

## The goal

Before I got started, I thought about the expectations I have towards a system like this. It boils down to these four points (in this order): I want my solution to be **resiliant**, **scalable**, **easy to maintain** and **easy to access**. Looking back, I think I met all of these requirements fairly well. Let me walk you through how I managed to do that.

## Data resiliance

Keeping data on a single device is obviously a really bad idea. Drives eventually fail, which means that your data will be lost. Heck, even my house could burn down, which means that any number of local copies could burn to ashes. To prevent data loss, I strictly adhere to the [3-2-1 backup strategy](https://www.backblaze.com/blog/the-3-2-1-backup-strategy/). A 3-2-1 strategy means having **at least three total copies of your data, two of which are local but on different mediums (read: devices), and at least one copy off-site**. If a drive fails, I can replace it. If my house burns down, I get two new drives and clone my offsite backup to them.

To get an offsite backup, I set up a spare Raspberry Pi with a single large HDD and instructed it to do daily backups of my entire data. I asked a family member if they would be willing to have a tiny computer plugged in to their router 24/7, and they kindly agreed. A Pi and a HDD are very efficient in terms of power, so there is not a lot to worry about.

## Scalability

I currently don't have a huge amount of data. If that were to change (i.e. if I continue to shoot a lot of high-res photos and shove them into my setup), I need a way to simply attach more drives, or ones with more capacity. I looked at different file-systems that allowed to easy extendability while also being resiliant.

An obvious candidate was **ZFS**, but there are a couple of reasons I ditched this idea. First of all, it is really hard to get up and running on Raspberry Pi running Linux, since it's not natively supported by all distributions. This increases the complexity of the setup. Another reason is that I don't like the way it scales. Please correct me if I'm wrong here, since I only did limited research on this. From what I know though, ZFS can only be extended by shoving a large amount of drives in the setup to achieve perfect redundancy.

In the end, I settled on **BTRFS**. For me, it scratches all the itches that ZFS has. It is baked into the linux kernel, which makes it really easy to install on most distributions, and I can scale it to any number of drives I want. If I find a spare drive somewhere with any storage capacity, I can plug it into the system and it will just work, without having to think about balancing or redundancy shenanigans.

## Maintainability

I need my setup to be easy to maintain. If a drive fails, I want to be able to replace it within a matter of minutes, not hours. If my host (a Raspberry Pi) bursts into flames, I want to be able to swap in a new one and still access my data. If I'm out and about and something goes south, I want to be able to fix it remotely. BTRFS helps a lot here. It's really the foundation for all the key points mentioned here. It gives me a simple interface to maintain the data on the drives, and tries to fix issues itself whenever possible.

Exposing random ports to the general public is a huge security risk. To still be able to access the Pi remotely, I set up **an encrypted WireGuard tunnel**. This way, I only have to expose a single port for WireGuard to talk to the device as if I'm sitting next to it.

## Accessibility

Since the data needs to be accessed frequently, I need a simple interface for it that can be used on any device. I decided to host a **Nextcloud** instance and mount the drive as external storage. Why external storage? Because Nextcloud does some weird thing with the data it stores. If I decide to ditch Nextcloud at some point, I have the data on the disks "as is", without some sort of abstraction on top of it. This also has the benefit of allowing access from multiple sources. I don't have to use Nextcloud, but instead can mount the volume as a FTP, SMB or NFS share and do whatever I want with it. From the nextcloud perspective, this has some drawbacks like inefficient caching or file detection, but I'm willing to make that tradeoff.

## In a nutshell

This entire setup cost me about 150€ in total. Some components were scraped from old PC parts. So, what does the solution look like? Here is the gist:

- A Raspberry Pi 4 as a main host and an older Raspberry Pi 3 for offsite backup, both running Raspberry Pi OS
- Two external harddrives in a RAID 1 (mirrored) configuration, running on an external USB3 hub
- A single internal HDD that served no purpose in my old PC, now serving as backup storage
- All drives are using BTRFS
- WireGuard tunnels between main and remote host, as well as most access devices
- Nextcloud on main host, accessible over TLS (if I need to access data from outside the secure tunnel-network)
- SMB share accessible from within the tunnel-network
- Circa 4.5 terabyte total disk size; 1.5 terabyte of usable storage
- Snapper for local incremental backups on main host; BTRBK for remote incremental backups
- Cron jobs for regular backups and repairs (scrub/rebalance)

This is post 010 of [#100DaysToOffload](https://100daystooffload.com/).
