import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, expect, it } from "vitest";
import Experience from "./Experience.astro";

const jobs = [
  {
    title: "Senior Software Engineer",
    company: "Acme Corp",
    companyHref: "https://acme.example.com",
    location: "Remote",
    startDate: "2022-01",
    endDate: "Present",
    achievements: [
      "Led migration to microservices",
      "Cut **p99 latency** by 40%",
    ],
    stack: ["Ruby", "Rails", "React"],
  },
  {
    title: "Software Engineer",
    company: "Beta Inc",
    companyHref: "#",
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

  it("splits entry-head: title+company left, location+dates right", async () => {
    const html = await render();
    const titleIdx = html.indexOf("Senior Software Engineer");
    const companyIdx = html.indexOf("Acme Corp");
    const locationIdx = html.indexOf("Remote");
    const datesIdx = html.indexOf("2022-01");
    expect(companyIdx).toBeGreaterThan(titleIdx);
    expect(datesIdx).toBeGreaterThan(locationIdx);
  });

  it("does not bold company (medium weight only)", async () => {
    const html = await render();
    const companyMatch = html.match(/<[^>]*>Acme Corp<\/[^>]*>/)?.[0] ?? "";
    expect(companyMatch).not.toContain("font-bold");
    expect(companyMatch).toContain("font-medium");
  });

  it("renders achievement bullets as dash-prefixed paragraphs, not a list", async () => {
    const html = await render();
    expect(html).not.toContain("<ul");
    expect(html).not.toContain("<li");
    expect(html).toContain("Led migration to microservices");
    expect(html).toContain("Built payments pipeline");
  });

  it("supports bold inline emphasis inside bullets", async () => {
    const html = await render();
    expect(html).toContain("<b>p99 latency</b>");
  });

  it("renders stack tags after achievements, extra spacing, italic", async () => {
    const html = await render();
    const achievementsIdx = html.indexOf("p99 latency");
    const stackIdx = html.indexOf("Ruby");
    expect(stackIdx).toBeGreaterThan(achievementsIdx);
    expect(html).toContain("React");
    const stackMatch = html.match(/<p[^>]*>Stack:[^<]*Ruby[\s\S]*?<\/p>/)?.[0];
    expect(stackMatch).toContain("italic");
  });

  it("renders company as a real link, opening external hrefs in a new tab", async () => {
    const html = await render();
    const companyAnchor = html.match(
      /<a[^>]*>(?:(?!<\/a>).)*?Acme Corp(?:(?!<\/a>).)*?<\/a>/s,
    )?.[0];
    expect(companyAnchor).toBeDefined();
    expect(companyAnchor).toContain('href="https://acme.example.com"');
    expect(companyAnchor).toContain('target="_blank"');

    const placeholderAnchor = html.match(
      /<a[^>]*>(?:(?!<\/a>).)*?Beta Inc(?:(?!<\/a>).)*?<\/a>/s,
    )?.[0];
    expect(placeholderAnchor).not.toContain('target="_blank"');
  });

  it("renders jobs in the order given (newest first)", async () => {
    const html = await render();
    const firstIdx = html.indexOf("Acme Corp");
    const secondIdx = html.indexOf("Beta Inc");
    expect(firstIdx).toBeGreaterThanOrEqual(0);
    expect(secondIdx).toBeGreaterThan(firstIdx);
  });
});
