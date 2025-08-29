'use server';

/**
 * @fileOverview This file defines a Genkit flow for providing AI assistance in evaluating theme customizations.
 *
 * The flow takes theme customization inputs and provides feedback based on aesthetic harmony, helping users
 * create visually appealing and cohesive designs.
 *
 * @interface ThemeAIAssistanceInput - Defines the input schema for the theme AI assistance flow.
 * @interface ThemeAIAssistanceOutput - Defines the output schema for the theme AI assistance flow.
 * @function themeAIAssistance - The main function to trigger the theme AI assistance flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ThemeAIAssistanceInputSchema = z.object({
  primaryColor: z
    .string()
    .describe('The primary color of the theme (e.g., #29ABE2).'),
  backgroundColor: z
    .string()
    .describe('The background color of the theme (e.g., #F5F5F5).'),
  accentColor: z
    .string()
    .describe('The accent color of the theme (e.g., #673AB7).'),
  bodyFont: z
    .string()
    .describe('The font used for the body text (e.g., Inter).'),
  headlineFont: z
    .string()
    .describe('The font used for headlines (e.g., Inter).'),
  layoutType: z
    .string()
    .describe('The layout type of the theme (e.g., Clean and structured).'),
  animationStyle: z
    .string()
    .describe('The animation style of the theme (e.g., Subtle transitions).'),
});
export type ThemeAIAssistanceInput = z.infer<typeof ThemeAIAssistanceInputSchema>;

const ThemeAIAssistanceOutputSchema = z.object({
  feedback: z
    .string()
    .describe(
      'AI-provided feedback on the aesthetic harmony and cohesiveness of the theme customizations.'
    ),
});
export type ThemeAIAssistanceOutput = z.infer<typeof ThemeAIAssistanceOutputSchema>;

export async function themeAIAssistance(input: ThemeAIAssistanceInput): Promise<ThemeAIAssistanceOutput> {
  return themeAIAssistanceFlow(input);
}

const prompt = ai.definePrompt({
  name: 'themeAIAssistancePrompt',
  input: {schema: ThemeAIAssistanceInputSchema},
  output: {schema: ThemeAIAssistanceOutputSchema},
  prompt: `You are an AI assistant that provides feedback on theme customizations based on aesthetic harmony.

  Evaluate the following theme settings and provide feedback on their aesthetic harmony and cohesiveness.

  - Primary color: {{{primaryColor}}}
  - Background color: {{{backgroundColor}}}
  - Accent color: {{{accentColor}}}
  - Body font: {{{bodyFont}}}
  - Headline font: {{{headlineFont}}}
  - Layout type: {{{layoutType}}}
  - Animation style: {{{animationStyle}}}

  Provide specific suggestions on how to improve the theme's visual appeal.
  Ensure that the output is formatted to be user-friendly and actionable.
  Focus on aspects like color contrast, font pairing, readability, and overall visual balance.
  `, safetySettings: [
    {
      category: 'HARM_CATEGORY_HATE_SPEECH',
      threshold: 'BLOCK_ONLY_HIGH',
    },
    {
      category: 'HARM_CATEGORY_DANGEROUS_CONTENT',
      threshold: 'BLOCK_NONE',
    },
    {
      category: 'HARM_CATEGORY_HARASSMENT',
      threshold: 'BLOCK_MEDIUM_AND_ABOVE',
    },
    {
      category: 'HARM_CATEGORY_SEXUALLY_EXPLICIT',
      threshold: 'BLOCK_LOW_AND_ABOVE',
    },
  ],
});

const themeAIAssistanceFlow = ai.defineFlow(
  {
    name: 'themeAIAssistanceFlow',
    inputSchema: ThemeAIAssistanceInputSchema,
    outputSchema: ThemeAIAssistanceOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

