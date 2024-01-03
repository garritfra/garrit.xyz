---
title: "TIL about CSS Insets"
date: "2023-02-19"
tags: "web, note, til, quick-tip, css, 100DaysToOffload, tech"
---

Just a quick tip that I thought is worth sharing. Instead of declaring:

```css
.foo { 
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
```

you can just use:

```css
.foo {
  inset: 0;
}
```

It's supported everywhere computers are sold!

MDN: https://developer.mozilla.org/en-US/docs/Web/CSS/inset

Source: https://front-end.social/@estelle/109878532782943511

This is post 047 of [#100DaysToOffload](https://100daystooffload.com/).
