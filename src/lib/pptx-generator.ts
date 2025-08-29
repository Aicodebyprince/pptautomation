'use client';

import PptxGenJS from 'pptxgenjs';
import type { CMMIData } from '@/types';
import { practiceAreas as allPracticeAreas } from '@/lib/data';

// Define theme colors for consistency
const THEME_COLORS = {
  PRIMARY: '294B63', // Deep Blue
  ACCENT: '6D8B8D', // Muted Teal
  BACKGROUND: 'F2F4F7', // Light Gray
  TEXT: '333333', // Dark Gray for text
  WHITE: 'FFFFFF',
};

// Define reusable text options
const TITLE_OPTS: PptxGenJS.TextProps = {
  x: 0.5,
  y: 0.25,
  w: '90%',
  h: 0.75,
  fontSize: 32,
  fontFace: 'Space Grotesk',
  color: THEME_COLORS.PRIMARY,
  bold: true,
  align: 'center',
};

const SUBTITLE_OPTS: PptxGenJS.TextProps = {
  ...TITLE_OPTS,
  y: 1.0,
  fontSize: 16,
  fontFace: 'Inter',
  color: THEME_COLORS.TEXT,
  bold: false,
};

const BODY_OPTS: PptxGenJS.TextPropsOptions = {
    fontFace: 'Inter',
    fontSize: 12,
    color: THEME_COLORS.TEXT,
};

// Helper to add a standard slide with title and subtitle
const addMasterSlide = (pptx: PptxGenJS, title: string, subtitle: string) => {
    const slide = pptx.addSlide();
    slide.background = { color: THEME_COLORS.BACKGROUND };
    slide.addText(title, TITLE_OPTS);
    slide.addText(subtitle, { ...SUBTITLE_OPTS, y: 0.8 });
    return slide;
}

export const generatePptx = (data: CMMIData) => {
    const pptx = new PptxGenJS();

    pptx.layout = 'LAYOUT_16x9';
    pptx.author = 'UNIVIA Management International';
    pptx.company = data.companyName;
    pptx.title = `CMMI Implementation Kickoff: ${data.companyName}`;

    // --- 1. Title Slide ---
    const titleSlide = pptx.addSlide();
    titleSlide.background = { color: THEME_COLORS.PRIMARY };
    
    titleSlide.addText('CMMI Implementation Kickoff', {
        x: 0, y: 1.5, w: '100%', h: 1, align: 'center', fontSize: 44, fontFace: 'Space Grotesk', color: THEME_COLORS.WHITE, bold: true,
    });
    titleSlide.addText('UNIVIA Management International', {
        x: 0, y: 2.7, w: '100%', h: 0.5, align: 'center', fontSize: 24, fontFace: 'Inter', color: THEME_COLORS.WHITE,
    });
     titleSlide.addText('and', {
        x: 0, y: 3.1, w: '100%', h: 0.5, align: 'center', fontSize: 18, fontFace: 'Inter', color: THEME_COLORS.WHITE,
    });
    titleSlide.addText(data.companyName, {
        x: 0, y: 3.5, w: '100%', h: 0.5, align: 'center', fontSize: 28, fontFace: 'Inter', color: THEME_COLORS.WHITE, bold: true,
    });
    const meetingDate = new Date(data.meetingDate);
    meetingDate.setDate(meetingDate.getDate() + 1);
    const formattedDate = meetingDate.toLocaleDateString('en-US', { day: 'numeric', month: 'long', year: 'numeric' });
    titleSlide.addText(`Date: ${formattedDate}`, {
        x: 0, y: 4.2, w: '100%', h: 0.5, align: 'center', fontSize: 18, fontFace: 'Inter', color: THEME_COLORS.WHITE,
    });


    // --- 2. Agenda Slide ---
    const agendaSlide = addMasterSlide(pptx, 'Meeting Agenda', 'Key topics for our discussion today.');
    const agendaItems = [
      { text: "CMMI Model Scope", options: { bullet: true, indentLevel: 0 } },
      { text: "CMMI Practice Areas", options: { bullet: true, indentLevel: 0 } },
      { text: "Approach", options: { bullet: true, indentLevel: 0 } },
      { text: "Roles & Responsibilities", options: { bullet: true, indentLevel: 0 } },
      { text: "Key Teams to be Formed", options: { bullet: true, indentLevel: 0 } },
      { text: "Critical Success Factors", options: { bullet: true, indentLevel: 0 } },
      { text: "Engagement Structure", options: { bullet: true, indentLevel: 0 } },
      { text: "Communication and Escalation Protocols", options: { bullet: true, indentLevel: 0 } },
      { text: "Next Steps - 30 Days Focus", options: { bullet: true, indentLevel: 0 } },
      { text: "Interaction/Q and A", options: { bullet: true, indentLevel: 0 } },
    ];
    agendaSlide.addText(agendaItems, { x: 1, y: 1.5, w: '80%', h: 3.5, ...BODY_OPTS, fontSize: 14, lineSpacing: 28 });
    

    // --- 3. Scope Slide ---
    const scopeSlide = addMasterSlide(pptx, 'CMMI Model Scope', 'Boundaries and focus areas of the implementation.');
    const scopeItems = [
        ['Service Type:', 'CMMI (Agilean)', 'Version Number:', data.cmmiVersion],
        ['Model:', data.cmmiModel, 'Maturity Level:', data.maturityLevel],
        ['Appraisal Type:', 'Benchmark', 'Line of Business:', data.businessLine],
        ['Current Strength:', `${data.peopleStrength} people`, 'Current Scope:', `${data.projectScope} projects`],
        ['Locations:', data.locations.join(', '), '', ''],
    ];
    scopeSlide.addTable(scopeItems, { x: 0.5, y: 1.5, w: '90%', colW: [2, 2.5, 2, 2.5], border: { type: 'none' }, ...BODY_OPTS, fontSize: 12 });


    // --- 4. Practice Areas Slide ---
    const modelKey = data.cmmiModel?.toLowerCase() as keyof typeof allPracticeAreas;
    const areaData = allPracticeAreas[modelKey] || [];
    const practiceAreaSlide = addMasterSlide(pptx, 'CMMI Practice Areas', `Key areas for the ${data.cmmiModel} model.`);
    
    const tableRows = [];
    for(let i = 0; i < areaData.length; i += 2) {
        const row = [];
        row.push(`${areaData[i].abbr}: ${areaData[i].name}`);
        if (areaData[i+1]) {
            row.push(`${areaData[i+1].abbr}: ${areaData[i+1].name}`);
        } else {
            row.push('');
        }
        tableRows.push(row);
    }
    practiceAreaSlide.addTable(tableRows, { x: 0.5, y: 1.5, w: '90%', colW: [4.5, 4.5], border: { type: 'none' }, ...BODY_OPTS, fontSize: 11, valign: 'top' });


    // --- 5. Roles & Responsibilities ---
    const rolesSlide = addMasterSlide(pptx, 'Roles & Responsibilities', 'Clarifying team roles for a successful engagement.');
     const consultantRoles = [
        { text: "To work on overall activities as per the proposal", options: { bullet: true } },
        { text: "To provide necessary guidance and direction for CMMI compliance", options: { bullet: true } },
        { text: "To verify if CMMI compliance is achieved", options: { bullet: true } },
    ];
    const clientRoles = [
        { text: "To act as Single Point-of-Contact (SPOC)", options: { bullet: true } },
        { text: "Should have authority to take decisions on Small and Medium matters", options: { bullet: true } },
        { text: "To collaborate and provide necessary information", options: { bullet: true } },
    ];
    rolesSlide.addText('Consultant Roles', { x: 0.5, y: 1.5, w: '45%', h: 0.4, ...BODY_OPTS, bold: true, color: THEME_COLORS.PRIMARY });
    rolesSlide.addText(consultantRoles, { x: 0.5, y: 2.0, w: '45%', h: 2, ...BODY_OPTS });
    
    rolesSlide.addText(`${data.companyName} SPOC Roles`, { x: 5.2, y: 1.5, w: '45%', h: 0.4, ...BODY_OPTS, bold: true, color: THEME_COLORS.PRIMARY });
    rolesSlide.addText(clientRoles, { x: 5.2, y: 2.0, w: '45%', h: 2, ...BODY_OPTS });


    // --- 6. Next Steps ---
    const nextStepsSlide = addMasterSlide(pptx, 'Next Steps - 30 Days Focus', 'Immediate priorities for the first month.');
    const nextStepsItems = [
        `To identify stakeholders from the ${data.companyName} team`,
        `To receive the PID (Project Initiation Document) documents from the ${data.companyName} team`,
        `To establish a project charter`,
        `To develop the Work Breakdown Structure (WBS)`,
        "To identify participants for CMMI Overview training and dates",
    ].map(item => ({ text: item, options: { bullet: { code: '25CF' }, indentLevel: 0 } })); // 25CF is a black circle
    nextStepsSlide.addText(nextStepsItems, { x: 1, y: 1.5, w: '80%', h: 3, ...BODY_OPTS, fontSize: 14, lineSpacing: 28 });


    // --- 7. Thank You Slide ---
    const thankYouSlide = pptx.addSlide();
    thankYouSlide.background = { color: THEME_COLORS.PRIMARY };
    thankYouSlide.addText('Thank You', { x: 0, y: 2.0, w: '100%', h: 1, align: 'center', fontSize: 44, fontFace: 'Space Grotesk', color: THEME_COLORS.WHITE, bold: true });
    thankYouSlide.addText('We look forward to a successful partnership.', { x: 0, y: 3.0, w: '100%', h: 1, align: 'center', fontSize: 20, fontFace: 'Inter', color: THEME_COLORS.WHITE });
    
    // --- Generate and Download PPT ---
    pptx.writeFile({ fileName: `CMMI-Kickoff-${data.companyName}.pptx` });
}
