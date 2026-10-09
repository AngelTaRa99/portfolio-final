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
