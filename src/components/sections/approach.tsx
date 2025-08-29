"use client";

import type { CMMIData } from "@/types";
import { Section, SectionCard } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import { Download, Info, GitBranchPlus, BookUser, FileCheck2, Award, Upload } from "lucide-react";
import { useState, useRef } from "react";
import Image from "next/image";

interface ApproachProps {
  data: CMMIData;
}

const Phase = ({ title, icon: Icon, children }: { title: string, icon: React.ElementType, children: React.ReactNode }) => (
  <SectionCard className="mb-10">
    <div className="flex items-center mb-6">
      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
        <Icon className="h-6 w-6 text-primary" />
      </div>
      <h3 className="text-2xl font-bold text-primary">{title}</h3>
    </div>
    {children}
  </SectionCard>
);

const Step = ({ title, children }: { title: React.ReactNode, children: React.ReactNode }) => (
  <div className="relative pl-8">
    <div className="absolute left-1 top-2 w-3 h-3 rounded-full bg-primary" />
    <div className="absolute left-[9px] top-6 bottom-0 w-px bg-primary/20" />
    <h4 className="text-lg font-semibold text-foreground mb-2">{title}</h4>
    <div className="text-muted-foreground">{children}</div>
  </div>
);

const Note = ({ children }: { children: React.ReactNode }) => (
    <div className="mt-6 border-l-4 border-primary bg-primary/10 p-4 rounded-r-lg">
        <div className="flex items-start">
            <Info className="h-5 w-5 text-primary mt-0.5 mr-3 flex-shrink-0" />
            <div className="font-medium text-primary/90">{children}</div>
        </div>
    </div>
);


export function Approach({ data }: ApproachProps) {
  const [rgsImage, setRgsImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
          const reader = new FileReader();
          reader.onloadend = () => {
              setRgsImage(reader.result as string);
          };
          reader.readAsDataURL(file);
      }
  };

  const handlePlaceholderClick = () => {
      fileInputRef.current?.click();
  };

  return (
    <Section
      id="approach"
      title="Consulting Approach"
      subtitle="Our comprehensive methodology for implementing CMMI in your organization."
    >
      <Phase title="Phase 1: Project Setup" icon={GitBranchPlus}>
        <div className="space-y-6">
          <Step title="Develop Project Work Breakdown Structure (WBS)">
            <p>All online and offline activities will be tracked by logging in WBS.</p>
          </Step>
          <Step title={<>Establish Project Charter (<span className="text-primary">{data.projectCharter}</span> man-day)</>}>
            <ul className="list-disc pl-5 space-y-2">
              <li>CMMI Scope definition</li>
              <li>Defining business objectives - Senior Management inputs required</li>
              <li>Defining appraisal objectives</li>
              <li>Critical Success Factors</li>
              <li>Sponsor introduction and understanding the context of the organization</li>
              <li>Define {data.maturityLevel.split(' ')[0]} pre-requisites</li>
              <li>Risk Planning for the CMMI project</li>
              <li>Identify key stakeholders from both sides</li>
            </ul>
          </Step>
        </div>
        <Note>All the Consulting activities would be conducted Offsite.</Note>
      </Phase>

      <Phase title="Phase 2: Training and Documentation" icon={BookUser}>
        <div className="space-y-6">
          <Step title={<>CMMI Overview Training (<span className="text-primary">{data.overviewTraining}</span> man-days)</>}>
            <ul className="list-disc pl-5 space-y-2">
              <li>Key process stakeholders - <span className="text-primary">{data.stakeholders}</span> participants</li>
              <li>Execution of Virtual Training – <span className="text-primary">{data.virtualTraining}</span> man-days</li>
              <li>Planning & Preparation for training - <span className="text-primary">{data.planningTraining}</span> man-days</li>
              <li>Participant Self-Assessment Exam + Exercises - <span className="text-primary">{data.assessmentExam}</span> man-days</li>
            </ul>
          </Step>
          <Step title={<>Preparation of CMMI {data.cmmiVersion} {data.maturityLevel.split(' ')[0]} QMS Documents (<span className="text-primary">{data.cmmiPreparation}</span> man-days)</>}>
            <p>Comprehensive documentation aligned with CMMI requirements.</p>
          </Step>
        </div>
        <Note>The QMS documentation provided will not be fully customized as per the client organization processes; rather it will be a limited alignment of standard QMS documents set of UNIVIA.</Note>
      </Phase>

      <Phase title="Phase 3 &amp; 4: RGS Documentation" icon={FileCheck2}>
        <Step title={<>RGS Project Documentation (<span className="text-primary">{data.rgsDocumentation}</span> man-days)</>}>
          <ul className="list-disc pl-5 space-y-2">
            <li>Generation of Random sample from CMMI Institute.</li>
            <li>Preparation of Project documents as selected in RGS.</li>
          </ul>
        </Step>
        <div className="my-6">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageChange}
              className="hidden"
              accept="image/*"
            />
            {rgsImage ? (
                <div className="relative w-full aspect-video rounded-lg overflow-hidden border-2 border-dashed border-primary/50 cursor-pointer" onClick={handlePlaceholderClick}>
                    <Image src={rgsImage} alt="RGS Screenshot" layout="fill" objectFit="contain" />
                </div>
            ) : (
                <div 
                  className="wbs-placeholder cursor-pointer"
                  onClick={handlePlaceholderClick}
                >
                    <div className="text-center">
                        <Upload className="mx-auto h-8 w-8 mb-2" />
                        <p>Click to upload RGS Screenshot</p>
                    </div>
                </div>
            )}
        </div>
        <Note>Dependency on <span className="font-semibold text-primary">{data.companyName}</span> to provide timely and adequate data and review of the delivered process data (e.g. project data, process improvement data, project plans, metrics information, etc.)</Note>
      </Phase>
      
      <Phase title="Phase 5: Final Preparation" icon={Award}>
        <div className="space-y-6">
           <Step title={<>CMMI {data.cmmiVersion} based Objective Evidence Database Preparation Training and Verification (<span className="text-primary">{data.evidenceTraining}</span> man-day)</>}>
            <p>Training on preparing and organizing evidence for the appraisal.</p>
           </Step>
           <Step title={<>Appraisal Preparedness Training (<span className="text-primary">{data.appraisalTraining}</span> man-days)</>}>
            <p>Comprehensive training to prepare the team for the formal CMMI appraisal.</p>
           </Step>
           <Step title={<>Project Management and co-ordination service (<span className="text-primary">{data.projectManagement}</span> man-days)</>}>
            <ul className="list-disc pl-5 space-y-2">
              <li>Change Management (training participants, meeting participants, etc.)</li>
              <li>Co-ordination with OU, SEPG and QA teams for meetings.</li>
              <li>Managing change of dates and schedules of activities, WBS and plan updates.</li>
              <li>Additional calls for consulting issues, follow ups, and unplanned meetings.</li>
            </ul>
          </Step>
        </div>
      </Phase>
    </Section>
  );
}
