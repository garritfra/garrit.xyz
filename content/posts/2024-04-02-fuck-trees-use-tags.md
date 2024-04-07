---
title: "Fuck trees, use tags"
date: "2024-04-02"
tags: "note, opinion, tech"
---

We've been trained to organize our files into a tree-like structure. A file can only exist once in the entire tree. It may have multiple contexts, but it can only exist once. Here's an example: you get a really important invoice for your car that you have to keep for your taxes. Where do you store this invoice alongside your other files?

* Maybe organized by type:`/invoices/important_invoice.pdf`?
* Or `/tax/2024/important_invoice.pdf` since that's where you will probably need it next?
* But it's an invoice for my car! So `/vehicles/<licenseplate>/important_invoice.pdf`?

Whatever strategy you choose, there are probably times where you wish to have used a different directory structure. Sure, you can put the file in one directory and then create a shortcut or link in the other directories, but the original file will only ever exist in one place.

I believe that these tree-like directory structures are inherently flawed, and that tagging systems are superior in almost every way.

What I mean by tags is to organize files/entities/whatever into a flat structure and add meaningful tags/labels to add context. To revise the example above: our `important_invoice.pdf` could have the following tags:

* `invoice`
* `vehicles/<licenseplate>`
* `tax/2024`

One could argue that `vehicles` and `tax` could be their own tags, but I specifically choose these tags to prove an important point:

## Tags can mimic trees

If you think about it, a file path in a sense is just a reference to some location. Files on a physical hard drive aren't organized in trees. They're a bunch of ones and zeros slapped together in a pool of other files. A file path is just an abstraction for the user to reference a specific location in this pool of files. A file path is a tag!

Unfortunately, most systems are designed to only allow one path per file. This creates the hierarchical structure we so often use. But as I mentioned above, we could simply assign multiple tags or paths to a single file to organize it in multiple ways. The `important_invoice.pdf` has little to do with `tax` or `2024` as standalone terms, but assigning the tag `tax/2024`  gives it a similar meaning as a path to a file in a directory. The term `invoice` is enough to infer that everything using this tag is an invoice. It's equivalent to having a directory named `invoices` with multiple files inside.

So, we have established that tags are easily superior to trees. Why are we not using them?

## Tags have bad UX

There have been many attempts at giving users the possibility to organize their stuff using tags. Your Gmail mails can be labeled, you can use tags for files in MacOS and there are apparently even efforts to create [tag-based filesystems](https://relfs.sourceforge.net/). But none of them were good enough to change the game.

Our brains seem to be so used to the idea of a piece of information only existing at one location at a time that it's really hard to adapt at this point. I'm sure there are some power users out there who make the most of the limited tagging features of their systems, but what I would really like to see is a real shift in how we store and retrieve information.

## Discussion

This post has spark some interesting discussion on [Lobsters](https://lobste.rs/s/pssbmx/fuck_trees_use_tags).
