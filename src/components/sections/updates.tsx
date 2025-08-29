import type { CMMIData } from "@/types";
import { Section, SectionCard } from "@/components/ui/section";
import { Calendar, Users, Globe } from "lucide-react";

interface UpdatesProps {
  data: CMMIData;
}

export function Updates({ data }: UpdatesProps) {
  return (
    <Section
      id="updates"
      title="Monthly Update Protocol"
      subtitle="Structured approach for monthly governance calls."
      variant="inverted"
    >
      <SectionCard>
        <h3 className="text-xl font-bold text-primary mb-4 text-center">Monthly Update/Governance Call</h3>
        <ul className="space-y-4 text-center max-w-lg mx-auto">
          <li className="flex flex-col items-center">
            <div className="flex items-center text-muted-foreground">
              <Users className="h-5 w-5 mr-2" />
              <span className="font-semibold text-foreground">Participants:</span>
            </div>
            <p className="text-muted-foreground">{data.companyName} SPOC, Teams, Consultant, and Project Manager</p>
          </li>
          <li className="flex flex-col items-center">
             <div className="flex items-center text-muted-foreground">
              <Globe className="h-5 w-5 mr-2" />
              <span className="font-semibold text-foreground">Platform:</span>
            </div>
            <p className="text-muted-foreground">Virtual (Zoom, Google Meet, MS Teams etc.)</p>
          </li>
          <li className="flex flex-col items-center">
            <div className="flex items-center text-muted-foreground">
              <Calendar className="h-5 w-5 mr-2" />
              <span className="font-semibold text-foreground">Timing:</span>
            </div>
            <p className="text-muted-foreground">First week of each month, at a mutually planned date.</p>
          </li>
        </ul>
      </SectionCard>
    </Section>
  );
}
