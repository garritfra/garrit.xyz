---
title: "ASCII art of a dolphin looking into a mirror"
date: "2026-08-10"
tags: "note, tech, llm, ai"
---

Simon Willison has an amazing [personal benchmark](https://simonwillison.net/tags/pelican-riding-a-bicycle/) that he uses on any new AI model that comes out:

> "Generate an SVG of a pelican riding a bicycle"

The outputs are as funny as they are informative about the AI model. The pelican is very saturated on the internet by now, so it's hard to tell if an AI is particularly trained against this prompt.

So, for the longest time, I wanted to have my own similar personal benchmark that I can throw at new models to see how they perform. And I think I finally have it:

> "ASCII art of a dolphin looking into a mirror"

As you might imagine, most AIs are neither specifically trained on ASCII art, nor the appearance of a dolphin, nor building asymmetric reflections of said subject. The results so far are very... promising:

## Claude Sonnet 5 (Medium)

What even is that?

```
,-'`-.
                          ,-'::::::::::`-.
                     _.--:::::::::::::::::`--.__
                _.-'`   :::::::::::::::::::::::`-.
             .-'      ,::::::::::::::::::::::::::`.
           .'       ,'::::::::::::::::::::::::::::`.
          /       ,'::::::::::::::::,--._::::::::::\
         /      ,'::::::::::::::::,'     `-._:::::::\
        |      /::::::::::::::::,'          _)::::::::\
        |     /:::::::::::,--'``            `.::::::::|
        |    |:::::::,--'`    ⚬              |::::::::|
        |    |::::::/                        /::::::::|
        |    |:::::|         mirror         /:::::::::|
         \    \:::::\                      /::::::::::/
          \    \:::::`-._               ,-'::::::::::/
           `.   `-:::::::`--.._____..--':::::::::::.'
             `-._  `-:::::::::::::::::::::::::::_.-'
                 `--._``--:::::::::::::::--''_.-'
                       ``--..________..--''
    ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
                    (reflection, same shape)
```

## Claude Opus 5 (High)

This one is my favorite so far!

```
                               .------------------------------.
                               |                              |
                      __       |      __                      |
        /\         _-'  `-.    |   .-'  `-_         /\        |
       /  \     _-'    o   `.  | .'   o    `-_     /  \       |
   ___/    \_-'             _) |(_             `-_/    \___   |
  /                      _-'   |  `-_                      \  |
  \_                __--'      |     `--__                _/  |
    `--..______..--'           |          `--..______..--'    |
                               |                              |
                               '------------------------------'
```

## Claude Fable 5 (High)

```
___________
        ___                      |  _______  |
     .-'   '-.        _         | |   _..-' |
    /  o      \___..-' \        | | '-.._ o |
    \             __.--'        | |--.__    |
     '-.____..--''    \         | | /       |
         \/  \    \    \        | |  /  \/  |
              \    '.___\       | |_/       |
               '--'             |  ~~~~~~~  |
                                |___________|
              dolphin              mirror
```

## Claude Fable 5 (Extra)

Response Suffix: "Fin-tastic reflection, if I may say so."

```
                             .----------------------.
                             |                      |
           __                |          __          |
     _____/  \______         |   ______/  \_____    |
   =<    _      o   >        |  <   o      _    >=  |
     \_____________/         |   \_____________/    |
        o   ..               |                      |
      o    .                 '----------------------'
                                       |  |
                                    ___|__|___
                                   (__________)
```

## GPT-5.6 Sol (Extra High)

```
                 __
             ___/  \___
        ____/          \____
      _/                    \__
     /     _..---.._            `-.
    /   .-'         `-.            \
   /   /      __       \            |
  |   |     .'  `.      |           |
   \   \    \____/     /           /
    `-. `-._        _.-'       _.-'
       `---.`------'       _.-'
            \           .-'
             \   ___   /
              \_/   \_/
                \   /
                 \_/

                      ||  MIRROR  ||
                      ||          ||
                      ||    __    ||
                      || __/  \__ ||
                      ||/        \||
                      ||\        /||
                      || `-.__.-' ||
                      ||    \/    ||
                      ||          ||
                      ||__________||
```

## Gemini 3.1 Pro

```
_                   _
           ,' `.      .-.      .' `.
         ,'     `--.  | |  .--'     `.
       ,'           `-| |-'           `.
     ,'               | |               `.
    /                 | |                 \
   |         O    _.-.| |.-._    O         |
   |             (____| |____)             |
    \          ,'     | |     `.          /
     `--------'       '-'       `--------'
         o                           o
      o     o                     o     o
~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^~^
```

## Gemini 3.6 Thinking

```
______                                                 ______
     .-'     `-.                     .----.                 .-'     `-.
   .'   o       \                    | || |                /       o   '.
  /      _       \                   | || |               /       _      \
 /     /' \       \                  | || |              /       / '\     \
/    /`    )       \________         | || |         ________/       (    `\    \
|    |     /                 \       | || |        /                 \     |    |
|    |    '-----.             \      | || |       /             .----'     |    |
 \    \          `----.        \     | || |      /        .----'          /    /
  '.   '-------------'          \    | || |     /          '-------------'   .'
    '---------------------------'    '----'     '---------------------------'
```

# Conclusion

AIs seem to really struggle with this. Some more than others. I believe this will be a fun benchmark in the future, so expect more of where that came from!
