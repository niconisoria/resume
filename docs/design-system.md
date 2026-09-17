# Design System

## Color

Palette inspired by a Strandberg guitar's blue-burst flame top: deep sapphire at the edges fading to a lighter cyan-blue center, near-black ebony/hardware, white trim.

| Token      | Hex       | Use                                                                                                                                                                                                                                                                                                                                                                                |
| ---------- | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `navy-900` | `#0A2A46` | Name/display heading text                                                                                                                                                                                                                                                                                                                                                          |
| `navy-700` | `#1B63A6` | Section labels, links, entry subtitles (company/project) — any text usage needs this shade, not `navy-500`                                                                                                                                                                                                                                                                         |
| `navy-500` | `#4FA3DC` | Large-scale/non-text accents only (hover backgrounds, decorative fills) — fails WCAG AA text contrast against `paper` (~2.65:1), never use for text                                                                                                                                                                                                                                |
| `navy-100` | `#E3F0FB` | Divider rule under name, subtle backgrounds                                                                                                                                                                                                                                                                                                                                        |
| `navy-200` | `#C9DFF2` | `ActionLink` underline, `ThemeToggle` border — sidebar itself uses plain spacing between sections now, not a divider rule                                                                                                                                                                                                                                                          |
| `ink-900`  | `#141414` | Body text                                                                                                                                                                                                                                                                                                                                                                          |
| `ink-500`  | `#5C5C5C` | Secondary text (dates, environment lines)                                                                                                                                                                                                                                                                                                                                          |
| `paper`    | `#FCFAF6` | Page background — warm off-white, not pure white                                                                                                                                                                                                                                                                                                                                   |
| `wood-500` | `#C9852E` | Secondary accent (guitar neck): name-underline rule, bullet dash marker, section/column divider rules. Same value in light and dark mode — no separate dark variant, a richer/more saturated amber reads distinctly on both `paper` and `paper-dark` without needing per-theme tuning. Never a second primary _fill/text_ accent alongside blue — stays confined to rules/markers. |

Tailwind: register as `theme.colors.navy` / `theme.colors.ink` scale (v4 `@theme` block in `global.css`).

### Dark mode (screen only)

| Token                    | Hex       | Use                                                                                                                                                                                                                                                                                                                    |
| ------------------------ | --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `paper-dark`             | `#0D1116` | Page background                                                                                                                                                                                                                                                                                                        |
| `navy-900-dark`          | `#DCEEFB` | Name/display heading text — must be redefined here, `navy-900` alone is unreadable on a dark ground                                                                                                                                                                                                                    |
| `navy-100-dark`          | `#1B3A5C` | Sidebar tint — bumped lighter than a straight dark-scale-down so the panel reads as a distinct block against `paper-dark`'s near-black, not a floating disconnected card                                                                                                                                               |
| `navy-200-dark`          | `#5A93C4` | `ActionLink` underline, `ThemeToggle` border — brightened from a straight dark-scale-down (`#25456B`) which was originally the sidebar's divider rule and nearly invisible against `navy-100-dark`; sidebar has since dropped dividers for plain spacing, but the token stayed bright since the other two uses need it |
| `navy-500-dark` (accent) | `#6FB6E8` | Section labels, links, subtitles — lightened for contrast on dark bg                                                                                                                                                                                                                                                   |
| `ink-900-dark`           | `#EDEDED` | Body text                                                                                                                                                                                                                                                                                                              |
| `ink-500-dark`           | `#9AA3AE` | Secondary text                                                                                                                                                                                                                                                                                                         |

Defaults to `prefers-color-scheme: dark`, overridable via a fixed corner toggle button; choice persists in `localStorage`.

**Not yet implemented:** the page exists to be printed/PDF'd, so printing/exporting while dark mode is active should force the light palette via `@media print` — no such override exists in `global.css` yet, printing currently follows whatever theme is active on screen.

## Typography

| Role                      | Font                                      | Weight | Size                     |
| ------------------------- | ----------------------------------------- | ------ | ------------------------ |
| Display (name)            | `Fraunces`                                | 700    | —                        |
| Section label             | System sans (Tailwind default), uppercase | 600    | `text-xs`                |
| Body (prose, main column) | System sans                               | 400    | `text-sm`                |
| Sidebar content (all)     | System sans                               | 400    | `text-xs`                |
| Entry title               | System sans                               | 700    | —                        |
| Subtitle                  | System sans, `navy-700`                   | 500    | —                        |
| Caption/meta              | System sans                               | 400    | `text-2xs` (`0.6875rem`) |

Fraunces is the only loaded web font — plain `<link>` to Google Fonts in `Layout.astro`, applied via Tailwind's arbitrary-value `font-['Fraunces']` class on the name only. Everything else uses Tailwind's default sans stack (`ui-sans-serif, system-ui, ...`) — no Inter, no `@fontsource`, no registered `--font-display`/`--font-sans` theme tokens.

`text-2xs` is a registered token (`@theme` in `global.css`), not an arbitrary value.

Section label stays compact (`text-xs`) — distinguished from what's under it by weight/case/color (bold, uppercase, `navy-700`), not by being the biggest thing in the section. Everything inside the sidebar is `text-xs` — the sidebar is scannable reference material, not reading prose. Content pieces are distinguished from each other by color/style (plain `ink-900` vs `navy-700` subtitle vs underlined `navy-700` link — link and subtitle share a color, so the underline is what marks a link), not by size. Only the main column's flowing prose (Experience/Projects bullets) stays at Body's `text-sm`.

## Layout

Single page, fits one printed sheet (letter/A4) — page margins small (~0.4in / `p-4`–`p-6`), no wasted whitespace.

Two-column: main column (left, ~65-70% width) + sidebar (right, ~30-35% width).

- Name + contact row span full width, header above both columns. Thin `wood-500` rule beneath — the one warm accent against the otherwise all-blue palette.
- Main column: narrative/detail sections.
- Sidebar column: short/scannable highlight sections, `navy-100` background tint to visually separate from main column.
- Section labels: uppercase, `navy-700`, small-caps feel, margin-top small / margin-bottom tight. Main column: thin `wood-500` divider rule above (except the first section). Sidebar: plain `space-y-6` between sections instead — a divider rule read as too heavy/cluttered at 5 back-to-back sections in a narrow column.
- Links (`ActionLink`): always underlined (`decoration-navy-200`, `hover:decoration-navy-700`) — color alone doesn't survive print/grayscale, so links must stay visually distinct from plain colored text (e.g. entry subtitle/company in `navy-700`) by more than hue.
- Entry header: title (bold, `ink-900`) + subtitle (company/project, `navy-700`, one line below) on the left; location + date range right-aligned on the same two lines.
- Bullets: `—` (em dash) marker in `wood-500`, one per paragraph, not `•`. `**bold**` markdown-lite (`renderBullet()`) becomes a semantic `<b>`, inheriting the bullet's `ink-900` — no explicit weight/color class needed.
- Stack line: trailing italic line per entry, separated from the bullets above with extra top margin (not flush against the last bullet), `ink-500` label ("Stack:") + comma-separated list, `ink-500`.
- Sidebar skill items: plain text, label + optional `/ Nyrs` suffix; no pill/badge treatment. Secondary/exploratory skills can be dot-separated on one line.

## Spacing

Tailwind default scale (4px base), compact. In practice: `space-y-6` between main-column/sidebar sections, `mt-2`/`mt-3` from a `SectionLabel` to its content, `mt-1` when there's no caption line buffering a label-to-link jump (Certificates, Selected Work), `gap-4`/`gap-8` for row/grid layouts.
