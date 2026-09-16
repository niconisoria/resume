import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, expect, it } from "vitest";
import ThemeToggle from "./ThemeToggle.astro";
import source from "./ThemeToggle.astro?raw";

async function render() {
  const container = await AstroContainer.create();
  return container.renderToString(ThemeToggle);
}

describe("ThemeToggle", () => {
  it("renders a fixed-position button with an accessible name", async () => {
    const html = await render();
    expect(html).toMatch(/<button[^>]*class="[^"]*fixed[^"]*"/);
    expect(html).toMatch(/<button[^>]*aria-label="[^"]+"/);
  });

  it("renders sun and moon icon markup", async () => {
    const html = await render();
    expect(html).toContain("<svg");
    expect((html.match(/<svg/g) ?? []).length).toBeGreaterThanOrEqual(2);
  });

  it("ships a client script bundled from this component", async () => {
    const html = await render();
    expect(html).toMatch(
      /<script[^>]*type="module"[^>]*ThemeToggle\.astro[^>]*>/,
    );
  });

  it("persists the toggled theme to localStorage", () => {
    expect(source).toContain("localStorage");
  });
});
