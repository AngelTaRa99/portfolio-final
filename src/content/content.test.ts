import { describe, it, expect } from "vitest";
import { profile } from "./profile";
import { projects } from "./projects";
import { experience } from "./experience";
import { skills } from "./skills";

describe("perfil", () => {
  it("expone email y redes sociales", () => {
    expect(profile.email).toMatch(/@/);
    expect(profile.socials.github).toMatch(/^https:\/\//);
    expect(profile.socials.linkedin).toMatch(/^https:\/\//);
  });

  it("expone marca y tagline", () => {
    expect(profile.brand).toBe("IAmAngel.dev");
    expect(profile.tagline.trim().length).toBeGreaterThan(0);
  });
});

describe("proyectos", () => {
  it("tiene campos obligatorios y url válida cuando existe", () => {
    for (const p of projects) {
      expect(p.id).toBeTruthy();
      expect(p.name).toBeTruthy();
      expect(p.tags.length).toBeGreaterThan(0);
      if (p.url) expect(p.url).toMatch(/^https?:\/\//);
    }
  });
});

describe("experiencia", () => {
  it("tiene ids únicos y periodo presente", () => {
    const ids = experience.map((e) => e.id);
    expect(new Set(ids).size).toBe(ids.length);
    for (const e of experience) expect(e.period).toBeTruthy();
  });
});

describe("skills", () => {
  it("agrupa skills por categoría", () => {
    for (const g of skills) {
      expect(g.category).toBeTruthy();
      expect(g.skills.length).toBeGreaterThan(0);
    }
  });
});
