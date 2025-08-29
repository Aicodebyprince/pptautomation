"use client";

import { useState } from 'react';
import { generateActionItems } from '@/ai/flows/generate-action-items';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Lightbulb, AlertTriangle, CheckCircle } from 'lucide-react';

interface ActionItemGeneratorProps {
  cmmiModel: string;
  maturityLevel: string;
}

const implementationPhases = [
  'Project Setup',
  'Training and Documentation',
  'Sample RGS',
  'Documentation and Training',
  'Final Preparation',
];

export function ActionItemGenerator({ cmmiModel, maturityLevel }: ActionItemGeneratorProps) {
  const [phase, setPhase] = useState('');
  const [items, setItems] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!phase) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Please select an implementation phase first.",
      });
      return;
    }

    setLoading(true);
    setError(null);
    setItems([]);

    try {
      const result = await generateActionItems({ implementationPhase: phase, cmmiModel, maturityLevel });
      setItems(result.actionItems);
    } catch (e) {
      console.error(e);
      setError("Failed to generate action items. Please try again.");
      toast({
        variant: "destructive",
        title: "AI Generation Failed",
        description: "There was an error communicating with the AI. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-2">
        <Select onValueChange={setPhase} value={phase}>
          <SelectTrigger className="flex-1">
            <SelectValue placeholder="Select a phase..." />
          </SelectTrigger>
          <SelectContent>
            {implementationPhases.map((p) => (
              <SelectItem key={p} value={p}>{p}</SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Button onClick={handleGenerate} disabled={loading} className="w-full sm:w-auto">
          {loading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Lightbulb className="mr-2 h-4 w-4" />
              Generate
            </>
          )}
        </Button>
      </div>

      {error && (
        <div className="flex items-center text-destructive p-3 bg-destructive/10 rounded-md">
          <AlertTriangle className="h-5 w-5 mr-3" />
          <p>{error}</p>
        </div>
      )}

      {items.length > 0 && (
        <div className="space-y-2 pt-4">
          <h4 className="font-semibold text-primary">Suggested Action Items:</h4>
          <ul className="space-y-2">
            {items.map((item, index) => (
              <li key={index} className="flex items-start text-muted-foreground text-sm">
                <CheckCircle className="h-4 w-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
