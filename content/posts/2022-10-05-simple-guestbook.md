---
title: A simple guestbook
date: "2022-10-05"
tags: "note, meta, 100DaysToOffload, guide"
---

> **TL;DR**: Click [here](/guestbook) to view the guestbook.

For a while now, I wanted to have a quick way to update the pages on my website.

GitHub has the
["."](https://docs.github.com/en/get-started/using-github/keyboard-shortcuts#source-code-editing)
hotkey, which opens a web based editor for the file you're currently viewing.
This site now has this feature as well! To try it out, just hit `.`, and you'll
be redirected to the file editor for this page.

To see how I implemented this feature, you take a look at
[this](https://github.com/garritfra/garrit.xyz/commit/658efa3a3ebfebebbf74d0eb6aae6c1cc9566516)
commit. It boils down to this snippet of code:

```js
window.addEventListener("keypress", (e) => {
	if (e.key === ".") {
		const baseUrl = "https://github.com/garritfra/garrit.xyz/edit/main/content";
		const filePath = window.location.pathname;
		const url = `${baseUrl}${filePath}.md`;

		window.location.href = url;
	}
});
```

Pretty simple, huh?

Since this doesn't work on mobile devices, I also added [a custom 404
page](https://github.com/garritfra/garrit.xyz/commit/8c374a8bc0b66192c454300489fee52e7299c9dd#diff-2cbafea0c9dff483ebab9ad670b1cdb3eb7aac552f9c161e42fee84c2efe3a69)
which also redirects to the editor, if the filepath ends with in `/edit`.

Let's have some fun and put this feature to use. I added a simple
[guestbook](/guestbook) to this site, which is open to receive pull requests.
I'd love to hear from you!

This is post 040 of [#100DaysToOffload](https://100daystooffload.com/).
