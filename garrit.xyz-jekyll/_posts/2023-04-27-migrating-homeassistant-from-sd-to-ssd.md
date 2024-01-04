---
layout: post
title: "Migrating Homeassistant from SD to SSD"
date: "2023-04-27"
tags: "100DaysToOffload, guide, note, homeassistant, homelab, tech"
---

I finally got frustrated with the performance of my Raspberry Pi 4 running Homeassistant on a SD card, so I went ahead and got an SSD.

The migration was **very** easy:

1. Create and download a full backup through the UI
2. Flash Homeassistant onto the SSD
3. Remove the SD card and plug the SSD into a USB 3.0 port of the Pi
4. Boot
5. Go through the onboarding procedure
6. Restore Backup
7. Profit

It worked like a charm! The speed has improved A LOT, and everything was set up as it should be. 

...Until we turned on the lights in the livingroom. My ZigBee-dongle, plugged into another USB port, wasn't able to communicate with the devices on the network.

After some digging around, I came across several threads stating that an SSD over USB 3.0 apparently creates a lot of interference to surrounding hardware, including my ZigBee dongle. The fix was simple: either get an extension port for the dongle, or plug the SSD into a USB 2.0 port of the Pi. Since I didn't have an extension cord to get the dongle far away enough from the SSD, I went with the latter option for now. And that fixed it! The performance was much worse, but still better than the SD I used before. My next step will be to grab an extension cord from my parents. I'm sure they won't mind.

I hope this helps!

---

This is post 066 of [#100DaysToOffload](https://100daystooffload.com/).





