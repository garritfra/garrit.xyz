---
layout: default
title: "What problem does Kubernetes solve?"
date: "2023-02-20"
tags: "note, kubernetes, infrastructure, 100DaysToOffload, tech"
---

This is a common question that many people (including me) ask themselves.

I recently came across a great [post](https://blog.adamchalmers.com/kubernetes-problems/) which explains the problem really well:

> Kubernetes exists to solve one problem: how do I run m containers across n servers?

The post also nails the answer to **how** Kubernetes solves this problem:

> It's a big abstract virtual computer, with its own virtual IP stack, networks, disk, RAM and CPU. It lets you deploy containers as if you were deploying them on one machine that didn't run anything else. Clusters abstract over the various physical machines that run the cluster.

I'd highly encourage you to read through the article if you want to learn more about why Kubernetes exists.

This is post 048 of [#100DaysToOffload](https://100daystooffload.com/).

