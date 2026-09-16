import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, expect, it } from "vitest";
import Experience from "./Experience.astro";

const jobs = [
  {
    title: "Senior Software Engineer",
    company: "Acme Corp",
    location: "Remote",
    startDate: "2022-01",
    endDate: "Present",
    achievements: ["Led migration to microservices", "Cut latency by 40%"],
    stack: ["Ruby", "Rails", "React"],
  },
  {
    title: "Software Engineer",
    company: "Beta Inc",
    location: "Buenos Aires, AR",
    startDate: "2018-03",
    endDate: "2022-12",
    achievements: ["Built payments pipeline"],
    stack: ["Python", "FastAPI"],
  },
];

async function render(props: { jobs: typeof jobs } = { jobs }) {
  const container = await AstroContainer.create();
  return container.renderToString(Experience, { props });
}

describe("Experience", () => {
  it("renders the section label and job title/company/dates", async () => {
    const html = await render();
    expect(html).toContain("Experience");
    expect(html).toContain("Senior Software Engineer");
    expect(html).toContain("Acme Corp");
    expect(html).toContain("Remote");
    expect(html).toContain("2022-01");
    expect(html).toContain("Present");
  });

  it("renders achievement bullets", async () => {
    const html = await render();
    expect(html).toContain("Led migration to microservices");
    expect(html).toContain("Cut latency by 40%");
  });

  it("bolds title and company", async () => {
    const html = await render();
    const titleMatch =
      html.match(/<[^>]*>Senior Software Engineer<\/[^>]*>/)?.[0] ?? "";
    const companyMatch = html.match(/<[^>]*>Acme Corp<\/[^>]*>/)?.[0] ?? "";
    expect(titleMatch).toContain("font-bold");
    expect(companyMatch).toContain("font-bold");
  });

  it("renders stack tags after achievements", async () => {
    const html = await render();
    const achievementsIdx = html.indexOf("Cut latency by 40%");
    const stackIdx = html.indexOf("Ruby");
    expect(stackIdx).toBeGreaterThan(achievementsIdx);
    expect(html).toContain("React");
  });

  it("renders jobs in the order given (newest first)", async () => {
    const html = await render();
    const firstIdx = html.indexOf("Acme Corp");
    const secondIdx = html.indexOf("Beta Inc");
    expect(firstIdx).toBeGreaterThanOrEqual(0);
    expect(secondIdx).toBeGreaterThan(firstIdx);
  });
});
