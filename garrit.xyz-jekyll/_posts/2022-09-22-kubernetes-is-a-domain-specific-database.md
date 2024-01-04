---
layout: default
title: Kubernetes is a domain specific database
date: "2022-09-22"
tags: "note, 100DaysToOffload, infrastructure, kubernetes, tech"
---

I just finished listening to [an
episode](https://kubernetespodcast.com/episode/129-linkerd/) of the Kubernetes
podcast. In it, [Thomas Rampelberg](https://saunter.org/) makes an analogy that
I think is worth sharing:

> "[...] Kubernetes is really a domain-specific database. And you need to look at it
> that way. The YAML is literally writing a select statement or an insert
> statement for a database. That's what the YAML is. And it's awesome that it is
> already configured for how it is. And it's awesome that it's got a schema. But
> the YAML is you writing an insert statement into Kubernetes. [...]"

The Kubernetes API abstracts two types of states: desired state and actual
state. Whenever you apply a manifest, you update the _desired state_ of the
cluster, just like you do in a regular, non domain-specific database like
PostgreSQL or Redis. Kubernetes then frequently compares the desired state with
the _actual_ state of the cluster. If they don't match, Kubernetes will do
whatever it does to match these two states. Usually, this data is persisted
using a key-value database like [etcd](https://etcd.io/) running in a cluster,
though one could theoretically also hook up an external MySQL or Postgres
database for this purpose.

I found this great diagram by [Tim
Downey](https://downey.io/blog/desired-state-vs-actual-state-in-kubernetes/),
showing an oversimplified analogy of this pattern:

![Thermostat
Example](/assets/posts/2022-09-22-kubernetes-is-a-domain-specific-database/desired-state-hvac-diagram.png)

You _insert_ your desired state into the system, and the system adjusts the
actual state to match the desired state. In the case of thermostats the state is
a temperature. In Kubernetes, it's [resource
objects](https://kubernetes.io/docs/concepts/overview/working-with-objects/kubernetes-objects/)

This is post 037 of [#100DaysToOffload](https://100daystooffload.com/).
