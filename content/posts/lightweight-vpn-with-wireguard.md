---
title: Quick Tip! Setting up a lightweight Server-Client VPN with wireguard
date: "2020-08-19"
---

This blog post has been taken over from my [collection of "Today I Learned" articles](https://garrit.xyz/til).

You can easily set up a private network of your devices. This way you can "talk" to your phone, raspberry pi etc. over an **encrypted** network, with simple IP-addresses.

![](https://images.unsplash.com/photo-1505659903052-f379347d056f?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80)

Firstly, install wireguard on all of your systems. Simply install the `wireguard` package from your package manager respectively. Check out [the official installation guide](https://www.wireguard.com/install/) if you can't find the package. If you're on debian, try [this](https://wiki.debian.org/WireGuard?action=show&redirect=Wireguard) guide. There's also an app for Android, iOS and MacOS.

Every participent (Client and server) needs a key-pair. To generate this, run this command first on the server, and on all clients:

```bash
wg genkey | tee wg-private.key | wg pubkey > wg-public.key
```

It might make sense to do this as root. This way you don't have to type `sudo` with every command.

## Server Configuration

You will need to create a configuration for the server. Save this template at `/etc/wireguard/wg0.conf`, and replace the fields where needed:

```conf
[Interface]
PrivateKey = <Server private key from wg-private.key>
Address = 10.0.0.1/24 # IP Address of the server. Using this IP Address, you can assign IPs ranging from 10.0.0.2 - 10.0.0.254 to your clients
ListenPort = 51820 # This is the standard port for wireguard

# The following fields will take care of routing
PostUp = iptables -A FORWARD -i %i -j ACCEPT; iptables -A FORWARD -o %i -j ACCEPT; iptables -t nat -A POSTROUTING -o eth0 -j MASQUERADE
PostDown = iptables -D FORWARD -i %i -j ACCEPT; iptables -D FORWARD -o %i -j ACCEPT; iptables -t nat -D POSTROUTING -o eth0 -j MASQUERADE

# Laptop
[Peer]
PublicKey = <Public Key of Laptop Client>
AllowedIPs = 10.0.0.2/32 # The client will be reachable at this address

# Android Phone
[Peer]
PublicKey = <Public Key of Phone Client>
AllowedIPs = 10.0.0.3/32

# ...
```

Then run `wg-quick up wg0` to start the wireguard interface with the configuration from `/etc/wireguard/wg0`.

## Setting up clients

Setting up clients is very similar to the server setup process. Generate a keypair on each client, save the following config to `/etc/wireguard/wg0.conf` and replace the nessessary fields:

```conf
[Interface]
PrivateKey = <Client Private Key from wg-private.key>
Address = 10.0.0.2/32 # The fixed address of the client. Needs to be specified in the server config as well

[Peer]
PublicKey = <Server Public key>
AllowedIPs = 10.0.0.0/24 # Routes all traffic in this subnet to the server. If you want to tunnel all traffic through the wireguard connection, use 0.0.0.0/0 here instead
Endpoint = <Public Server IP>:51820
PersistentKeepalive = 25 # Optional. Will ping the server every 25 seconds to remain connected.
```

On every client, run `wg-quick up wg0` to start the interface using the config at `/etc/wireguard/wg0.conf`.

This whole proccess might be easier on GUIs like Android or MacOS.

Now, try to ping your phone from your laptop:

```
ping 10.0.0.3
PING 10.0.0.3 (10.0.0.3) 56(84) bytes of data.
64 bytes from 10.0.0.3: icmp_seq=1 ttl=64 time=5382 ms
64 bytes from 10.0.0.3: icmp_seq=2 ttl=64 time=4364 ms
```

### References

- [Official Documentation](https://www.wireguard.com/)
- [https://www.stavros.io/posts/how-to-configure-wireguard/](https://www.stavros.io/posts/how-to-configure-wireguard/)
