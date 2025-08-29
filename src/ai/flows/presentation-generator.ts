'use server';

/**
 * @fileOverview A presentation generation AI agent.
 *
 * - generatePresentation - A function that handles the presentation generation process.
 * - PresentationInputSchema - The input type for the generatePresentation function.
 * - PresentationOutputSchema - The return type for the generatePresentation function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

const PresentationInputSchema = z.string();

const SlideSchema = z.object({
  title: z.string().describe('The title of the slide.'),
  content: z.array(z.string()).describe('The bullet points for the slide content.'),
});

const PresentationOutputSchema = z.object({
  title: z.string().describe('The main title of the presentation.'),
  slides: z.array(SlideSchema).describe('An array of slides for the presentation.'),
});

export type Presentation = z.infer<typeof PresentationOutputSchema>;

export async function generatePresentation(
  topic: string
): Promise<Presentation> {
  return presentationGeneratorFlow(topic);
}

const prompt = ai.definePrompt({
  name: 'presentationGeneratorPrompt',
  input: { schema: PresentationInputSchema },
  output: { schema: PresentationOutputSchema },
  prompt: `You are an expert at creating presentations.
  Given the following topic, generate a presentation with a title and a series of slides.
  Each slide should have a title and a few bullet points.

  Topic: {{{prompt}}}

  Generate at least 5 slides.`,
});

const presentationGeneratorFlow = ai.defineFlow(
  {
    name: 'presentationGeneratorFlow',
    inputSchema: PresentationInputSchema,
    outputSchema: PresentationOutputSchema,
  },
  async (topic) => {
    const { output } = await prompt(topic);
    return output!;
  }
);
