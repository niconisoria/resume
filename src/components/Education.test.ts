import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, expect, it } from "vitest";
import Education from "./Education.astro";

const items = [
  {
    degree: "MSc Systems Engineering",
    institution: "Universidad Tecnológica Nacional",
    startDate: "2015",
    endDate: "2020",
  },
];

async function render() {
  const container = await AstroContainer.create();
  return container.renderToString(Education, { props: { items } });
}

describe("Education", () => {
  it("renders the section label and every entry", async () => {
    const html = await render();
    expect(html).toContain("Education");
    expect(html).toContain("MSc Systems Engineering");
    expect(html).toContain("Universidad Tecnológica Nacional");
  });

  it("renders the start–end date range", async () => {
    const html = await render();
    expect(html).toContain("2015");
    expect(html).toContain("2020");
  });

  it("highlights the institution differently from the degree", async () => {
    const html = await render();
    const degreeMatch =
      html.match(/<[^>]*>MSc Systems Engineering<\/[^>]*>/)?.[0] ?? "";
    const institutionMatch =
      html.match(/<[^>]*>Universidad Tecnológica Nacional<\/[^>]*>/)?.[0] ?? "";
    const degreeClass = degreeMatch.match(/class="([^"]*)"/)?.[1] ?? "";
    const institutionClass =
      institutionMatch.match(/class="([^"]*)"/)?.[1] ?? "";
    expect(institutionClass).not.toBe(degreeClass);
    expect(institutionClass).toContain("font-medium");
  });

  it("renders multiple entries when given", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Education, {
      props: {
        items: [
          ...items,
          {
            degree: "BSc Computer Science",
            institution: "Some University",
            startDate: "2010",
            endDate: "2014",
          },
        ],
      },
    });
    expect(html).toContain("BSc Computer Science");
    expect(html).toContain("Some University");
  });
});
