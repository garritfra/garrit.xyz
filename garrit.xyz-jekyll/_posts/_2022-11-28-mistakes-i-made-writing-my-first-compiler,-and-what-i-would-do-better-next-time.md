---
layout: post
title: Mistakes I made writing my first compiler, and what I would do better next time
date: "2022-11-28"
tags: "note, 100DaysToOffload"
---

My most ambitious side project so far has been the [Antimony Programming
Language](https://github.com/antimony-lang/antimony). It's a compiler for a
programming language I made up about two years ago. It can be used for basic
programs and algorithms, but anything beyond
[bubblesort](https://github.com/antimony-lang/antimony/blob/master/examples/bubblesort.sb)
and the [ackermann
function](https://github.com/antimony-lang/antimony/blob/master/examples/ackermann.sb)
wasn't feasible.

Unfortunately, the language never grew out of the "toy" phase, so I more or less
abandoned it. Looking back, I definitely learned a lot about compilers, and if I
were to write another language (which I will most likely do in the future),
there are some things that I would do better next time.

## Statements are expressions minus flexibility

The syntax of many C-like programming languages can be broken up into two
categories. An `Expression` is anything that resolves a value.

```c
1 + 2       // 3
5 * 8 + 2   // 42
1 < 2       // true
addOne(1)   // 2 (assuming `addOne` returns the given value plus one)
[1, 2, 3]   // Array containing a 1, a 2 and a 3
```

A `Statement` resembles an action or branch in a program.

```c
int foo() {                 // Declare statement
    int bar = 1;            // Assignment statement
    if (bar >= 1) {         // Conditional statement
        printf("%d", bar);  // Function call expressions can be statements too!
    }
}
```

Antimony picks up on this concept, and strictly separates statements from
expressions. Some modern programming languages (E.g.
[Rust](https://rust-lang.org/)) got rid of most types of statements by just
declaring almost anything an expression. There are just [Declaration
Statements](https://doc.rust-lang.org/reference/statements.html#declaration-statements)
used for function and variable declaration, and [Expression
Statements](https://doc.rust-lang.org/reference/statements.html#expression-statements),
which can contain any arbitrary expression. This allows us to introduce a lot of
nice features that are very hard to implement if we treated statements as actual statements

```rust
let foo = if 1 > 2 {
    1
} else {
    for {
        break 2
    }
}

print(foo)  // 2
```

Unfortunately, I realized the benefits of extensively using expressions too late.

TODO

## Don't add types as an afterthought

## Multiple backends = exponential headaches

## "I won't need an IR" is a lie
