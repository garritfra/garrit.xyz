---
title: "Terraform project learnings"
date: "2023-03-16"
tags: "100DaysToOffload, infrastructure, aws, note, terraform, learnings"
---

I just finished my first ever infrastructure project for a client. My Terraform skills are good enough to be dangerous, but during the development of this project I learned a lot that I would do differently next time.

## Project structure

Having worked with semi-professional Terraform code before, I applied what I knew to my new project. That was mainly that we have a shared base and an overlay directory for each environment. I went with a single Terraform module for the shared infrastructure, and variables for each environment. Naively, roughly every service had their own file.

```
.
├── modules
│   └── infrastructure
│       ├── alb.tf
│       ├── cache.tf
│       ├── database.tf
│       ├── dns.tf
│       ├── ecr.tf
│       ├── ecs.tf
│       ├── iam.tf
│       ├── logs.tf
│       ├── main.tf
│       ├── network.tf
│       ├── secrets.tf
│       ├── security.tf
│       ├── ssl.tf
│       ├── state.tf
│       └── variables.tf
├── production
│   ├── main.tf
│   └── secrets.tf
└── staging
    ├── main.tf
    └── secrets.tf
```

This works very well, but I already started running into issues extending this setup. For my next project, I would probably find individual components and turn them into smaller reusable submodules. If I were to rewrite the project above, I would probably structure it like this (not a complete project, but I think you get the idea):

```tf
.
├── modules
│   └── infrastructure
│       ├── main.tf
│       ├── modules
│       │   ├── database
│       │   │   ├── iam.tf
│       │   │   ├── logs.tf
│       │   │   ├── main.tf
│       │   │   ├── outputs.tf
│       │   │   ├── rds.tf
│       │   │   └── variables.tf
│       │   ├── loadbalancer
│       │   │   ├── alb.tf
│       │   │   ├── logs.tf
│       │   │   ├── main.tf
│       │   │   ├── outputs.tf
│       │   │   └── variables.tf
│       │   ├── network
│       │   │   ├── dns.tf
│       │   │   ├── logs.tf
│       │   │   ├── main.tf
│       │   │   ├── outputs.tf
│       │   │   ├── ssl.tf
│       │   │   ├── variables.tf
│       │   │   └── vpc.tf
│       │   ├── service
│       │   │   ├── ecr.tf
│       │   │   ├── ecs.tf
│       │   │   ├── iam.tf
│       │   │   ├── logs.tf
│       │   │   ├── main.tf
│       │   │   ├── outputs.tf
│       │   │   └── variables.tf
│       │   └── state
│       │       ├── locks.tf
│       │       ├── main.tf
│       │       ├── outputs.tf
│       │       ├── s3.tf
│       │       └── variables.tf
│       ├── main.tf
│       ├── outputs.tf
│       └── variables.tf
├── production
│   ├── main.tf
│   └── secrets.tf
└── staging
    ├── main.tf
    └── secrets.tf
```

## Secrets

I decided to use [git-crypt](https://github.com/AGWA/git-crypt) to manage secrets, but that was only before I learned about [SOPS](https://github.com/mozilla/sops). It's too late to migrate now, but if I could, I would choose SOPS for secrets any day of the week for upcoming projects. It even has a [Terraform provider](https://registry.terraform.io/providers/carlpett/sops/latest/docs), so there's no excuse not to use it. ;)

## Conclusion

Overall I'm pretty happy with how the project turned out, but there are some things that I learned during this project that will pay off later.

---

This is post 057 of [#100DaysToOffload](https://100daystooffload.com/).
