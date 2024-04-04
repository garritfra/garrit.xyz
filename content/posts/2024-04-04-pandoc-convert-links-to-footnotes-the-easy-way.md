---
title: "Pandoc: Convert links to footnotes (the easy way)"
date: "2024-04-04"
tags: "guide, note, writing, til, tech, programming, pandoc"
---

Pandoc has [a feature](https://pandoc.org/MANUAL.html#links) to covert links to footnotes. Unfortunately, this only applies to LaTeX documents. Since I want to stay away from LaTeX for reasons of bloat, I was looking for a more universal approach.

First, I encountered [this](https://stackoverflow.com/questions/33900067/pandoc-filter-to-add-footnotes-to-links) thread suggesting to use a regular [Pandoc filter](https://pandoc.org/filters.html). This has one downside though: you need a Haskell toolchain on your system. So I moved on ... 

I eventually stumbled across [this](https://github.com/jgm/pandoc/discussions/9415) thread, explaining how to do the same thing but with a Lua filter instead of Haskell. Since Lua is embedded into Pandoc, you don't need to install anything. Hooray for embeddable languages!

Simply place the following snippet into file (`/filters/link-to-footnote.lua` for example):

```lua
function Link(link)
    link.content:insert(pandoc.Note(link.target))
    return link.content
end
```

> *Note*: If you want to keep the original hyperlink in tact, replace the `return link.content` with `return link`.

And add the following flag to your Pandoc build command:

```sh
#!/bin/sh
pandoc text.md
    -o book.epub \
    --lua-filter=filters/link-to-footnote.lua \ # <-- This one
    --metadata-file metadata.yaml \
    --standalone \
    # ...
```

After compiling the document, you should now see that each link has a footnote with the link text.
