import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const agendaItems = [
  { title: "CMMI Model Scope", description: "Defining the boundaries and focus areas of our CMMI implementation, including targeted maturity levels and organizational coverage." },
  { title: "CMMI Practice Areas", description: "Exploring the key practice areas relevant to your organization's goals and how they align with your business objectives." },
  { title: "Approach", description: "Outlining our implementation methodology, timeline, and strategic roadmap for achieving CMMI compliance and certification." },
  { title: "Roles & Responsibilities", description: "Clarifying the specific roles, responsibilities, and expectations for both ABC Company and client teams throughout the engagement." },
  { title: "Key Teams to be Formed", description: "Identifying and structuring the essential teams needed to drive CMMI implementation success." },
  { title: "Critical Success Factors", description: "Highlighting the key elements and conditions necessary for a successful CMMI implementation and organizational transformation." },
  { title: "Engagement Structure", description: "Detailing the framework for collaboration, including meeting cadence, reporting structures, and governance mechanisms." },
  { title: "Communication and Escalation Protocols", description: "Establishing clear channels for communication, issue resolution, and escalation procedures to ensure smooth project execution." },
  { title: "Next Steps - 30 Days Focus", description: "Prioritizing immediate actions and deliverables for the first month to build momentum and establish a strong foundation." },
  { title: "Interaction/Q and A", description: "Open forum for discussion, clarification, and addressing any questions or concerns from all stakeholders." },
];

export function Agenda() {
  return (
    <Section
      id="agenda"
      title="Meeting Agenda"
      subtitle="A comprehensive overview of our CMMI implementation kickoff meeting topics and discussion points."
      variant="inverted"
    >
      <div className="relative">
        <div className="timeline-connector hidden md:block"></div>
        <div className="space-y-6">
          {agendaItems.map((item, index) => (
            <div key={index} className="agenda-item bg-background rounded-lg shadow-md p-6 md:pl-12 relative transition-all duration-300 ease-in-out border-l-4 border-transparent hover:transform hover:-translate-y-1 hover:border-accent hover:shadow-xl">
              <div className="timeline-dot hidden md:block" style={{ top: '2rem' }}></div>
              <span className="absolute top-4 right-6 text-2xl font-bold text-primary/10 transition-opacity duration-300">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="text-xl font-bold text-primary mb-2">{item.title}</h3>
              <p className="text-muted-foreground">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
