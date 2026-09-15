# Architecture

## Components

Component breakdown for the resume page (React/Astro):

- `Header` — name, contact row.
- `SectionLabel` — uppercase section heading.
- `Sidebar` — right column wrapper (Layout's sidebar slot); lays out its children (`SkillList`, `PrincipleList`) with the tint/border treatment from `design-system.md`.
- `Entry` — one experience/project item.
  - props: `title`, `subtitle` (company/project), `location`, `dateRange`, `bullets` (array, each may contain inline bold spans), `stack` (optional array, rendered as trailing italic "Stack:" line).
  - layout: title+subtitle left / location+dateRange right-aligned, on the same two lines; bullets below as `—`-prefixed paragraphs, not a `<ul>` (matches non-list dash style).
- `SkillList` — sidebar skill/cert/education list.
  - props: `caption` (optional, e.g. "Commercial experience / years"), `items` (array of `{ label, years?: number }`).
  - `caption` renders once above the items, small/muted, explaining what the list measures.
  - plain text, no pill/badge treatment; optionally grouped as a single dot-separated line for a "side-project / exploratory" subgroup.
- `PrincipleList` — labeled list of principles/values, each item optionally an external link.
- `SelectedWork` — hyperlinked project entries, each tied back to a company/role (`Entry`).
- `ActionLink` — CTA button (PDF export, calendar booking, external profile link); rendered inline in `Header`.

## Structural patterns

- Linear single-view page — no tabs, no collapsible/expandable sections.
- Chronological grouping (`Entry` list ordered most-recent-first) drives Work Experience.
- Stack tags live at the `Entry` level, not globally.
- `Header` carries contact info plus a row of `ActionLink`s (social profiles, PDF export, booking link).
