import type { ExperienceItem } from "@/content/types";

export default function TimelineItem({ item }: { item: ExperienceItem }) {
  return (
    <li className="relative border-l border-border pb-8 pl-6 last:pb-0">
      <span className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full bg-primary" aria-hidden="true" />
      <time className="font-mono text-xs uppercase tracking-widest text-muted-foreground">{item.period}</time>
      <h3 className="mt-1 font-mono text-base text-foreground">
        {item.role} <span className="text-muted-foreground">· {item.org}</span>
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
    </li>
  );
}
