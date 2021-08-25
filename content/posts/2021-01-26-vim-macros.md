---
title: Using Macros in Vim
date: "2021-01-26"
---

For a long time, macros in Vim were a huge mystery for me. I knew they existed, but I didn't know how or why you'd use them. A recent task of mine involved replacing the unsafe operator (`!!`) in a large kotlin codebase with a null-safe operator (`?`). This game me a good opportunity to learn about macros. This is a snippet I encountered numerous times:

```kt
mLeftButton!!.text = "Left"
mLeftButton!!.setOnClickListener(leftListener)
mLeftButton!!.visibility = View.VISIBLE
mRightButton!!.text = "Right"
mRightButton!!.setOnClickListener(rightListener)
mRightButton!!.visibility = View.VISIBLE
```

You could go ahead and change each line individually, or use the IDEs built in "multi-cursor" tool to save you some work. But, let me show you how I automated this using a Vim-Plugin for Android Studio. Not that the plugin matter, it will work in every Vim-like editor.

A macro in Vim works like this:

1. Record any sequence of keystrokes and assign them to a key
1. Execute that sequence as often as you wish

So let's see how we'd do that.

## Recording a macro

To record a macro in Vim, you press `q` (In normal mode) followed by a key you want to assign the macro to. So, if you wanted to record a macro and save it to the `q` key, you'd press `qq`. Vim will notify you that a macro is being recorded. Now, you can press the keystrokes that define your actions. When you're done, press `q` in normal mode again to quit your macro.

Coming back to my task, I would want to do the following:

1. `qq` Record a macro and save it to the `q` key
1. `_` - Jump to the beginning of the line
1. `f!` - Find next occurrence of `!`
1. `cw` - Change word (Delete word and enter insert mode)
1. `?.` - Insert the new characters
1. `<esc>` - Enter normal mode
1. `j` - go down a line
1. `q` - Finish macro

If everything went right, this line:

```
mLeftButton!!.text = "Left"
```

Should now look like this:

```
mLeftButton?.text = "Left"
```

and your macro should be saved under the `q` key.

## Using the macro

In order to use a macro in vim, you press the `@` key, followed by the key the macro is saved under. Since our macro is defined as `q`, we'd press `@q`, and the macro is executed immediately.

Let's take this further. You might have noticed that I went down a line before closing the macro. This becomes handy when you want to execute it many times. In our case we have 6 lines we want to refactor. 1 line has already been altered, so we have to execute it 5 more times. As per usual with vim, you can execute an action n times by specifying a number before doing the action. Let's press `5@q` to execute the macro 5 times. And voila! Our unsafe code is now null-safe.

```kt
mLeftButton?.text = "Left"
mLeftButton?.setOnClickListener(leftListener)
mLeftButton?.visibility = View.VISIBLE
mRightButton?.text = "Right"
mRightButton?.setOnClickListener(rightListener)
mRightButton?.visibility = View.VISIBLE
```

Macros are really satisfying to watch, if you ask me!

This is post 007 of [#100DaysToOffload](https://100daystooffload.com/).
