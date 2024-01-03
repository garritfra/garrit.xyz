---
title: "Dockerignore troubles"
date: "2023-02-22"
tags: "note, docker, web, 100DaysToOffload, tech"
---

I commonly used to create a `.Dockerignore` file next to my `Dockerfile`. After countless hours of ignoring the problems in my setup, I found out that the uppercase `.Dockerignore` doesn't get picked up by Docker on MacOS. Only the lowercase `.dockerignore` is valid.

I didn't find official documentation on this, but I think it's because both MacOS and Linux are case-sensitive, while Windows isn't. I don't remember why I got used to the `.Dockerignore` convention, but I swear I saw someone using it in the wild. Or it's my (un)logical reasoning that, because `Dockerfile` is uppercased, `.Dockerignore` should be uppercased as well.

Either way, stay away from `.Dockerfile`s and stick to `.dockerfile`s.

This is post 050 of [#100DaysToOffload](https://100daystooffload.com/).
