---
title: "Instant dark theme"
date: "2023-04-12"
tags: "100DaysToOffload, guide, note, learnings, web, css, til"
---

Thanks to [Jacksons](https://jacksonchen666.com/) [update to darktheme.club](https://github.com/garritfra/darktheme.club/pull/79), I just came across a neat little [CSS property](https://developer.mozilla.org/en-US/docs/Web/CSS/color-scheme) that turns a mostly CSS-free document into a pleasantly dark site:

```css
:root {
  color-scheme: light dark;
}
```

This will adjust all elements on the page to the color scheme preferred by the user - without any other custom styles! 🤯 It is also [widely supported](https://caniuse.com/mdn-css_properties_color-scheme) by browsers.

I've always been quite dependent on CSS-frameworks for any project I'm starting. Going forward, I'd be interested to see how framework-less sites would feel using this property. If all else fails, there's always the awesome [simple.css](https://simplecss.org/) library, which you can slap on top of a raw document to make it pretty (and dark, if preferred) without using custom classes.

---

This is post 064 of [#100DaysToOffload](https://100daystooffload.com/).
