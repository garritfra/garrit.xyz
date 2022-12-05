---
title: Docker in plain english
date: "2022-05-02"
tags: "guide, docker, infrastructure, 100DaysToOffload"
---

Recently I saw some fellow Mastodon-users discussing resources and guides to get
into the docker ecosystem. Given that most of my private infrastructure is built
upon docker and docker-compose, I thought I'd share how **I** use this tool. I
will try to assume no prior container-knowledge, but if anything isn't clear to
you, feel free to [contact me](/contact).

## Docker 101

First up: What on earth is Docker, and why should I use it?

Docker is a _container runtime_. It can be used to isolate system resources in a
reproducible manner, meaning if I containerize an application on my machine, I
can be sure that it will function exactly the same on all machines. The benefits
of this are obvious: You more or less eliminate all dependencies to a specific
environment, like the operating system and other software. As long as it's the
same CPU-architecture, this sentence holds true: If it runs docker, it can run
your application.

Things running in a container also can't break out of this "sandbox". A process
in a container is only aware of the resources around it, not on the host
machine. Each container is kind of like an operating system **inside** your
actual operating system.

To describe what a container should look like, we need to write a "recipe" for
it. In it, you describe a starting point from which you want to build upon, and
the necessary steps to achieve the desired state. This "recipe" is called a
`Dockerfile`. A very simple Dockerfile might look like this:

```
FROM ubuntu

RUN apt update && apt upgrade -y

CMD ["echo", "Hello World!"]
```

If you now run `docker build -t hello-world .`, docker will take this recipe and
build an **image** called "hello-world". This image is a template that describes
the state of your application. In our case, we take the definition provided by
the "ubuntu" image and simply do a system update. Whenever you spawn a container
from this image, it will always start from exactly this state. Note that the
commands in the Dockerfile do not run every time you launch a container! An
image is the **result** of running the commands. The final instruction, `CMD`,
is the command to run whenever you spawn a container, but more on that later.

Congrats! You just built your very first docker image. To verify that it's
actually there, try running `docker image ls`. This will list all images on your
system:

```
➜  garrit.xyz git:(master) ✗ docker image ls
REPOSITORY               TAG             IMAGE ID       CREATED          SIZE
hello-world              latest          6e2240011a89   8 minutes ago    109MB
```

An image doesn't really do anything on its own. You need to tell docker to
construct a container out of that image. A container is essentially an
**instance** of that image. Try running this command:

```
docker run hello-world
```

And, as instructed with the `CMD` line, you should see the words "Hello World!"
printed on the screen. You can verify that it's still there by running `docker ps -a`, which will list all containers on your system, including the one you
just ran:

```
CONTAINER ID   IMAGE                    COMMAND                  CREATED          STATUS                      PORTS                                            NAMES
05415bf66a91   hello-world              "bash"                   3 seconds ago    Exited (0) 2 seconds ago
```

"This isn't really helpful!", I hear you yell. You're right, so let's look at a
real world example.

## Example: A simple Node.js application

A real world use case for a docker container is run your home-built application.
Say we have a basic Node.js app that we wanted to containerize:

```
.
├── app.js
├── package-lock.json
└── package.json
```

And your main setup-workflow for this application looks something like this:

```
npm install
npm start
```

Remember that a Dockerfile is a **recipe** of how an application is built. A
corresponding recipe could look like this:

```Dockerfile
# Declare base image
FROM node:16

# Copy the application into the container
COPY . .

# Install dependencies
RUN npm install

# Launch the application
CMD ["npm", "start"]
```

Like above, you can build this Dockerfile using `docker build -t testapp .`, or
any name you'd like to use.

> **Quick Tip**: You might also want to add a `.Dockerignore` file, which lists
> files and directories which should not be copied inside the container, just like
> a `.gitignore` file. I usually add `node_modules` since it will be recreated
> when building the image, and some files that are not relevant at runtime, like a
> README.

Running `docker image ls` should now show the image you just created:

```
REPOSITORY               TAG             IMAGE ID       CREATED             SIZE
testapp                  latest          463e68d86eee   5 minutes ago       857MB
```

You can now "run" the image, which will result in a spawned container. Since
Containers run in their own environment, they won't be able to receive any
keystrokes by default, so you can't stop the application. To fix this, you can
use the `-it` flags, which will establish an interactive session to the process
inside the container. This makes it easier to stop the container after it is
created:

```
docker run -it testapp
```

And voila! You should see the output of your application in the terminal. If
you've done some Node.js, this output might be familiar:

```
➜  testapp git:(master) ✗ docker run -ti testapp

> testapp@1.0.0 start
> node app.js

Example app listening at http://:::8080
```

You'll soon discover that you can't access port 8080 on your machine. Docker has
a powerful networking engine, and each container has its own IP. You _could_
figure out the IP of your container and access it like that. A simpler approach
though is to just bind a port of your host machine to the container. For
example, let's bind our port 4000 to port 8081 of the container. This can be
done using the `-p` flag of the cli:

```
docker run -p 4000:8081 -it testapp
```

> **Quick Tip**: To remember the order of the container- and the host-port, I
> always think of the container as laying on my desk. First, I grab the cable (the
> host machine) and then plug it into the container. Weird analogy, I know. But it
> really helped me make sense of this!

If you now access `http://localhost:4000` on your host machine, you should see
your application!

## Docker Compose 101

Now that we've looked at the basics of Docker, let's talk about Docker Compose.
Docker Compose is a tool that allows you to define and manage multi-container
applications. This means you can use a single docker-compose.yml file to define
the services and dependencies of your application, and then use Docker Compose
to start and stop all of the containers at once.

Using Docker Compose can save you a lot of time and hassle, especially if you
have a complex application with multiple components that need to work together.
With Docker Compose, you can specify the dependencies between your containers,
as well as the ports, volumes, and other settings that they need to run
properly. This makes it much easier to manage and maintain your application, and
allows you to make changes to your environment quickly and easily.

Here is an example docker-compose.yml file for a simple Node.js application:

```yaml
version: '3'
services:
  app:
    build: .
    ports:
      - 3000:3000
    volumes:
      - .:/usr/src/app
    command: npm start
```

In this file, we define a single service called "app" that uses the Dockerfile
in the current directory to build an image. We then map port 3000 on the host
machine to port 3000 on the container, mount the current directory as a volume,
and specify the command to run when the container is started.

To start the containers defined in this docker-compose.yml file, you can run the following command:

```
docker-compose up
```

This will build the images, create the containers, and start all of the
services. You can then access your application at http://localhost:3000.

To stop the containers and remove them, you can run the following command:

```
docker-compose down
```

This will stop and remove the containers, as well as the networks and volumes
that we've created.

## How I deploy my services

- Walkthrough of a simple deployment (miniflux?)
- Traefik
- Local volumes
- Permissions

## Conclusion

- Image size optimizations

This is post 030 of [#100DaysToOffload](https://100daystooffload.com/).
