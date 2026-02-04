---
title: "A fix for long-pressing movement keys in VSCode with Vim-Mode"
date: "2026-02-04"
tags: "guide, note, editors, tech, programming"
---

## The Setup

* MacOS
* VSCode
* Vim Extension

## The Issue

Long-pressing `j` or `k` (think "down" or "up" in Vim) only results in one down or up action, instead of continuous scrolling.

## The Fix

In a terminal, run the following command:

```
defaults write com.microsoft.VSCode ApplePressAndHoldEnabled -bool false
```

Original post: https://stackoverflow.com/a/44010683

## Additional tip

In the MacOS settings, set "Key Repeat Rate" and "Delay Until Repeat" to the highest setting to be able to scroll much faster.

<img width="478" height="92" alt="Image" src="https://github.com/user-attachments/assets/7bf85853-377d-4727-a5c8-2766f2794e8a" />
