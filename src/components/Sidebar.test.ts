import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, expect, it } from "vitest";
import Sidebar from "./Sidebar.astro";

const props = {
  languages: {
    caption: "Commercial experience / years",
    items: [
      { label: "Ruby/Rails", years: 7 },
      { label: "JavaScript", years: 12 },
    ],
  },
  frameworks: {
    caption: "Production use / years",
    items: [{ label: "Astro", years: 1 }],
  },
  education: [
    {
      degree: "MSc Systems Engineering",
      institution: "Universidad Tecnológica Nacional",
      institutionHref: "https://www.utn.edu.ar",
      startDate: "2015",
      endDate: "2020",
    },
  ],
  certificates: {
    items: [
      { label: "Anthropic — Introduction to agent skills", href: "#" },
      { label: "Anthropic — Introduction to subagents", href: "#" },
    ],
  },
  selectedWork: [
    {
      company: "Personal project",
      project: "SCIM Bridge",
      href: "https://github.com/niconisoria/scim-bridge",
    },
    { company: "Acme Corp", project: "Internal tool", href: "#" },
  ],
};

async function render() {
  const container = await AstroContainer.create();
  return container.renderToString(Sidebar, { props });
}

describe("Sidebar", () => {
  it("renders all 5 sections in order", async () => {
    const html = await render();
    const order = [
      "Education",
      "Certificates",
      "Languages",
      "Frameworks",
      "Selected Work",
    ].map((label) => html.indexOf(label));
    expect(order.every((i) => i !== -1)).toBe(true);
    expect(order).toEqual([...order].sort((a, b) => a - b));
  });

  it("renders education entry with dates, and certificates as a plain label list", async () => {
    const html = await render();
    expect(html).toContain("MSc Systems Engineering");
    expect(html).toContain("Universidad Tecnológica Nacional");
    expect(html).toContain("2015");
    expect(html).toContain("2020");
    expect(html).toContain("Anthropic — Introduction to agent skills");
    expect(html).toContain("Anthropic — Introduction to subagents");
  });

  it("renders languages and frameworks with their own captions", async () => {
    const html = await render();
    expect(html).toContain("Commercial experience / years");
    expect(html).toContain("Production use / years");
    expect(html).toContain("Ruby/Rails");
    expect(html).toContain("Astro");
  });

  it("renders selected-work items with company separated from the project link", async () => {
    const html = await render();
    for (const item of props.selectedWork) {
      expect(html).toContain(item.company);
      expect(html).toContain(item.project);
      expect(html).toContain(`href="${item.href}"`);
    }
    const listItem = html.match(
      /<li>(?:(?!<\/li>).)*?SCIM Bridge(?:(?!<\/li>).)*?<\/li>/s,
    )?.[0];
    expect(listItem).toBeDefined();
    const companySpan = listItem?.match(
      /<span class="[^"]*">Personal project \/ <\/span>/,
    )?.[0];
    expect(companySpan).toContain("text-ink-500");
    const linkAnchor = listItem?.match(/<a[^>]*>[\s\S]*?SCIM Bridge/)?.[0];
    expect(linkAnchor).toBeDefined();
  });

  it('keeps selected-work "#" links inert while opening real links in a new tab', async () => {
    const html = await render();
    const workIndex = html.indexOf("Selected Work");
    const workBlock = html.slice(workIndex);

    const realLinkAnchor =
      workBlock.match(
        /<a[^>]*>(?:(?!<\/a>).)*?SCIM Bridge(?:(?!<\/a>).)*?<\/a>/s,
      )?.[0] ?? "";
    expect(realLinkAnchor).toContain('target="_blank"');

    const placeholderAnchor =
      workBlock.match(
        /<a[^>]*>(?:(?!<\/a>).)*?Internal tool(?:(?!<\/a>).)*?<\/a>/s,
      )?.[0] ?? "";
    expect(placeholderAnchor).not.toContain('target="_blank"');
  });

  it("applies the sidebar tint and section spacing", async () => {
    const html = await render();
    expect(html).toMatch(/class="[^"]*bg-navy-100[^"]*"/);
    expect(html).toMatch(/class="[^"]*space-y-6[^"]*"/);
  });

  it("is driven entirely by props, not hardcoded", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Sidebar, {
      props: {
        ...props,
        education: [
          {
            degree: "A different degree entirely",
            institution: "A different school",
            institutionHref: "#",
            startDate: "1999",
            endDate: "2003",
          },
        ],
      },
    });
    expect(html).toContain("A different degree entirely");
  });
});
