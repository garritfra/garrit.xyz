---
title: "Organizing multiple Git identities"
date: "2023-10-13"
tags: "100DaysToOffload, guide, note, til, git, tech"
---

Here's a quick tip on how to manage multiple Git identities (e.g. personal, work, client1, client2).

I organize my Git repos in three levels. My personal projects live in a `~/sources` directory. All my work projects live in `~/work`. This is the first level.

Level 2 is the client, e.g. `~/work/client1`. Naturally, level 3 is the project repository: `~/work/client1/foo-api`.

This is how my work directory is organized:

```
/Users/garrit/work
├── client1
│   ├── foo-api
│   ├── foo-ios
│   └── foo-android
└── client2
    ├── bar-ios
    └── bar-middleware
```

Now, say that `client2` demands that we commit with a different identity than our default work email. Besides that, you probably also have a personal email address for your own projects. How do you manage that?

## .gitconfig includes

The global configuration file for Git is `~/.gitconfig`. If you've ever set a parameter like `git config user.name "Foo Bar"`: this is where it ended up.

One awesome feature of the .gitconfig file is that you can **conditionally include other config files**, and this is what does the trick. Here's my `~/.gitconfig` file:

```ini
[user]
    name = Garrit Franke
    email = garrit@slashdev.space

[includeIf "gitdir:~/work/"]
    path = ~/.gitconfig-work

[includeIf "gitdir:~/work/client2/"]
    path = ~/.gitconfig-client2

[includeIf "gitdir:~/sources/"]
    path = ~/.gitconfig-personal

# ...
```

By default, my name and email are always set to my personal identity. I also store some other global settings here, but those are not relevant for this post. If the repository is located inside the `~/work` directory, a file named `~/.gitconfig-work` is included. This is just another gitconfig file. This is what that looks like in my case:

```ini
[user]
    name = Garrit Franke
    signingkey = 12345678
    email = garrit@work.de

[commit]
    gpgsign = true
```

I hope you'll see where this is going. For every identity, you keep a separate gitconfig file and include it in the main `~/.gitconfig`. Crucially, this requires you to organize your repositories grouped by client.

This trick has simplified my project onboarding quite a bit. No more "You forgot to update your Email Address" requests from clients!

---

This is post 083 of [#100DaysToOffload](https://100daystooffload.com/).
