import TerminalPanel from "@/app/components/TerminalPanel";
import ProjectCard from "@/app/components/ProjectCard";
import { projects } from "@/content/projects";

export default function Projects() {
  return (
    <TerminalPanel title="proyectos" path="~/projects" className="w-full max-w-5xl">
      <h1 className="text-xl text-foreground">Proyectos</h1>
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </TerminalPanel>
  );
}
