---
layout: default
title: "Debugging ECS Tasks"
date: "2023-03-10"
tags: "100DaysToOffload, infrastructure, aws, guide, note, terraform, tech"
---

I just had to debug an application on AWS ECS. The whole procedure is documented in more detail in the [documentation](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-exec.html), but I think it's beneficial (both for my future self and hopefully to someone out there) to write down the proccess in my own words.

First of all, you need access to the cluster via the [CLI](https://aws.amazon.com/de/cli/). In addition to the CLI, you need the [AWS Session Manager plugin for the CLI](https://docs.aws.amazon.com/systems-manager/latest/userguide/session-manager-working-with-install-plugin.html). If you're on MacOS, you can install that via [Homebrew](https://formulae.brew.sh/cask/session-manager-plugin):

```
brew install --cask session-manager-plugin
```

Next, you need to allow the task you want to debug to be able to execute commands. Since I'm using Terraform, this was just a matter of adding the [`enable_execute_command`](https://registry.terraform.io/providers/hashicorp/aws/latest/docs/resources/ecs_service#enable_execute_command) attribute to the service:

```tf
resource "aws_ecs_service" "my_service" {
  name            = "my-service"
  cluster         = aws_ecs_cluster.my_cluster.id
  task_definition = aws_ecs_task_definition.my_task_definition.id
  desired_count   = var.app_count
  launch_type     = "FARGATE"
  enable_execute_command = true # TODO: Disable after debugging
}
```

You may also need specify an execution role in the task definition:

```tf
resource "aws_ecs_task_definition" "my_task_definition" {
  family              = "my-task"
  task_role_arn       = aws_iam_role.ecs_task_execution_role.arn
  execution_role_arn  = aws_iam_role.ecs_task_execution_role.arn  # <-- Add this
}
```

Make sure that this role has the correct access rights. There's a nice [troubleshooting guide](https://aws.amazon.com/de/premiumsupport/knowledge-center/ecs-error-execute-command/) going over the required permissions.

If you had to do some modifications, make sure to roll out a new deployment with the fresh settings:

```
aws ecs update-service --cluster my-cluster --service my-service --force-new-deployment
```

Now, you should be able to issue commands against any running container!

```
aws ecs execute-command --cluster westfalen --task <task-id-or-arn> --container my-container --interactive --command="/bin/sh"
```

I hope this helps!

---

This is post 055 of [#100DaysToOffload](https://100daystooffload.com/).
