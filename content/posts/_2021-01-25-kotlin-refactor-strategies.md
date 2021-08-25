---
title: Fixing nullability issues when migrating to Kotlin
date: "2021-01-23"
---

The last couple of days, I had the opportunity to refactor some of the Kotlin code in our massive android project. The app is quite old, and a lot of legacy code has accumulated over the years. At one point, we decided to migrate a lot of our view-logic from Java to Kotlin. Instead of cleaning the code up, this lead to an even bigger buildup of technical debt. The problem was that we mainly used the migration-tools that Android Studio provides, which, at that time where not very sophisticated. Sometimes we had to manually fix some things which, since it is such a massive codebase, we didn't really take the time to clean every converted file up.

Once the number of warnings approached infinity, we finally decided to dedicate a chunk of each sprint to house-cleaning in our codebase. My recent refactoring involved cleaning up unsafe usages, and I want to share some of my approaches to this kind of refactoring.

## Obvious fixes

I encountered this kind of pattern a number of times during my refactoring:

```kt
textView!!.setOnClickListener { showDialog() }
```

If you see something like this, your alarm bells should immediately ring. If textView is `null`, the app would crash. The same behavior is happening with java, so a switch from Java to kotlin would be pointless.

The simple fix is to replace the `!!` operator with a `?`, which only executes the line of code if the element is not null.

```kt
textView?.setOnClickListener { showDialog() }
```

Of course, if the view _is_ null even though you're expecting a value, you should probably do something about this. A simple way to handle this is to add some "sanity checks" to your code. Create an `assert` function that throws an `AssertionError` if a given condition is false. Unfortunately, android does not use the builtin `assert` function that kotlin provides, so you will have to write your own. The neat thing about `assert` is that you can toggle this behavior, meaning you can enable assertion errors in the debug build, but disable it in the final production build to prevent the app from randomly crashing.

```kt
assert(textView != null)
textView?.setOnClickListener { showDialog() }
```

## More complex cases

Let's take a look at this code: ...

This is post 007 of [#100DaysToOffload](https://100daystooffload.com/).
