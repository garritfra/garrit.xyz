---
title: "Designing resilient cloud infrastructure"
date: "2023-03-30"
tags: "100DaysToOffload, infrastructure, aws, guide, note, learnings, tech"
---

As mentioned in a [previous post](/posts/2023-03-16-terraform-project-learnings), I'm currently finishing up building my first cloud infrastructure on AWS for a client at work. During the development, I learned a lot about designing components to be resilient and scalable. Here are some key takeaways.

One of the most critical components of a resilient infrastructure is redundancy. On AWS, you place your components inside a "region". This could be `eu-central-1` (Frankfurt) or `us-east-1` (North Virgina), etc. To further reduce the risk of an outage, each region is divided into multiple [Availability Zones](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.RegionsAndAvailabilityZones.html) (AZs). The AZs of a region are usually located some distance apart from each other. In case of a flood, a fire or a bomb detonating near one AZ, the other AZs should in most cases still be intact. You should have at least two, preferably three replicas of each component across multiple availability zones in a region. By having replicas of your components in different availability zones, you reduce the risk of downtime caused by an outage in a single availability zone.

Another way to ensure scalability and resilience for your database is to use [Aurora Serverless v2](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v2.html). This database service is specifically designed for scalable, on-demand, and cost-effective performance. The database scales itself up or down based on the workload, which allows you to automatically and dynamically adjust the database capacity to meet the demand of your application, ensuring that your application is responsive and performs well without the need for manual intervention. Adding Serverless instances to an existing RDS cluster is also a seemless proccess.

In addition to switching to Aurora Serverless v2, using read replicas for cache and database in a separate availability zone can act as a hot standby without extra configuration. Keep in mind that read replicas are only utilized by explicitly using the read-only endpoint of a cluster. But even if you're only using the "main" cluster endpoint (and therefore just the primary instance), a read replica can promote itself to the primary instance in case of a fail over, which drastically reduces downtime.

When using Amazon Elastic Container Service (ECS), use Fargate as opposed to EC2 instances. Fargate is a serverless compute engine for containers that allows you to run containers without having to manage the underlying infrastructure. It smartly locates instances across availability zones, ensuring that your application is always available.

In conclusion, you should always ensure that there are more than one instance of a component in your infrastructure. There are also services on AWS that abstract away the physical infrastructure (Fargate, S3, Lambda) and use a multi-AZ pattern by default.

---

This is post 061 of [#100DaysToOffload](https://100daystooffload.com/).

