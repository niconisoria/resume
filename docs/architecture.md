# Architecture

## Components

Component breakdown for the resume page (Astro, no React islands in use):

- `Layout` — page shell: meta/OG tags, font `<link>`, dark-mode init script (reads `localStorage`/`prefers-color-scheme` before paint), mounts `ThemeToggle`.
- `Header` — name, subtitle, row of `ActionLink`s (contact/social/CTA icons).
- `SectionLabel` — section heading. Reused by every section across main column and sidebar.
- `ActionLink` — generic `<a>` wrapper: external (`http`) links open in a new tab, everything else (`href="#"` placeholders) stays inert.
- `Experience` — main-column jobs list. Props: `jobs: { title, company, location, startDate, endDate, achievements: string[], stack: string[] }[]`. Caller owns sort order (no internal sorting). Delegates achievements/stack rendering to `EntryBody`.
- `Projects` — main-column personal-projects list, same shape minus `company`/`location`/dates. Props: `items: { title, achievements: string[], stack: string[] }[]`. Also delegates to `EntryBody`.
- `EntryBody` — shared achievements+stack markup for `Experience`/`Projects`: dash-prefixed `<p>` bullets (via `renderBullet()`), trailing "Stack:" line.
- `bullet.ts` — `renderBullet(text)`: HTML-escapes then converts `**bold**` markdown-lite to `<b>`.
- `Sidebar` — right-column wrapper. Renders `Education`, three `SkillList` instances (Certificates/Languages/Frameworks), and an inline Selected Work list (`ActionLink`s, no separate component).
- `Education` — degree/institution/date-range entries, supports multiple.
- `SkillList` — label + optional caption + list of `{ label, years?, href? }` (renders as link via `ActionLink` when `href` present, plain text otherwise) + optional secondary dot-separated line.
- `ThemeToggle` — fixed top-right icon button, trusts `Layout`'s head script for initial theme, only handles click-to-flip + `localStorage` persistence + label sync.

## Structural patterns

- Linear single-view page — no tabs, no collapsible/expandable sections.
- Main column: Summary → Experience → Projects, in that order. Sidebar: Education → Certificates → Languages → Frameworks → Selected Work.
- Array order = display order everywhere (`Experience`/`Projects`/`Education` don't sort internally) — caller passes data newest/most-relevant first.
- Stack tags live at the entry level (`Experience`/`Projects` via `EntryBody`), not globally.
- Dark mode: CSS custom-property overrides in `global.css`, keyed off `prefers-color-scheme`/`data-theme`, not component-level `dark:` variants.

Colors, typography, spacing, and other visual treatment live in `docs/design-system.md`, not here.
