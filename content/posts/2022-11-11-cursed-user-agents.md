---
title: Cursed User-Agents
date: "2022-11-11"
tags: "note, 100DaysToOffload, web, tech"
---

> **Warning**: This is a rather ranty post. I just needed a place to dump my emotions about this topic. Please take it with a grain of salt. :)

I'm currently [fiddling
around](https://github.com/garritfra/ua-parser-js/pull/8) with User-Agents of
Smart TVs, or more specifically [HbbTV](https://www.hbbtv.org/). Interpreting
them is an absolute nightmare, so let me rant about interesting edge-cases I
discovered along the way.

To set the mood: User-Agents in this field have a standardized format, yet many
vendors seem to do their own thing, making it impossible to build one parser to
rule them all. For reference, here's what the HbbTV section in a user agent
SHOULD look like:

```
HbbTV/<version> (<capabilities>; <vendorName>; <modelName>; <softwareVersion>; [<hardwareVersion>]; <familyName>; <reserved>)
```

## The "we'll update that later"

```
HbbTV/1.1.1 (; Loewe; MB180; 1.0; 1.0;) NetFront/4.1
```

1.0 for both software and hardware versions suspiciously looks like a working
title. At least we get some information about the vendor and the model.

## The Overcommitted

```
Mozilla/5.0 (Linux armv7l) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/53.0.2785.143 Safari/537.36 OPR/40.0.2207.0 OMI/4.9.0.237.DOM3-OPT.245 Model/Vestel-MB211 VSTVB MB200 HbbTV/1.2.1 (; JVC; MB211; 3.19.4.2; _TV_NT72563_2017 SmartTvA/3.0.0
```

It's nice that we get a lot of information about the device, yet no one seemed
to check if the string actually fits into storage.

## The Lazy Boy

```
HbbTV/1.1.1 (;;;;;) Maple;2011
```

To be fair, this is one of the earliest HbbTV devices ever. No one knew that
this technology would stand the test of time. Apparently not even Samsung.

## Conclusion

I learned that building a generic parser for user agents isn't easy, especially
if the devices you work with could be over a decade old.

One thing that all devices do seem to get right though is the presence of the
HbbTV section in the User-Agent. I did not encounter a single device without it.

This is post 042 of [#100DaysToOffload](https://100daystooffload.com/).
