export default function TechChip({ label }: { label: string }) {
  return (
    <span className="inline-block rounded border border-border px-2 py-0.5 font-mono text-xs text-muted-foreground">
      {label}
    </span>
  );
}
