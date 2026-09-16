// Astro's BASE_URL never has a trailing slash (e.g. "/resume", not
// "/resume/"), so plain concatenation drops the separator - this is the
// exact bug that produced "https://.../resumenicolas-nisoria.pdf" earlier.
// Omit `path` (or pass "") for the base itself, with no trailing slash.
export function withBase(path: string = ""): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return path ? `${base}/${path}` : base;
}
