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