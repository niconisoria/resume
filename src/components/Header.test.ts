import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { describe, expect, it } from "vitest";
import Header from "./Header.astro";

const links = [
  {
    label: "Email",
    href: "mailto:nicolas.nisoria@gmail.com",
    icon: "email" as const,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/niconisoria",
    icon: "linkedin" as const,
  },
  {
    label: "GitHub",
    href: "https://github.com/niconisoria",
    icon: "github" as const,
  },
  { label: "Book a call", href: "#", icon: "booking" as const },
  { label: "Download PDF", href: "#", icon: "pdf" as const },
];

async function render() {
  const container = await AstroContainer.create();
  return container.renderToString(Header, {
    props: { name: "Nicolas Nisoria", links },
  });
}

function anchorFor(html: string, label: string) {
  const match = html.match(
    new RegExp(`<a[^>]*>(?:(?!</a>).)*?${label}(?:(?!</a>).)*?</a>`, "s"),
  );
  return match?.[0] ?? "";
}

describe("Header", () => {
  it("renders the name", async () => {
    const html = await render();
    expect(html).toContain("Nicolas Nisoria");
  });

  it("renders no phone number or raw email address text", async () => {
    const html = await render();
    expect(html).not.toContain("+48");
    expect(html).not.toContain("nicolas.nisoria@gmail.com<");
  });

  it("renders an icon and a visible label per entry in links", async () => {
    const html = await render();
    for (const link of links) {
      const anchor = anchorFor(html, link.label);
      expect(anchor).toContain("<svg");
      expect(anchor).toContain(link.label);
    }
  });

  it("renders the correct icon markup per icon type, not a swapped one", async () => {
    const html = await render();
    const fingerprints: Record<(typeof links)[number]["icon"], string> = {
      email: "m2 6 10 7 10-7",
      linkedin: "M20.447 20.452",
      github: "M12 .297c-6.63",
      booking: 'x1="16" y1="2" x2="16" y2="6"',
      pdf: 'polyline points="14 2 14 8 20 8"',
    };
    for (const link of links) {
      expect(anchorFor(html, link.label)).toContain(fingerprints[link.icon]);
    }
  });

  it("renders a subtitle when provided, omits it when not", async () => {
    const container = await AstroContainer.create();

    const withSubtitle = await container.renderToString(Header, {
      props: {
        name: "Nicolas Nisoria",
        subtitle: "Senior Software Engineer",
        links: [],
      },
    });
    expect(withSubtitle).toContain("Senior Software Engineer");

    const withoutSubtitle = await render();
    expect(withoutSubtitle).not.toContain("Senior Software Engineer");
  });

  it("renders the separator after the action-link row, not between name and links", async () => {
    const html = await render();
    const lastLinkIndex = html.lastIndexOf("Download PDF");
    const hrIndex = html.indexOf("<hr");
    expect(hrIndex).toBeGreaterThan(lastLinkIndex);
  });

  it('keeps "#" placeholder links inert, not an external nav target', async () => {
    const html = await render();
    for (const link of links.filter((l) => l.href === "#")) {
      const anchor = anchorFor(html, link.label);
      expect(anchor).not.toContain('target="_blank"');
    }
  });

  it("opens http(s) links in a new tab safely, without doing so for mailto", async () => {
    const html = await render();

    expect(anchorFor(html, "Email")).not.toContain('target="_blank"');

    for (const link of links.filter((l) => l.href.startsWith("http"))) {
      const anchor = anchorFor(html, link.label);
      expect(anchor).toContain('target="_blank"');
      expect(anchor).toContain('rel="noopener noreferrer"');
    }
  });

  it("renders with no links passed", async () => {
    const container = await AstroContainer.create();
    const html = await container.renderToString(Header, {
      props: { name: "Nicolas Nisoria" },
    });
    expect(html).toContain("Nicolas Nisoria");
  });
});
