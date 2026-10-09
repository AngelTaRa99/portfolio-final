import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import About from "@/app/about/page";
import { skills } from "@/content/skills";

describe("About", () => {
  it("muestra bio y cada categoría de skills", () => {
    render(<About />);
    expect(screen.getByRole("heading", { name: /sobre mí/i })).toBeInTheDocument();
    for (const group of skills) {
      expect(screen.getByRole("heading", { name: new RegExp(group.category, "i") })).toBeInTheDocument();
    }
  });
});
