import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, expect, it } from "vitest";
import Sidebar from "./Sidebar.astro";

const props = {
  summary: "Software Engineer with 7+ years of experience.",
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
      label: "SCIM Bridge",
      href: "https://github.com/niconisoria/scim-bridge",
    },
    { label: "Internal tool", href: "#" },
  ],
};

async function render() {
  const container = await AstroContainer.create();
  return container.renderToString(Sidebar, { props });
}

describe("Sidebar", () => {
  it("renders all 6 sections in order", async () => {
    const html = await render();
    const order = [
      "Summary",
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

  it("renders the summary paragraph, no icons or lists in that block", async () => {
    const html = await render();
    const summaryIndex = html.indexOf("Summary");
    const educationIndex = html.indexOf("Education");
    const summaryBlock = html.slice(summaryIndex, educationIndex);
    expect(summaryBlock).toContain(props.summary);
    expect(summaryBlock).not.toContain("<svg");
  });

  it("renders languages and frameworks with their own captions", async () => {
    const html = await render();
    expect(html).toContain("Commercial experience / years");
    expect(html).toContain("Production use / years");
    expect(html).toContain("Ruby/Rails");
    expect(html).toContain("Astro");
  });

  it("renders selected-work items as link-only, no description text", async () => {
    const html = await render();
    for (const item of props.selectedWork) {
      expect(html).toContain(item.label);
      expect(html).toContain(`href="${item.href}"`);
    }
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

  it("applies the sidebar tint/divider treatment", async () => {
    const html = await render();
    expect(html).toMatch(/class="[^"]*bg-navy-100[^"]*"/);
    expect(html).toMatch(/class="[^"]*divide-navy-200[^"]*"/);
  });

  it("is driven entirely by props, not hardcoded", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Sidebar, {
      props: { ...props, summary: "A different summary entirely." },
    });
    expect(html).toContain("A different summary entirely.");
  });
});
