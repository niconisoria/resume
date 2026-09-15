# Design System

## Color

Palette inspired by a Strandberg guitar's blue-burst flame top: deep sapphire at the edges fading to a lighter cyan-blue center, near-black ebony/hardware, white trim.

| Token | Hex | Use |
|---|---|---|
| `navy-900` | `#0A2A46` | Name/display heading text |
| `navy-700` | `#1B63A6` | Section labels, links |
| `navy-500` | `#4FA3DC` | Subtitles, hover state |
| `navy-100` | `#E3F0FB` | Divider rule under name, subtle backgrounds |
| `navy-200` | `#C9DFF2` | Sidebar divider rule — `navy-100` is the sidebar's own background, so its divider needs a step darker to actually show |
| `ink-900` | `#141414` | Body text |
| `ink-500` | `#5C5C5C` | Secondary text (dates, environment lines) |
| `paper` | `#FCFAF6` | Page background — warm off-white, not pure white |
| `wood-500` | `#C9975A` | Secondary accent (guitar neck) — spent sparingly: name-underline rule, bullet dash marker. Never a second primary accent alongside blue. |

Tailwind: register as `theme.colors.navy` / `theme.colors.ink` scale (v4 `@theme` block in `global.css`).

### Dark mode (screen only)

| Token | Hex | Use |
|---|---|---|
| `paper-dark` | `#0D1116` | Page background |
| `navy-900-dark` | `#DCEEFB` | Name/display heading text — must be redefined here, `navy-900` alone is unreadable on a dark ground |
| `navy-100-dark` | `#142A42` | Divider rule, sidebar tint |
| `navy-200-dark` | `#25456B` | Sidebar divider rule (same reasoning as light mode) |
| `navy-500-dark` (accent) | `#6FB6E8` | Section labels, links, subtitles — lightened for contrast on dark bg |
| `ink-900-dark` | `#EDEDED` | Body text |
| `ink-500-dark` | `#9AA3AE` | Secondary text |

Driven by `prefers-color-scheme: dark` (no toggle needed — resume is read, not configured). `@media print` always forces the light palette regardless of scheme, since the page exists to be printed/PDF'd.

## Typography

| Role | Font | Weight |
|---|---|---|
| Display (name) | `Fraunces` | 700 |
| Section label | `Inter`, uppercase, letter-spacing wide | 600 |
| Body | `Inter` | 400 |
| Entry title | `Inter` | 700 |
| Subtitle | `Inter`, italic or navy-500 | 500 |

Google Fonts, loaded via `@fontsource` (self-hosted, no external request at build/print time — matters for a printable page) or a `<link>` in `Layout.astro`. Register as `--font-display` / `--font-sans` in the Tailwind v4 `@theme` block in `global.css`.

## Layout

Single page, fits one printed sheet (letter/A4) — page margins small (~0.4in / `p-4`–`p-6`), no wasted whitespace.

Two-column: main column (left, ~65-70% width) + sidebar (right, ~30-35% width).

- Name + contact row span full width, header above both columns. Thin `wood-500` rule beneath — the one warm accent against the otherwise all-blue palette.
- Main column: narrative/detail sections.
- Sidebar column: short/scannable highlight sections, `navy-100` background tint to visually separate from main column.
- Section labels: uppercase, `navy-700`, small-caps feel, margin-top small / margin-bottom tight, thin divider rule above (except the first section in each column) — `navy-100` in the main column, `navy-200` in the sidebar (the sidebar's background already is `navy-100`).
- Entry header: title (bold, `ink-900`) + subtitle (company/project, `navy-500`, one line below) on the left; location + date range right-aligned on the same two lines.
- Bullets: `—` (em dash) marker in `wood-500`, one per paragraph, not `•`. Bold inline spans (`ink-900` on `font-semibold`) call out the key result within a bullet.
- Stack line: trailing italic line per entry, separated from the bullets above with extra top margin (not flush against the last bullet), `ink-500` label ("Stack:") + comma-separated list, `ink-500`.
- Sidebar skill items: plain text, label + optional `/ Nyrs` suffix; no pill/badge treatment. Secondary/exploratory skills can be dot-separated on one line.

## Spacing

Tailwind default scale (4px base), compact: section gap `mt-4`/`mt-5`, bullet line-height snug (`leading-snug`).

