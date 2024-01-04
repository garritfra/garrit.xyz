---
layout: post
title: Fixing Traefik Proxy Issues
date: "2022-03-18"
tags: "note, guide, infrastructure, web, 100DaysToOffload, homelab, tech"
---

After changing my proxy from NGINX to Traefik, I noticed that some of my
services started misbehaving.

In particular, my instance of
[BirdsiteLive](https://github.com/NicolasConstant/BirdsiteLive)
([birdsite.slashdev.space](https://birdsite.slashdev.space)) had issues
forwarding tweets to the
[Fediverse](https://garrit.xyz/posts/2021-01-18-reasons-the-fediverse-is-better).

The only difference between my old NGINX and my Traefik config were the headers.
I didn't think that that's what's causing the issue, but after digging around a
bit I figured out what's wrong. I still can't wrap my head around it entirely,
but it has something to do with forwarding external `https` requests to internal
`http` services, since the `x-forwarded-` headers where missing in the forwarded
requests.

In the world of NGINX, we can instruct the proxy to forward _all_ headers using
this directive:

```conf
proxy_pass_request_headers      on;
```

which takes care of the issue. In Traefik, it's a bit more convoluted. Traefik
can use a combination of "Entrypoints" and middleware to route traffic around.
In my setup, I use a `webSecure` entrypoint listening for SSL/TLS traffic, and a
`web` entrypoint that just redirects to `webSecure`:

```yaml
entryPoints:
  web:
    address: :80
    http:
      redirections:
        entryPoint:
          to: "websecure"
          scheme: "https"

  websecure:
    address: :443
```

Apparently, some services send requests to the `web` entrypoint, and the
`x-forwarded-for` headers are dropped. To prevent this, you can set the
`proxyProtocol` and `forwardedHeaders` in the `web` entrypoint to `insecure`,
like so:

```yaml
entryPoints:
  web:
    address: :80
    proxyProtocol:
      insecure: true
    forwardedHeaders:
      insecure: true
    # ...
# ...
```

I'm sure there's a reason why this is marked as `insecure`, but it behaves just
like the NGINX counterpart, so I didn't bother digging deeper into the matter.
Maybe one day I'll come back to properly fix this.

If you want to read more, check out
[this](https://medium.com/@_jonas/traefik-kubernetes-ingress-and-x-forwarded-headers-82194d319b0e)
article on Medium. It explains the issue in more detail.

---

This is post 025 of [#100DaysToOffload](https://100daystooffload.com/).
