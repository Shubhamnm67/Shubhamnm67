import { ModerationForm } from './ModerationForm';
import { handleModeration } from './actions';

export default function ModerateContentPage() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <div className="space-y-2 mb-8">
        <h1 className="text-4xl font-bold font-headline">Content Moderation</h1>
        <p className="text-muted-foreground">
          Use the AI-powered tool below to check content for potential copyright infringements
          or other violations of the terms of service.
        </p>
      </div>
      <ModerationForm handleModeration={handleModeration} />
    </div>
  );
}
