'use client';

import {
  Document,
  Packer,
  Paragraph,
  TextRun,
  HeadingLevel,
  AlignmentType,
  Table,
  TableRow,
  TableCell,
  WidthType,
  VerticalAlign,
  IBorderAttributes,
  BorderStyle,
} from 'docx';
import { saveAs } from 'file-saver';
import type { CMMIData } from '@/types';
import { practiceAreas as allPracticeAreas } from '@/lib/data';

const consultantRoles = [
  "To work on overall activities as per the proposal",
  "To provide necessary guidance and direction for CMMI compliance",
  "To verify if CMMI compliance is achieved",
  "To oversee and monitor project progress",
  "To resolve any technical escalations/queries",
];

const managerRoles = [
  "Coordinate on activity completion status and payment milestones",
  "To resolve any escalations",
];

const clientRoles1 = [
  "To act as Single Point-of-Contact (SPOC)",
  "Should have authority to take decisions on Small and Medium matters",
  "Should understand priority and impact of matters and whom to reach for solutions",
  "Understand the perspective of Process improvement paradigm and CMMI norms",
  "Should understand the CMMI model to coordinate on deliverables",
];

const clientRoles2 = [
    "Should be able to achieve support from all levels of the organization",
    "To collaborate with external stakeholders and provide necessary information",
    "To coordinate with internal stakeholders and collect necessary information",
    "Should provide technical information (project data, metrics, etc.)",
    "Should understand the efforts and timelines required for all activities",
];

const teams = [
  {
    title: "Software Engineering/Service Process Group (SEPG/SPG)",
    description: "Responsible for defining, maintaining, and improving processes across the organization.",
  },
  {
    title: "Internal Process Quality Assurance (IPQA) Team",
    description: "Ensures adherence to defined processes and identifies areas for improvement.",
  },
  {
    title: "Project/Service Managers",
    description: "Responsible for implementing defined processes in their respective projects/services.",
  },
  {
    title: "Support Function Teams",
    description: "Includes Training, Infrastructure, and Configuration Management functions as needed.",
  },
  {
    title: "Senior Management",
    description: "Provides strategic direction, resources, and resolves organizational issues.",
  },
  {
    title: "Business Development Team",
    description: "Required if implementing Services (SVC) model for strategic alignment.",
  }
];

const factors = [
  "Visible Management Involvement",
  "Adequate Resource Allocation",
  "Positive Response to Change",
  "Timely Decision Making",
  "Adequate Competencies",
  "New Projects Affecting Priorities",
  "New Roles Affecting Velocity",
  "Timely Provision of Required Information",
];

const delayItems = [
    "All delays shall be logged in the WBS from both sides with 'Delay' mentioned in the status.",
    "Both parties are aware of the accumulated delays and its impact on the overall timelines.",
    "Focus to get the current tasks on hand to be completed soon, rather than negotiate the final timelines.",
];

const PRIMARY_COLOR = "294B63";
const ACCENT_COLOR = "6D8B8D";
const TEXT_COLOR = "333333";

const createHeading = (text: string, headingLevel: HeadingLevel, color: string, bold = true) => {
    return new Paragraph({
        heading: headingLevel,
        children: [new TextRun({ text, bold, font: "Space Grotesk", size: headingLevel === HeadingLevel.HEADING_1 ? 28 : 24, color })],
        spacing: { before: 300, after: 150 },
        border: headingLevel === HeadingLevel.HEADING_1 ? { bottom: { color: "auto", space: 1, value: "single", size: 6 } } : undefined,
    });
};

const createSubHeading = (text: string) => createHeading(text, HeadingLevel.HEADING_2, ACCENT_COLOR);

const createParagraph = (text: string | TextRun[], alignment = AlignmentType.LEFT, isMuted = false) => {
    const children = Array.isArray(text) ? text : [new TextRun({ text, font: "Inter", size: 22, color: isMuted ? "888888" : TEXT_COLOR })];
    return new Paragraph({
        children,
        spacing: { after: 150 },
        alignment,
    });
};

const createBullet = (text: string, level = 0) => {
    return new Paragraph({
        text,
        bullet: { level },
        style: "default-bullet",
    });
};

export const generateDocx = async (data: CMMIData) => {
    const meetingDate = new Date(data.meetingDate);
    meetingDate.setDate(meetingDate.getDate() + 1);
    const formattedDate = meetingDate.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });

    const titlePage = {
        properties: {
            page: {
                borders: {
                    pageBorders: {
                        display: "firstPage" as const,
                        borderStyle: "double" as const,
                        size: 6,
                        color: ACCENT_COLOR,
                        space: 24,
                    },
                },
            },
            verticalAlign: VerticalAlign.CENTER,
        },
        children: [
            new Paragraph({
                children: [new TextRun({ text: 'CMMI Implementation Kickoff', font: "Space Grotesk", size: 48, bold: true, color: PRIMARY_COLOR })],
                alignment: AlignmentType.CENTER,
                spacing: { after: 400 },
            }),
            createParagraph(`UNIVIA Management International`, AlignmentType.CENTER),
            createParagraph(`and`, AlignmentType.CENTER),
            createParagraph(`${data.companyName}`, AlignmentType.CENTER),
            new Paragraph({
                children: [new TextRun({ text: `Date: ${formattedDate}`, font: "Inter", size: 24, color: TEXT_COLOR })],
                alignment: AlignmentType.CENTER,
                spacing: { before: 400 },
            }),
        ],
    };

    const content = [];

    // Agenda
    const agendaItems = [
      "CMMI Model Scope", "CMMI Practice Areas", "Approach", "Roles & Responsibilities", "UNIVIA Points of Contact", "Key Teams to be Formed",
      "Critical Success Factors", "Engagement Structure", "Next Steps - 30 Days Focus", "Interaction/Q and A",
    ];
    content.push(createHeading('Meeting Agenda', HeadingLevel.HEADING_1, PRIMARY_COLOR));
    agendaItems.forEach(item => content.push(createBullet(item)));

    // Scope
    content.push(createHeading('CMMI Model Scope', HeadingLevel.HEADING_1, PRIMARY_COLOR));
    const scopeTable = new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [
            new TableRow({ children: [
                new TableCell({ children: [createParagraph('Service Type')] }), new TableCell({ children: [createParagraph(data.serviceType ? `CMMI (${data.serviceType})` : 'N/A')] }),
                new TableCell({ children: [createParagraph('Version Number')] }), new TableCell({ children: [createParagraph(data.cmmiVersion)] }),
            ]}),
            new TableRow({ children: [
                new TableCell({ children: [createParagraph('Model')] }), new TableCell({ children: [createParagraph(data.cmmiModel)] }),
                new TableCell({ children: [createParagraph('Maturity Level')] }), new TableCell({ children: [createParagraph(data.maturityLevel)] }),
            ]}),
            new TableRow({ children: [
                new TableCell({ children: [createParagraph('Appraisal Type')] }), new TableCell({ children: [createParagraph('Benchmark')] }),
                new TableCell({ children: [createParagraph('Line of Business')] }), new TableCell({ children: [createParagraph(data.businessLine)] }),
            ]}),
            new TableRow({ children: [
                new TableCell({ children: [createParagraph('Current Strength')] }), new TableCell({ children: [createParagraph(`${data.peopleStrength} people`)] }),
                new TableCell({ children: [createParagraph('Current Scope')] }), new TableCell({ children: [createParagraph(`${data.projectScope} projects`)] }),
            ]}),
             new TableRow({ children: [
                new TableCell({ children: [createParagraph('Locations')] }),
                new TableCell({ children: [createParagraph(data.locations.join(', '))] , columnSpan: 3}),
            ]}),
        ],
    });
    content.push(scopeTable);

    // Practice Areas
    content.push(createHeading('CMMI Practice Areas', HeadingLevel.HEADING_1, PRIMARY_COLOR));
    const modelKey = data.cmmiModel?.toLowerCase() as keyof typeof allPracticeAreas;
    const areaData = allPracticeAreas[modelKey] || [];
    const practiceAreaRows = areaData.map(item => new TableRow({ children: [new TableCell({ children: [createParagraph(item.abbr)] }), new TableCell({ children: [createParagraph(item.name)] })] }));
    const practiceAreaTable = new Table({
        width: { size: 100, type: WidthType.PERCENTAGE },
        rows: [
            new TableRow({ children: [
                new TableCell({ children: [createSubHeading('Abbreviation')] }),
                new TableCell({ children: [createSubHeading('Practice Area')] }),
            ]}),
            ...practiceAreaRows
        ]
    });
    content.push(practiceAreaTable);
    
    // Approach
    content.push(createHeading('Consulting Approach', HeadingLevel.HEADING_1, PRIMARY_COLOR));
    content.push(createSubHeading('Phase 1: Project Setup'));
    content.push(createBullet(`Develop Project Work Breakdown Structure (WBS)`));
    content.push(createBullet(`Establish Project Charter (${data.projectCharter} man-day)`));

    content.push(createSubHeading('Phase 2: Training and Documentation'));
    content.push(createBullet(`CMMI Overview Training (${data.overviewTraining} man-days)`));
    content.push(createBullet(`Key process stakeholders - ${data.stakeholders} participants`, 1));
    content.push(createBullet(`Execution of Virtual Training – ${data.virtualTraining} man-days`, 1));
    content.push(createBullet(`Planning & Preparation for training - ${data.planningTraining} man-days`, 1));
    content.push(createBullet(`Participant Self-Assessment Exam + Exercises - ${data.assessmentExam} man-days`, 1));
    content.push(createBullet(`Preparation of CMMI ${data.cmmiVersion} ${data.maturityLevel.split(' ')[0]} QMS Documents (${data.cmmiPreparation} man-days)`));
    
    content.push(createSubHeading('Phase 3 & 4: RGS Documentation'));
    content.push(createBullet(`RGS Project Documentation (${data.rgsDocumentation} man-days)`));
    
    content.push(createSubHeading('Phase 5: Final Preparation'));
    content.push(createBullet(`CMMI ${data.cmmiVersion} based Objective Evidence Database Preparation Training and Verification (${data.evidenceTraining} man-day)`));
    content.push(createBullet(`Appraisal Preparedness Training (${data.appraisalTraining} man-days)`));
    content.push(createBullet(`Project Management and co-ordination service (${data.projectManagement} man-days)`));

    // Roles & Responsibilities
    content.push(createHeading('Roles & Responsibilities', HeadingLevel.HEADING_1, PRIMARY_COLOR));
    content.push(createSubHeading('Primary Consultant'));
    consultantRoles.forEach(role => content.push(createBullet(role)));
    content.push(createSubHeading('Project Manager'));
    managerRoles.forEach(role => content.push(createBullet(role.replace("client", data.companyName))));
    content.push(createSubHeading(`${data.companyName} - SPOC`));
    [...clientRoles1, ...clientRoles2].forEach(role => content.push(createBullet(role)));

    // Points of Contact
    const consultant = data.consultants[0] || { name: "N/A", email: "N/A" };
    const projectManager = data.projectManagers[0] || { name: "N/A", email: "N/A" };
    content.push(createHeading('UNIVIA Points of Contact', HeadingLevel.HEADING_1, PRIMARY_COLOR));
    content.push(createSubHeading('Consultant'));
    content.push(createParagraph([new TextRun({ text: `${consultant.name}: `, bold: true }), new TextRun({ text: consultant.email })]));
    content.push(createSubHeading('Project Manager'));
    content.push(createParagraph([new TextRun({ text: `${projectManager.name}: `, bold: true }), new TextRun({ text: projectManager.email })]));
    
    // Key Groups
    content.push(createHeading('Key Groups to be Formed', HeadingLevel.HEADING_1, PRIMARY_COLOR));
    teams.forEach(team => {
        content.push(createSubHeading(team.title));
        content.push(createParagraph(team.description, AlignmentType.LEFT, true));
    });

    // Success Factors
    content.push(createHeading('Critical Success Factors', HeadingLevel.HEADING_1, PRIMARY_COLOR));
    factors.forEach(factor => content.push(createBullet(factor)));
    
    // Engagement Structure
    content.push(createHeading('Engagement Structure', HeadingLevel.HEADING_1, PRIMARY_COLOR));
    content.push(createSubHeading('Reporting and Monitoring'));
    content.push(createParagraph(`We shall use the Work Breakdown Structure (WBS) for monitoring project progress and for periodic reporting to ${data.companyName} SPOC. The frequency of reporting shall be decided mutually.`));
    
    content.push(createSubHeading('Communication Protocols'));
    content.push(createBullet(`Operational matters should be discussed between ${data.companyName} SPOC and Consultant.`));
    content.push(createBullet(`Major decisions should be discussed between ${data.companyName} Sponsor and Delivery Manager.`));
    content.push(createBullet(`Queries and responses to be formally documented. Critical dependencies to be identified and documented.`));

    content.push(createSubHeading('Monthly Update Protocol'));
    content.push(createBullet(`Participants: ${data.companyName} SPOC, Teams, Consultant, and Project Manager`));
    content.push(createBullet(`Platform: Virtual (Zoom, Google Meet, MS Teams etc.)`));
    content.push(createBullet(`Timing: First week of each month, at a mutually planned date.`));

    content.push(createSubHeading('Escalation Protocol'));
    content.push(createBullet(`1. Initial: Issue from ${data.companyName} sent via email to consultant (${consultant.email}) with CC to project manager (${projectManager.email}).`));
    content.push(createBullet(`2. Resolution: Consultant discusses internally and responds.`));
    content.push(createBullet(`3. Further Escalation: If unresolved, email project manager (${projectManager.email}) with CC to consultant (${consultant.email}).`));
    
    content.push(createSubHeading('Delay Management Protocol'));
    delayItems.forEach(item => content.push(createBullet(item)));

    // Next Steps
    content.push(createHeading('Next Steps - 30 Days Focus', HeadingLevel.HEADING_1, PRIMARY_COLOR));
    const nextStepsItemsData = [
        `To identify stakeholders from the ${data.companyName} team`,
        `To receive the PID (Project Initiation Document) documents from the ${data.companyName} team`,
        `To receive details about internal team formation at ${data.companyName}`,
        "To establish a project charter",
        `To develop the Work Breakdown Structure (WBS) for CMMI activities together with the ${data.companyName} team`,
        "To identify participants for CMMI Overview training and dates",
    ];
    nextStepsItemsData.forEach(item => content.push(createBullet(item)));

    // Q&A
    content.push(createHeading('Interaction / Q&A', HeadingLevel.HEADING_1, PRIMARY_COLOR));
    content.push(createParagraph('An open forum for questions, clarifications, and discussions.', AlignmentType.CENTER));

    // Thank You
    content.push(createHeading('Thank You', HeadingLevel.HEADING_1, PRIMARY_COLOR));
    content.push(createParagraph('We appreciate your commitment to process excellence and look forward to a successful partnership in achieving CMMI compliance.', AlignmentType.CENTER));
    content.push(createParagraph(`For any further questions, please contact our lead consultant: ${consultant.name} at ${consultant.email}.`, AlignmentType.CENTER));

    const doc = new Document({
        creator: 'UNIVIA Management International',
        title: `CMMI Implementation Kickoff: ${data.companyName}`,
        styles: {
            paragraphStyles: [{
                id: "default-bullet",
                name: "Default Bullet",
                basedOn: "Normal",
                next: "Normal",
                run: {
                    font: "Inter",
                    size: 22,
                    color: TEXT_COLOR,
                },
                 paragraph: {
                    spacing: { after: 100 },
                    indent: { left: 720, hanging: 360 },
                }
            }]
        },
        sections: [titlePage, { children: content }],
    });

    const blob = await Packer.toBlob(doc);
    saveAs(blob, `CMMI-Kickoff-${data.companyName}.docx`);
}
