---
from: Garrit Franke <garrit@slashdev.space>
date: Sat, 23 Apr 2022 13:05:51 +0200
source: email
---

Hi Amine,

thanks for your kind words!

> My main concern with this setup is the extensibility aspect, If I need
> to add more storage space in the future.
>
> I was considering btrfs in raid 5 mode but it seems like it's not super
> stable yet.

I've been very impressed by how well Btrfs handles extensibility. I have
recently thrown new drive at my setup. The main advantage of Btrfs in my
opinion is that you can combine any drives you want, as opposed to ZFS,
where you're more or less constrained to drives of the same size.

Regarding RAID: You're right, RAID 5 is unfortunately still unstable.
After one year, I don't regret going with RAID 1 (mirrored) for my
setup. If you have 4+ drives, I suggest you take a look at RAID 10,
since it gives you some advantages over RAID 1.

> I am also considering the use of backblaze for offside backup. I had an
> excellent experience with them so far.

Great choice! Backblaze has been rock solid for me as well. And they're
cheap too!

> This, brings me to the encryption configuration. I assume you are using
> dmcrypt in both locations? Another option would be restic for offsite so
> you don't have to worry about unlocking the remote disk if system
> reboots.

This is a topic I haven't dipped my toes into yet. All of my drives are
unencrypted. Thanks for your recommendations though, I will have to look
those up! Are you using restic in your current setup?

> A final consideration with this is about monitor the health of your
> disks. I wonder what solution you opted for (chat bot / gotify + script
> that checks SMART metrics?)

Some time ago I wrote up a blog post about using healthchecks.io with
docker:

https://garrit.xyz/posts/2021-05-15-healthchecks-io-with-docker

healthchecks.io is really neat, since _you're_ responsible of pinging
their endpoints, as opposed to _them_ pinging a HTTP-endpoint. This
enables you to write Cron-scripts that frequently check the health of
your drives. I'm currently using this script to check my drives:

```
#!/bin/bash

curl -fsS -m 10 --retry 5 -o /dev/null $PING_URL/start

output=$(btrfs scrub start -B /var/anubis)

curl -fsS -m 10 --retry 5 --data-raw "$output" -o /dev/null $PING_URL/$?
```

maybe it's of use for you?

Thanks again for your comment!

Best
Garrit
