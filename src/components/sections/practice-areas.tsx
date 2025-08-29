import type { CMMIModel } from "@/types";
import { Section, SectionCard } from "@/components/ui/section";
import { practiceAreas } from "@/lib/data";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

const PracticeAreaTable = ({ data }: { data: { abbr: string, name: string }[] }) => (
  <SectionCard className="p-0 overflow-hidden">
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-1/4 bg-primary text-primary-foreground">Abbreviation</TableHead>
            <TableHead className="bg-primary text-primary-foreground">Practice Areas</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((item) => (
            <TableRow key={item.abbr} className="hover:bg-primary/5">
              <TableCell className="font-medium text-primary">{item.abbr}</TableCell>
              <TableCell>{item.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  </SectionCard>
);

interface PracticeAreasProps {
    cmmiModel: CMMIModel;
}

export function PracticeAreas({ cmmiModel }: PracticeAreasProps) {
  const modelKey = cmmiModel?.toLowerCase() as keyof typeof practiceAreas;
  const areaData = practiceAreas[modelKey];

  return (
    <Section
      id="practice-areas"
      title="CMMI Practice Areas"
      subtitle="Key practice areas based on the selected CMMI model."
      variant="inverted"
    >
      {areaData ? (
        <div>
          <h3 className="text-2xl font-bold text-center mb-6 text-primary">{cmmiModel} Practice Areas</h3>
          <PracticeAreaTable data={areaData} />
        </div>
      ) : (
        <SectionCard>
          <p className="text-center text-muted-foreground">Select a CMMI Model in the form to view relevant practice areas.</p>
        </SectionCard>
      )}
    </Section>
  );
}
