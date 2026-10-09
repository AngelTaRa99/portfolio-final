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
