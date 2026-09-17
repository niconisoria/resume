import { describe, expect, it } from "vitest";
import { renderBullet } from "./bullet";

describe("renderBullet", () => {
  it("converts **bold** markers to <b> tags", () => {
    expect(renderBullet("Cut **p99 latency** by 40%")).toBe(
      "Cut <b>p99 latency</b> by 40%",
    );
  });

  it("leaves plain text untouched", () => {
    expect(renderBullet("Built payments pipeline")).toBe(
      "Built payments pipeline",
    );
  });

  it("escapes HTML special characters before applying bold", () => {
    expect(renderBullet("Used <script> & **fixed** it")).toBe(
      "Used &lt;script&gt; &amp; <b>fixed</b> it",
    );
  });

  it("supports multiple bold spans in one string", () => {
    expect(renderBullet("**A** and **B**")).toBe("<b>A</b> and <b>B</b>");
  });

  it("converts [text](url) markers to links, opening in a new tab", () => {
    const html = renderBullet("Built [Trackin](https://trackin.com.ar) fast");
    expect(html).toContain('href="https://trackin.com.ar"');
    expect(html).toContain(">Trackin</a>");
    expect(html).toContain('target="_blank"');
    expect(html).toContain('rel="noopener noreferrer"');
  });

  it("supports bold and links together in one string", () => {
    const html = renderBullet(
      "Owned **all** of [increase.app](https://increase.app)",
    );
    expect(html).toContain("<b>all</b>");
    expect(html).toContain('href="https://increase.app"');
    expect(html).toContain(">increase.app</a>");
  });

  it("escapes double quotes in link URLs to prevent attribute breakout", () => {
    const html = renderBullet(
      'Built [thing](https://evil.example.com/"onmouseover="alert(1))',
    );
    expect(html).not.toMatch(/href="[^"]*"[^>]*onmouseover/);
    expect(html).toContain("&quot;");
  });
});
