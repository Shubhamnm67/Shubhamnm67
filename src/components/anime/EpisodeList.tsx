import Image from 'next/image';
import type { Episode } from '@/lib/types';
import { Card } from '@/components/ui/card';
import { PlayCircle } from 'lucide-react';

interface EpisodeListProps {
  episodes: Episode[];
}

export function EpisodeList({ episodes }: EpisodeListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {episodes.map((episode, index) => (
        <Card key={episode.id} className="overflow-hidden group transition-all hover:shadow-lg hover:border-primary/50">
          <div className="relative aspect-video w-full">
            <Image
              src={episode.thumbnailUrl}
              alt={`Thumbnail for ${episode.title}`}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              data-ai-hint="anime scene"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <PlayCircle className="w-12 h-12 text-white/80" />
            </div>
          </div>
          <div className="p-4">
            <h3 className="font-semibold truncate">E{index + 1}: {episode.title}</h3>
            <p className="text-sm text-muted-foreground">{episode.duration}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}
