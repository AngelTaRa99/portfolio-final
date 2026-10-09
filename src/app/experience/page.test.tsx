import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Experience from "@/app/experience/page";
import { experience } from "@/content/experience";

describe("Experience", () => {
  it("muestra cada entrada con periodo, rol y organización", () => {
    render(<Experience />);
    expect(screen.getByRole("heading", { name: /experiencia/i })).toBeInTheDocument();
    for (const item of experience) {
      expect(screen.getAllByText(item.period).length).toBeGreaterThan(0);
      expect(
        screen.getAllByText((content) => content.toLowerCase().includes(item.role.toLowerCase())).length
      ).toBeGreaterThan(0);
    }
  });
});
