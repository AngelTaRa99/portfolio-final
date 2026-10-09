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