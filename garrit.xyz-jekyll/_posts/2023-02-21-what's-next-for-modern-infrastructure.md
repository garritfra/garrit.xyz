---
layout: post
title: "What's next for modern infrastructure?"
date: "2023-02-21"
tags: "note, infrastructure, kubernetes, 100DaysToOffload, tech"
---

Modern infrastructure is incredibly complex. I identified 4 main "levels" of infrastructure abstraction:

## Level 1: A website on a server

This is the most straight forward way to host a website. A webserver hosted on bare metal or a VM.

## Level 2: Multiple servers behind a load balancer

At this stage, you start treating servers as cattle rather than pets. Servers may be spun up and down at will without influencing the availability of the application.

## Level 3: An orchestrated cluster of servers

Instead of a server serving a specific purpose (e.g. webserver, DB server, etc.), a server becomes a worker for arbitrary workloads (see Kubernetes, ECS).

## Level 4: Multicluster service mesh

If an organization manages multiple clusters (e.g. multiple application teams), they can be tied together into a [service mesh](https://istio.io/latest/docs/reference/glossary/#service-mesh) to better optimize communication and observability.

## Level 5: ???

History shows that we never stop abstracting. Multicluster service meshes are about the most abstract concept many people (including myself) can comprehend, but I doubt that this is the end of this journey. So, what's next for modern infrastructure?

This is post 049 of [#100DaysToOffload](https://100daystooffload.com/).
