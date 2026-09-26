import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, expect, it } from "vitest";
import LangToggle from "./LangToggle.astro";
import source from "./LangToggle.astro?raw";

async function render() {
  const container = await AstroContainer.create();
  return container.renderToString(LangToggle);
}

describe("LangToggle", () => {
  it("renders a fixed-position button with an accessible name", async () => {
    const html = await render();
    expect(html).toMatch(/<button[^>]*class="[^"]*fixed[^"]*"/);
    expect(html).toMatch(/<button[^>]*aria-label="[^"]+"/);
  });

  it("renders EN and PL option markup", async () => {
    const html = await render();
    expect(html).toContain("EN");
    expect(html).toContain("PL");
  });

  it("ships a client script bundled from this component", async () => {
    const html = await render();
    expect(html).toMatch(
      /<script[^>]*type="module"[^>]*LangToggle\.astro[^>]*>/,
    );
  });

  it("persists the toggled language to localStorage", () => {
    expect(source).toContain("localStorage");
  });

  it("sets the lang on the document element, not just component state", () => {
    expect(source).toContain("documentElement.dataset.lang");
  });
});
