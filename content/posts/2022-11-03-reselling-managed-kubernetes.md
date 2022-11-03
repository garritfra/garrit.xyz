---
title: Reselling Kubernetes
date: "2022-11-03"
tags: "note, 100DaysToOffload, kubernetes, infrastructure"
---

I'm currently working on a side project involving reselling Kubernetes clusters.
What I discovered is that it's impossible to resell *managed* Kubernetes, as in
[EKS](https://aws.amazon.com/de/eks/) and
[GKE](https://cloud.google.com/kubernetes-engine/).

The only possible scenario where reselling Kubernetes to your and the
end-customers advantage is to manage the nodes yourself. The reason is the
scaling of cost per CPU.

When renting VMs, the price per CPU often varies for the size of the machine. 
This leaves the reseller flexibility in the choice of resources. To give you an
example, here is the pricing for virtual machines at
[Hetzner](https://www.hetzner.com/), and the price per CPU:

| Product         | Number of vCPUs    | Price (in €/month) | Price per vCPU (in €/month) |
|-----------------|--------------------|--------------------|-----------------------------|
| CX11            | 1                  | 4.51               | 4.51                        |
| CPX11           | 2                  | 5.18               | 2.59                        |
| CPX21           | 3                  | 8.98               | 2.99                        |
| CPX31           | 4                  | 16.18              | 4.05                        |
| CPX41           | 8                  | 29.99              | 3.75                        |
| CPX51           | 16                 | 65.33              | 4.08                        |

When comparing this to a managed Kubernetes product like
[CIVO](https://www.civo.com), we see that the price per CPU stays constant:

| Product         | Number of vCPUs    | Price (in €/month) | Price per vCPU (in €/month) |
|-----------------|--------------------|--------------------|-----------------------------|
| Extra Small     | 1                  | 5                  | 5                           |
| Small           | 2                  | 10                 | 5                           |
| Medium          | 4                  | 20                 | 5                           |
| Large           | 8                  | 40                 | 5                           |

This pricing model is nice and predictable for the customer, but it makes it
impossible to justify a resell product. If CIVO charges 5€/month per vCPU, we
would need to charge extra to be profitable, which in turn overcuts the
competition.

When choosing Hetzner (or any other platform offering VMs), we are still able to
undercut the competition and even optimize how the resources are laid out on
the nodes. The obvious downside of course being that we have to manage the
clusters ourselves.

## Share your thoughts

Reselling Kubernetes is tricky. I'm currently sketching out ideas for an
alternative way to sell Kubernetes hosting at an ultra cheap price. The project
is still in its infancy but if you're interested, you're more than welcome to
share your thoughts in our [Matrix
Room](https://matrix.to/#/!cTXkqtlnbHScIxnlqO:matrix.org?via=matrix.org&via=envs.net)!

This is post 041 of [#100DaysToOffload](https://100daystooffload.com/).