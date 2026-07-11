"use client";

import { usePathname } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";

export default function PageTransition({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [displayChildren, setDisplayChildren] = useState(children);
  const [phase, setPhase] = useState<"idle" | "static" | "channel" | "show">("idle");
  const prevPathname = useRef(pathname);
  const isFirstRender = useRef(true);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (prevPathname.current === pathname) return;

    prevPathname.current = pathname;
    clearTimers();

    timers.current.push(
      setTimeout(() => setPhase("static"), 0),
      setTimeout(() => {
        setDisplayChildren(children);
        setPhase("channel");
      }, 150),
      setTimeout(() => setPhase("show"), 500)
    );

    return clearTimers;
  }, [pathname, children, clearTimers]);

  return (
    <>
      {phase === "static" && (
        <div className="crt-static absolute inset-0 bg-white dark:bg-zinc-400 z-20" />
      )}
      <div
        className={
          phase === "channel" ? "crt-channel-change" : undefined
        }
      >
        {displayChildren}
      </div>
    </>
  );
}
