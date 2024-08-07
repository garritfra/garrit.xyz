---
title: "Serverless Framework Retrospective"
date: "2023-04-28"
tags: "100DaysToOffload, infrastructure, aws, note, terraform, learnings, devops, serverless, tech"
---

A current project requires the infrastructure to be highly scalable. It's expected that > 50k Users hit the platform within a five minute period. Regular ECS containers take about one minute to scale up. That just won't cut it. I decided to go all in on the [serverless](https://www.serverless.com/) framework on AWS. Here's how it went.

### Setup

Setting up a serverless application was a breeze. You create a config file and use their CLI to deploy the app.

### The rest of the infrastructure

I decided to define the rest of the infrastructure (VPC, DB, cache, ...) in Terraform. But, since I wasn't familiar with how the Serverless Framework worked, I struggled to draw the line between what serverless should handle vs. what the rest of the infrastructure (Terraform) should provide. In a more traditional deployment workflow, you might let the CI deploy a container image to ECR and point the ECS service to that new image.

I chose to let Serverless deploy the entire app through CI and build the rest of the infrastructure around it. The problem with this approach is that we lose fine-grained control over what's deployed where, which leads to a lot of permission errors.

In retrospect, I should've probably chosen the location of the S3 archive as the deployment target for the CI, and then point the lambda function to the location of the new artifact. This defeats the purpose of the framework, but it gives you a lot more control over your infrastructure. Once the next project comes along, I'll probably go that route instead.

### Permissions

Serverless suggests to use admin permissions for deployments, and I see where they're coming from. Managing permissions in this framework is an absolute mess. Here's what the average deployment workflow looks like, if you want to use fine grained permissions:

1. Wait for CloudFormation to roll back changes (~2 minutes)
2. Update IAM role
3. Deploy Serverless App
4. If there's an error, go to 1

Thankfully, some people have already gone through the process of figuring this out. [Here's](https://serverlessfirst.com/create-iam-deployer-roles-serverless-app/#determining-deploy-time-permissions) a great guide with a starting point of the needed permissions.

### Conclusion

Using the serverless framework is a solid choice if you just want to throw an app out there. Unfortunately the app I was deploying isn't "just" a dynamic website. The next time I'm building a serverless application it's probably not going to be with the Serverless Framework, though I learned a lot about serverless applications in general.

---

This is post 067 of [#100DaysToOffload](https://100daystooffload.com/).




