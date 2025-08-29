import { z } from "zod";

const personSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
});

export const cmmiFormSchema = z.object({
  companyName: z.string().min(1, "Company name is required"),
  meetingDate: z.string().min(1, "Meeting date is required"),
  serviceType: z.string().min(1, "Service type is required"),
  cmmiModel: z.enum(['Development', 'Services', 'Multimodel', '']),
  maturityLevel: z.string().min(1, "Maturity level is required"),
  businessLine: z.string().min(1, "Line of business is required"),
  peopleStrength: z.coerce.number().min(1, "Must be at least 1"),
  projectScope: z.coerce.number().min(1, "Must be at least 1"),
  locations: z.array(z.string()).min(1, "At least one location is required"),
  projectCharter: z.coerce.number().min(0, "Cannot be negative"),
  overviewTraining: z.coerce.number().min(0, "Cannot be negative"),
  stakeholders: z.coerce.number().min(1, "Must be at least 1"),
  virtualTraining: z.coerce.number().min(0, "Cannot be negative"),
  planningTraining: z.coerce.number().min(0, "Cannot be negative"),
  assessmentExam: z.coerce.number().min(0, "Cannot be negative"),
  cmmiVersion: z.string().min(1, "CMMI version is required"),
  cmmiPreparation: z.coerce.number().min(0, "Cannot be negative"),
  rgsDocumentation: z.coerce.number().min(0, "Cannot be negative"),
  evidenceTraining: z.coerce.number().min(0, "Cannot be negative"),
  appraisalTraining: z.coerce.number().min(0, "Cannot be negative"),
  projectManagement: z.coerce.number().min(0, "Cannot be negative"),
  consultants: z.array(personSchema).min(1, "At least one consultant is required"),
  projectManagers: z.array(personSchema).min(1, "At least one project manager is required"),
});
