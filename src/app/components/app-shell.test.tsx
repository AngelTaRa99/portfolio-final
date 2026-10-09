import { render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import Header from "./Header";
import Footer from "./Footer";
import NavRail from "./NavRail";
import { profile } from "@/content/profile";

vi.mock("next/navigation", () => ({
  usePathname: () => "/projects",
}));

describe("Header", () => {
  it("muestra marca con indicador online", () => {
    render(<Header brand="IAmAngel.dev" />);
    expect(screen.getByRole("link", { name: /iAmangel\.dev/i })).toHaveAttribute("href", "/");
    expect(screen.getByRole("button", { name: /alternar tema/i })).toBeInTheDocument();
  });
});

describe("NavRail", () => {
  it("marca con aria-current la ruta activa", () => {
    render(<NavRail />);
    const active = screen.getByRole("link", { name: /proyectos/i });
    expect(active).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("link", { name: /inicio/i })).not.toHaveAttribute("aria-current");
    expect(screen.getByRole("link", { name: /experiencia/i })).toHaveAttribute("href", "/experience");
  });
});

describe("Footer", () => {
  it("enlaza redes con atributos correctos", () => {
    render(<Footer />);
    const github = screen.getByRole("link", { name: /github/i });
    expect(github).toHaveAttribute("href", profile.socials.github);
    expect(github).toHaveAttribute("rel", "noopener noreferrer");
    expect(screen.getByRole("link", { name: /linkedin/i })).toHaveAttribute(
      "href",
      profile.socials.linkedin
    );
    expect(screen.getByRole("link", { name: /email/i })).toHaveAttribute(
      "href",
      `mailto:${profile.email}`
    );
  });
});
