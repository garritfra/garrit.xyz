---
title: Notes about BEM (Block Element Modifier)
date: "2021-02-02"
---

In the coming weeks, months and years, I will be working on frontend-development as part of my dayjob. These are some personal notes I took during my research about the BEM methodology. If you want to read the official introduction, you should visit [their website](http://getbem.com/).

# Overview - What is BEM?

BEM — Block Element Modifier is a methodology that helps you to create reusable components and code sharing in front-end development. It aims to group css-classes in a meaningful way, making it easier to understand

1. where this class is used
2. what it describes and
3. what state the element is in.

The BEM-notation is divided into three main parts: Blocks, Elements and Modifiers.

## Blocks

A standalone entity that is meaningful on its own. Some examples might be **headers, containers, menus, inputs, checkboxes**, etc.

## Elements

A part of a block that has no standalone meaning and is semantically tied to its block. This could be a **menu item or an input placeholder**.

## Modifiers

A flag on a block or an element. Used to change appearance or behavior. This might be **disabled, checked, fixed, big**, etc.

# Putting it together

A block itself is referenced though its name.

```css
.button {
}
```

To reference elements inside of the block, you add it to the block element with two underscores (`__`):

```css
.button {
}
.button__text {
}
```

If you want to add a modifier to a block or an element, you separate it with two dashes (`--`):

```css
.button {
}
.button--disabled {
}
.button__text--inverted {
}
```

# Benefits of BEM

**Modularity**: Block styles never depend on one another. They can easily be moved to other parts of the app.

**Reusability**: Composing styles in a meaningful way reduces the amount of code duplication.

**Structure**: BEM gives your code a solid structure that is both easy to understand and to expand.

# References

- http://getbem.com/
- https://csswizardry.com/2013/01/mindbemding-getting-your-head-round-bem-syntax/

This is post 009 of [#100DaysToOffload](https://100daystooffload.com/).
