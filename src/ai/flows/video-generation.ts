'use server';

/**
 * @fileOverview Implements an AI-powered video generation flow using the Veo model.
 *
 * - generateVideo - Generates a video based on a text prompt.
 * - GenerateVideoInput - The input type for the generateVideo function.
 * - GenerateVideoOutput - The return type for the generateVideo function.
 */

import { ai } from '@/ai/genkit';
import { googleAI } from '@genkit-ai/googleai';
import { z } from 'genkit';
import { MediaPart } from 'genkit/media';

const GenerateVideoInputSchema = z.object({
  prompt: z.string().describe('The text prompt to generate the video from.'),
});
export type GenerateVideoInput = z.infer<typeof GenerateVideoInputSchema>;

const GenerateVideoOutputSchema = z.object({
  videoUrl: z.string().optional().describe('The data URI of the generated video.'),
});
export type GenerateVideoOutput = z.infer<typeof GenerateVideoOutputSchema>;

export async function generateVideo(input: GenerateVideoInput): Promise<GenerateVideoOutput> {
  return generateVideoFlow(input);
}

const generateVideoFlow = ai.defineFlow(
  {
    name: 'generateVideoFlow',
    inputSchema: GenerateVideoInputSchema,
    outputSchema: GenerateVideoOutputSchema,
  },
  async (input) => {
    // This flow is no longer used by the application UI but is kept for potential future use.
    // If you want to re-enable it, you would need to modify the UI and server action
    // in /src/app/admin/generate-video/
    
    let { operation } = await ai.generate({
      model: googleAI.model('veo-2.0-generate-001'),
      prompt: input.prompt,
      config: {
        durationSeconds: 5,
        aspectRatio: '16:9',
      },
    });

    if (!operation) {
      throw new Error('Expected the model to return an operation');
    }

    // Wait for the operation to complete
    while (!operation.done) {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      operation = await ai.checkOperation(operation);
    }

    if (operation.error) {
      throw new Error(`Video generation failed: ${operation.error.message}`);
    }
    
    const videoPart = operation.output?.message?.content.find((p) => !!p.media) as MediaPart | undefined;
    
    if (!videoPart?.media?.url) {
      throw new Error('Failed to find the generated video in the operation result.');
    }

    const fetch = (await import('node-fetch')).default;
    const videoResponse = await fetch(
      `${videoPart.media.url}&key=${process.env.GEMINI_API_KEY}`
    );

    if (!videoResponse.ok || !videoResponse.body) {
      throw new Error(`Failed to download video file. Status: ${videoResponse.status}`);
    }
    
    const videoBuffer = await videoResponse.buffer();
    const videoDataUri = `data:video/mp4;base64,${videoBuffer.toString('base64')}`;

    return { videoUrl: videoDataUri };
  }
);
