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
