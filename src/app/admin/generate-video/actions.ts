'use server';

type FormState = {
  videoUrl: string | null;
  error: string | null;
};

export async function handleVideoUpload(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const animeId = formData.get('animeId') as string;
  const videoFile = formData.get('videoFile') as File;

  if (!animeId || !videoFile || videoFile.size === 0) {
    return { videoUrl: null, error: 'Please select an anime and provide a video file.' };
  }
  
  try {
    // In a real application, you would upload the file to a storage service (e.g., Firebase Storage)
    // and save the URL to your database.
    // For this prototype, we'll convert the file to a data URL to display it on the client.
    const arrayBuffer = await videoFile.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const videoDataUri = `data:${videoFile.type};base64,${buffer.toString('base64')}`;

    // Here you would add logic to associate this video with the selected animeId.
    console.log(`Simulated upload of ${videoFile.name} for anime ${animeId}`);

    return { videoUrl: videoDataUri, error: null };
  } catch (e) {
    console.error(e);
    const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
    return { videoUrl: null, error: `Failed to process video upload: ${errorMessage}` };
  }
}
