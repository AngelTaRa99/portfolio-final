"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { House, User, Folder, Mail } from "@deemlol/next-icons";

const links = [
  { href: "/", icon: House, label: "Home" },
  { href: "/user", icon: User, label: "User" },
  { href: "/projects", icon: Folder, label: "Projects" },
  { href: "/contact", icon: Mail, label: "Contact" },
];

export default function SidebarNav() {
  const pathname = usePathname();

  return (
    <nav className="w-16 flex flex-col gap-6 justify-center items-center py-20 lg:py-0">
      {links.map(({ href, icon: Icon, label }) => {
        const isActive = pathname === href;
        return (
          <div key={href} className="flex items-center gap-1.5">
            <Link
              href={href}
              aria-label={label}
              className={`neumorph flex items-center justify-center w-11 h-11 text-black dark:text-white ${
                isActive ? "neumorph-active" : ""
              }`}
            >
              <Icon size={18} />
            </Link>
            <span
              className={`relative w-1.5 h-1.5 rounded-full ${
                isActive ? "led-active" : "bg-black dark:bg-zinc-600"
              }`}
            />
          </div>
        );
      })}
    </nav>
  );
}
