---
title: "Fullscreen Terminals in VSCode"
date: "2023-03-23"
tags: "100DaysToOffload, guide, note, editors, tech"
---

I often find myself using a "real" terminal alongside my VSCode setup, because for some tasks the built-in terminal, due to its small size, is quite flimsy to use. *But*! I just found out there's a a way to switch the terminal into fullscreen mode, using the "View: Toggle Maximized Panel" command.

You can bind it to a shortcut, which makes switching between editor and terminal a breeze! Simply add this to your `keybindings.json` (also accessible via the [command palette](https://code.visualstudio.com/docs/getstarted/userinterface#_command-palette)):

```
    {
        "key": "cmd+alt+m",
        "command": "workbench.action.toggleMaximizedPanel"
    }
```

### References

- [Original StackOverflow answer](https://stackoverflow.com/a/48512128/9046809)

---

This is post 059 of [#100DaysToOffload](https://100daystooffload.com/).

