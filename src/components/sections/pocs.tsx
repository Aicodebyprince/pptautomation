import type { CMMIData } from "@/types";
import { Section, SectionCard } from "@/components/ui/section";
import { Mail, UserCircle } from "lucide-react";

interface PocsProps {
  data: CMMIData;
}

export function Pocs({ data }: PocsProps) {
  const consultant = data.consultants[0] || { name: "N/A", email: "N/A" };
  const projectManager = data.projectManagers[0] || { name: "N/A", email: "N/A" };

  return (
    <Section
      id="contact"
      title="UNIVIA Points of Contact"
      subtitle="Key contacts for project coordination and consultation."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <SectionCard>
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
              <UserCircle className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-primary">Consultant</h3>
              <p className="text-muted-foreground">{consultant.name}</p>
            </div>
          </div>
          <p className="text-foreground/80 mb-4 h-12">Lead CMMI Consultant providing guidance and oversight.</p>
          <div className="text-muted-foreground flex items-center text-sm">
            <Mail className="h-4 w-4 mr-2" />
            <span>{consultant.email}</span>
          </div>
        </SectionCard>
        
        <SectionCard>
          <div className="flex items-center mb-4">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
              <UserCircle className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-primary">Project Manager</h3>
              <p className="text-muted-foreground">{projectManager.name}</p>
            </div>
          </div>
          <p className="text-foreground/80 mb-4 h-12">Project coordination and milestone management.</p>
          <div className="text-muted-foreground flex items-center text-sm">
            <Mail className="h-4 w-4 mr-2" />
            <span>{projectManager.email}</span>
          </div>
        </SectionCard>
      </div>
    </Section>
  );
}
