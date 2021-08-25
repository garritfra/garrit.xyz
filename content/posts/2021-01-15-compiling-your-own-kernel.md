---
title: Compiling your own kernel
date: "2021-01-15"
---

I'm currently in the midst of fiddling around with the kernel a bit, and I figured I just documented my process a bit. Unfortunately, since I'm using a Mac for day to day work, I have to rely on a virtual machine to run anything Linux-related. VirtualBox doesn't support the most recent kernels (5.9 is the most recent supported one), so there won't be any cutting-edge development happening here. I decided to use ubuntu as my guest system, since it's very easy to set up.

So, the first step is to get the sources. You could simply go ahead and download a specific release from [kernel.org](https://kernel.org/), but since I want to hack on it, I decided to go the git-route. Simply download the sources from [their repo](https://git.kernel.org/pub/scm/linux/kernel/git/torvalds/linux.git/) and check out the tag you want to build.

> **Note**: this might take a while. Their repository is huge! If you want to only need the `HEAD` and want to build on bare-metal (no VirtualBox), you could only clone the latest commit using `git clone git://git.kernel.org/pub/scm/linux/kernel/git/torvalds/linux.git --depth=1`.

Next up, you need to generate a `.config`. This file describes which features you want to compile into your kernel. To make a generic config that only compiles drivers for the hardware of your system, you can run the following commands:

```bash
# Copy the config of your current kernel into the repo
make oldconfig

# Only enable modules that are currently used by the system
make localmodconfig
```

Now, let's get to actually compiling the kernel. In my case, I assigned 4 cores to my VM. The `-j` option tells make to run 4 jobs in parallel.

> **Caution**: Just providing -j will freeze your system, since make will try to launch an infinite amount of processes!

```
make -j4
```

Again, this might take some time. Go for a walk, get a coffee or watch your favorite TV-show. After compilation has finished, we need to install the kernel. To do so, run the following commands:

```
sudo make modules_install
sudo make install
```

In order to boot, we need to tell our bootloader about our new kernel. Run this command to update your grub config:

```
sudo update-grub2
```

And voila! Your new kernel should be ready.

Reboot the system, and grub should pick up the new kernel and boot to it. If that's not the case, you should be able to pick the kernel from the grub menu under `advanced options`.

## Retrospective

I found that building my own kernel is a highly educational and fun experience. Using VirtualBox is a pain in the `/dev/null` to work with, since it has to add a lot of overhead to the system in order to work. You sometimes have to wait over 6 month until the support for a new kernel arrives. This problem should not apply if you compile on bare metal systems.

Thanks for your time!

This is post 004 of [#100DaysToOffload](https://100daystooffload.com/).
