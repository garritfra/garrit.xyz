---
title: "Principles of DevOps: Flow"
date: "2023-07-12"
tags: "100DaysToOffload, note, practices, devops, PrinciplesOfDevOps"
---

> This post is part of a series called [Principles of DevOps](/posts?tags=PrinciplesOfDevOps).

"Flow" refers to the performance of a system, as opposed to the performance of a specific silo or department.

In our daily work, we often only see what's inside our own silo. As a developer, we see requirements come in and code going out. In operations, we see code being pushed to a repository and pipelines deploying it to production. However, it's crucial to understand the flow of work in a broader context.

Most services or products have a "value stream" which describes how work is performed. You can think of the value stream as a carrier belt with multiple work centers. The first work center might be the business department, followed by a design team, a dev team, QA, operations and finally the customer. This structure might look different, depending on what product or service you are building.

## The flow of work should always go in one direction

Work is typically generated at some point of the value stream. A requirement by the business department, an issue created by the QA team, an incident in operations, feedback from a customer, and so on.

Regardless of where the work originates, the flow of work should always go in one direction: forward. Work moving backwards, or even standing still, introduces bottlenecks that prevent downstream work centers from properly working. Always seek to resolve these bottlenecks as soon as possible.

## Always seek to increase flow

The goal of almost any product or service is to bring value to the customer. More work flowing through the system means more value generated. But how do we increase the flow of work?

**Eliminate work in progress**. This almost always indicates a bottleneck in one of the workcenters. Work should always flow smoothly through the system. If a ticket is stuck in one department for too long, ask why and how this can be avoided in the future.

**Match the pace of the customer**. If the value stream is pumping out more features than the customer demands, you are not generating value to the business.

**Reduce work batch size**. By [iterating in small steps](https://garrit.xyz/posts/2023-05-19-work-batch-sizing), you can adapt to changes more quickly. Split up requirements into smaller tickets and increase the amount of deployments.

If you want to learn more about how to increase flow in a system, see [theory of constraints](https://en.wikipedia.org/wiki/Theory_of_constraints) and the [Toyota production system](https://hbswk.hbs.edu/item/decoding-the-dna-of-the-toyota-production-system).

## Never unconsciously pass known defects downstream

Aim to fix problems immedietely as they occur, especially if it's higher up in the value stream. Everyone should be responsible for the work of the entire value stream instead of just their work center.

If you notice work or problems being introduced multiple times, it's likely the upstream work center is unaware of this. Immediately seek awareness and work together on resolving it.

## Never allow local optimization to create global degradation

Optimizing local work is important, but it should never introduce friction in other workcenters and, by extension, decrease performance of the value stream.

Local optimization is often linked to the "tribal warfare" between organizations (e.g. development vs. operations, business vs. development, etc.).

## Conclusion

Understanding and optimizing the flow of work within a value stream is crucial for achieving efficient and effective software delivery. By ensuring that work moves in one direction and continuously seeking to increase the flow, we can generate more value for customers and the business.

Eliminating bottlenecks, matching the pace of the customer, and reducing work batch size are all key strategies to enhance flow. Moreover, actively addressing known defects, promoting collaboration across the value stream, and avoiding local optimizations that hinder overall performance are essential for achieving successful outcomes. By embracing these principles, we can unlock the full potential of DevOps and drive continuous improvement in software delivery processes.

## Resources

* [The Three Ways: The Principles Underpinning DevOps](https://itrevolution.com/articles/the-three-ways-principles-underpinning-devops/)
* [Elements Of The First Way: And The DevOps Implications](https://itrevolution.com/articles/elements-of-the-first-way-and-the-devops-implications/)
* [Theory Of Constraints](https://en.wikipedia.org/wiki/Theory_of_constraints)
* [Lean IT](https://en.wikipedia.org/wiki/Lean_IT)

---

This is post 073 of [#100DaysToOffload](https://100daystooffload.com/).

