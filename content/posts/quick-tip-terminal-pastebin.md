---
title: Quick Tip! Sharing terminal output with Termbin
date: "2019-12-31"
---

Ever find yourself in a situation where you simply want to save or share the output of a terminal command? Selecting, copying and pasting text from stdout always feels quite tedious, if you just want to share the contents of a file.

A project called [Termbin](https://termbin.com/) tries to simplify this process. Just pipe the command you want to save to the following url on port `9999`, using Netcat:

```sh
echo "Hello, Blog!" | nc termbin.com 9999
```

Instead of showing the output, it will be forwarded to Termbin and show the URL, under which your output will be available:

```sh
➜  blog git:(master) ✗ cat ./some_file.txt | nc termbin.com 9999
https://termbin.com/faos
➜  blog git:(master) ✗
```

Sure enough, after navigating to [`https://termbin.com/faos`](https://termbin.com/faos), we will see the contents of `some_file.txt`. Neat!

### ⚠️Word of Caution⚠️

Do not pipe any personal information, credentials or any other private data into termbin. It will be instantly available to the general public, and theres no quick way to remove it.

Happy Pasting!✨
