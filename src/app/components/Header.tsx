import Link from "next/link";
import StatusDot from "./StatusDot";
import ThemeToggle from "./ThemeToggle";

export default function Header({ brand }: { brand: string }) {
  return (
    <header className="flex items-center justify-between border-b border-border bg-surface px-4 py-3">
      <Link href="/" className="flex min-h-11 items-center gap-2 font-mono text-sm tracking-wider text-foreground">
        <StatusDot variant="active" />
        <span className="uppercase">{brand}</span>
      </Link>
      <div className="flex items-center gap-3">
        <span className="hidden font-mono text-xs text-muted-foreground md:inline">~/dev</span>
        <ThemeToggle />
      </div>
    </header>
  );
}
