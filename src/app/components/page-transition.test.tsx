import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import PageTransition from "./PageTransition";

vi.mock("next/navigation", () => ({
  usePathname: () => "/",
}));

describe("PageTransition", () => {
  it("envuelve children y aplica la clase de fundido", () => {
    render(
      <PageTransition>
        <p>contenido</p>
      </PageTransition>
    );
    const el = screen.getByTestId("page-transition");
    expect(el).toHaveTextContent("contenido");
    expect(el).toHaveClass("page-fade");
  });

  it("no aplica fundido bajo prefers-reduced-motion", () => {
    vi.spyOn(window, "matchMedia").mockReturnValue({
      matches: true,
      media: "(prefers-reduced-motion: reduce)",
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    } as unknown as MediaQueryList);

    render(
      <PageTransition>
        <p>contenido</p>
      </PageTransition>
    );
    expect(screen.getByTestId("page-transition")).not.toHaveClass("page-fade");
  });
});
