---
title: Docker healthchecks using healthchecks.io
date: "2021-05-15"
---

I'm currently in the midst of improving the monitoring of my infrastructure. I
make heavy use of docker and docker-compose for my hosting, so it's vital to add
monitoring for most of the containers.

I'm hosting my own instance of [healthchecks.io](https://healthchecks.io/).
Their solution to monitoring involves **you** having to ping **them**, instead
of the other way around. This let's you add healthchecks to virtually anything
that can ping a http-endpoint.

docker-compose let's you define healthchecks to your config that, when
completing sucessfully, mark the container as "healthy". The process of adding
such a healthcheck is simple. First, create a new check in your healthchecks.io
account and set the ping interval to 1 minute, or a value you prefer. Then, add
this snippet to your docker-compose file:

```yaml
app:
    image: nextcloud
    ports:
        - 127.0.0.1:8080:80
    healthcheck:
        test:
            [
                "CMD",
                "curl",
                "-f",
                "https://app-endpoint.tld",
                "&&",
                "curl",
                "-fsS",
                "-m",
                "10",
                "--retry",
                "5",
                "-o",
                "/dev/null",
                "https://healthchecks.io/ping/<UUID>",
            ]
        interval: 60s
        timeout: 10s
        retries: 6
```

Change the first url to the url of your app. The second URL is the endpoint of
your healthchecks.io instance. You can obtain it from the check you configured
earlier.

This configuration will try to ping your application and, if successful, notify
the healthcheck that the application is healthy. If the app is not reachable or
the container is down, the latter request will not be executed and your service
is marked as "down".

In addition to the healthchecks of my docker containers, I also added basic
healthchecks to my servers cronfiles and its backup-commands.

Do you have any suggestions regarding this topic? Feel free to reach out to me
via Matrix or email!

This is post 017 of [#100DaysToOffload](https://100daystooffload.com/).
