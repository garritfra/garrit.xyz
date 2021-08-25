---
title: The Patch-Based Git Workflow
date: "2020-09-28"
---

If you have ever contributed to an open source project, chances are you have opened a pull request on GitHub or a similar platform to present your code to the maintainers. While this is a very approachable way of getting your code reviewed, some projects have decided against using pull requests and instead accept patches via email.

## An introduction to patches

A patch is essentially a git commit expressed in plain text. It describes what commit the change is based on, and what has changed. A basic patch looks like this:

```
From 92132241233033a123c4fa833449d6a0d550219c Mon Sep 17 00:00:00 2001
From: Bob <bob@example.com>
Date: Tue, 25 May 2009 15:42:16 +0200
Subject: [PATCH 1/2] first change

---
 test.txt |    1 +-
 1 files changed, 1 insertions(+), 1 deletions(-)

diff --git a/test.txt b/test.txt
index 7634da4..270eb95 100644
--- a/test.txt
+++ b/test.txt
@@ -1 +1 @@
-Hallo Bob
+Hallo Alice!
```

As you can see, it is very readable for both the reviewer and the machine.

## Sending and receiving patches

The easiest way you can generate a patch from a commit is to use `git-format-patch`:

```
git format-patch HEAD^
```

This will generate a `.patch` file, that can be embedded into an email and sent to the maintainers. Oftentimes they will then reply to your mail with some inline comments about your code.

To simplify this process further, git has the `send-email` command, which let's you send the patch directly to someone without needing to embed it manually. I won't go into details about this, but there is a [well written guide](https://git-send-email.io/) on how to set it up.

If you have received a patch from someone, you can apply it to your tree with the `am` (apply mail) command:

```
git am < 0001-first-change.patch
```

check your `git log` to see the patch in form of the latest commit.

## Why even bother

You might think that this is just a silly and outdated approach to collaborative development. "Why not simply open a pull request?" you might ask. Some projects, especially low-level oriented ones like the Linux kernel, do not want to rely on third-party platforms like GitHub to host their code, with good reasons:

1. Everyone can participate! You don't need to register an account on some proprietary website to collaborate in a project that uses a patch-based workflow. You don't even have to expose your identity, if you don't want to. All you need is an email-address, and frankly most of us have one.
2. It's plain simple! Once you get used to generating and applying patches on the command line, it is in fact easier and faster than opening a pull request in some clunky GUI. It doesn't get simpler than plain text.
3. It is rewarding! Once you have submitted a patch to a project, there is no better feeling than getting a simple "Applied, thanks!" response from a maintainer. And if it's a response that contains feedback rather than an approval, it feels even better to submit that reworked code again and get it eventually applied.

## Conclusion

The patch-based workflow is an alternative way to collaborate with developers. If it helps you in your day to day business depends on the projects you are contributing to, but in the end it is always good to have many tools under your belt.
