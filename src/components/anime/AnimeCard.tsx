import Image from 'next/image';
import Link from 'next/link';
import type { Anime } from '@/lib/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { PlayCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AnimeCardProps {
  anime: Anime;
  className?: string;
}

export function AnimeCard({ anime, className }: AnimeCardProps) {
  return (
    <Link href={`/anime/${anime.id}`} className={cn("block group", className)}>
      <Card className="overflow-hidden h-full transition-all duration-300 ease-in-out hover:shadow-lg hover:shadow-primary/20 hover:border-primary/50">
        <CardContent className="p-0">
          <div className="relative aspect-[2/3] w-full">
            <Image
              src={anime.posterUrl}
              alt={`Poster for ${anime.title}`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
              data-ai-hint="anime poster"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <PlayCircle className="w-16 h-16 text-white/80" />
            </div>
          </div>
          <div className="p-4 space-y-2">
            <h3 className="font-semibold font-headline truncate text-lg">{anime.title}</h3>
            <div className="flex flex-wrap gap-2">
              {anime.genres.slice(0, 2).map((genre) => (
                <Badge key={genre} variant="secondary" className="text-xs">{genre}</Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
