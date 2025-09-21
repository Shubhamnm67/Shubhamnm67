'use server';

import { animeData } from '@/lib/data';
import { revalidatePath } from 'next/cache';

type FormState = {
  message: string | null;
  error: string | null;
};

export async function handleAddAnime(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const genres = (formData.get('genres') as string).split(',').map(g => g.trim());
  const rating = parseFloat(formData.get('rating') as string);
  const type = formData.get('type') as 'Series' | 'Movie';
  
  if (!title || !description || !genres.length || !rating || !type) {
    return { message: null, error: 'Please fill out all fields.' };
  }

  const newId = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
  const seed = animeData.length + 1;

  const newAnime = {
    id: newId,
    title,
    description,
    genres,
    rating,
    type,
    posterUrl: `https://picsum.photos/seed/anime${seed}/400/600`,
    backdropUrl: `https://picsum.photos/seed/backdrop${seed}/1280/720`,
    episodes: [],
  };

  // In a real application, you would save this to a database.
  // For this prototype, we are prepending to the in-memory array.
  animeData.unshift(newAnime);
  
  // Revalidate the home page to show the new anime
  revalidatePath('/');
  revalidatePath('/search');

  return { message: `Successfully added "${title}"!`, error: null };
}
