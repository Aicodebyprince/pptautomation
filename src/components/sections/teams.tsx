import type { CMMIData } from "@/types";
import { Section, SectionCard } from "@/components/ui/section";
import { Users, ShieldCheck, UserCheck, Settings, Building, Users2 } from "lucide-react";

interface TeamsProps {
  data: CMMIData;
}

const teams = [
  {
    icon: Users,
    title: "Software Engineering/Service Process Group (SEPG/SPG)",
    description: "Responsible for defining, maintaining, and improving processes across the organization.",
  },
  {
    icon: ShieldCheck,
    title: "Internal Process Quality Assurance (IPQA) Team",
    description: "Ensures adherence to defined processes and identifies areas for improvement.",
  },
  {
    icon: UserCheck,
    title: "Project/Service Managers",
    description: "Responsible for implementing defined processes in their respective projects/services.",
  },
  {
    icon: Settings,
    title: "Support Function Teams",
    description: "Includes Training, Infrastructure, and Configuration Management functions as needed.",
  },
  {
    icon: Building,
    title: "Senior Management",
    description: "Provides strategic direction, resources, and resolves organizational issues.",
  },
  {
    icon: Users2,
    title: "Business Development Team",
    description: "Required if implementing Services (SVC) model for strategic alignment.",
  }
];

export function Teams({ data }: TeamsProps) {
  return (
    <Section
      id="teams"
      title="Key Groups to be Formed"
      subtitle={`Essential teams required for successful CMMI implementation at ${data.companyName}.`}
      variant="inverted"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {teams.map((team, index) => (
          <SectionCard key={index} className="group">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4 transition-all duration-300 group-hover:scale-110 group-hover:bg-primary/20">
                <team.icon className="h-6 w-6 text-primary transition-transform duration-300" />
              </div>
              <h3 className="text-xl font-bold text-primary">{team.title}</h3>
            </div>
            <p className="text-muted-foreground">{team.description}</p>
          </SectionCard>
        ))}
      </div>
    </Section>
  );
}
