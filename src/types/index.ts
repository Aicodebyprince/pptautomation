export interface Person {
  name: string;
  email: string;
}

export type CMMIModel = 'Development' | 'Services' | 'Multimodel' | '';

export interface CMMIData {
  companyName: string;
  meetingDate: string;
  serviceType: string;
  cmmiModel: CMMIModel;
  maturityLevel: string;
  businessLine: string;
  peopleStrength: number;
  projectScope: number;
  locations: string[];
  projectCharter: number;
  overviewTraining: number;
  stakeholders: number;
  virtualTraining: number;
  planningTraining: number;
  assessmentExam: number;
  cmmiVersion: string;
  cmmiPreparation: number;
  rgsDocumentation: number;
  evidenceTraining: number;
  appraisalTraining: number;
  projectManagement: number;
  consultants: Person[];
  projectManagers: Person[];
}
