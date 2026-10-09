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
