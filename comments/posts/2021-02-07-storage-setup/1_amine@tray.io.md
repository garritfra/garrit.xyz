---
from: Amine Hmida <amine@tray.io>
date: Sat, 23 Apr 2022 07:52:11 +0100
source: email
---

Hi Garrit,

Thanks for sharing your setup. I am currently in a similar journey and
evaluating different options.

My main concern with this setup is the extensibility aspect, If I need to
add more storage space in the future.

I was considering btrfs in raid 5 mode but it seems like it's not super
stable yet.

I am also considering the use of backblaze for offside backup. I had an
excellent experience with them so far.

This, brings me to the encryption configuration. I assume you are using
dmcrypt in both locations? Another option would be restic for offsite so
you don't have to worry about unlocking the remote disk if system reboots.

A final consideration with this is about monitor the health of your disks.
I wonder what solution you opted for (chat bot / gotify + script that
checks SMART metrics?)

Sorry for the long comment =F0=9F=98=85
I just loved your post and wanted to share some thoughts/questions.

Kind regards,
Amine
