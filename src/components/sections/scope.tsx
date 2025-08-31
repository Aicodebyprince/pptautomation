import type { CMMIData } from "@/types";
import { Section } from "@/components/ui/section";
import { Package, Milestone, ShieldQuestion, BarChart, ClipboardList, Briefcase, Users, Folder, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

interface ScopeProps {
  data: CMMIData;
}

interface ScopeItemProps {
  icon: React.ElementType;
  title: string;
  value: React.ReactNode;
  className?: string;
}

function ScopeItem({ icon: Icon, title, value, className }: ScopeItemProps) {
  return (
    <div className={cn(
      "group flex items-start gap-4 rounded-lg border bg-card p-4 shadow-sm transition-all duration-300 ease-in-out",
      "hover:shadow-lg hover:border-primary/20 hover:-translate-y-1",
      className
    )}>
      <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center transition-all duration-300 group-hover:bg-primary group-hover:scale-110">
        <Icon className="h-5 w-5 text-primary transition-all duration-300 group-hover:text-white" />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <p className="text-base font-semibold text-foreground break-words">{value}</p>
      </div>
    </div>
  );
}

export function Scope({ data }: ScopeProps) {
  return (
    <Section
      id="scope"
      title="CMMI Model Scope"
      subtitle="Understanding the boundaries and focus areas of our CMMI implementation."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <ScopeItem icon={Package} title="Service Type" value={`CMMI (${data.serviceType})`} />
        <ScopeItem icon={Milestone} title="Version Number" value={data.cmmiVersion} />
        <ScopeItem icon={ShieldQuestion} title="Model" value={data.cmmiModel} />
        <ScopeItem icon={BarChart} title="Maturity Level" value={data.maturityLevel} />
        <ScopeItem icon={ClipboardList} title="Appraisal Type" value="Benchmark" />
        <ScopeItem icon={Briefcase} title="Line of Business" value={data.businessLine} />
        <ScopeItem icon={Users} title="Current Strength" value={`${data.peopleStrength} people (estimated)`} />
        <ScopeItem icon={Folder} title="Current Scope" value={`${data.projectScope} projects (estimated)`} />
        <ScopeItem 
          icon={MapPin}
          title="Locations"
          value={data.locations.map(l => l.name).join(', ')}
          className="sm:col-span-2 lg:col-span-3"
        />
      </div>
    </Section>
  );
}
