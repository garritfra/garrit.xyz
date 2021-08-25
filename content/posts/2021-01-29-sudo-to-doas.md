---
title: From sudo to doas
date: "2021-01-29"
---

You might have heard that there is currently [a pretty significant vulnerability](https://www.qualys.com/2021/01/26/cve-2021-3156/baron-samedit-heap-based-overflow-sudo.txt) affecting `sudo`, the program we all know and love. It is the de facto standard for when you want to run a command as a priviledged user, but that's really it. Under the hood, sudo is a very powerful tool with a lot of features. It can be used to build out complex permission-systems that span across entire clusters of servers. But all of these features come at a price: **complexity**. Last time I checked, the [source code](https://www.sudo.ws/repos/sudo) of sudo had about 330k lines of code (using cloc as a benchmark). This massive complexity plays a large role in its security.

Luckily, there is a **far** more lightweight alternative to sudo called [doas](https://github.com/Duncaen/OpenDoas.git). It essentially does all the things you'd expect from sudo for your average end user. Doas is written in just over 3k lines of code, which, if you think of it, should be more than enough to provide a tool that executes a command as a priviledged user.

## Setup

While there are packages for [some distibutions](https://github.com/slicer69/doas#installation-via-packagesrepositories), I personally had trouble setting it up on arch using yay (for permission reasons, ironically). I recommend going the extra mile and building it from source, which consists of a few commands and some seconds of your time:

```sh
git clone https://github.com/slicer69/doas
cd doas
make
sudo make install
```

Next, you will need to create a config file at `/usr/local/etc/doas.conf`. Paste the following line into it to give your user root access:

```sh
permit alice as root
```

You obviously want to substitute alice with your username. If you have multiple users on your system, simply duplicate that line and substitute the username accordingly. Just restart your terminal window, and you should be able to run programs as root using doas instead of sudo:

```sh
➜  ~ doas id
uid=0(root) gid=0(root) groups=0(root)
```

## Bonus: Save your muscle memory

If you still want to "use" sudo on your machine, you can set up a simple alias in your `.{bash|zsh|fish}rc`. This will also help with compatibility issues of some scripts, if you decide to ditch the actual sudo from your Box entirely. Just paste this line into your corresponding rc file:

```
alias sudo="doas"
```

## Bonus Bonus: Passwordless authentification

You can setup doas to skip the password prompt every time you run a command with it. Simply add the `nopass` option in your doas configuration file:

```sh
permit nopass alice as root
```

I hope you found this useful!

This is post 008 of [#100DaysToOffload](https://100daystooffload.com/).
