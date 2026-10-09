import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Projects from "@/app/projects/page";
import { projects } from "@/content/projects";

describe("Projects", () => {
  it("muestra cada proyecto con sus tags", () => {
    render(<Projects />);
    for (const project of projects) {
      expect(screen.getByRole("heading", { name: project.name })).toBeInTheDocument();
      for (const tag of project.tags) {
        expect(screen.getAllByText(tag).length).toBeGreaterThan(0);
      }
    }
  });

  it("enlaza el proyecto con url al sitio externo", () => {
    const live = projects.find((p) => p.status === "live");
    if (live?.url) {
      render(<Projects />);
      const link = screen.getAllByRole("link", { name: /ver proyecto/i })[0];
      expect(link).toHaveAttribute("href", live.url);
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    }
  });
});
