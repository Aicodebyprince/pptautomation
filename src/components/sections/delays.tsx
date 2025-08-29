import { Section, SectionCard } from "@/components/ui/section";
import { CheckCircle2 } from "lucide-react";

const delayItems = [
    "All delays shall be logged in the WBS from both sides with 'Delay' mentioned in the status.",
    "Both parties are aware of the accumulated delays and its impact on the overall timelines.",
    "Focus to get the current tasks on hand to be completed soon, rather than negotiate the final timelines.",
];

export function Delays() {
  return (
    <Section
      id="delays"
      title="Delay Management Protocol"
      subtitle="Approach for handling project delays."
      variant="inverted"
    >
      <SectionCard>
        <div className="space-y-4">
            {delayItems.map((item, index) => (
                <div key={index} className="flex items-start">
                    <CheckCircle2 className="h-5 w-5 text-accent mr-3 mt-1 flex-shrink-0" />
                    <p className="text-muted-foreground">{item}</p>
                </div>
            ))}
        </div>
      </SectionCard>
    </Section>
  );
}
