---
layout: default
title: Cloning Windows to a new drive
date: "2022-05-24"
tags: "note, guide, windows, til, 100DaysToOffload, tech"
---

My grandpa has been using his current computer for about 10 years now. After
such a long time, the system has become quite slow and bulky. Back then it was
relatively normal to use a HDD as a primary hard drive, which adds to the slow
experience. It was time for an upgrade!

> **TL;DR**: Use [Clonezilla](https://clonezilla.org/) on a live usb stick to
> create an exact copy of your old drive onto your new one.

I got him a 512 GB SSD, which, conveniently, is the same size of his current
HDD. While installing the new drive alongside his existing one, I thought about
how to copy the existing Windows-installation.

Naïvely, I thought that I could just `dd` the contents of the HDD onto the new
drive would work, since, _every byte is copied as is_, or at least that's what I
thought. Turns out it wasn't that easy. I'm sure it would've worked if I was
more careful, but by default, `dd` just wipes over each byte, not caring if it
made a mistake. After very long 5 hours, I came back to the PC to see that it
finished copying the 512 GB (yes, it's not just copying the data, it's copying
the entire partition!). In a super excited mood, I restarted the PC and selected
the SSD as a boot medium. Aaaaand... nothing. Windows tried to repair some stuff
but it wasn't successful. I fiddled around with the boot partition a bit, but I
had to give up after an hour or so.

## The second attempt

After researching a bit (I should've done that sooner...) I stumbled across
[Clonezilla](https://clonezilla.org/), a Linux distribution custom-built for
this purpose. I flashed it onto a usb-stick and started the cloning process.
After just 20 minutes (!), it was done cloning the existing data. The process is
extremely simple!

Before rebooting, I disconnected the old drive to make sure that there's no
funny business going on. Apparently, Windows had to self-adjust UIDs of the
drives, but after a short "Preparing Windows" animation, the system started up
as expected. **Success**!!

The performance of the new hard drive is amazing, at least compared to the HDD
my grandpa had before. Plus, we can use the existing HDD to take full system
backups every now and then, using the same process.

This is post 031 of [#100DaysToOffload](https://100daystooffload.com/).
