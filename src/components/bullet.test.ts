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
});
