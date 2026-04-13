# CSS Cleanup: Split the Monolith

## Problem

The site's SCSS is structurally messy:

- `styles/index.scss` is a ~570-line monolith mixing design tokens, resets, typography, form controls, tables, code blocks, media, and component-like rules.
- `styles/foundation/base.scss` duplicates many of the same concerns (body, font stack, img, table, link colors, `strong`).
- Dead code exists: `.flex` and `.notice` classes are defined but never referenced in any template.
- Several `body > header`, `body > footer`, `body > *` selectors assume direct-child DOM structure, but Next.js wraps everything in `#__next > section.layout`, so they never match.
- One hard-coded color (`#aaaaaa`) bypasses the design token system.
- `--standard-border-radius` is referenced but never defined.

## Goals

- **Maintainability**: each file has one clear purpose; easy to locate any style.
- **Minimalism**: remove dead code and duplicates; reduce total line count.
- **Consistency**: all colors and values use CSS custom properties; no hard-coded exceptions.

## New File Structure

```
styles/
  index.scss                   # Only @imports (~3 lines)
  foundation/
    index.scss                 # Barrel: tokens, reset, base
    tokens.scss                # :root CSS custom properties + dark theme overrides
    reset.scss                 # box-sizing, appearance resets, prefers-reduced-motion
    base.scss                  # html, body, main, typography (h1–h6), links, lists, strong
  elements/
    index.scss                 # Barrel: all element partials
    tables.scss                # table, td, th, tr, caption
    forms.scss                 # textarea, select, input, button, label, checkbox/radio, etc.
    code.scss                  # code, pre, kbd, samp, p code
    media.scss                 # img, video, figure, figcaption, blockquote, cite, dt
    misc.scss                  # hr, mark, aside, details/summary, section, abbr, progress
  components/
    index.scss                 # Barrel (unchanged)
    header.scss                # Unchanged
    footer.scss                # Absorbs orphaned body > footer rules, retargeted to .footer
    page.scss                  # Unchanged
    blog-list.scss             # Fix #aaaaaa → var(--text-light)
    tag-list.scss              # Unchanged
    horizontal-list.scss       # Unchanged
    layout.scss                # Unchanged
```

## Content Mapping

### `foundation/tokens.scss`

Source: `index.scss` lines 5–43.

- `:root` block with all CSS custom properties (`--sans-font`, `--mono-font`, `--bg`, `--accent-bg`, `--text`, `--text-light`, `--border`, `--accent`, `--code`, `--preformatted`, `--marked`, `--disabled`).
- `@media (prefers-color-scheme: dark)` block overriding those variables, plus `img, video { opacity: 0.8 }`.
- Dark-mode scrollbar colors and external-link icon filter (from old `base.scss` lines 115–125).

### `foundation/reset.scss`

Source: `index.scss` lines 46–60, `base.scss` lines 12–16.

- `*, *::before, *::after { box-sizing: border-box }`.
- `textarea, select, input, progress { appearance: none }`.
- `@media (prefers-reduced-motion) { * { transition: none !important } }`.

### `foundation/base.scss` (merged from both old files)

Source: `index.scss` lines 62–188, `base.scss` lines 1–106.

Consolidated rules (deduplication applied):

- `html`: `font-family: var(--sans-font)`, `scroll-behavior: smooth`.
- `body`: single rule with `color`, `background-color`, `font-size: 1.15rem`, `line-height: 1.5`, `margin: 0`, `overflow-x: hidden`, `-webkit-font-smoothing`, `-moz-osx-font-smoothing`. No CSS grid (the `body > *` grid layout is removed — it doesn't match the actual DOM).
- `a, a:visited { color: var(--accent) }`, `a:hover { text-decoration: none }`. The old `base.scss` link rules (`color: inherit`, `opacity` hover) are dropped in favor of the accent-color approach.
- `h1`–`h6` sizes, `overflow-wrap: break-word`, `line-height: 1.1` for h1–h3.
- `@media (max-width: 720px)` responsive heading sizes.
- `strong { font-weight: bold }` — once.
- Lists: `ul`, `ol` margins (from old `base.scss`), nested `li > ol/ul` spacing, `li *:last-child`, `li > p`.
- `main { padding-top: 1.5rem }`.

### `elements/tables.scss`

Source: `index.scss` lines 322–350.

- `table { border-collapse: collapse; display: block; margin; overflow: auto; width: 100% }`.
- `td, th` borders and padding.
- `th` background.
- `tr:nth-child(even)` zebra striping.
- `table caption`.
- The simpler duplicate table rule from old `base.scss` (lines 81–84) is dropped.

### `elements/forms.scss`

Source: `index.scss` lines 189–453.

- Button/submit/reset styling and disabled states.
- `textarea, select, input` shared styling.
- Select dropdown arrow (background-image gradient).
- Checkbox and radio custom styling (`:checked`, `::after` pseudo-elements).
- `@media (max-width: 720px)` full-width inputs.
- Color input height, file input border reset, range input padding.
- `label { display: block }`, conditional `display: inline-block` for checkbox/radio labels.

### `elements/code.scss`

Source: `index.scss` lines 506–536, `base.scss` lines 47–49.

- `code, pre, pre span, kbd, samp { font-family: var(--mono-font); color: var(--code) }`.
- `kbd` border styling.
- `pre` padding, overflow, color.
- `pre code` reset.
- `p code { padding; white-space: pre }` (from old `base.scss`).

### `elements/media.scss`

Source: `index.scss` lines 469–503.

- `img, video { max-width: 100%; height: auto; border-radius: 5px }`. This is the single canonical location for img/video sizing (consolidated from duplicates in old `base.scss` and `index.scss`).
- `figure { margin: 0; text-align: center }`.
- `figcaption` font-size, color, margin.
- `blockquote` margin, padding, border-left, color, font-style.
- `cite` font-size, color.
- `dt { color: var(--text-light) }`.

### `elements/misc.scss`

Source: `index.scss` lines 250–319, 456–467, 541–568.

- `aside, details, pre, progress` shared box styling (background, border, border-radius, margin-bottom).
- `aside` float/width + `@media (max-width: 720px)` full-width.
- `section` borders, padding, chaining rules (`section + section`, `:first-child`, `:last-child`).
- `details`, `summary` toggle styling.
- `hr { border: none; height: 1px; background: var(--border) }`.
- `mark { padding; border-radius; background-color: var(--marked) }`.
- `abbr[title]` cursor and underline.
- `progress` bars with all vendor pseudo-element prefixes.

### Component changes

- **`footer.scss`**: absorb `margin-top: 4rem`, `padding`, `color: var(--text-light)`, `font-size: 0.9rem`, `text-align: center`, `border-top` from the orphaned `body > footer` rule — retargeted to `.footer` selector.
- **`blog-list.scss`**: replace `#aaaaaa` with `var(--text-light)`.
- All other component files unchanged.

## Deleted Code

| What | Why |
|------|-----|
| `.flex { display: flex }` (utility.scss) | Never used in any template |
| `.notice { ... }` (base.scss) | Never used; references undefined `--standard-border-radius` |
| `body > *`, `body > header`, `body > footer` grid rules (index.scss) | Don't match the `#__next > section.layout` DOM tree |
| Duplicate `strong { font-weight: bold }` (base.scss, twice) | Consolidated to one in new base.scss |
| Duplicate `img { max-width: 100% }` (base.scss) | Consolidated into media.scss |
| Duplicate `body { margin: 0; font-size: 1.15rem }` (base.scss) | Merged into single body rule |
| Duplicate `table { border-collapse; width }` (base.scss) | Consolidated into tables.scss |
| Old `a { color: inherit }` + opacity hover (base.scss) | Replaced by accent-color link approach |
| `foundation/utility.scss` | File deleted entirely (only contained `.flex`) |

## Import Order

```scss
// styles/index.scss
@import "foundation/index";  // tokens → reset → base
@import "elements/index";    // tables, forms, code, media, misc
@import "components/index";  // header, footer, page, blog-list, tag-list, horizontal-list, layout
```

Tokens first ensures CSS custom properties are defined before anything references them. Reset before base ensures box-sizing and appearance resets apply before element styling. Elements before components ensures base element styles exist before component-scoped overrides.

## Risk Mitigation

- **No functional changes**: every kept rule retains its original selector and property values (except the fixes noted above).
- **Import order preserved**: foundation → elements → components mirrors the current foundation → (inline rules) → components order.
- **Visual regression check**: after implementation, verify the site builds and key pages (index, a blog post, tags page) render identically.
