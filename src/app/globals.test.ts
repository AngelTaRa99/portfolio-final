import { readFileSync } from "node:fs";
import { describe, it, expect } from "vitest";

const css = readFileSync("src/app/globals.css", "utf8");

const REQUIRED_TOKENS = [
  "--background",
  "--surface",
  "--surface-2",
  "--foreground",
  "--muted-foreground",
  "--border",
  "--primary",
  "--primary-hover",
  "--secondary",
  "--success",
  "--ring",
];

describe("design tokens", () => {
  it("defines every semantic token in both light (:root) and dark (.dark)", () => {
    for (const token of REQUIRED_TOKENS) {
      const matches = css.match(new RegExp(`${token}:`, "g")) ?? [];
      expect(matches.length, `${token} must appear at least twice`).toBeGreaterThanOrEqual(2);
    }
  });

  it("maps the brand red to primary", () => {
    expect(css).toMatch(/--primary:\s*#dc2626/i);
  });
});
