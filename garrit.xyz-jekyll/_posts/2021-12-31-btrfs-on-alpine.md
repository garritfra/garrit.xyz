---
layout: post
title: BTRFS on Alpine Linux
date: "2021-12-31"
tags: "linux, infrastructure, note, guide, 100DaysToOffload, homelab, tech"
---

I'm currently in the midst of migrating some of my infrastructure from the cloud
to "on prem", aka a local server, aka my old PC. I wanted to try alpine linux as
the host OS to see how it behaves as a lightweight server distro.

So far it stands up quite nicely, it has everything you'd expect from a
linux-based operating system. The only problem I encountered was getting BTRFS
to work out of the box. Here are some things you should know when using BTRFS on
Alpine linux.

### Installing BTRFS

Installing BTRFS is relatively straight forward. Simply install the package and
tell Alpine to load the module on startup:

```
apk add btrfs-progs
echo btrfs >> /etc/modules
```

To load the module right away, you can use the following command:

```
modprobe btrfs
```

### Mounting a volume

If you try mounting a btrfs volume via your fstab, you will get an error. This
is because BTRFS does not know about the drives yet when the filesystems are
mounted. To work around this, you can create an OpenRC service that runs a
`btrfs scan` to detect the drives. To do so, create a service under
`/etc/init.d/btrfs-scan` with the following content:

```sh
#!/sbin/openrc-run

name="btrfs-scan"

depend() {
  before localmount
}

start() {
  /sbin/btrfs device scan
}
```

Make the service executable and register it:

```
chmod +x /etc/init.d/btrfs-scan
rc-update add btrfs-scan boot
```

Now, you should be able to add the volume to your `/etc/fstab`:

```
UUID=abcdef-0055-4958-990f-1413ed1186ec  /var/data  btrfs   defaults,nofail,subvol=@  0  0
```

After a reboot, you should be able to see the drive mounted at `/var/data`.

### Resources

- [Nathan Parsons - "Using BTRFS on Alpine Linux"](https://nparsons.uk/blog/using-btrfs-on-alpine-linux)
- [A bug report about this problem](https://gitlab-test.alpinelinux.org/alpine/aports/-/issues/9539)

This is post 023 of [#100DaysToOffload](https://100daystooffload.com/).
