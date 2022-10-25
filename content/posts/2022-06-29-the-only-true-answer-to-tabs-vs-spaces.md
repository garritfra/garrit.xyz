---
title: The only true answer to 'tabs vs spaces'
date: "2022-06-29"
tags: "note, guide, 100DaysToOffload, programming, practices"
---

I recently dove into a new project at work. We're starting from a blank page,
so of course this classic question came up:

> "So should we use tabs or spaces for our formatting?"

One of my teammates explained to us why the only logical answer to this is
"Tabs", and you'll soon know why.

## The problem

Most formatters, by default, use either two or four spaces for indentation by
default. The [Prettier](https://prettier.io/) formatter does this, and it
somewhat became the norm for JavaScript projects. This has one huge downside
though: everyone on the team has to agree, or live with this standard.

Nowadays, almost all editors come with the ability to change the preferred
indentation settings, which will be overridden by the settings of the
formatter. I prefer an indentation of 4 spaces, which is reflected in all of my
code. If I'm working on a project that uses an indentation of 2 spaces via
prettier, my preference will be overridden when formatting the code.

## Just use tabs

The solution to this problem is simple: Create a `.editorconfig` file and set
the indentation style to tab, without a width:

```editorconfig
root = true

[*]
end_of_line = lf
charset = utf-8
indent_style = tab
```

Almost all editors will be able to pick this file up and configure some
project-wide settings. If your editor is configured to use a indent width of 4,
this setting will be respected. If you're a maniac that indents their code with
8 spaces, you'll be pleased to see that you can finally use this style in your
code, without forcing anyone else to do as you do.

Even GitHub, GitLab and friends are able to respect this setting, giving
everyone the opportunity to view code in their preferred style.

I hope you now know why using a single tab of indentation makes the most sense if
you're working in a team. Let me know your thoughts!

This is post 035 of [#100DaysToOffload](https://100daystooffload.com/).

