import { VideoUploadForm } from './VideoUploadForm';
import { handleVideoUpload } from './actions';
import { animeData } from '@/lib/data';

export default function UploadVideoPage() {
  const animeList = animeData.map(anime => ({ id: anime.id, title: anime.title }));

  return (
    <div className="space-y-2">
      <h1 className="text-3xl font-bold font-headline">Upload Episode Video</h1>
      <p className="text-muted-foreground">
        Upload a video file for an anime episode.
      </p>
      <div className="pt-4">
        <VideoUploadForm handleVideoUpload={handleVideoUpload} animeList={animeList} />
      </div>
    </div>
  );
}
