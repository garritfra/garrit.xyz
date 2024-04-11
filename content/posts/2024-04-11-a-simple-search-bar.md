---
title: "A simple search bar"
date: "2024-04-11"
tags: "guide, note, meta, web, tech, programming"
---

I just added a simple search bar to my ["More ..."](/links) page. It just redirects to a [DuckDuckGo](https://duckduckgo.com) search with your search term and limits it to my site. Simple, yet effective!

Here's the snippet, feel free to steal it for your own site:

```jsx
<form className="search" method="get" action="https://duckduckgo.com/" target="_blank">
    <input id="search" type="search" name="q" placeholder="Search via DDG" />
    <input type="hidden" name="sites" value="garrit.xyz" />
    <input type="submit" value="Search" />
</form>
```

## Try it out

Try searching for anything!

<form className="search" method="get" action="https://duckduckgo.com/" target="_blank">
    <input id="search" type="search" name="q" placeholder="Search via DDG" />
    <input type="hidden" name="sites" value="garrit.xyz" />
    <input type="submit" value="Search" />
</form>
