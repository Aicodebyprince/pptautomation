import { Section, SectionCard } from "@/components/ui/section";
import { Eye, DollarSign, GitPullRequest, CheckCircle, BrainCircuit, Shuffle, UserCog, Database } from "lucide-react";

const factors = [
  { icon: Eye, title: "Visible Management Involvement", description: "Active participation and commitment from leadership throughout the implementation." },
  { icon: DollarSign, title: "Adequate Resource Allocation", description: "Sufficient budget, time, and personnel dedicated to the implementation effort." },
  { icon: GitPullRequest, title: "Positive Response to Change", description: "Organizational culture that embraces process improvements and adaptations." },
  { icon: CheckCircle, title: "Timely Decision Making", description: "Efficient processes for resolving issues and making implementation decisions." },
  { icon: BrainCircuit, title: "Adequate Competencies", description: "Team members with appropriate skills and knowledge for implementation tasks." },
  { icon: Shuffle, title: "New Projects Affecting Priorities", description: "Ability to balance implementation with new business initiatives and projects." },
  { icon: UserCog, title: "New Roles Affecting Velocity", description: "Effective onboarding and training for team members in new CMMI-related roles." },
  { icon: Database, title: "Timely Provision of Required Information", description: "Consistent availability of necessary data and resources for implementation activities." },
];

export function SuccessFactors() {
  return (
    <Section
      id="success-factors"
      title="Critical Success Factors"
      subtitle="Key elements essential for a successful CMMI implementation."
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {factors.map((factor, index) => (
          <div key={index} className="group">
            <SectionCard className="h-full text-center">
              <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4 transition-transform duration-300 group-hover:scale-110">
                <factor.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-primary mb-2">{factor.title}</h3>
              <p className="text-muted-foreground text-sm">{factor.description}</p>
            </SectionCard>
          </div>
        ))}
      </div>
    </Section>
  );
}
