---
title: Booleans are wasted memory
date: "2020-11-17"
---

A boolean is either `true` or `false`. That translates to `1` or `0`. If you think that one bit is enough to store this information, you'd be wrong.

In order to keep the binary layout of a program simple and convenient, most languages store information in 8 bit (1 byte) blocks.
If you allocate a `bool` in Rust or (most) other languages that are based on LLVM, [it will take up 1 `i1`, or 1 byte of memory](https://llvm.org/docs/LangRef.html#simple-constants). If you allocate a boolean value in C, you will get [an integer constant with a value of either 1 or 0](https://pubs.opengroup.org/onlinepubs/9699919799/basedefs/stdbool.h.html).

If you find yourself having to store multiple boolean states somewhere, you might simply declare those booleans and call it a day:

```c
#include <stdbool.h>
#include <stdio.h>
int main()
{
    bool can_read = true;
    bool can_write = true;
    bool can_execute = false;

    if (can_read)
        printf("read bit set\n");
    if (can_write)
        printf("write bit set\n");
    if (can_execute)
        printf("execute bit set\n");

    // Output:
    // read bit set
    // write bit set
}
```

## We can do better than this

An alternative approach to store boolean values is to share a "chunk" of bits with other values. This is usually done using bitwise operations:

```c
#include <stdbool.h>
#include <stdio.h>

// Define permissions
#define PERM_NONE       0b000
#define PERM_READ       0b001
#define PERM_WRITE      0b010
#define PERM_EXECUTE    0b100

#define PERM_ALL        PERM_READ | PERM_WRITE | PERM_EXECUTE

int main()
{
    // Allocate 1 byte for permissions
    char permissions = PERM_READ | PERM_WRITE;

    if (permissions & PERM_READ)
        printf("write bit set\n");
    if (permissions & PERM_WRITE)
        printf("read bit set\n");
    if (permissions & PERM_EXECUTE)
        printf("execute bit set\n");

    // Output:
    // read bit set
    // write bit set
}
```

This example still wastes 5 bits since we only use 3 out of 8 possible bits of the char type, but I'm sure you get the point. Allocating 3 boolean values independently would waste 7 * 3 = 21 bits, so it's a massive improvement. Whenever you find yourself needing multiple boolean values, think twice if you can use this pattern.

Microcontrollers have a very constrainted environment, therefore bitwise operations are essential in those scenarios. 7 wasted bits are a lot if there are only 4 kb of total memory available. For larger systems we often forget about these constraints, until they add up.

## My Plea
* Be mindful about the software you create.
* Appreciate the resources at your disposal.
