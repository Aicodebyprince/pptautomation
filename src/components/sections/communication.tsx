import type { CMMIData } from "@/types";
import { Section, SectionCard } from "@/components/ui/section";
import { MessageSquare, FileText, Timer } from "lucide-react";

interface CommunicationProps {
  data: CMMIData;
}

export function Communication({ data }: CommunicationProps) {
  return (
    <Section
      id="communication"
      title="Communication Protocols"
      subtitle="Clear guidelines for effective project communication."
    >
      <SectionCard>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <div className="flex items-center mb-3">
              <MessageSquare className="h-5 w-5 mr-3 text-primary" />
              <h3 className="text-xl font-bold text-primary">Operational Communication</h3>
            </div>
            <p className="text-muted-foreground pl-8">Operational matters should be discussed between <span className="font-semibold text-primary">{data.companyName}</span> SPOC and Consultant.</p>
          </div>
          <div>
            <div className="flex items-center mb-3">
              <MessageSquare className="h-5 w-5 mr-3 text-primary" />
              <h3 className="text-xl font-bold text-primary">Decision Making</h3>
            </div>
            <p className="text-muted-foreground pl-8">Major decisions should be discussed between <span className="font-semibold text-primary">{data.companyName}</span> Sponsor and Delivery Manager.</p>
          </div>
          <div className="md:col-span-2">
            <div className="flex items-center mb-3">
              <FileText className="h-5 w-5 mr-3 text-primary" />
              <h3 className="text-xl font-bold text-primary">Documentation</h3>
            </div>
            <p className="text-muted-foreground pl-8">Queries and responses to be formally documented. Critical dependencies to be identified and documented.</p>
          </div>
          <div className="md:col-span-2">
            <div className="flex items-center mb-3">
              <Timer className="h-5 w-5 mr-3 text-primary" />
              <h3 className="text-xl font-bold text-primary">Response Time Guidelines</h3>
            </div>
            <ul className="list-disc pl-14 text-muted-foreground space-y-2">
              <li>Unplanned calls may not be responded to immediately. Queries should be compiled by <span className="font-semibold text-primary">{data.companyName}</span> SPOC and sent once a week.</li>
              <li>Small queries (e.g. technical queries) - reply in 1 day over email/call.</li>
              <li>Big queries (e.g. RGS, CAS, appraisal-related) - reply in 1 week over email/call.</li>
            </ul>
          </div>
        </div>
      </SectionCard>
    </Section>
  );
}
