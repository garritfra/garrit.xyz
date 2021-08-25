---
title: Fighting Array Functions with ES6
date: "2019-04-07"
---

Yesterday, I came across an interesting bug regarding JavaScript Arrays, and I wanted to share my approach to fixing it.
At a basic level, I wanted to pass part of an array to a function, but wanted to use the original array later on.

```js
let arr = [1, 2, 3, 4, 5]
let something = arr.splice(0, 3)
do(something) // []
DoSomethingWithOriginal(arr)
```

Thinking that Array.prototype functions don’t mutate the array directly, I moved on with my day. This lead to a bunch of problems down the line.
Some array methods in the EcmaScript specification are designed to mutate arrays, while others do not.

### Non-mutating functions

- Array.prototype.map()
- Array.prototype.slice()
- Array.prototype.join()
- …

These functions do not mutate the array they are called on. For example:

```js
let arr = [1, 2, 3, 4, 5];
let partOfArr = arr.slice(1, 2);
console.log(partOfArr); // [2, 3]
console.log(arr); // [1, 2, 3, 4, 5]
```

### Mutating functions

- Array.prototype.sort()
- Array.prototype.splice()
- Array.prototype.reverse()
- …

These methods mutate the array directly. This can lead to unreadable code, as the value can be manipulated from anywhere. For example:

```js
let arr = [5, 2, 4];
arr.sort();
console.log(arr); // [2, 4, 5]
```

To me, it is very unclear, which functions do, and which don’t mutate arrays directly. But, there’s a simple trick you can use to stop letting the functions mutate arrays directly, ultimately leading to more readable and reliable code.

## Enter: The ES6 Spread Operator!

![Spread Operator](https://images.unsplash.com/photo-1518297056586-889f796873e0?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1225&q=80)

Take a look at this snippet:

```js
let arr = [3, 5, 1, 2, 4];
let sorted = [...arr].sort();
console.log(arr); // [3, 5, 1, 2, 4]
console.log(sorted); // [1, 2, 3, 4, 5]
```

Voilà! We have a sorted array, and the original one is also around. The spread operator(`[...arr]`) is used to create a new array with every value of arr .
You can use this for arrays, as well as objects:

```js
let obj = {
  field: "example",
};
let extendedObj = {
  ...obj,
  anotherField: 42,
};
console.log(extendedObj.field); // "example"
```

## Conclusion

ES6 brought us awesome features like let and const assignments, as well as arrow functions. A more unknown feature however is the spread operator. I hope you now know how to use the spread operator, and that you can adopt it for cleaner and simpler code.
