import { ModerationForm } from './ModerationForm';
import { handleModeration } from './actions';

export default function ModerateContentPage() {
  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-bold font-headline">Content Moderation</h1>
      <p className="text-muted-foreground">
        Use the AI-powered tool below to check content for potential copyright infringements
        or other violations of the terms of service.
      </p>
      <div className="pt-4">
        <ModerationForm handleModeration={handleModeration} />
      </div>
    </div>
  );
}
