import type { CMMIData } from "@/types";
import { Section, SectionCard } from "@/components/ui/section";

interface NextStepsProps {
  data: CMMIData;
}

export function NextSteps({ data }: NextStepsProps) {
  const nextStepsItems = [
    `To identify stakeholders from the ${data.companyName} team`,
    `To receive the PID (Project Initiation Document) documents from the ${data.companyName} team`,
    `To receive details about internal team formation at ${data.companyName}`,
    "To establish a project charter",
    `To develop the Work Breakdown Structure (WBS) for CMMI activities together with the ${data.companyName} team`,
    "To identify participants for CMMI Overview training and dates",
  ];

  return (
    <Section
      id="next-steps"
      title="Next Steps - 30 Days Focus"
      subtitle="Immediate priorities for the first month of implementation."
    >
      <SectionCard>
        <h3 className="text-xl font-bold text-primary mb-4">30-days window (joint responsibilities):</h3>
        <ul className="list-disc pl-5 text-muted-foreground space-y-3">
          {nextStepsItems.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      </SectionCard>
    </Section>
  );
}
