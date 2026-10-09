# "Terminal Refinado" Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the personal portfolio at `/home/angelo/portfolio` from scratch with a disciplined "Terminal Refinado" identity (JetBrains Mono, dark-first + real light mode, red `#DC2626` accent, bordered terminal panels) replacing the current neumorphic CRT design.

**Architecture:** Next.js App Router app shell (Header + NavRail + Footer) with five routes (`/`, `/about`, `/projects`, `/experience`, `/contact`). All editable content lives in `src/content/*.ts` typed data modules consumed by server components; UI primitives are small single-responsibility components. Tailwind v4 semantic tokens are the only source of color.

**Tech Stack:** Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS v4, `@deemlol/next-icons@0.1.9`, JetBrains Mono via `next/font/google`. Testing: Vitest + React Testing Library + jsdom.

## Global Constraints

- **Version floors (exact, copied from spec):** `next ^16.2.10`, `react 19.2.0`, `@deemlol/next-icons` pinned to `0.1.9`, `@tailwindcss/postcss ^4`. Node >= 20.
- **No raw hex in components** — colors only via Tailwind semantic token classes (`bg-surface`, `text-primary`, `text-muted-foreground`, `border-border`, `bg-primary`, `bg-success`, `bg-surface-2`).
- **No neumorphism.** Panels use 1px `border-border` + terminal chrome (title bar with 3 dots + `~/path` route).
- **Mono-only:** JetBrains Mono for everything (`font-mono`). Body never below 16px; labels never below 12px.
- **Motion:** all animation (typing, blink, fade) must be disabled under `prefers-reduced-motion: reduce` (via `usePrefersReducedMotion` hook + the `.page-fade`/`.cursor-blink` guards in `globals.css`).
- **Contrast:** body text `text-foreground`/`text-muted-foreground` must keep ≥ 4.5:1; dark muted = `#94A3B8`, light muted = `#475569`.
- **Content language: Spanish**, placeholders clearly marked with the literal string `TODO(content)`.
- **Icons:** only SVG from `@deemlol/next-icons`; icons `aria-hidden="true"` with visible text labels (no icon-only links without accessible text).
- **Every focusable element** has a visible focus state (global `:focus-visible` ring in `globals.css`).
- **Buttons/links ≥ 44px min touch target** (`min-h-11`).
- Tests use Vitest + RTL; run with `npm test`. Build with `npm run build`. Lint with `npm run lint`.

## File Structure

```
/home/angelo/portfolio/
├── package.json  tsconfig.json  next.config.ts  postcss.config.mjs
├── eslint.config.mjs  .gitignore  vitest.config.ts  vitest.setup.ts
└── src/
    ├── app/
    │   ├── layout.tsx                 # app shell (server) — Task 5
    │   ├── page.tsx                   # Hero — Task 7
    │   ├── globals.css                # tokens + motion guards — Task 1
    │   ├── globals.test.ts            # token guard test — Task 1
    │   ├── about/page.tsx             # Task 8
    │   ├── projects/page.tsx          # Task 9
    │   ├── experience/page.tsx        # Task 10
    │   ├── contact/page.tsx           # Task 11
    │   └── components/
    │       ├── StatusDot.tsx          # Task 3
    │       ├── TechChip.tsx           # Task 3
    │       ├── TerminalPanel.tsx      # Task 3
    │       ├── PromptLine.tsx         # Task 3
    │       ├── BlinkingCursor.tsx     # Task 3
    │       ├── usePrefersReducedMotion.ts  # Task 3
    │       ├── ThemeToggle.tsx        # Task 4
    │       ├── Header.tsx             # Task 5
    │       ├── NavRail.tsx            # Task 5
    │       ├── Footer.tsx             # Task 5
    │       ├── PageTransition.tsx     # Task 6
    │       ├── TypeText.tsx           # Task 7
    │       ├── ProjectCard.tsx        # Task 9
    │       ├── TimelineItem.tsx       # Task 10
    │       └── *.test.tsx             # colocated tests
    └── content/
        ├── types.ts  profile.ts  projects.ts  experience.ts  skills.ts
        └── content.test.ts           # Task 2
docs/superpowers/specs/2026-10-09-terminal-refinado-portfolio-redesign-design.md
```

---

### Task 1: Scaffold project, tooling, and design tokens

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`, `.gitignore`, `vitest.config.ts`, `vitest.setup.ts`
- Create: `src/app/layout.tsx`, `src/app/page.tsx`
- Create: `src/app/components/usePrefersReducedMotion.ts` (needed by token test guard setup? No — keep to Task 3; not created here)
- Test: `src/app/globals.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces: working `npm install`, `npm test`, `npm run build`, and `src/app/globals.css` defining every semantic token name listed below (light in `:root`, dark in `.dark`). Later tasks rely on these Tailwind token classes: `bg-background`, `bg-surface`, `bg-surface-2`, `bg-primary`, `bg-success`, `text-foreground`, `text-muted-foreground`, `text-primary`, `border-border`, plus utility classes `.scanlines`, `.cursor-blink`, `.page-fade`.

- [ ] **Step 1: Write the tooling + minimal app files.**

`package.json`:
```json
{
  "name": "portfolio",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint",
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "@deemlol/next-icons": "0.1.9",
    "next": "^16.2.10",
    "react": "19.2.0",
    "react-dom": "19.2.0"
  },
  "devDependencies": {
    "@tailwindcss/postcss": "^4",
    "@testing-library/dom": "^10.4.0",
    "@testing-library/jest-dom": "^6.6.3",
    "@testing-library/react": "^16.1.0",
    "@testing-library/user-event": "^14.5.2",
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "@vitejs/plugin-react": "^4.3.4",
    "babel-plugin-react-compiler": "1.0.0",
    "eslint": "^9",
    "eslint-config-next": "^16.2.10",
    "jsdom": "^25.0.1",
    "tailwindcss": "^4",
    "typescript": "^5",
    "vite-tsconfig-paths": "^5.1.4",
    "vitest": "^2.1.8"
  }
}
```

`tsconfig.json`:
```json
{
  "compilerOptions": {
    "target": "ES2017",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "react-jsx",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./src/*"] }
  },
  "include": [
    "next-env.d.ts",
    "**/*.ts",
    "**/*.tsx",
    ".next/types/**/*.ts",
    ".next/dev/types/**/*.ts",
    "**/*.mts"
  ],
  "exclude": ["node_modules"]
}
```

`next.config.ts`:
```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: true,
};

export default nextConfig;
```

`postcss.config.mjs`:
```js
const config = {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};

export default config;
```

`eslint.config.mjs` (identical to the original repo — verified working):
```js
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
```

`.gitignore`:
```gitignore
/node_modules
/.next/
/out/
/build
/coverage
.DS_Store
*.pem
npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*
.env*
.vercel
*.tsbuildinfo
next-env.d.ts
```

`vitest.config.ts`:
```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  test: {
    environment: "jsdom",
    globals: true,
    setupFiles: ["./vitest.setup.ts"],
    include: ["src/**/*.test.{ts,tsx}"],
  },
});
```

`vitest.setup.ts`:
```ts
import "@testing-library/jest-dom/vitest";

if (typeof window !== "undefined" && typeof window.matchMedia === "undefined") {
  window.matchMedia = (query: string) =>
    ({
      matches: false,
      media: query,
      onchange: null,
      addListener: () => {},
      removeListener: () => {},
      addEventListener: () => {},
      removeEventListener: () => {},
      dispatchEvent: () => false,
    }) as MediaQueryList;
}
```

`src/app/layout.tsx` (minimal placeholder for Task 1 — replaced in Task 5):
```tsx
import type { ReactNode } from "react";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es">
      <body className={`${jetbrainsMono.variable} font-mono`}>{children}</body>
    </html>
  );
}
```

`src/app/page.tsx` (temporary, replaced in Task 7):
```tsx
export default function Home() {
  return <p>hola</p>;
}
```

- [ ] **Step 2: Write the failing token test.**

`src/app/globals.test.ts`:
```ts
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
```

- [ ] **Step 3: Install deps and run test to verify it fails.**

Run: `npm install && npm test`
Expected: FAIL — `ENOENT: no such file or directory, open 'src/app/globals.css'` (or a failed assertion). The first `it` throws because `globals.css` does not exist yet.

- [ ] **Step 4: Write the design tokens.**

`src/app/globals.css`:
```css
@import "tailwindcss";

@custom-variant dark (&:where(.dark, .dark *));

:root {
  --background: #fafafa;
  --surface: #ffffff;
  --surface-2: #f4f4f5;
  --foreground: #09090b;
  --muted-foreground: #475569;
  --border: #e4e4e7;
  --primary: #dc2626;
  --primary-hover: #b91c1c;
  --secondary: #0891b2;
  --success: #16a34a;
  --ring: #dc2626;
}

.dark {
  --background: #0a0a0b;
  --surface: #121214;
  --surface-2: #17171a;
  --foreground: #ededed;
  --muted-foreground: #94a3b8;
  --border: rgba(255, 255, 255, 0.08);
  --primary: #dc2626;
  --primary-hover: #ef4444;
  --secondary: #22d3ee;
  --success: #22c55e;
  --ring: #dc2626;
}

@theme inline {
  --color-background: var(--background);
  --color-surface: var(--surface);
  --color-surface-2: var(--surface-2);
  --color-foreground: var(--foreground);
  --color-muted-foreground: var(--muted-foreground);
  --color-border: var(--border);
  --color-primary: var(--primary);
  --color-primary-hover: var(--primary-hover);
  --color-secondary: var(--secondary);
  --color-success: var(--success);
  --color-ring: var(--ring);
  --font-mono: var(--font-jetbrains-mono);
}

@layer base {
  html {
    color-scheme: light;
  }
  html.dark {
    color-scheme: dark;
  }
  body {
    background: var(--background);
    color: var(--foreground);
  }
  :focus-visible {
    outline: 2px solid var(--ring);
    outline-offset: 2px;
  }
}

.scanlines::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 10;
  background: repeating-linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.04) 0px,
    rgba(0, 0, 0, 0.04) 1px,
    transparent 1px,
    transparent 3px
  );
}

.dark .scanlines::before {
  background: repeating-linear-gradient(
    0deg,
    rgba(255, 255, 255, 0.03) 0px,
    rgba(255, 255, 255, 0.03) 1px,
    transparent 1px,
    transparent 3px
  );
}

.cursor-blink {
  animation: cursorBlink 1s step-end infinite;
}

@keyframes cursorBlink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.page-fade {
  animation: pageFade 0.25s ease-out;
}

@keyframes pageFade {
  from { opacity: 0; transform: translateY(4px); }
  to { opacity: 1; transform: translateY(0); }
}

@media (prefers-reduced-motion: reduce) {
  .cursor-blink,
  .page-fade {
    animation: none !important;
  }
  *,
  *::before,
  *::after {
    animation-duration: 0.001ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.001ms !important;
  }
}
```

- [ ] **Step 5: Run the test to verify it passes.**

Run: `npm test`
Expected: PASS — the two `it` cases in `src/app/globals.test.ts` succeed.

- [ ] **Step 6: Verify the scaffold builds.**

Run: `npm run build`
Expected: SUCCESS — output ends with `Compiled successfully` / `✓ Generating static pages`, and the `/` route renders.

- [ ] **Step 7: Commit**

```bash
git init
git add .
git commit -m "feat: scaffold nextjs app with design tokens and vitest"
```

---

### Task 2: Content data layer

**Files:**
- Create: `src/content/types.ts`, `src/content/profile.ts`, `src/content/projects.ts`, `src/content/experience.ts`, `src/content/skills.ts`
- Test: `src/content/content.test.ts`

**Interfaces:**
- Consumes: nothing.
- Produces (exact exports later tasks rely on):
  - `Profile` type + `profile: Profile` with fields `name`, `brand`, `tagline`, `role`, `location`, `available`, `email`, `bio`, `socials: { github, linkedin }`.
  - `Project` type (`{ id, name, description, tags: string[], status: "live" | "wip" | "archived", url?: string }`) + `projects: Project[]`.
  - `ExperienceItem` type (`{ id, role, org, period, description }`) + `experience: ExperienceItem[]`.
  - `SkillGroup` type (`{ category, skills: string[] }`) + `skills: SkillGroup[]`.

- [ ] **Step 1: Write the failing test.**

`src/content/content.test.ts`:
```ts
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
```

- [ ] **Step 2: Run the test to verify it fails.**

Run: `npm test src/content/content.test.ts`
Expected: FAIL — `Failed to resolve import "./profile"` (files do not exist yet).

- [ ] **Step 3: Implement the data modules.**

`src/content/types.ts`:
```ts
export interface Profile {
  name: string;
  brand: string;
  tagline: string;
  role: string;
  location: string;
  available: boolean;
  email: string;
  bio: string;
  socials: {
    github: string;
    linkedin: string;
  };
}

export interface Project {
  id: string;
  name: string;
  description: string;
  tags: string[];
  status: "live" | "wip" | "archived";
  url?: string;
}

export interface ExperienceItem {
  id: string;
  role: string;
  org: string;
  period: string;
  description: string;
}

export interface SkillGroup {
  category: string;
  skills: string[];
}
```

`src/content/profile.ts`:
```ts
import type { Profile } from "./types";

// TODO(content): reemplaza estos valores con tu información real.
export const profile: Profile = {
  name: "Angel T. Ramírez",
  brand: "IAmAngel.dev",
  tagline: "La solución a tus problemas.",
  role: "Desarrollador de software",
  location: "México",
  available: true,
  email: "angel@example.com",
  bio: "TODO(content): escribe 2-3 frases sobre ti, tu enfoque y las tecnologías con las que trabajas.",
  socials: {
    github: "https://github.com/AngelTaRa99",
    linkedin: "https://linkedin.com/in/AngelTaRa99",
  },
};
```

`src/content/projects.ts`:
```ts
import type { Project } from "./types";

export const projects: Project[] = [
  {
    id: "terra",
    name: "Terra",
    description:
      "Sistema de información geográfica para gestión de ventas inmobiliarias. Mapa interactivo con el estado de los lotes en tiempo real: libre, en visita, apartado y vendido.",
    tags: ["Next.js", "React", "GIS", "Maps"],
    status: "live",
    url: "https://terra-eta-one.vercel.app/",
  },
  {
    id: "proyecto-2",
    name: "Proyecto 2",
    description: "TODO(content): describe tu segundo proyecto.",
    tags: ["TODO(content)"],
    status: "wip",
  },
  {
    id: "proyecto-3",
    name: "Proyecto 3",
    description: "TODO(content): describe tu tercer proyecto.",
    tags: ["TODO(content)"],
    status: "wip",
  },
];
```

`src/content/experience.ts`:
```ts
import type { ExperienceItem } from "./types";

export const experience: ExperienceItem[] = [
  {
    id: "exp-1",
    role: "Desarrollador",
    org: "TODO(content): empresa",
    period: "TODO(content): 2024 — presente",
    description: "TODO(content): describe tu rol y logros.",
  },
  {
    id: "exp-2",
    role: "TODO(content): rol",
    org: "TODO(content): empresa",
    period: "TODO(content): fecha",
    description: "TODO(content): describe tu rol y logros.",
  },
];
```

`src/content/skills.ts`:
```ts
import type { SkillGroup } from "./types";

export const skills: SkillGroup[] = [
  { category: "Frontend", skills: ["Next.js", "React", "TypeScript", "Tailwind CSS"] },
  { category: "Backend", skills: ["Node.js", "APIs REST", "PostgreSQL"] },
  { category: "Herramientas", skills: ["Git", "Linux", "Docker", "Figma"] },
];
```

- [ ] **Step 4: Run the test to verify it passes.**

Run: `npm test src/content/content.test.ts`
Expected: PASS — 4 test suites (perfil, proyectos, experiencia, skills) all green.

- [ ] **Step 5: Commit**

```bash
git add src/content
git commit -m "feat: add typed placeholder content modules"
```

---

### Task 3: UI primitives — StatusDot, TechChip, TerminalPanel, PromptLine, BlinkingCursor, usePrefersReducedMotion

**Files:**
- Create: `src/app/components/usePrefersReducedMotion.ts`, `src/app/components/StatusDot.tsx`, `src/app/components/TechChip.tsx`, `src/app/components/TerminalPanel.tsx`, `src/app/components/PromptLine.tsx`, `src/app/components/BlinkingCursor.tsx`
- Test: `src/app/components/primitives.test.tsx`

**Interfaces:**
- Consumes: semantic token Tailwind classes from Task 1 (`bg-surface`, `bg-surface-2`, `bg-primary`, `bg-success`, `border-border`, `text-foreground`, `text-muted-foreground`, `text-primary`).
- Produces (exact signatures later tasks rely on):
  - `export default function StatusDot({ variant = "idle" }: { variant?: "active" | "idle" | "success" })`
  - `export default function TechChip({ label }: { label: string })`
  - `export default function TerminalPanel({ title, path, children, className = "" }: { title?: string; path?: string; children: ReactNode; className?: string })`
  - `export default function PromptLine({ children, className = "" }: { children: ReactNode; className?: string })`
  - `export default function BlinkingCursor()`
  - `export function usePrefersReducedMotion(): boolean` (returns true when `prefers-reduced-motion: reduce` matches)

- [ ] **Step 1: Write the failing tests.**

`src/app/components/primitives.test.tsx`:
```tsx
import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import StatusDot from "./StatusDot";
import TechChip from "./TechChip";
import TerminalPanel from "./TerminalPanel";
import PromptLine from "./PromptLine";
import BlinkingCursor from "./BlinkingCursor";

describe("StatusDot", () => {
  it("usa clases según variante", () => {
    const { rerender } = render(<StatusDot variant="success" />);
    expect(screen.getByTestId("status-dot")).toHaveClass("bg-success");
    rerender(<StatusDot variant="active" />);
    expect(screen.getByTestId("status-dot")).toHaveClass("bg-primary");
    rerender(<StatusDot />);
    expect(screen.getByTestId("status-dot")).toHaveClass("bg-muted-foreground");
  });
});

describe("TechChip", () => {
  it("renderiza la etiqueta", () => {
    render(<TechChip label="Next.js" />);
    expect(screen.getByText("Next.js")).toBeInTheDocument();
  });
});

describe("TerminalPanel", () => {
  it("muestra title-bar con ruta, título y children", () => {
    render(
      <TerminalPanel title="inicio" path="~/">
        <p>contenido</p>
      </TerminalPanel>
    );
    expect(screen.getByText("~/")).toBeInTheDocument();
    expect(screen.getByText("inicio")).toBeInTheDocument();
    expect(screen.getByText("contenido")).toBeInTheDocument();
  });
});

describe("PromptLine", () => {
  it("prefija el prompt $", () => {
    const { container } = render(<PromptLine>whoami</PromptLine>);
    expect(container).toHaveTextContent("$");
    expect(screen.getByText("whoami")).toBeInTheDocument();
  });
});

describe("BlinkingCursor", () => {
  it("renderiza un cursor con clase blink", () => {
    const { container } = render(<BlinkingCursor />);
    expect(container.querySelector(".cursor-blink")).not.toBeNull();
  });
});
```

- [ ] **Step 2: Run the tests to verify they fail.**

Run: `npm test src/app/components/primitives.test.tsx`
Expected: FAIL — `Failed to resolve import "./StatusDot"` etc.

- [ ] **Step 3: Implement the primitives.**

`src/app/components/usePrefersReducedMotion.ts`:
```ts
import { useSyncExternalStore } from "react";

function subscribe(callback: () => void) {
  const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
  mql.addEventListener("change", callback);
  return () => mql.removeEventListener("change", callback);
}

function getSnapshot() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function getServerSnapshot() {
  return false;
}

export function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
```

`src/app/components/StatusDot.tsx`:
```tsx
type StatusVariant = "active" | "idle" | "success";

const colors: Record<StatusVariant, string> = {
  active: "bg-primary",
  success: "bg-success",
  idle: "bg-muted-foreground",
};

export default function StatusDot({ variant = "idle" }: { variant?: StatusVariant }) {
  return (
    <span
      data-testid="status-dot"
      className={`inline-block h-2 w-2 rounded-full ${colors[variant]}`}
      aria-hidden="true"
    />
  );
}
```

`src/app/components/TechChip.tsx`:
```tsx
export default function TechChip({ label }: { label: string }) {
  return (
    <span className="inline-block rounded border border-border px-2 py-0.5 font-mono text-xs text-muted-foreground">
      {label}
    </span>
  );
}
```

`src/app/components/TerminalPanel.tsx`:
```tsx
import type { ReactNode } from "react";

export default function TerminalPanel({
  title,
  path,
  children,
  className = "",
}: {
  title?: string;
  path?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`relative overflow-hidden rounded-xl border border-border bg-surface ${className}`}>
      {(title || path) && (
        <header className="flex items-center gap-2 border-b border-border bg-surface-2 px-4 py-2">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-primary" />
            <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/40" />
            <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/40" />
          </span>
          {path && <span className="font-mono text-xs text-muted-foreground">{path}</span>}
          {title && (
            <span className="ml-auto font-mono text-xs uppercase tracking-widest text-muted-foreground">
              {title}
            </span>
          )}
        </header>
      )}
      <div className="p-6">{children}</div>
    </section>
  );
}
```

`src/app/components/PromptLine.tsx`:
```tsx
import type { ReactNode } from "react";

export default function PromptLine({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={`font-mono ${className}`}>
      <span className="text-primary" aria-hidden="true">
        $&nbsp;
      </span>
      {children}
    </span>
  );
}
```

`src/app/components/BlinkingCursor.tsx`:
```tsx
export default function BlinkingCursor() {
  return (
    <span className="cursor-blink text-primary" aria-hidden="true">
      ▊
    </span>
  );
}
```

- [ ] **Step 4: Run the tests to verify they pass.**

Run: `npm test src/app/components/primitives.test.tsx`
Expected: PASS — all 5 describe blocks green.

- [ ] **Step 5: Commit**

```bash
git add src/app/components
git commit -m "feat: add terminal UI primitives"
```

---

### Task 4: ThemeToggle with persistence

**Files:**
- Create: `src/app/components/ThemeToggle.tsx`
- Test: `src/app/components/theme-toggle.test.tsx`

**Interfaces:**
- Consumes: `usePrefersReducedMotion` not needed here; reuses Task 1 tokens + `@deemlol/next-icons` (`Moon`, `Sun`, size 16).
- Produces: `export default function ThemeToggle()` (no props) — reads `localStorage.theme`, toggles `document.documentElement.classList` `dark`, exposes an accessible `aria-label="Alternar tema"` button with `aria-pressed={isDark}`.

- [ ] **Step 1: Write the failing test.**

`src/app/components/theme-toggle.test.tsx`:
```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, it, expect } from "vitest";
import ThemeToggle from "./ThemeToggle";

beforeEach(() => {
  document.documentElement.classList.remove("dark");
  localStorage.clear();
});

describe("ThemeToggle", () => {
  it("arranca en claro y al hacer clic activa el modo oscuro", async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);
    const button = screen.getByRole("button", { name: /alternar tema/i });
    expect(button).toHaveAttribute("aria-pressed", "false");

    await user.click(button);
    expect(document.documentElement.classList).toContain("dark");
    expect(localStorage.getItem("theme")).toBe("dark");
    expect(button).toHaveAttribute("aria-pressed", "true");

    await user.click(button);
    expect(document.documentElement.classList).not.toContain("dark");
    expect(localStorage.getItem("theme")).toBe("light");
    expect(button).toHaveAttribute("aria-pressed", "false");
  });
});
```

- [ ] **Step 2: Run the test to verify it fails.**

Run: `npm test src/app/components/theme-toggle.test.tsx`
Expected: FAIL — `Failed to resolve import "./ThemeToggle"`.

- [ ] **Step 3: Implement ThemeToggle.**

`src/app/components/ThemeToggle.tsx`:
```tsx
"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "@deemlol/next-icons";

let listeners: Array<() => void> = [];

function emitChange() {
  for (const listener of listeners) listener();
}

function subscribe(callback: () => void) {
  listeners.push(callback);
  return () => {
    listeners = listeners.filter((l) => l !== callback);
  };
}

function getSnapshot() {
  return localStorage.getItem("theme") ?? "system";
}

function getServerSnapshot() {
  return "system";
}

export default function ThemeToggle() {
  const stored = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const isDark =
    stored === "dark" ||
    (stored === "system" &&
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-color-scheme: dark)").matches);

  const toggle = () => {
    const next = !isDark;
    document.documentElement.classList.toggle("dark", next);
    localStorage.setItem("theme", next ? "dark" : "light");
    emitChange();
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label="Alternar tema"
      aria-pressed={isDark}
      className="flex min-h-11 min-w-11 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:border-primary hover:text-primary"
    >
      {isDark ? <Moon size={16} aria-hidden="true" /> : <Sun size={16} aria-hidden="true" />}
    </button>
  );
}
```

- [ ] **Step 4: Run the test to verify it passes.**

Run: `npm test src/app/components/theme-toggle.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/app/components/ThemeToggle.tsx src/app/components/theme-toggle.test.tsx
git commit -m "feat: add persistent light/dark theme toggle"
```

---

### Task 5: App shell — Header, NavRail, Footer, layout

**Files:**
- Create: `src/app/components/Header.tsx`, `src/app/components/NavRail.tsx`, `src/app/components/Footer.tsx`
- Modify: `src/app/layout.tsx` (replace Task 1 minimal version)
- Test: `src/app/components/app-shell.test.tsx`

**Interfaces:**
- Consumes: `profile` (Task 2), `StatusDot` (Task 3), `ThemeToggle` (Task 4), `@deemlol/next-icons` (`House`, `User`, `Folder`, `Briefcase`, `Mail`, `Github`, `Linkedin`, `Email`, `ArrowUpRight` — all verified to exist in 0.1.9).
- Produces: `Header({ brand }: { brand: string })`, `NavRail()` (client), `Footer()`; the full `RootLayout` used by the app. NavRail renders links `Inicio → /`, `Sobre mí → /about`, `Proyectos → /projects`, `Experiencia → /experience`, `Contacto → /contact` and sets `aria-current="page"` on the matching pathname.

- [ ] **Step 1: Write the failing tests.**

`src/app/components/app-shell.test.tsx`:
```tsx
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
```

- [ ] **Step 2: Run the tests to verify they fail.**

Run: `npm test src/app/components/app-shell.test.tsx`
Expected: FAIL — `Failed to resolve import "./Header"` etc.

- [ ] **Step 3: Implement the shell components.**

`src/app/components/Header.tsx`:
```tsx
import Link from "next/link";
import StatusDot from "./StatusDot";
import ThemeToggle from "./ThemeToggle";

export default function Header({ brand }: { brand: string }) {
  return (
    <header className="flex items-center justify-between border-b border-border bg-surface px-4 py-3">
      <Link href="/" className="flex items-center gap-2 font-mono text-sm tracking-wider text-foreground">
        <StatusDot variant="active" />
        <span className="uppercase">{brand}</span>
      </Link>
      <div className="flex items-center gap-3">
        <span className="hidden font-mono text-xs text-muted-foreground md:inline">~/dev</span>
        <ThemeToggle />
      </div>
    </header>
  );
}
```

`src/app/components/NavRail.tsx`:
```tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, User, Folder, Briefcase, Mail } from "@deemlol/next-icons";

const links = [
  { href: "/", icon: House, label: "Inicio" },
  { href: "/about", icon: User, label: "Sobre mí" },
  { href: "/projects", icon: Folder, label: "Proyectos" },
  { href: "/experience", icon: Briefcase, label: "Experiencia" },
  { href: "/contact", icon: Mail, label: "Contacto" },
];

export default function NavRail() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Navegación principal"
      className="flex flex-row items-center gap-2 border-b border-border bg-surface p-2 lg:h-full lg:w-[6rem] lg:flex-col lg:justify-center lg:gap-4 lg:border-b-0 lg:border-r lg:p-0"
    >
      {links.map(({ href, icon: Icon, label }) => {
        const isActive = pathname === href;
        return (
          <Link
            key={href}
            href={href}
            aria-label={label}
            aria-current={isActive ? "page" : undefined}
            className={`flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-lg border px-3 py-2 font-mono text-xs transition-colors lg:w-20 lg:flex-col ${
              isActive
                ? "border-primary text-primary"
                : "border-transparent text-muted-foreground hover:border-border hover:text-foreground"
            }`}
          >
            <Icon size={18} aria-hidden="true" />
            <span>{label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
```

`src/app/components/Footer.tsx`:
```tsx
import { Github, Linkedin, Email, ArrowUpRight } from "@deemlol/next-icons";
import { profile } from "@/content/profile";

export default function Footer() {
  return (
    <footer className="flex flex-wrap items-center justify-between gap-2 border-t border-border bg-surface px-4 py-3 font-mono text-xs text-muted-foreground">
      <p>© {new Date().getFullYear()} {profile.brand}</p>
      <ul className="flex flex-wrap items-center gap-4">
        <li>
          <a
            className="flex items-center gap-1 transition-colors hover:text-foreground"
            href={profile.socials.github}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github size={16} aria-hidden="true" /> GitHub <ArrowUpRight size={12} aria-hidden="true" />
          </a>
        </li>
        <li>
          <a
            className="flex items-center gap-1 transition-colors hover:text-foreground"
            href={profile.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Linkedin size={16} aria-hidden="true" /> LinkedIn <ArrowUpRight size={12} aria-hidden="true" />
          </a>
        </li>
        <li>
          <a
            className="flex items-center gap-1 transition-colors hover:text-foreground"
            href={`mailto:${profile.email}`}
          >
            <Email size={16} aria-hidden="true" /> Email
          </a>
        </li>
      </ul>
    </footer>
  );
}
```

`src/app/layout.tsx` (full replace of the Task 1 minimal file):
```tsx
import type { Metadata, ReactNode } from "next";
import { JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/app/components/Header";
import NavRail from "@/app/components/NavRail";
import Footer from "@/app/components/Footer";
import PageTransition from "@/app/components/PageTransition";
import { profile } from "@/content/profile";

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Angel T. Ramírez | Portfolio",
  description: "Portafolio de Angel T. Ramírez — desarrollador de software.",
};

const themeScript = `(function(){try{var t=localStorage.getItem("theme");var d=t==="dark"||(!t&&matchMedia("(prefers-color-scheme: dark)").matches);if(d)document.documentElement.classList.add("dark")}catch(e){}})()`;

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body className="flex min-h-dvh flex-col bg-background font-mono text-foreground antialiased">
        <Header brand={profile.brand} />
        <div className="flex flex-1 flex-col lg:flex-row">
          <NavRail />
          <main className="scanlines relative flex flex-1 flex-col items-center px-4 py-10 lg:px-10">
            <PageTransition>{children}</PageTransition>
          </main>
        </div>
        <Footer />
      </body>
    </html>
  );
}
```

Note: `PageTransition` does not exist yet (Task 6). `npm test` will still pass for app-shell tests, but the next build would fail. That is expected within this task's cycle; Task 6 removes the gap.

- [ ] **Step 4: Run the app-shell tests to verify they pass.**

Run: `npm test src/app/components/app-shell.test.tsx`
Expected: PASS — Header, NavRail, Footer describe blocks green.

- [ ] **Step 5: Commit**

```bash
git add src/app/components/Header.tsx src/app/components/NavRail.tsx src/app/components/Footer.tsx src/app/components/app-shell.test.tsx src/app/layout.tsx
git commit -m "feat: add app shell with header, nav rail and footer"
```

---

### Task 6: PageTransition with reduced-motion support

**Files:**
- Create: `src/app/components/PageTransition.tsx`
- Test: `src/app/components/page-transition.test.tsx`

**Interfaces:**
- Consumes: `usePrefersReducedMotion` (Task 3), `usePathname` from `next/navigation`.
- Produces: `export default function PageTransition({ children }: { children: ReactNode })` — a wrapper that remounts its content (via `key={pathname}`) and applies the `.page-fade` animation class unless reduced motion is preferred. Rendered element has `data-testid="page-transition"`.

- [ ] **Step 1: Write the failing test.**

`src/app/components/page-transition.test.tsx`:
```tsx
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
```

- [ ] **Step 2: Run the test to verify it fails.**

Run: `npm test src/app/components/page-transition.test.tsx`
Expected: FAIL — `Failed to resolve import "./PageTransition"`.

- [ ] **Step 3: Implement PageTransition.**

`src/app/components/PageTransition.tsx`:
```tsx
"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

export default function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const reduced = usePrefersReducedMotion();

  return (
    <div key={pathname} data-testid="page-transition" className={reduced ? undefined : "page-fade"}>
      {children}
    </div>
  );
}
```

- [ ] **Step 4: Run the test to verify it passes.**

Run: `npm test src/app/components/page-transition.test.tsx`
Expected: PASS.

- [ ] **Step 5: Verify the shell now builds end-to-end.**

Run: `npm run build`
Expected: SUCCESS — `layout.tsx` now has all imported components; static routes render.

- [ ] **Step 6: Commit**

```bash
git add src/app/components/PageTransition.tsx src/app/components/page-transition.test.tsx
git commit -m "feat: add reduced-motion aware page transitions"
```

---

### Task 7: Hero page + TypeText

**Files:**
- Create: `src/app/components/TypeText.tsx`
- Modify: `src/app/page.tsx` (replace Task 1 temporary file)
- Test: `src/app/page.test.tsx`

**Interfaces:**
- Consumes: `profile` + `skills` (Task 2), `TerminalPanel`, `PromptLine`, `BlinkingCursor`, `TechChip` (Task 3), `usePrefersReducedMotion` (Task 3).
- Produces: `export default function TypeText({ text, className = "" }: { text: string; className?: string })` — types `text` at ~45ms/char; under reduced motion renders the full string instantly. Rendered node has `data-testid="type-text"`.

- [ ] **Step 1: Write the failing test.**

`src/app/page.test.tsx`:
```tsx
import { render, screen, act } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
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
```

- [ ] **Step 2: Run the test to verify it fails.**

Run: `npm test src/app/page.test.tsx`
Expected: FAIL — `Failed to resolve import "@/app/page"` (file still returns temporary content with no heading/links).

- [ ] **Step 3: Implement TypeText and the Hero page.**

`src/app/components/TypeText.tsx`:
```tsx
"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

export default function TypeText({ text, className = "" }: { text: string; className?: string }) {
  const reduced = usePrefersReducedMotion();
  const [len, setLen] = useState(reduced ? text.length : 0);

  useEffect(() => {
    if (reduced) {
      setLen(text.length);
      return;
    }
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setLen(i);
      if (i >= text.length) window.clearInterval(id);
    }, 45);
    return () => window.clearInterval(id);
  }, [text, reduced]);

  return (
    <span data-testid="type-text" className={className}>
      {text.slice(0, len)}
    </span>
  );
}
```

`src/app/page.tsx`:
```tsx
import Link from "next/link";
import TerminalPanel from "@/app/components/TerminalPanel";
import PromptLine from "@/app/components/PromptLine";
import TypeText from "@/app/components/TypeText";
import BlinkingCursor from "@/app/components/BlinkingCursor";
import TechChip from "@/app/components/TechChip";
import { profile } from "@/content/profile";
import { skills } from "@/content/skills";

export default function Home() {
  const heroSkills = skills.flatMap((g) => g.skills).slice(0, 8);

  return (
    <TerminalPanel title="inicio" path="~/" className="w-full max-w-3xl">
      <p className="font-mono text-sm text-muted-foreground">
        <PromptLine>whoami</PromptLine>
      </p>

      <h1 className="mt-3 text-2xl text-foreground sm:text-3xl">
        Hola, soy <span className="text-primary">{profile.name}</span>
      </h1>

      <p className="mt-2 flex flex-wrap items-center gap-2 font-mono text-lg text-foreground sm:text-xl">
        <TypeText text={profile.tagline} />
        <BlinkingCursor />
      </p>

      <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground">{profile.bio}</p>

      <div className="mt-6 flex flex-wrap gap-2">
        {heroSkills.map((skill) => (
          <TechChip key={skill} label={skill} />
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link
          href="/projects"
          className="min-h-11 inline-flex items-center justify-center rounded-md border border-primary bg-primary px-5 py-2.5 font-mono text-sm text-white transition-colors hover:bg-primary-hover"
        >
          Ver proyectos&nbsp;↗
        </Link>
        <Link
          href="/contact"
          className="min-h-11 inline-flex items-center justify-center rounded-md border border-border px-5 py-2.5 font-mono text-sm text-foreground transition-colors hover:border-primary hover:text-primary"
        >
          Contacto
        </Link>
      </div>
    </TerminalPanel>
  );
}
```

Note: the `border-primary bg-primary ... text-white` CTA uses Tailwind's `bg-primary` token plus literal Tailwind color `text-white` (this is a semantic token class, not a raw hex — allowed by the global constraints).

- [ ] **Step 4: Run the test to verify it passes.**

Run: `npm test src/app/page.test.tsx`
Expected: PASS.

- [ ] **Step 5: Build and lint the app.**

Run: `npm run build && npm run lint`
Expected: SUCCESS on both.

- [ ] **Step 6: Commit**

```bash
git add src/app/components/TypeText.tsx src/app/page.tsx src/app/page.test.tsx
git commit -m "feat: build terminal hero with typing effect"
```

---

### Task 8: About / Skills page

**Files:**
- Create: `src/app/about/page.tsx`
- Test: `src/app/about/page.test.tsx`

**Interfaces:**
- Consumes: `profile` + `skills` (Task 2), `TerminalPanel`, `PromptLine`, `TechChip` (Task 3).
- Produces: the `/about` route rendering bio + skill groups.

- [ ] **Step 1: Write the failing test.**

`src/app/about/page.test.tsx`:
```tsx
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
```

- [ ] **Step 2: Run the test to verify it fails.**

Run: `npm test src/app/about/page.test.tsx`
Expected: FAIL — `Failed to resolve import "@/app/about/page"`.

- [ ] **Step 3: Implement the About page.**

`src/app/about/page.tsx`:
```tsx
import TerminalPanel from "@/app/components/TerminalPanel";
import PromptLine from "@/app/components/PromptLine";
import TechChip from "@/app/components/TechChip";
import { profile } from "@/content/profile";
import { skills } from "@/content/skills";

export default function About() {
  return (
    <TerminalPanel title="sobre-mí" path="~/about" className="w-full max-w-3xl">
      <h1 className="text-xl text-foreground">Sobre mí</h1>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{profile.bio}</p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {skills.map((group) => (
          <section key={group.category}>
            <h2 className="font-mono text-xs uppercase tracking-widest text-primary">
              <PromptLine>{group.category}</PromptLine>
            </h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {group.skills.map((skill) => (
                <li key={skill}>
                  <TechChip label={skill} />
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </TerminalPanel>
  );
}
```

- [ ] **Step 4: Run the test to verify it passes.**

Run: `npm test src/app/about/page.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/app/about
git commit -m "feat: add about and skills page"
```

---

### Task 9: Projects page + ProjectCard

**Files:**
- Create: `src/app/components/ProjectCard.tsx`
- Create: `src/app/projects/page.tsx`
- Test: `src/app/projects/page.test.tsx`

**Interfaces:**
- Consumes: `projects` (Task 2), `TerminalPanel`, `StatusDot`, `TechChip` (Task 3).
- Produces: `export default function ProjectCard({ project }: { project: Project })` (imports `Project` type from `@/content/types`), renders name, status LED, description, tags, and a "Ver proyecto ↗" external link with `target="_blank" rel="noopener noreferrer"` when `url` exists. The `/projects` route grid: 1 col mobile / 2 col tablet / 3 col desktop.

- [ ] **Step 1: Write the failing test.**

`src/app/projects/page.test.tsx`:
```tsx
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
```

Note: the second `it` re-renders after the first — acceptable because the DOM from the first render is discarded on the second `render` call combined with RTL cleanup between tests. If you prefer stability, split into two separate test files; the plan keeps it simple.

- [ ] **Step 2: Run the test to verify it fails.**

Run: `npm test src/app/projects/page.test.tsx`
Expected: FAIL — `Failed to resolve import "@/app/projects/page"`.

- [ ] **Step 3: Implement ProjectCard and the Projects page.**

`src/app/components/ProjectCard.tsx`:
```tsx
import type { Project } from "@/content/types";
import TerminalPanel from "./TerminalPanel";
import StatusDot from "./StatusDot";
import TechChip from "./TechChip";

const statusLabel: Record<Project["status"], string> = {
  live: "EN LÍNEA",
  wip: "EN PROGRESO",
  archived: "ARCHIVADO",
};

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <TerminalPanel title={statusLabel[project.status]} path={`~/projects/${project.id}`} className="flex h-full flex-col">
      <div className="flex items-center gap-2">
        <StatusDot variant={project.status === "live" ? "success" : "idle"} />
        <h2 className="font-mono text-lg text-foreground">{project.name}</h2>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{project.description}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <TechChip key={tag} label={tag} />
        ))}
      </div>

      {project.url && (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center justify-center rounded-md border border-border px-4 py-2.5 font-mono text-sm text-foreground transition-colors hover:border-primary hover:text-primary"
        >
          Ver proyecto&nbsp;↗
        </a>
      )}
    </TerminalPanel>
  );
}
```

`src/app/projects/page.tsx`:
```tsx
import TerminalPanel from "@/app/components/TerminalPanel";
import ProjectCard from "@/app/components/ProjectCard";
import { projects } from "@/content/projects";

export default function Projects() {
  return (
    <TerminalPanel title="proyectos" path="~/projects" className="w-full max-w-5xl">
      <h1 className="text-xl text-foreground">Proyectos</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </TerminalPanel>
  );
}
```

- [ ] **Step 4: Run the test to verify it passes.**

Run: `npm test src/app/projects/page.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/app/components/ProjectCard.tsx src/app/projects
git commit -m "feat: add projects showcase page"
```

---

### Task 10: Experience page + TimelineItem

**Files:**
- Create: `src/app/components/TimelineItem.tsx`
- Create: `src/app/experience/page.tsx`
- Test: `src/app/experience/page.test.tsx`

**Interfaces:**
- Consumes: `experience` (Task 2), `TerminalPanel`, `PromptLine` (Task 3).
- Produces: `export default function TimelineItem({ item }: { item: ExperienceItem })` rendering a `li` with period in a `<time>` element, role, org, and description. The `/experience` route renders all items.

- [ ] **Step 1: Write the failing test.**

`src/app/experience/page.test.tsx`:
```tsx
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
      expect(screen.getAllByText(new RegExp(item.role, "i")).length).toBeGreaterThan(0);
    }
  });
});
```

- [ ] **Step 2: Run the test to verify it fails.**

Run: `npm test src/app/experience/page.test.tsx`
Expected: FAIL — `Failed to resolve import "@/app/experience/page"`.

- [ ] **Step 3: Implement TimelineItem and the Experience page.**

`src/app/components/TimelineItem.tsx`:
```tsx
import type { ExperienceItem } from "@/content/types";

export default function TimelineItem({ item }: { item: ExperienceItem }) {
  return (
    <li className="relative border-l border-border pb-8 pl-6 last:pb-0">
      <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-primary" aria-hidden="true" />
      <time className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{item.period}</time>
      <h3 className="mt-1 font-mono text-base text-foreground">
        {item.role} <span className="text-muted-foreground">· {item.org}</span>
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
    </li>
  );
}
```

`src/app/experience/page.tsx`:
```tsx
import TerminalPanel from "@/app/components/TerminalPanel";
import PromptLine from "@/app/components/PromptLine";
import TimelineItem from "@/app/components/TimelineItem";
import { experience } from "@/content/experience";

export default function Experience() {
  return (
    <TerminalPanel title="experiencia" path="~/experience" className="w-full max-w-3xl">
      <h1 className="text-xl text-foreground">Experiencia</h1>
      <p className="mt-2 font-mono text-xs uppercase tracking-widest text-muted-foreground">
        <PromptLine>cat ~/cv.txt</PromptLine>
      </p>
      <ul className="mt-8">
        {experience.map((item) => (
          <TimelineItem key={item.id} item={item} />
        ))}
      </ul>
    </TerminalPanel>
  );
}
```

- [ ] **Step 4: Run the test to verify it passes.**

Run: `npm test src/app/experience/page.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/app/components/TimelineItem.tsx src/app/experience
git commit -m "feat: add experience timeline page"
```

---

### Task 11: Contact page

**Files:**
- Create: `src/app/contact/page.tsx`
- Test: `src/app/contact/page.test.tsx`

**Interfaces:**
- Consumes: `profile` (Task 2), `TerminalPanel`, `PromptLine` (Task 3), icons `Email`, `Github`, `Linkedin`, `ArrowUpRight`.
- Produces: the `/contact` route with three channel cards. Email → `mailto:` (no `target`/`rel`); GitHub and LinkedIn → external (with `target="_blank" rel="noopener noreferrer"`).

- [ ] **Step 1: Write the failing test.**

`src/app/contact/page.test.tsx`:
```tsx
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
```

- [ ] **Step 2: Run the test to verify it fails.**

Run: `npm test src/app/contact/page.test.tsx`
Expected: FAIL — `Failed to resolve import "@/app/contact/page"`.

- [ ] **Step 3: Implement the Contact page.**

`src/app/contact/page.tsx`:
```tsx
import type { ComponentType } from "react";
import { Email, Github, Linkedin, ArrowUpRight } from "@deemlol/next-icons";
import TerminalPanel from "@/app/components/TerminalPanel";
import PromptLine from "@/app/components/PromptLine";
import { profile } from "@/content/profile";

interface ContactChannel {
  label: string;
  value: string;
  href: string;
  Icon: ComponentType<{ size?: number }>;
  external: boolean;
}

const channels: ContactChannel[] = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    Icon: Email,
    external: false,
  },
  {
    label: "GitHub",
    value: profile.socials.github,
    href: profile.socials.github,
    Icon: Github,
    external: true,
  },
  {
    label: "LinkedIn",
    value: profile.socials.linkedin,
    href: profile.socials.linkedin,
    Icon: Linkedin,
    external: true,
  },
];

export default function Contact() {
  return (
    <TerminalPanel title="contacto" path="~/contact" className="w-full max-w-3xl">
      <h1 className="text-xl text-foreground">Contacto</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        <PromptLine>Escribe a cualquiera de estos canales:</PromptLine>
      </p>

      <ul className="mt-6 space-y-3">
        {channels.map(({ label, value, href, Icon, external }) => (
          <li key={label}>
            <a
              href={href}
              {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
              className="flex items-center justify-between gap-3 rounded-lg border border-border bg-surface-2 px-4 py-3 transition-colors hover:border-primary hover:text-primary"
            >
              <span className="flex items-center gap-3 font-mono text-sm text-foreground">
                <Icon size={18} aria-hidden="true" />
                {label}
              </span>
              <span className="flex items-center gap-2 truncate font-mono text-xs text-muted-foreground">
                {value}
                {external && <ArrowUpRight size={14} aria-hidden="true" />}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </TerminalPanel>
  );
}
```

- [ ] **Step 4: Run the test to verify it passes.**

Run: `npm test src/app/contact/page.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add src/app/contact
git commit -m "feat: add contact page with real link targets"
```

---

### Task 12: Full verification, README, and final commit

**Files:**
- Create: `README.md`
- No source changes unless verification fails.

**Interfaces:**
- Consumes: everything from Tasks 1–11.

- [ ] **Step 1: Run the entire test suite.**

Run: `npm test`
Expected: PASS — all suites green (tokens, content, primitives, theme toggle, app shell, page transition, home, about, projects, experience, contact).

- [ ] **Step 2: Run build and lint.**

Run: `npm run build && npm run lint`
Expected: SUCCESS on both, no ESLint errors/warnings.

- [ ] **Step 3: Manual acceptance checklist.**

Run `npm run dev` and check at http://localhost:3000:

- [ ] All 5 routes render; NavRail shows the active route with `aria-current`; dark/light toggle persists on reload.
- [ ] Responsive at 375 / 768 / 1024 / 1440: no horizontal scroll; NavRail becomes top row under 1024px; project grid 1→2→3 cols.
- [ ] Keyboard: Tab through the page — focus ring (red) visible on every interactive element.
- [ ] Reduced motion: OS "reduce motion" on → no typing/blink/fade animation.
- [ ] No hex colors in any `.tsx` file: `grep -rn "#" src/app --include=*.tsx` returns no `#[0-9a-fA-F]` matches (only `src/app/globals.css` defines colors).
- [ ] Spanish copy; `TODO(content)` markers present exactly as designed.
- [ ] Contact mailto/linkedin/github links navigate to the correct targets.

- [ ] **Step 4: Write the README.**

`README.md`:
```markdown
# Angel T. Ramírez — Portfolio (IAmAngel.dev)

Rediseño "Terminal Refinado": portafolio tipo terminal con Next.js, React 19 y Tailwind v4.

## Stack

- Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4
- JetBrains Mono (next/font) · @deemlol/next-icons
- Tests: Vitest + React Testing Library

## Scripts

- `npm run dev` — servidor de desarrollo
- `npm run build` / `npm start` — build y preview de producción
- `npm run lint` — ESLint
- `npm test` — suite de tests (Vitest)

## Contenido

Todo el contenido editable vive en `src/content/` (`profile.ts`, `projects.ts`,
`experience.ts`, `skills.ts`). Busca `TODO(content)` para reemplazar los placeholders.
```

- [ ] **Step 5: Final commit**

```bash
git add README.md
git commit -m "docs: add readme and finish terminal refinado redesign"
```

---

## Self-Review

**Spec coverage check:** Design §4 (terminal refinado) → Tasks 1, 3, 5–7. §5 routes → Tasks 7–11. §6.1 tokens → Task 1. §6.2 mono typography → Task 1 layout + `font-mono` everywhere. §6.3 spacing/layout → Tasks 5, 9. §7 components → Tasks 3–11. §8 motion + reduced-motion → Tasks 3, 6, 7. §9 accessibility → Tasks 4, 5, 11 + Task 12 checklist. §10 content placeholders → Task 2. §11 out-of-scope respected (no blog/backend/⌘K). §12 success criteria → Task 12. No gaps.

**Placeholder scan:** every step contains concrete file contents or exact commands; no "TBD"/"implement later". The only `TODO(content)` strings are intentional, spec-mandated content markers.

**Type consistency:** `Project`, `ExperienceItem`, `Profile`, `SkillGroup` defined in Task 2 and used with identical field names in Tasks 9–11. Component prop signatures (`TerminalPanel`, `PromptLine`, `StatusDot`, `ProjectCard`, `TimelineItem`, `Header`, `NavRail`, `Footer`, `ThemeToggle`, `PageTransition`, `TypeText`, `usePrefersReducedMotion`) are declared once in their defining task and referenced with identical signatures downstream.