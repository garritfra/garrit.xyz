---
title: Testing isn't hard
date: "2019-11-08"
---

"I write two tests before implementing a method", "My project has 90% coverage".

I don't know about you, but that's something I don't hear very often. But why is that?

Testing is not even that difficult to do, but yet it is always coming short in my projects. About a year ago, I've tried to implement tests in my React applications with little success, mostly because integrating `enzyme` and configuring it correctly is not that intuitive as a relatively new developer. I want to share my (partly opinionated) approach to JavaScript testing with `jest`, to get you started. In a later post I will demonstrate a way to implement `enzyme` into your React projects.

# The basics of testing JavaScript functions

To get started, you need a npm-project. I don't think I have to explain that, but just in case:

```bash
mkdir awesome-testing-project
cd awesome-testing-project
npm init -y
```

Of course, we need a unit we want to test. What about a method that returns the first element of an array?

```js
module.exports = function firstElement(arr) {
  return arr[1];
};
```

You already spotted a bug, huh? Let's keep it simple for now.

Install and initialize Jest, an open-source testing framework maintained by Facebook. When initializing, you should check every question with `y`.

```bash
npm i --save-dev jest
npx jest --init
```

Next up, we need to define our first test. Conventionally, we create a folder named `__tests__` in the directory of the module we want to test. inside it, there should be a file named `<module>.test.js`. Something like this:

```bash
▶ tree
.
├── package.json
└── src
    ├── __tests__
    │   └── firstElement.test.js
    └── firstElement.js
```

Jest provides global functions that do not need to be imported in a file. A simple test can look like this:

```js
const firstElement = require("../firstElement.js");

test("firstElement gets first element of array", () => {
  expect(firstElement([1, 2])).toBe(1);
});
```

`expect` is another word for `assert`. If you ask me, "Expect firstElement of [1, 2] to be 1" sounds reasonably english, doesn't it? After defining the test, all there is to do left is to run the `npm test` command, which has been created for us by running `npx jest --init` earlier.

```bash
▶ npm test
> jest

 FAIL  src/__tests__/firstElement.test.js
  ✕ firstElement (6ms)

  ● firstElement

    expect(received).toBe(expected) // Object.is equality

    Expected: 1
    Received: 2

      2 |
      3 | test('firstElement', () => {
    > 4 |   expect(firstElement([1, 2])).toBe(1);
        |                                ^
      5 | });
      6 |

      at Object.<anonymous>.test (src/__tests__/firstElement.test.js:4:32)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
Snapshots:   0 total
Time:        1.1s
Ran all test suites.
npm ERR! Test failed.  See above for more details.
```

Whoops! Looks like we have found a bug! Let's fix it by adjusting the index of the return value in the firstElement function:

```js
module.exports = function firstElement(arr) {
  return arr[0];
};
```

And after rerunning `npm test`:

```bash
▶ npm test
> jest

 PASS  src/__tests__/firstElement.test.js
  ✓ firstElement (4ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        0.666s, estimated 2s
Ran all test suites.
```

Yay, your first unit test! Of course, there is much more to find out about the Jest framework. To see a full guide, read the [official docs](https://jestjs.io/).

I have prepared a [template repository](https://github.com/garritfra/react-parcel-boilerplate) for building react apps. It also uses Jest to run tests, you don't have to worry about a thing! If you found this interesting, consider checking out my other blog posts, and/or check out my [GitHub](https://github.com/garritfra)!
