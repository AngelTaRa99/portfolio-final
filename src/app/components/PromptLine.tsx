import type { ReactNode } from "react";

export default function PromptLine({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={`font-mono ${className}`}>
      <span className="text-primary" aria-hidden="true">
        $&nbsp;
      </span>
      {children}
    </span>
  );
}
