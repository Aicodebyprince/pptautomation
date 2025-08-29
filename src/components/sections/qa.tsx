import { Section, SectionCard } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { MessageCircle } from "lucide-react";

export function QA() {
  return (
    <Section
      id="qa"
      title="Interaction/Q and A"
      subtitle="Open forum for questions, clarifications, and discussions."
      variant="inverted"
    >
      <SectionCard>
        <div className="text-center py-12">
          <h3 className="text-2xl font-bold text-primary mb-6">We're here to answer your questions</h3>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
            Please feel free to ask any questions about the CMMI implementation process, roles, responsibilities, or any other aspect of our engagement.
          </p>
          <Button size="lg">
            <MessageCircle className="mr-2 h-5 w-5" />
            Ask a Question
          </Button>
        </div>
      </SectionCard>
    </Section>
  );
}
