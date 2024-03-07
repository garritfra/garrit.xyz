---
title: "The number one missing feature for GitHub"
date: "2024-03-07"
tags: "note, opinion, github, git, tech, rant"
---

There's one thing that has been bothering me about GitHub for years: **There's no way to update/rebase a PR with the commits of the base branch**.

Why, just **WHY** does GitHub not implement this? GitLab has a feature to rebase the branch using a slash command in the comments, which is really handy:

<img width="571" alt="grafik" src="https://github.com/garritfra/garrit.xyz/assets/32395585/2b6bc166-50f2-4be9-9f97-ed9fe5314730">

As far as I can tell, GitHub does not have such a feature. You want to update a PR when you're out and about? Well, you're out of luck. You need a local copy of the code and trigger a rebase from there!

This really bothered me during my recent vacation. A bunch of PRs for the [512 KB Club](https://github.com/kevquirk/512kb.club) came in with broken CI checks. In those circumstances I usually add new commits to the PR by rebasing the branch onto the base branch, which triggers new CI runs. But since I didn't bring my laptop, there was no way to do that. Only once I got home three weeks later, I was able to merge those PRs. If you're an author of one of those PRs, you now know why it took me so long to merge it.

Please, GitHub. It shouldn't be so hard!

