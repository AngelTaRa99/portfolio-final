import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Contact from "@/app/contact/page";
import { profile } from "@/content/profile";

describe("Contact", () => {
  it("enlaza email como mailto sin target externo", () => {
    render(<Contact />);
    const email = screen.getByRole("link", { name: /email/i });
    expect(email).toHaveAttribute("href", `mailto:${profile.email}`);
    expect(email).not.toHaveAttribute("target");
  });

  it("enlaza github y linkedin como externos", () => {
    render(<Contact />);
    const github = screen.getByRole("link", { name: /github/i });
    const linkedin = screen.getByRole("link", { name: /linkedin/i });
    expect(github).toHaveAttribute("href", profile.socials.github);
    expect(github).toHaveAttribute("target", "_blank");
    expect(github).toHaveAttribute("rel", "noopener noreferrer");
    expect(linkedin).toHaveAttribute("href", profile.socials.linkedin);
    expect(linkedin).toHaveAttribute("rel", "noopener noreferrer");
  });
});