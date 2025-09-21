import { VideoUploadForm } from './VideoUploadForm';
import { handleGenerateVideo } from './actions';
import { animeData } from '@/lib/data';

export default function GenerateVideoPage() {
  const animeList = animeData.map(anime => ({ id: anime.id, title: anime.title }));

  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-bold font-headline">Generate Episode Video</h1>
      <p className="text-muted-foreground">
        Use AI to generate a short video clip for an anime episode.
      </p>
      <div className="pt-4">
        <VideoUploadForm handleGenerateVideo={handleGenerateVideo} animeList={animeList} />
      </div>
    </div>
  );
}
