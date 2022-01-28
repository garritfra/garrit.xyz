---
title: TIL how to get the selected language of a browser
date: "2022-01-28"
tags: "note, til, javascript, web, 100DaysToOffload"
---

Today I learned how to get the selected language of a browser.

It's so simple!

```js
const userLang = navigator.language || navigator.userLanguage;
```

## An interesting discovery

Eventhough I'm using a chromium-based browser, the user-agent and some other
fields of the `navigator` object imply that I'm running Mozilla Netscape 5.0.
This is a relic of the past, where the user agent heavily influenced the look
and feel of a served website. Nowadays, all rendering engines work more or less
equally, but back then, browsers tried to be as good as the market leader, so
they disquised themselves as Netscape. This podcast episode goes into more
detail about how this developed (jump to minute 3 to listen to this topic):

<iframe style="border-radius:12px" src="https://open.spotify.com/embed/episode/71URVFdhF6pcUBRhxerDIV?utm_source=generator&t=190" width="100%" height="232" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"></iframe>

This is post 024 of [#100DaysToOffload](https://100daystooffload.com/).

## Resources

- [Stack Overflow Thread on getting the user language](https://stackoverflow.com/questions/8199760/how-to-get-the-browser-language-using-javascript)
- [Full link to the Podcast episode](https://corecursive.com/internet-is-duct-tape/#)



