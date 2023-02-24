---
title: "Visual Distractions"
date: "2023-02-24"
tags: "note, guide, life, 100DaysToOffload"
---

Everywhere we look, we're bombarded with flashy symbols trying to grab our attention. This is even the case where we **think** that we're in control of what we're looking at. I made two simple changes that reduce visual distractions in my life.

## Android App Icons

App icons play a serious role in how we interact with our phone. Over the years, there has been a constant battle for the most flashy icon on our home screen. But there's a cure: newer versions of Android [let you choose a color theme for apps that implement it](https://www.lifewire.com/change-color-of-apps-on-android-phones-5213663). It's by far not supported by every app out there, but in my case 90% of the app icons now have the same color. I feel way more comfortable looking at my phone, knowing that less things are trying to grab my attention right when I unlock my phone.

With this change, I found that I am more mindful about what app icon I tap on, since I was used to each icon having a different color. This makes it harder for my muscle memory to develop bad habits.

## RSS-Reader Favicons

If you're using an RSS reader, chances are you're used to seeing a favicon next to the articles. I had the feeling that I was drawn more towards the favicon than the headline of the article, so I started looking for ways to disable favicons all together.

Miniflux provides a way to override the stylesheet of the feed in the settings. Simply append the following code-snippet and the favicons will be history:

```css
.item-title img, .entry-website img {
  display: none;
}
```

Of course every reader is different, so you might want to look into the documentation of your reader of choice.

## Conclusion

These changes might seem insignificant, but I found that they made a huge difference in how I interact with my phone. The suggestions above might not apply to your life, but I'd like to encourage you to keep an eye out for unnecessary visual distraction in your life. Try to avoid it as much as possible.

---

This is post 051 of [#100DaysToOffload](https://100daystooffload.com/).
