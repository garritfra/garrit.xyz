---
title: Swapping two Numbers without Temporary Variables
date: "2022-03-24"
tags: "note, programming, 100DaysToOffload"
---

Ever wondered how to swap two numbers without using a temporary variable?

I just found this very old note that I thought is worth sharing. The trick is
quite old and you might already know about this, but when I started out with
programming, it blew my mind.

In school, we get taught to use a temporary
variable to swap two numbers:

```js
let a = 5
let b = 10

let temp = a;

a = b    // a = 10
b = temp // b = 5
```

But by using some arithmetic, we can save us a few bytes of memory:

```js
let a = 5
let b = 10

a = a + b // a = 15 ; b = 10
b = a - b // a = 15 ; b = 5
a = a - b // a = 10 ; b = 5 
```

Please **never** use this in any production code. The less we have to think
about a piece of code, the better it is. It's a fun thought experiment
nevertheless!

---

This is post 026 of [#100DaysToOffload](https://100daystooffload.com/).
