"use client";

import { useState, useRef } from 'react';
import type { CMMIData } from "@/types";
import Image from 'next/image';
import { Section, SectionCard } from "@/components/ui/section";
import { Upload } from 'lucide-react';

interface ReportingProps {
  data: CMMIData;
}

export function Reporting({ data }: ReportingProps) {
  const [wbsImage, setWbsImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
              setWbsImage(reader.result as string);
          };
          reader.readAsDataURL(file);
      }
  };

  const handlePlaceholderClick = () => {
      fileInputRef.current?.click();
  };

  return (
    <Section
      id="reporting"
      title="Reporting and Monitoring using WBS"
      subtitle="Tracking project progress and reporting framework."
      variant="inverted"
    >
      <SectionCard>
        <div className="flex justify-center mb-8">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
              accept="image/*"
            />
            {wbsImage ? (
                <div className="relative w-full aspect-video rounded-lg overflow-hidden border-2 border-dashed border-primary/50 cursor-pointer" onClick={handlePlaceholderClick}>
                    <Image src={wbsImage} alt="WBS Screenshot" layout="fill" objectFit="contain" />
                </div>
            ) : (
                <div 
                  className="wbs-placeholder w-full max-w-4xl cursor-pointer"
                  onClick={handlePlaceholderClick}
                  data-ai-hint="gantt chart"
                >
                    <div className="text-center text-muted-foreground">
                        <Upload className="mx-auto h-12 w-12 mb-4" />
                        <h4 className="text-lg font-semibold text-foreground">Upload WBS Image</h4>
                        <p>Click to upload an image of the Work Breakdown Structure.</p>
                    </div>
                </div>
            )}
        </div>
        <p className="text-muted-foreground text-center">
          We shall use the Work Breakdown Structure (WBS) for monitoring project progress and for periodic reporting to <span className="font-semibold text-primary">{data.companyName}</span> SPOC. The frequency of reporting shall be decided mutually.
        </p>
      </SectionCard>
    </Section>
  );
}
