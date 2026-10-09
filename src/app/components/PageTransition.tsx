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
