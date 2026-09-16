import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, expect, it } from "vitest";
import Projects from "./Projects.astro";

const items = [
  {
    title: "SCIM Bridge",
    achievements: [
      "Python/FastAPI service translating Okta SCIM 2.0 requests into Brivo Access API calls",
      "Saga-based orchestrator with **automatic rollback**",
    ],
    stack: ["Python", "FastAPI", "Redis", "Docker"],
  },
  {
    title: "Second Project",
    achievements: ["Did a thing"],
    stack: ["Go"],
  },
];

async function render(props: { items: typeof items } = { items }) {
  const container = await AstroContainer.create();
  return container.renderToString(Projects, { props });
}

describe("Projects", () => {
  it("renders the section label and project titles", async () => {
    const html = await render();
    expect(html).toContain("Personal Projects");
    expect(html).toContain("SCIM Bridge");
    expect(html).toContain("Second Project");
  });

  it("renders no company/location/date row", async () => {
    const html = await render();
    expect(html).not.toContain("Remote");
    expect(html).not.toMatch(/\d{4}-\d{2}/);
  });

  it("renders achievement bullets as dash-prefixed paragraphs, not a list", async () => {
    const html = await render();
    expect(html).not.toContain("<ul");
    expect(html).not.toContain("<li");
    expect(html).toContain(
      "Python/FastAPI service translating Okta SCIM 2.0 requests into Brivo Access API calls",
    );
  });

  it("supports bold inline emphasis inside bullets", async () => {
    const html = await render();
    expect(html).toContain("<b>automatic rollback</b>");
  });

  it("renders stack line", async () => {
    const html = await render();
    expect(html).toContain("Python");
    expect(html).toContain("Go");
  });

  it("renders projects in the order given", async () => {
    const html = await render();
    const firstIdx = html.indexOf("SCIM Bridge");
    const secondIdx = html.indexOf("Second Project");
    expect(firstIdx).toBeGreaterThanOrEqual(0);
    expect(secondIdx).toBeGreaterThan(firstIdx);
  });
});
