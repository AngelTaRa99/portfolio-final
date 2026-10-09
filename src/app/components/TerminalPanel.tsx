import type { ReactNode } from "react";

export default function TerminalPanel({
  title,
  path,
  children,
  className = "",
}: {
  title?: string;
  path?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section className={`relative overflow-hidden rounded-xl border border-border bg-surface ${className}`}>
      {(title || path) && (
        <header className="flex items-center gap-2 border-b border-border bg-surface-2 px-4 py-2">
          <span className="flex gap-1.5" aria-hidden="true">
            <span className="h-2.5 w-2.5 rounded-full bg-primary" />
            <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/40" />
            <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/40" />
          </span>
          {path && <span className="font-mono text-xs text-muted-foreground">{path}</span>}
          {title && (
            <span className="ml-auto font-mono text-xs uppercase tracking-widest text-muted-foreground">
              {title}
            </span>
          )}
        </header>
      )}
      <div className="p-6">{children}</div>
    </section>
  );
}
