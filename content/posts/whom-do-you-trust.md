---
title: Whom do you trust?
date: "2020-03-17"
---

Nowadays, password managers are a necessity if you care even the slightest about your personal belongings on the interwebs. But think about it, do you really want to trust another company to store your most sensitive information?

![](https://images.unsplash.com/photo-1522251670181-320150ad6dab?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2566&q=80)

##### TL;DR

Use a **stateless** password manager like [LessPass](https://lesspass.com/) to access your password without relying on a third party to store your data.

## Why use a password manager in the first place?

Having a single password for multiple accounts is convenient. What's also convenient, is **using** this password on multiple accounts once you have access to a single one. What might be convenient to you, might also be convenient to others. Many people, [especially celebrities](https://web.archive.org/web/20170225163642/http://uk.businessinsider.com/twitter-says-it-wasnt-hacked-passwords-reused-older-hacks-malware-to-blame-2016-6), fall victim to this trap of comfort.

To counteract this, people are (and should be) using different passwords for different accounts. These passwords differ in a single letter or digit (Twitter: `porridge4president`, GitHub: `poridge5president`, etc.), or they don't match at all (Twitter: `porridge4president`, GitHub: `YouWontGuessThisOne`).

The problem that most likely arises from this technique is called _password chaos_ ([Source](https://encyclopedia2.thefreedictionary.com/password+chaos)):

> _"The confusion that arises when users have many unique passwords."_

The aim of a password manager is [to solve this problem by storing all of your passwords in a single place and securing it with an _ultra secure superpassword!_ (©)](https://www.businessinsider.com/how-to-use-password-manager-store-protect-yourself-hackers-lastpass-1password-dashlane-2017-2?r=DE&IR=T). This way, you can use arbitrary passwords - preferebly gibberish that doesn't make sense to humans (nor machines) - without losing them, as long as you have your _ultra secure superpassword!_ (©) - aka your masterpassword. The benefits are obvious: You get rid of the password chaos problem while staying relatively secure. Eventhough password managers are quite benificial, some people (including myself) see a catch in them.

## Relying on a third party

Relying on third party companies doesn't seem like a big deal. After all, you are probably using some form of cloud service to host your photos. Yet there's a lot of trust involved in letting others handle your private data, especially your passwords. In 2017, [a major password manager got hacked, exposing sensitive data including users and their passwords](https://www.zdnet.com/article/onelogin-hit-by-data-breached-exposing-sensitive-customer-data/). This shows the potential for security breaches in an application that inherently seemed safe. But what if I told you that there is an alternative to this? A password manager that does not store your data at all?

## A Stateless password manager

Recently, I stumbled across [LessPass](https://lesspass.com/#/). LessPass is a password manager that is very different from what I have seen so far. Instead of storing passwords that either you or a random password generator came up with, it computes passwords on the fly, given a website, username, your masterpassword and some options.

![LessPass](../assets/lesspass.gif)

The key here is that LessPass uses a **pure function**, i.e. a function that given the same parameters will always give the same result. Using this technique, there's no need to store your password in a database owned by a large company, nor do you have to sync your passwords between your devices ([but there's an app](https://play.google.com/store/apps/details?id=com.lesspass.android&hl=de)). The computation happens right on your machine, and **only** on your machine. If you want to find out more about how it works under the hood, you can check out [the authors blog post](https://blog.lesspass.com/lesspass-how-it-works-dde742dd18a4#.vbgschksh). He goes into great detail on what alorithm is used to compute your passwords and how to utilize every feature of LessPass.

## Conclusion

Being a little privacy nerd myself, I often think twice about what services I want to use, often even looking into self-hosted alternatives to major products. There are multiple products that offer self hosted solutions to store your passwords, however I also don't even trust _myself_ with such sensitive data either. LessPass eliminates the need to have a third party watch over your data, let alone to store it on their servers.
