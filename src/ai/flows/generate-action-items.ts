'use server';

/**
 * @fileOverview This file defines a Genkit flow for generating customized action items
 * based on the current CMMI implementation phase.
 *
 * - generateActionItems - A function that generates action items based on the implementation phase.
 * - GenerateActionItemsInput - The input type for the generateActionItems function.
 * - GenerateActionItemsOutput - The output type for the generateActionItems function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateActionItemsInputSchema = z.object({
  implementationPhase: z
    .string()
    .describe('The current phase of CMMI implementation (e.g., Project Setup, Training & Documentation).'),
  cmmiModel: z.string().describe('The CMMI model being used (e.g., Development, Services).'),
  maturityLevel: z.string().describe('The target maturity level (e.g., ML3, ML5).'),
});
export type GenerateActionItemsInput = z.infer<typeof GenerateActionItemsInputSchema>;

const GenerateActionItemsOutputSchema = z.object({
  actionItems: z.array(
    z.string().describe('A list of suggested action items for the given implementation phase.')
  ).describe('Generated action items for the current CMMI implementation phase.'),
});
export type GenerateActionItemsOutput = z.infer<typeof GenerateActionItemsOutputSchema>;

export async function generateActionItems(input: GenerateActionItemsInput): Promise<GenerateActionItemsOutput> {
  return generateActionItemsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateActionItemsPrompt',
  input: {schema: GenerateActionItemsInputSchema},
  output: {schema: GenerateActionItemsOutputSchema},
  prompt: `You are an AI assistant specialized in generating action items for CMMI implementation.

  Based on the current implementation phase, CMMI model, and target maturity level, suggest a list of actionable items.
  These action items should be specific, measurable, achievable, relevant, and time-bound (SMART).

  Implementation Phase: {{{implementationPhase}}}
  CMMI Model: {{{cmmiModel}}}
  Maturity Level: {{{maturityLevel}}}

  Format the output as a JSON array of strings.
  `,
});

const generateActionItemsFlow = ai.defineFlow(
  {
    name: 'generateActionItemsFlow',
    inputSchema: GenerateActionItemsInputSchema,
    outputSchema: GenerateActionItemsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
