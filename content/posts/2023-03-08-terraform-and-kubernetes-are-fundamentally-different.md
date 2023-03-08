---
title: "Terraform and Kubernetes are fundamentally different"
date: "2023-03-08"
tags: "note"
---

On the surface, Infrastructure as Code tools like Terraform or CloudFoundation may seem to behave similar to Kubernetes YAMLs, but they are in fact fundamentally different approaches to cloud infrastructure.

Terraform tries to provide a declarative way to express imperative actions. If you tell Terraform that you need an EC2 instance, it will notice that no such resource exists and instruct the AWS API to create one. If you don't need the instance anymore and remove the resource definition from your code, Terraform will also pick that up and instruct the AWS API to delete the instance. This works well in most cases, but every once in a while the declarative state may get out of sync with the real world, resulting in errors that are hard to debug and resolve.

Kubernetes on the other hand is a fully declarative system. In a [previous post](https://garrit.xyz/posts/2022-09-22-kubernetes-is-a-domain-specific-database) I touched on how Kubernetes constantly compares the *desired* state with the *actual* state of the resources and tries to match the two. Although it is theoretically possible to issue imperative actions, Kubernetes is built from the ground up to be declarative.

