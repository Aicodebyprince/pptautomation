"use client";

import type { CMMIData } from "@/types";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { FileText, File, DownloadCloud } from "lucide-react";
import { generateDocx } from "@/lib/docx-generator";
import { generatePptx } from "@/lib/pptx-generator";
import { useToast } from "@/hooks/use-toast";
import { useState } from 'react';

interface DownloadProps {
  data: CMMIData;
}

export function Download({ data }: DownloadProps) {
    const { toast } = useToast();
    const [isDocxLoading, setIsDocxLoading] = useState(false);
    const [isPptxLoading, setIsPptxLoading] = useState(false);

    const handleDownloadDocx = async () => {
        setIsDocxLoading(true);
        toast({
            title: "Generating Document",
            description: "Your Word file is being created...",
        });
        try {
            await generateDocx(data);
        } catch (error) {
            console.error("Failed to generate DOCX:", error);
            toast({
                variant: "destructive",
                title: "Generation Failed",
                description: "There was an error creating the Word file.",
            });
        }
        setIsDocxLoading(false);
    }
    
    const handleDownloadPptx = () => {
        setIsPptxLoading(true);
        toast({
            title: "Generating Presentation",
            description: "Your PowerPoint file is being created...",
        });
        try {
            generatePptx(data);
        } catch (error) {
            console.error("Failed to generate PPTX:", error);
            toast({
                variant: "destructive",
                title: "Generation Failed",
                description: "There was an error creating the PowerPoint file.",
            });
        }
        setIsPptxLoading(false);
    }

  return (
    <Section
      id="download"
      title="Download Project Documents"
      subtitle="Get a copy of this project kickoff plan in your desired format."
    >
      <div className="text-center flex flex-col sm:flex-row justify-center items-center gap-4">
        <Button size="lg" onClick={handleDownloadDocx} disabled={isDocxLoading}>
          {isDocxLoading ? (
            <DownloadCloud className="mr-2 h-5 w-5 animate-bounce" />
          ) : (
            <FileText className="mr-2 h-5 w-5" />
          )}
          Download as DOCX
        </Button>
         <Button size="lg" onClick={handleDownloadPptx} disabled={isPptxLoading}>
           {isPptxLoading ? (
            <DownloadCloud className="mr-2 h-5 w-5 animate-bounce" />
          ) : (
            <File className="mr-2 h-5 w-5" />
          )}
          Download as PPTX
        </Button>
      </div>
    </Section>
  );
}
