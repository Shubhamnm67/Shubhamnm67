'use server';

import {
  moderateContent,
  type ModerateContentOutput,
} from '@/ai/flows/content-moderation';

type FormState = {
  result: ModerateContentOutput | null;
  error: string | null;
};

export async function handleModeration(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const content = formData.get('content') as string;
  if (!content || content.trim().length === 0) {
    return { result: null, error: 'Content cannot be empty.' };
  }
  
  if (content.trim().length > 1000) {
    return { result: null, error: 'Content is too long (max 1000 characters).' };
  }

  try {
    const result = await moderateContent({ content });
    return { result, error: null };
  } catch (e) {
    console.error(e);
    const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
    return { result: null, error: `Failed to moderate content: ${errorMessage}` };
  }
}
