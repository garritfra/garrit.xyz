---
title: "Optimizing work batch size"
date: "2023-05-19"
tags: "100DaysToOffload, note, practices, learnings, life, devops"
---

I've been playing 
[Carcassonne](https://en.m.wikipedia.org/wiki/Carcassonne_(board_game)) a lot with my girlfriend recently. It's a boardgame about building cities, roads and farms, and each completed "project" earns you some amount of points. The twist is that there's only a limited number of tiles, and once all tiles are used, the game is over unfinished projects are discarded.

The first couple of playthroughs I tried to maximize my score by increasing the number of projects I actively had going. I'd start a new city or road whenever I could, thinking that the multipliers you sometimes get would pay off in the end. Boy was I wrong.

Where I'm from, we have multiple sayings for this approach. "Having too many irons in the fire" or "dancing on too many parties". I was too busy starting new projects instead of making actual progress.

A far better approach is to finish projects early, earning less points, but with a greater certainty that they will pay off. With every project you start, the likelyhood of the other projects paying off decreases.

Keeping batch sizes small was a key concept of the [lean manufacturing movement](https://en.m.wikipedia.org/wiki/Lean_manufacturing) in the 1980s, and has since been adopted by the [DevOps movement](https://de.m.wikipedia.org/wiki/DevOps) for the IT industry. If you want to learn more about this topic, you should check out [The DevOps Handbook](https://itrevolution.com/product/the-devops-handbook-second-edition/). It goes well beyond the basics of making IT processes more productive and efficient.

After realizing that small batch sizes are the key to success, I haven't lost a game of Carcassonne since. I hope you're not reading this, honey.🤭

---

This is post 068 of [#100DaysToOffload](https://100daystooffload.com/).
