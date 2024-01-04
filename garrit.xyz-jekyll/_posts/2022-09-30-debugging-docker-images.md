---
layout: default
title: Debugging Docker images
date: "2022-09-30"
tags: "note, 100DaysToOffload, guide, programming, docker, tech"
---

Docker builds images incrementally. Every line in a Dockerfile will generate a
new image that builds on top of the last one. This can be really handy if
something is not right in your build.

Since version 18.09 Docker has added a new backend for building images,
[buildkit](https://github.com/moby/buildkit#buildkit). Unfortunately, buildkit
does not let you view the IDs of the intermediate containers it uses under the
hood. To work around that, you can opt out of buildkit by running a build with
buildkit disabled:

```sh
DOCKER_BUILDKIT=0 docker build --pull --rm -t myproject:latest .
```

You should now see the IDs of the intermediate containers:

```sh
Sending build context to Docker daemon  87.84MB
Step 1/16 : FROM node:16.15.1-alpine3.16 AS development
16.15.1-alpine3.16: Pulling from library/node
Digest: sha256:c785e617c8d7015190c0d41af52cc69be8a16e3d9eb7cb21f0bb58bcfca14d6b
Status: Image is up to date for node:16.15.1-alpine3.16
 ---> e548f8c9983f
Step 2/16 : WORKDIR /usr/src/app
 ---> Using cache
 ---> 34e5c9bdb910
Step 3/16 : COPY package*.json ./
 ---> Using cache
 ---> 626e4ae998fc
Step 4/16 : RUN npm install glob rimraf
 ---> Using cache
 ---> 2d036b8354e0
Step 5/16 : RUN npm install
 ---> Using cache
 ---> 948709b4957f      <-- HERE
Step 6/16 : COPY . .
...
```

As mentioned, these IDs are valid docker images, so you can just launch them
and attach a shell like every other image:

```sh
docker run -ti --rm 948709b4957f
```

If you're not seeing a regular shell, but a Node.js REPL for example, this
might be because the `ENTRYPOINT` of that image was set to the binary of that
REPL. To work around that, you can override the entrypoint:

```sh
docker run -ti --rm --entrypoint=/bin/sh 948709b4957f
```

## When is this helpful?

If your build fails at a particular step, you can attach a shell to the **last
working** step, inspect the filesystem, and execute the failing command manually.

That's all!

This is post 039 of [#100DaysToOffload](https://100daystooffload.com/).
