import { render, screen, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import Home from "@/app/page";

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe("Home", () => {
  it("renderiza titulo, CTAs y el mensaje final tras el efecto de escritura", () => {
    render(<Home />);

    expect(screen.getByRole("heading", { name: /Hola, soy/ })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /Ver proyectos/ })).toHaveAttribute("href", "/projects");
    expect(screen.getByRole("link", { name: /Contacto/ })).toHaveAttribute("href", "/contact");

    act(() => {
      vi.advanceTimersByTime(3000);
    });
    expect(screen.getByText(/La solución a tus problemas/)).toBeInTheDocument();
  });
});
