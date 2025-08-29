import type { CMMIData } from "@/types";
import { Section, SectionCard } from "@/components/ui/section";
import { Check } from "lucide-react";

interface RolesProps {
  data: CMMIData;
}

const consultantRoles = [
  "To work on overall activities as per the proposal",
  "To provide necessary guidance and direction for CMMI compliance",
  "To verify if CMMI compliance is achieved",
  "To oversee and monitor project progress",
  "To resolve any technical escalations/queries",
];

const managerRoles = [
  "Coordinate on activity completion status and payment milestones",
  "To resolve any escalations",
];

const clientRoles1 = [
  "To act as Single Point-of-Contact (SPOC)",
  "Should have authority to take decisions on Small and Medium matters",
  "Should understand priority and impact of matters and whom to reach for solutions",
  "Understand the perspective of Process improvement paradigm and CMMI norms",
  "Should understand the CMMI model to coordinate on deliverables",
];

const clientRoles2 = [
    "Should be able to achieve support from all levels of the organization",
    "To collaborate with external stakeholders and provide necessary information",
    "To coordinate with internal stakeholders and collect necessary information",
    "Should provide technical information (project data, metrics, etc.)",
    "Should understand the efforts and timelines required for all activities",
];

const RoleItem = ({ children }: { children: React.ReactNode }) => (
  <div className="flex items-start">
    <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center mr-3 flex-shrink-0 mt-1">
      <Check className="h-4 w-4 text-primary" />
    </div>
    <p className="text-muted-foreground">{children}</p>
  </div>
);

export function Roles({ data }: RolesProps) {
  return (
    <Section
      id="roles"
      title="Roles &amp; Responsibilities"
      subtitle="Clear definition of roles for successful CMMI implementation."
      variant="inverted"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <SectionCard className="h-full">
            <h3 className="text-xl font-bold text-primary mb-4">Primary Consultant</h3>
            <div className="space-y-3">
              {consultantRoles.map((role, i) => <RoleItem key={i}>{role}</RoleItem>)}
            </div>
          </SectionCard>
        </div>
        <div>
          <SectionCard className="h-full">
            <h3 className="text-xl font-bold text-primary mb-4">Project Manager</h3>
            <div className="space-y-3">
              {managerRoles.map((role, i) => (
                <RoleItem key={i}>
                  {role.includes("Coordinate") ? role.replace("between client and Consultant", `between ${data.companyName} and Consultant`) : role}
                </RoleItem>
              ))}
            </div>
          </SectionCard>
        </div>
        <div className="md:col-span-2">
            <SectionCard>
                <h3 className="text-xl font-bold text-primary mb-4">{data.companyName} - SPOC</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                    {clientRoles1.map((role, i) => <RoleItem key={i}>{role}</RoleItem>)}
                    {clientRoles2.map((role, i) => <RoleItem key={i}>{role}</RoleItem>)}
                </div>
            </SectionCard>
        </div>
      </div>
    </Section>
  );
}
