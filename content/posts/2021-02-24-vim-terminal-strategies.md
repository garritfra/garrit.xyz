---
title: Strategies to use a terminal alongside (Neo)Vim
date: "2021-02-23"
---

One thing that bothered me about vim for a long time, was the lack of a terminal
directly in your editor. If I'm not using Vim, I'm most definetely using VSCode
and its built-in Terminal. After searching the webs for possible solutions, I
came across a couple of strategies to achive this.

## Executing single commands

If you just want to issue a single command without spawning an entire shell,
you can just use the `:!` command:

```
:! printf "Hello Sailor"
```

## Vims builtin terminal

I couldn't believe my eyes when I read this, but Vim ships with a builtin
terminal! Executing `:term` will spawn it in your current buffer. How you 
integrate it in your workflow is up to you. You could use tabs or open a 
horizontal buffer and spawn it there. I must say that it is rather clunky to
use, since its literally a Vim buffer that forwards stdin and stdout to the
buffer, but it's there for you to use.

## Vim x Tmux

Another great alternative is to set up Tmux with two windows, one for Vim and 
one for your terminal, and switch between them. This works great on a minimal
system, but on MacOS for example, it is easier to simply use cmd+1 and cmd+2 to
switch between two tabs of the Terminal application.

## Pausing and resuming Vim

This one is my personal favorite. The idea comes from
[this](https://stackoverflow.com/a/1258318/9046809) stackoverflow answer.

The plan is to pause the Vim process and resume it later. To pause Vim, you 
press `<ctrl>-z`. This sends the process in the background. Then, to resume the
process, simply issue the `fg` command and Vims process resumes in the 
foreground.

## Conclusion

I'm sure there are many more strategies that could be added to this list. I'd be
interested to hear how your setup works! If you liked these techniques, you 
might be interested in 
[@lopeztel](https://fosstodon.org/web/accounts/211905)s 
[cheat sheet](https://lopeztel.xyz/2021/02/21/my-neovim-cheatsheet/) for Vim.




This is post 014 of [#100DaysToOffload](https://100daystooffload.com/).
