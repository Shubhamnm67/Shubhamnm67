'use server';

import { generateVideo, type GenerateVideoOutput } from '@/ai/flows/video-generation';

type FormState = {
  videoUrl: string | null;
  error: string | null;
};

export async function handleGenerateVideo(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const animeId = formData.get('animeId') as string;
  const prompt = formData.get('prompt') as string;

  if (!animeId || !prompt) {
    return { videoUrl: null, error: 'Please select an anime and provide a prompt.' };
  }
  
  try {
    const result = await generateVideo({ prompt });
    if (result.videoUrl) {
      return { videoUrl: result.videoUrl, error: null };
    } else {
       return { videoUrl: null, error: 'Video generation failed to produce a result.' };
    }
  } catch (e) {
    console.error(e);
    const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
    return { videoUrl: null, error: `Failed to generate video: ${errorMessage}` };
  }
}
