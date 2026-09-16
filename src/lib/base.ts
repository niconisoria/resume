// Astro's BASE_URL never has a trailing slash (e.g. "/resume", not
// "/resume/"), so plain concatenation drops the separator - this is the
// exact bug that produced "https://.../resumenicolas-nisoria.pdf" earlier.
export function withBase(path: string): string {
  return `${import.meta.env.BASE_URL.replace(/\/$/, "")}/${path}`;
}
