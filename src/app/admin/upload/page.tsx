import { UploadForm } from './UploadForm';
import { handleAddAnime } from './actions';

export default function UploadAnimePage() {
  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <div className="space-y-2 mb-8">
        <h1 className="text-4xl font-bold font-headline">Upload New Anime</h1>
        <p className="text-muted-foreground">
          Fill out the form below to add a new anime to the catalog.
        </p>
      </div>
      <UploadForm handleAddAnime={handleAddAnime} />
    </div>
  );
}
