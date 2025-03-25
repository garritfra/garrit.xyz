---
title: "About Container Interfaces"
date: "2025-03-25"
tags: "infrastructure, note, tech"
---

There are a couple of interfaces that container orchestration systems (like [Kubernetes](https://kubernetes.io)) implement to expose certain behavior to their container workloads. I will only be talking about Kubernetes in this post since it's the orchestrator I'm most comfortable with, but some interfaces are also implemented in other orchestrators (like [HashiCorp Nomad](https://www.nomadproject.io/)) too, which makes the interfaces cross-platform.

## Container Storage Interface (CSI)

Storage behavior used to be built into Kubernetes. The [container storage interface (CSI)](https://github.com/container-storage-interface/spec/blob/master/spec.md) defines a unified interface to manage storage volumes, regardless of the orchestrator (as long as they implement the CSI). This makes it way easier for third-party storage providers to expose data to Kubernetes. If a storage provider implements this interface, orchestrators can use it to provision volumes to containers. Notable storage providers are:

* [NFS](https://github.com/kubernetes-csi/csi-driver-nfs)
* [Cinder (Openstack)](https://github.com/kubernetes/cloud-provider-openstack/tree/master/pkg/csi/cinder)
* [Ceph](https://github.com/ceph/ceph-csi)
* [AWS EBS](https://github.com/kubernetes-sigs/aws-ebs-csi-driver)

A full list of CSI drivers can be found [here](https://kubernetes-csi.github.io/docs/drivers.html).

## Container Runtime Interface (CRI)

The [Container Runtime Interface (CRI)](https://github.com/kubernetes/cri-api) is an API that allows Kubernetes to use different container runtimes without needing to recompile the entire Kubernetes codebase. Before CRI, Kubernetes had a direct integration with Docker, making it difficult to use alternative container runtimes.

CRI defines the API between Kubernetes components (specifically kubelet) and container runtimes. This abstraction allows Kubernetes to support multiple container runtimes simultaneously, giving users the flexibility to choose the runtime that best fits their needs. Some popular container runtimes that implement the CRI include:

* [containerd](https://containerd.io/) - The industry-standard container runtime that powers Docker and is maintained by the CNCF
* [CRI-O](https://cri-o.io/) - A lightweight runtime specifically designed for Kubernetes
* [Kata Containers](https://katacontainers.io/) - A secure container runtime that uses hardware virtualization for stronger isolation

With CRI, switching between different runtimes becomes more straightforward, allowing operators to optimize for security, performance, or compatibility based on their specific requirements.

## Container Network Interface (CNI)

The [Container Network Interface (CNI)](https://github.com/containernetworking/cni) defines a standard for configuring network interfaces for Linux containers. Similar to CSI and CRI, the CNI was created to decouple Kubernetes from specific networking implementations, allowing for a pluggable architecture.

CNI plugins are responsible for allocating IP addresses to pods and ensuring proper network connectivity between pods, nodes, and external networks. They implement features like network policies, load balancing, and network security. Some popular CNI plugins include:

* [Calico](https://www.tigera.io/project-calico/) - Known for its performance, flexibility, and strong network policy support
* [Cilium](https://cilium.io/) - Uses eBPF for high-performance networking and security
* [Flannel](https://github.com/flannel-io/flannel) - Simple overlay network focused on ease of use
* [AWS VPC CNI](https://github.com/aws/amazon-vpc-cni-k8s) - Integrates pods directly with Amazon VPC networking

Each CNI plugin has its strengths and is suitable for different use cases. For example, Calico excels at enforcing network policies, Cilium is optimized for performance and observability, while Flannel is valued for its simplicity.

## Wrapping Up

One thing I've always admired about Kubernetes is its pluggable architecture. These standardized interfaces (CSI, CRI, and CNI) showcase how well-designed the system really is. Instead of building everything into the core, the Kubernetes team made the smart decision to create extension points that allow the community to innovate without touching the core codebase.

The great news? You don't *have* to swap out all these components or even understand them deeply to use Kubernetes effectively. While the array of options might seem daunting at first glance, most Kubernetes distributions (like EKS, GKE, AKS, or Rancher) come with sane defaults that work well out of the box. They've already made sensible choices about which storage, runtime, and networking components to include.

This pluggability is what makes Kubernetes so powerful for those who need it. Need a specific storage solution? Plug in a CSI driver. Want a more secure container runtime? Swap in a different CRI implementation. But for everyone else, the defaults will serve you just fine.

The beauty of this approach is that it gives you room to grow. Start with the defaults, and when you have specific requirements, the extension points are there waiting for you. That's the real magic of Kubernetes – it works great out of the box but doesn't limit your options as your needs evolve.
