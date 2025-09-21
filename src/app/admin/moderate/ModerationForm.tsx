'use client';

import { useActionState } from 'react';
import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, ShieldAlert, ShieldCheck } from 'lucide-react';

type ModerationFormProps = {
  handleModeration: (
    prevState: any,
    formData: FormData
  ) => Promise<{
    result: { isInfringement: boolean; reason: string } | null;
    error: string | null;
  }>;
};

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" disabled={pending}>
      {pending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      Moderate
    </Button>
  );
}

export function ModerationForm({ handleModeration }: ModerationFormProps) {
  const initialState = { result: null, error: null };
  const [state, formAction] = useActionState(handleModeration, initialState);

  return (
    <Card>
      <form action={formAction}>
        <CardHeader>
          <CardTitle>Enter Content to Moderate</CardTitle>
        </CardHeader>
        <CardContent>
          <Textarea
            name="content"
            placeholder="e.g., An anime about a pirate looking for a great treasure..."
            rows={5}
            required
          />
        </CardContent>
        <CardFooter className="flex justify-between">
          <p className="text-sm text-muted-foreground">AI-powered check</p>
          <SubmitButton />
        </CardFooter>
      </form>

      {state.error && (
        <div className="p-6 pt-0">
          <Alert variant="destructive">
            <ShieldAlert className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{state.error}</AlertDescription>
          </Alert>
        </div>
      )}

      {state.result && (
        <div className="p-6 pt-0">
          <Alert variant={state.result.isInfringement ? "destructive" : "default"}>
            {state.result.isInfringement ? <ShieldAlert className="h-4 w-4" /> : <ShieldCheck className="h-4 w-4" />}
            <AlertTitle>
              {state.result.isInfringement ? "Potential Infringement Detected" : "Content Looks OK"}
            </AlertTitle>
            <AlertDescription>{state.result.reason}</AlertDescription>
          </Alert>
        </div>
      )}
    </Card>
  );
}
