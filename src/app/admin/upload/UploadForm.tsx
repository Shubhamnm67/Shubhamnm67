'use client';

import { useFormState, useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, ShieldCheck, UploadCloud } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';


type UploadFormProps = {
  handleAddAnime: (
    prevState: any,
    formData: FormData
  ) => Promise<{
    message: string | null;
    error: string | null;
  }>;
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      <UploadCloud className="mr-2 h-4 w-4" />
      Add Anime
    </Button>
  );
}

export function UploadForm({ handleAddAnime }: UploadFormProps) {
  const initialState = { message: null, error: null };
  const [state, formAction] = useFormState(handleAddAnime, initialState);
  const { toast } = useToast();

  useEffect(() => {
    if (state.message) {
      toast({
        title: "Success",
        description: state.message,
      });
    }
    if (state.error) {
       toast({
        variant: "destructive",
        title: "Error",
        description: state.error,
      });
    }
  }, [state, toast]);


  return (
    <Card>
      <form action={formAction}>
        <CardHeader>
          <CardTitle>Anime Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" placeholder="e.g., Cyber-Pulse: Phantom Pain" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea id="description" name="description" placeholder="A short synopsis of the anime..." rows={4} required />
          </div>
           <div className="space-y-2">
            <Label htmlFor="genres">Genres (comma-separated)</Label>
            <Input id="genres" name="genres" placeholder="e.g., Action, Sci-Fi, Mystery" required />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="space-y-2">
              <Label htmlFor="rating">Rating</Label>
              <Input id="rating" name="rating" type="number" step="0.1" min="0" max="10" placeholder="e.g., 8.9" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="type">Type</Label>
               <Select name="type" required>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Series">Series</SelectItem>
                  <SelectItem value="Movie">Movie</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="text-sm text-muted-foreground pt-2">
            Note: Poster and backdrop images will be assigned randomly for this prototype.
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
           <p className="text-sm text-muted-foreground">Content will be added to the top of the home page.</p>
          <SubmitButton />
        </CardFooter>
      </form>
    </Card>
  );
}
