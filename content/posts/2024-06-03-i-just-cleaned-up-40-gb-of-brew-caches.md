---
title: "I just cleaned up 40 GB of Brew caches"
date: "2024-06-03"
tags: "guide, note, tech"
---

> **EDIT**: This trick will probably not be as effective on your system as it was on my system. After writing this post I realized that I had the `HOMEBREW_NO_INSTALL_CLEANUP=1` flag enabled on my system.

My system (MacOS) is getting more cluttered the more I use it. I'm sure you can relate. If you're using [Brew](https://brew.sh/) as your package manager (which you should 😉), you might want to consider running the following command:

```
brew cleanup -s
```

For some reason this failed after some time with a "directory not found" error, but you can just run it again and it will continue cleaning up old caches. Once it was done, this freed up **40 GB of disk space** on my system. It might make sense to run this as a cronjob? Either way, I just wanted to jot this down before I enevitably forget this, as usual.
