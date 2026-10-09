import TerminalPanel from "@/app/components/TerminalPanel";
import PromptLine from "@/app/components/PromptLine";
import TimelineItem from "@/app/components/TimelineItem";
import { experience } from "@/content/experience";

export default function Experience() {
  return (
    <TerminalPanel title="experiencia" path="~/experience" className="w-full max-w-3xl">
      <h1 className="text-xl text-foreground">Experiencia</h1>
      <PromptLine>cat ~/cv.txt</PromptLine>
      <ul className="mt-8">
        {experience.map((item) => (
          <TimelineItem key={item.id} item={item} />
        ))}
      </ul>
    </TerminalPanel>
  );
}
