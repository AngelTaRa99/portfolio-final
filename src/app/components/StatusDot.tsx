type StatusVariant = "active" | "idle" | "success";

const colors: Record<StatusVariant, string> = {
  active: "bg-primary",
  success: "bg-success",
  idle: "bg-muted-foreground",
};

export default function StatusDot({ variant = "idle" }: { variant?: StatusVariant }) {
  return (
    <span
      data-testid="status-dot"
      className={`inline-block h-2 w-2 rounded-full ${colors[variant]}`}
      aria-hidden="true"
    />
  );
}
