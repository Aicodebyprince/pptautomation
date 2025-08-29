import type { CMMIData } from "@/types";
import { Section, SectionCard } from "@/components/ui/section";
import { ArrowRight } from "lucide-react";

interface EscalationProps {
  data: CMMIData;
}

export function Escalation({ data }: EscalationProps) {
  const consultant = data.consultants[0] || { name: "N/A", email: "N/A" };
  const projectManager = data.projectManagers[0] || { name: "N/A", email: "N/A" };
  
  return (
    <Section
      id="escalation"
      title="Escalation Protocol"
      subtitle="Structured approach for issue resolution and escalation."
    >
      <SectionCard>
        <div className="flex flex-col md:flex-row justify-around items-center text-center gap-4">
          <div className="flex-1">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
              <p className="text-primary font-bold text-xl">1</p>
            </div>
            <h3 className="font-semibold text-foreground">Initial Escalation</h3>
            <p className="text-muted-foreground text-sm">
              Issue from <span className="font-semibold text-primary">{data.companyName}</span> sent via email to consultant ({consultant.email}) with CC to project manager ({projectManager.email}).
            </p>
          </div>
          <ArrowRight className="h-8 w-8 text-primary/20 my-4 md:my-0" />
          <div className="flex-1">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
              <p className="text-primary font-bold text-xl">2</p>
            </div>
            <h3 className="font-semibold text-foreground">Consultant Resolution</h3>
            <p className="text-muted-foreground text-sm">
              Consultant discusses internally and responds.
            </p>
          </div>
           <ArrowRight className="h-8 w-8 text-primary/20 my-4 md:my-0" />
          <div className="flex-1">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-2">
              <p className="text-primary font-bold text-xl">3</p>
            </div>
            <h3 className="font-semibold text-foreground">Further Escalation</h3>
            <p className="text-muted-foreground text-sm">
              If unresolved, email project manager ({projectManager.email}) with CC to consultant ({consultant.email}).
            </p>
          </div>
        </div>
      </SectionCard>
    </Section>
  );
}
