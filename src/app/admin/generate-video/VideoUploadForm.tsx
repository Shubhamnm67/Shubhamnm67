'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, UploadCloud, AlertTriangle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type VideoUploadFormProps = {
  handleVideoUpload: (
    prevState: any,
    formData: FormData
  ) => Promise<{ videoUrl: string | null; error: string | null; }>;
  animeList: { id: string; title: string; }[];
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      <UploadCloud className="mr-2 h-4 w-4" />
      Upload Video
    </Button>
  );
}

export function VideoUploadForm({ handleVideoUpload, animeList }: VideoUploadFormProps) {
  const initialState = { videoUrl: null, error: null };
  const [state, formAction] = useFormState(handleVideoUpload, initialState);

  return (
    <Card>
      <form action={formAction}>
        <CardHeader>
          <CardTitle>Upload Video Details</CardTitle>
          <CardDescription>Select an anime and upload the video file for an episode.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="animeId">Anime</Label>
            <Select name="animeId" required>
              <SelectTrigger id="animeId">
                <SelectValue placeholder="Select an anime" />
              </SelectTrigger>
              <SelectContent>
                {animeList.map(anime => (
                  <SelectItem key={anime.id} value={anime.id}>
                    {anime.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="videoFile">Video File</Label>
            <Input 
              id="videoFile" 
              name="videoFile" 
              type="file"
              accept="video/*"
              required 
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <SubmitButton />
        </CardFooter>
      </form>
      
      {state.error && (
        <div className="p-6 pt-0">
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{state.error}</AlertDescription>
          </Alert>
        </div>
      )}

      {state.videoUrl && (
        <div className="p-6 pt-0">
          <Card>
            <CardHeader>
              <CardTitle>Uploaded Video Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <video controls src={state.videoUrl} className="w-full rounded-md" />
            </CardContent>
          </Card>
        </div>
      )}
    </Card>
  );
}
