---
layout: default
title: "Single Page Applications on GitHub Pages"
date: "2023-06-01"
tags: "100DaysToOffload, guide, note, web, javascript, github, tech"
---

My latest project, [sendpasswords.net](https://sendpasswords.net/) is a [Single Page Application](https://developer.mozilla.org/en-US/docs/Glossary/SPA) deployed on GitHub Pages.

GitHub Pages is configured in a way to host static HTML files without any bells and whistles. This means that if you try to fetch a document that's *not* the index, for example `/foo`, the server will try to load the file with that name. 

By nature, SPAs only consist of a single HTML entry point (`index.html` in most cases). It's responsible for routing the user to the correct page if there are multiple paths. And here's the crux: if the user tries to load `/foo`, he will not land at the SPA entry point. Instead, he will see a `404` error.

## The solution

A `404` response will automatically return a file called `404.html`, which we can use to our advantage. After building the application, simply copy the `index.html` to `404.html`, as demonstrated by [this commit](https://github.com/garritfra/sendpasswords.net/commit/66bdb68c229a3ac3386f7816a746155e658eb586). This will use `index.html` to serve the application on the root level, and `404.html` to load *the same app* if the page doesn't exist as a file. Whether the `index.html` is needed if there's already a `404.html` is up to you. I left it in to make clear that this is just a workaround.

This is a [well known](https://stackoverflow.com/a/69308662/9046809) workaround, but I wanted to bring some extra awareness to it, since it's a problem I ran into a couple of times so far. Happy SPAing!

---

This is post 069 (nice) of [#100DaysToOffload](https://100daystooffload.com/).
