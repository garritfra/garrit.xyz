# CSS Cleanup Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Split the monolithic `styles/index.scss` into purpose-driven partials, remove dead code, deduplicate rules, and ensure all values use design tokens.

**Architecture:** The current single-import SCSS bundle (`_app.tsx` → `styles/index.scss`) is preserved. The import graph changes from `index.scss` importing `foundation/` and `components/` plus ~550 inline rules, to `index.scss` importing three barrel files (`foundation/`, `elements/`, `components/`) with zero inline rules. Every kept CSS rule retains its original selector and values except where noted as intentional fixes.

**Tech Stack:** Next.js 14 (Pages Router), Sass (Dart Sass 1.97.3), SCSS partials.

---

### Task 1: Create `foundation/tokens.scss`

**Files:**
- Create: `styles/foundation/tokens.scss`

- [ ] **Step 1: Create the tokens file**

Create `styles/foundation/tokens.scss` with the CSS custom properties and dark theme overrides extracted from `styles/index.scss`:

```scss
:root {
	--sans-font: -apple-system, BlinkMacSystemFont, "Avenir Next", Avenir,
		"Nimbus Sans L", Roboto, "Noto Sans", "Segoe UI", Arial, Helvetica,
		"Helvetica Neue", sans-serif;
	--mono-font: Consolas, Menlo, Monaco, "Andale Mono", "Ubuntu Mono", monospace;

	--bg: #fff;
	--accent-bg: #f5f7ff;
	--text: #212121;
	--text-light: #585858;
	--border: #898ea4;
	--accent: #0d47a1;
	--code: #d81b60;
	--preformatted: #444;
	--marked: #ffdd33;
	--disabled: #efefef;
}

@media (prefers-color-scheme: dark) {
	:root {
		color-scheme: dark;
		--bg: #212121;
		--accent-bg: #2b2b2b;
		--text: #dcdcdc;
		--text-light: #ababab;
		--accent: #ffb300;
		--code: #f06292;
		--preformatted: #ccc;
		--disabled: #111;
	}

	img,
	video {
		opacity: 0.8;
	}

	html {
		scrollbar-color: #dbd7db #161618 !important;
	}

	article a[href^="http"]::after,
	article a[href^="https://"]::after {
		filter: invert(100%);
	}
}
```

- [ ] **Step 2: Commit**

```bash
git add styles/foundation/tokens.scss
git commit -m "Extract CSS custom properties into foundation/tokens.scss"
```

---

### Task 2: Create `foundation/reset.scss`

**Files:**
- Create: `styles/foundation/reset.scss`

- [ ] **Step 1: Create the reset file**

Create `styles/foundation/reset.scss` with box-sizing, appearance resets, and reduced-motion preference:

```scss
*,
*::before,
*::after {
	box-sizing: border-box;
}

textarea,
select,
input,
progress {
	appearance: none;
	-webkit-appearance: none;
	-moz-appearance: none;
}

@media (prefers-reduced-motion) {
	* {
		transition: none !important;
	}
}
```

- [ ] **Step 2: Commit**

```bash
git add styles/foundation/reset.scss
git commit -m "Extract resets into foundation/reset.scss"
```

---

### Task 3: Create merged `foundation/base.scss`

**Files:**
- Create: `styles/foundation/base.scss` (replaces the old file)

This merges rules from the old `styles/foundation/base.scss` and `styles/index.scss`, deduplicating along the way. The old `base.scss` link rules (`color: inherit`, opacity hover) are dropped in favor of the accent-color approach. The `body > *` grid layout is dropped (doesn't match the `#__next` DOM). Duplicate `strong`, `img { max-width }`, `body { margin; font-size }` are consolidated.

- [ ] **Step 1: Write the new base file**

Replace `styles/foundation/base.scss` with:

```scss
html {
	font-family: var(--sans-font);
	scroll-behavior: smooth;
}

body {
	color: var(--text);
	background-color: var(--bg);
	font-size: 1.15rem;
	line-height: 1.5;
	margin: 0;
	overflow-x: hidden;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}

main {
	padding-top: 1.5rem;
}

a,
a:visited {
	color: var(--accent);
}

a:hover {
	text-decoration: none;
}

h1 {
	font-size: 3rem;
}

h2 {
	font-size: 2.6rem;
	margin-top: 3rem;
}

h3 {
	font-size: 2rem;
	margin-top: 3rem;
}

h4 {
	font-size: 1.44rem;
}

h5 {
	font-size: 1.15rem;
}

h6 {
	font-size: 0.96rem;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
	overflow-wrap: break-word;
}

h1,
h2,
h3 {
	line-height: 1.1;
}

@media only screen and (max-width: 720px) {
	h1 {
		font-size: 2.5rem;
	}

	h2 {
		font-size: 2.1rem;
	}

	h3 {
		font-size: 1.75rem;
	}

	h4 {
		font-size: 1.25rem;
	}
}

strong {
	font-weight: bold;
}

ul {
	margin: 0;
	list-style-position: outside;
	list-style-image: none;
}

ol {
	margin: 0;
	padding-bottom: 0;
	padding-right: 0;
	padding-top: 0;
	list-style-position: outside;
	list-style-image: none;
}

ol,
ul {
	margin-bottom: 1em;

	li {
		padding-left: 0;
	}
}

li {
	> ol {
		margin-left: 1.45rem;
		margin-bottom: calc(1.45rem / 2);
		margin-top: calc(1.45rem / 2);
	}

	> ul {
		margin-left: 1.45rem;
		margin-bottom: calc(1.45rem / 2);
		margin-top: calc(1.45rem / 2);
	}
}

li *:last-child {
	margin-bottom: 0;
}

li > p {
	margin-bottom: calc(1.45rem / 2);
}
```

- [ ] **Step 2: Commit**

```bash
git add styles/foundation/base.scss
git commit -m "Rewrite foundation/base.scss with merged, deduplicated rules"
```

---

### Task 4: Update `foundation/index.scss`

**Files:**
- Modify: `styles/foundation/index.scss`
- Delete: `styles/foundation/utility.scss`

The old barrel imported `utility` (dead `.flex` class) and `base`. The new barrel imports `tokens`, `reset`, `base` in that order.

- [ ] **Step 1: Rewrite the barrel file**

Replace `styles/foundation/index.scss` with:

```scss
@import "tokens";
@import "reset";
@import "base";
```

- [ ] **Step 2: Delete utility.scss**

```bash
rm styles/foundation/utility.scss
```

- [ ] **Step 3: Commit**

```bash
git add styles/foundation/index.scss
git rm styles/foundation/utility.scss
git commit -m "Update foundation barrel: add tokens + reset, remove dead utility"
```

---

### Task 5: Create `elements/tables.scss`

**Files:**
- Create: `styles/elements/tables.scss`

- [ ] **Step 1: Create the tables file**

Create `styles/elements/tables.scss`:

```scss
table {
	border-collapse: collapse;
	display: block;
	margin: 1.5rem 0;
	overflow: auto;
	width: 100%;
}

td,
th {
	border: 1px solid var(--border);
	text-align: left;
	padding: 0.5rem;
}

th {
	background-color: var(--accent-bg);
	font-weight: bold;
}

tr:nth-child(even) {
	background-color: var(--accent-bg);
}

table caption {
	font-weight: bold;
	margin-bottom: 0.5rem;
}
```

- [ ] **Step 2: Commit**

```bash
git add styles/elements/tables.scss
git commit -m "Extract table styles into elements/tables.scss"
```

---

### Task 6: Create `elements/forms.scss`

**Files:**
- Create: `styles/elements/forms.scss`

- [ ] **Step 1: Create the forms file**

Create `styles/elements/forms.scss`:

```scss
button,
[role="button"],
input[type="submit"],
input[type="reset"],
input[type="button"],
label[type="button"] {
	border: none;
	border-radius: 5px;
	background-color: var(--accent);
	font-size: 1rem;
	color: var(--bg);
	padding: 0.7rem 0.9rem;
	margin: 0.5rem 0;
}

button[disabled],
[role="button"][aria-disabled="true"],
input[type="submit"][disabled],
input[type="reset"][disabled],
input[type="button"][disabled],
input[type="checkbox"][disabled],
input[type="radio"][disabled],
select[disabled] {
	opacity: 0.5;
	cursor: not-allowed;
}

input:disabled,
textarea:disabled,
select:disabled {
	cursor: not-allowed;
	background-color: var(--disabled);
}

input[type="range"] {
	padding: 0;
}

button:focus,
button:enabled:hover,
[role="button"]:focus,
[role="button"]:not([aria-disabled="true"]):hover,
input[type="submit"]:focus,
input[type="submit"]:enabled:hover,
input[type="reset"]:focus,
input[type="reset"]:enabled:hover,
input[type="button"]:focus,
input[type="button"]:enabled:hover,
label[type="button"]:focus,
label[type="button"]:hover {
	filter: brightness(1.4);
	cursor: pointer;
}

textarea,
select,
input {
	font-size: inherit;
	font-family: inherit;
	padding: 0.5rem;
	margin-bottom: 0.5rem;
	color: var(--text);
	background-color: var(--bg);
	border: 1px solid var(--border);
	border-radius: 5px;
	box-shadow: none;
	max-width: 100%;
	display: inline-block;
}

label {
	display: block;
}

textarea:not([cols]) {
	width: 100%;
}

select:not([multiple]) {
	background-image: linear-gradient(45deg, transparent 49%, var(--text) 51%),
		linear-gradient(135deg, var(--text) 51%, transparent 49%);
	background-position: calc(100% - 15px), calc(100% - 10px);
	background-size: 5px 5px, 5px 5px;
	background-repeat: no-repeat;
	padding-right: 25px;
}

input[type="checkbox"],
input[type="radio"] {
	vertical-align: middle;
	position: relative;
	width: min-content;
}

input[type="checkbox"] + label,
input[type="radio"] + label {
	display: inline-block;
}

input[type="radio"] {
	border-radius: 100%;
}

input[type="checkbox"]:checked,
input[type="radio"]:checked {
	background-color: var(--accent);
}

input[type="checkbox"]:checked::after {
	content: " ";
	width: 0.18em;
	height: 0.32em;
	border-radius: 0;
	position: absolute;
	top: 0.05em;
	left: 0.17em;
	background-color: transparent;
	border-right: solid var(--bg) 0.08em;
	border-bottom: solid var(--bg) 0.08em;
	font-size: 1.8em;
	transform: rotate(45deg);
}

input[type="radio"]:checked::after {
	content: " ";
	width: 0.25em;
	height: 0.25em;
	border-radius: 100%;
	position: absolute;
	top: 0.125em;
	background-color: var(--bg);
	left: 0.125em;
	font-size: 32px;
}

@media only screen and (max-width: 720px) {
	textarea,
	select,
	input {
		width: 100%;
	}
}

input[type="color"] {
	height: 2.5rem;
	padding: 0.2rem;
}

input[type="file"] {
	border: 0;
}
```

- [ ] **Step 2: Commit**

```bash
git add styles/elements/forms.scss
git commit -m "Extract form styles into elements/forms.scss"
```

---

### Task 7: Create `elements/code.scss`

**Files:**
- Create: `styles/elements/code.scss`

- [ ] **Step 1: Create the code file**

Create `styles/elements/code.scss`:

```scss
code,
pre,
pre span,
kbd,
samp {
	font-family: var(--mono-font);
	color: var(--code);
}

kbd {
	color: var(--preformatted);
	border: 1px solid var(--preformatted);
	border-bottom: 3px solid var(--preformatted);
	border-radius: 5px;
	padding: 0.1rem 0.4rem;
}

pre {
	padding: 1rem 1.4rem;
	max-width: 100%;
	overflow: auto;
	color: var(--preformatted);
}

pre code {
	color: var(--preformatted);
	background: none;
	margin: 0;
	padding: 0;
}

p code {
	padding: 0.2em 0.35em;
	white-space: pre;
}
```

- [ ] **Step 2: Commit**

```bash
git add styles/elements/code.scss
git commit -m "Extract code/pre/kbd styles into elements/code.scss"
```

---

### Task 8: Create `elements/media.scss`

**Files:**
- Create: `styles/elements/media.scss`

- [ ] **Step 1: Create the media file**

Create `styles/elements/media.scss`:

```scss
img,
video {
	max-width: 100%;
	height: auto;
	border-radius: 5px;
}

figure {
	margin: 0;
	text-align: center;
}

figcaption {
	font-size: 0.9rem;
	color: var(--text-light);
	margin-bottom: 1rem;
}

blockquote {
	margin: 2rem 0;
	padding: 0.4rem 0.8rem;
	border-left: 0.35rem solid var(--accent);
	color: var(--text-light);
	font-style: italic;
}

cite {
	font-size: 0.9rem;
	color: var(--text-light);
	font-style: normal;
}

dt {
	color: var(--text-light);
}
```

- [ ] **Step 2: Commit**

```bash
git add styles/elements/media.scss
git commit -m "Extract media/blockquote/figure styles into elements/media.scss"
```

---

### Task 9: Create `elements/misc.scss`

**Files:**
- Create: `styles/elements/misc.scss`

- [ ] **Step 1: Create the misc file**

Create `styles/elements/misc.scss`:

```scss
aside,
details,
pre,
progress {
	background-color: var(--accent-bg);
	border: 1px solid var(--border);
	border-radius: 5px;
	margin-bottom: 1rem;
}

aside {
	font-size: 1rem;
	width: 30%;
	padding: 0 15px;
	margin-left: 15px;
	float: right;
}

@media only screen and (max-width: 720px) {
	aside {
		width: 100%;
		float: none;
		margin-left: 0;
	}
}

section {
	border-top: 1px solid var(--border);
	border-bottom: 1px solid var(--border);
	padding: 2rem 1rem;
	margin: 3rem 0;
}

section + section,
section:first-child {
	border-top: 0;
	padding-top: 0;
}

section:last-child {
	border-bottom: 0;
	padding-bottom: 0;
}

details {
	padding: 0.7rem 1rem;
}

summary {
	cursor: pointer;
	font-weight: bold;
	padding: 0.7rem 1rem;
	margin: -0.7rem -1rem;
	word-break: break-all;
}

details[open] > summary + * {
	margin-top: 0;
}

details[open] > summary {
	margin-bottom: 0.5rem;
}

details[open] > :last-child {
	margin-bottom: 0;
}

hr {
	border: none;
	height: 1px;
	background: var(--border);
	margin: 1rem auto;
}

mark {
	padding: 2px 5px;
	border-radius: 4px;
	background-color: var(--marked);
}

abbr[title] {
	cursor: help;
	text-decoration-line: underline;
	text-decoration-style: dotted;
}

progress {
	width: 100%;
}

progress:indeterminate {
	background-color: var(--accent-bg);
}

progress::-webkit-progress-bar {
	border-radius: 5px;
	background-color: var(--accent-bg);
}

progress::-webkit-progress-value {
	border-radius: 5px;
	background-color: var(--accent);
}

progress::-moz-progress-bar {
	border-radius: 5px;
	background-color: var(--accent);
	transition-property: width;
	transition-duration: 0.3s;
}

progress:indeterminate::-moz-progress-bar {
	background-color: var(--accent-bg);
}
```

- [ ] **Step 2: Commit**

```bash
git add styles/elements/misc.scss
git commit -m "Extract aside/details/section/hr/mark/progress into elements/misc.scss"
```

---

### Task 10: Create `elements/index.scss` barrel

**Files:**
- Create: `styles/elements/index.scss`

- [ ] **Step 1: Create the barrel file**

Create `styles/elements/index.scss`:

```scss
@import "tables";
@import "forms";
@import "code";
@import "media";
@import "misc";
```

- [ ] **Step 2: Commit**

```bash
git add styles/elements/index.scss
git commit -m "Add elements barrel index.scss"
```

---

### Task 11: Fix component files

**Files:**
- Modify: `styles/components/footer.scss`
- Modify: `styles/components/blog-list.scss`

- [ ] **Step 1: Update footer.scss to absorb orphaned body > footer rules**

Replace `styles/components/footer.scss` with:

```scss
.footer {
	margin-top: 4rem;
	padding: 2rem 1rem 1.5rem;
	color: var(--text-light);
	font-size: 0.9rem;
	text-align: center;
	border-top: 1px solid var(--border);

	&__content {
		text-align: left;
		margin-bottom: 3rem;
	}

	section {
		min-width: 250px;
		border-bottom: none;
	}

	a {
		text-decoration: underline;
	}
}
```

- [ ] **Step 2: Fix hard-coded color in blog-list.scss**

In `styles/components/blog-list.scss`, replace `color: #aaaaaa;` with `color: var(--text-light);`.

The full file becomes:

```scss
.blog__list {
	&__post {
		margin-bottom: 1.5em;
		&__date {
			margin-bottom: 0;
			font-size: 0.9rem;
			color: var(--text-light);
		}
	}
}
```

- [ ] **Step 3: Commit**

```bash
git add styles/components/footer.scss styles/components/blog-list.scss
git commit -m "Fix footer.scss (absorb orphaned rules) and blog-list.scss (use token)"
```

---

### Task 12: Rewrite top-level `index.scss` and verify build

**Files:**
- Modify: `styles/index.scss`

This is the final step: replace the 569-line monolith with a 3-line barrel, then verify the site builds.

- [ ] **Step 1: Rewrite index.scss**

Replace the entire contents of `styles/index.scss` with:

```scss
@import "foundation/index";
@import "elements/index";
@import "components/index";
```

- [ ] **Step 2: Install dependencies and build the site**

```bash
npm install
npm run build
```

Expected: build succeeds with no SCSS compilation errors. Check terminal output for warnings.

- [ ] **Step 3: Commit**

```bash
git add styles/index.scss
git commit -m "Replace monolithic index.scss with 3-line barrel import"
```

- [ ] **Step 4: Final verification — start dev server and check key pages**

```bash
npm run dev
```

Open in browser and visually verify:
- Home page (`/`)
- A blog post (e.g. `/posts/...` — pick any)
- Tags page (`/tags`)

Check that layout, colors, typography, header, footer, and dark mode all render correctly.
