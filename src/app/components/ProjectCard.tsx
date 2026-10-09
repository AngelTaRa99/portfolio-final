import type { Project } from "@/content/types";
import TerminalPanel from "./TerminalPanel";
import StatusDot from "./StatusDot";
import TechChip from "./TechChip";

const statusLabel: Record<Project["status"], string> = {
  live: "EN LÍNEA",
  wip: "EN PROGRESO",
  archived: "ARCHIVADO",
};

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <TerminalPanel title={statusLabel[project.status]} path={`~/projects/${project.id}`} className="flex h-full flex-col">
      <div className="flex items-center gap-2">
        <StatusDot variant={project.status === "live" ? "success" : "idle"} />
        <h2 className="font-mono text-lg text-foreground">{project.name}</h2>
      </div>

      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{project.description}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <TechChip key={tag} label={tag} />
        ))}
      </div>

      {project.url && (
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 inline-flex items-center justify-center rounded-md border border-border px-4 py-2.5 font-mono text-sm text-foreground transition-colors hover:border-primary hover:text-primary"
        >
          Ver proyecto&nbsp;↗
        </a>
      )}
    </TerminalPanel>
  );
}
