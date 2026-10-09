"use client";

import { useEffect, useState } from "react";
import { usePrefersReducedMotion } from "./usePrefersReducedMotion";

export default function TypeText({ text, className = "" }: { text: string; className?: string }) {
  const reduced = usePrefersReducedMotion();
  const [len, setLen] = useState(reduced ? text.length : 0);

  useEffect(() => {
    if (reduced) return;
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setLen(i);
      if (i >= text.length) window.clearInterval(id);
    }, 45);
    return () => window.clearInterval(id);
  }, [text, reduced]);

  const shown = reduced ? text.length : len;

  return (
    <span data-testid="type-text" className={className}>
      {text.slice(0, shown)}
    </span>
  );
}
