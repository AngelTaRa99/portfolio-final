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
      onClick={toggle}
      aria-label="Toggle theme"
      className="neumorph flex items-center justify-center w-9 h-9 text-zinc-500 dark:text-zinc-400 cursor-pointer"
    >
      {isDark ? <Moon size={16} /> : <Sun size={16} />}
    </button>
  );
}
