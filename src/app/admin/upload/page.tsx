import { UploadForm } from './UploadForm';
import { handleAddAnime } from './actions';

export default function UploadAnimePage() {
  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-bold font-headline">Upload New Anime</h1>
      <p className="text-muted-foreground">
        Fill out the form below to add a new anime to the catalog.
      </p>
      <div className="pt-4">
        <UploadForm handleAddAnime={handleAddAnime} />
      </div>
    </div>
  );
}
