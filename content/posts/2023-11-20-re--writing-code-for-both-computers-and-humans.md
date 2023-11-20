---
title: "re: Writing code for both computers and humans"
date: "2023-11-20"
tags: "100DaysToOffload, note, practices, opinion, web, javascript, tech, reply"
---

> This is a reply to Tony Mottaz' [blog post](https://www.tonymottaz.com/code-for-computers-and-humans/) about code that's easy to understand for humans.

The understandability of a piece of code can be measured by how much time one needs to grasp its behavior.

Tony argues that the verbose version of the code (`isNaN(defaultValue) ? NaN : defaultValue;`) is better than the optimized version (`defaultValue;`) because it proves that the author has thought of the possible sideeffect.

However, I personally think this is in fact bad code. Although the code is **trying** to make obvious what it's doing, Tony had to pause and think about why it's written this way. This probably interrupted their flow of work, which is highly undesired. A short comment should have the same effect while keeping the reader in their flow. This is a perfect example for the "[comment the why, now the how](https://www.jackfranklin.co.uk/blog/code-comments-why-not-how/)" mantra.

I really enjoyed Tony's post. It does a great job emphasizing that we should be curious about the code we read and write.

---

This is post 086 of [#100DaysToOffload](https://100daystooffload.com/).
