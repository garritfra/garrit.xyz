---
layout: post
title: Finally fixing that annoying Cron gotcha
date: "2021-09-13"
tags: "linux, guide, 100DaysToOffload, homelab, tech"
---

A while ago I went through my server and reworked my [storage
setup](/posts/2021-02-07-storage-setup). As discribed in that blog post, I set
up daily backups to [Backblaze
B2](https://www.backblaze.com/cloud-storage) using their amazing CLI
through a cron script. A day went by and I noticed that the
[healthcheck](/posts/2021-05-15-healthchecks-io-with-docker) didn't pass.
Unfortunately I didn't have time to fix this problem immediately, so instead I
executed the command by hand every couple of days. One could argue that this in
total took way more time than the actual fix, but hey, I was lazy. In the end,
I finally dedicated some time to fix this annoying issue.

It turns out that a command executed by cron doesn't run through sh or bash,
but in a minimal environment without your usual environment-variables. As a
result, my `b2` command (and many other commands for that matter) won't run as
expected, if at all. A quick fix is to run your command through bash or sh
explicitly:

```sh
sh -c "mycommand"
```

Alternatively, if you want all your entries to use sh or bash, you can set the
`SHELL` variable at the very beginning of your crontab:

```sh
SHELL=/bin/bash

15 1 * * * some_command
```

[Here](https://askubuntu.com/a/23438) is an answer that goes into more detail
about this. Have a great day!

This is post 019 of [#100DaysToOffload](https://100daystooffload.com/).
