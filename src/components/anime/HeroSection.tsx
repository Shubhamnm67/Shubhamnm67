import Image from 'next/image';
import Link from 'next/link';
import type { Anime } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PlayCircle, Info } from 'lucide-react';

interface HeroSectionProps {
  anime: Anime;
}

export function HeroSection({ anime }: HeroSectionProps) {
  return (
    <div className="relative h-[60vh] md:h-[80vh] w-full text-white">
      <div className="absolute inset-0">
        <Image
          src={anime.backdropUrl}
          alt={`Backdrop for ${anime.title}`}
          fill
          className="object-cover"
          priority
          data-ai-hint="anime city"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent" />
      </div>

      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-end pb-12 md:pb-20">
        <div className="max-w-2xl space-y-4">
          <h1 className="text-4xl md:text-6xl font-bold font-headline text-white drop-shadow-lg">
            {anime.title}
          </h1>
          <div className="flex flex-wrap gap-2">
            {anime.genres.map((genre) => (
              <Badge key={genre} variant="outline" className="text-white border-white/50 backdrop-blur-sm">
                {genre}
              </Badge>
            ))}
          </div>
          <p className="text-sm md:text-base text-white/90 line-clamp-3">
            {anime.description}
          </p>
          <div className="flex items-center gap-4 pt-4">
            <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <PlayCircle className="mr-2 h-5 w-5" />
              Watch Now
            </Button>
            <Button size="lg" variant="secondary" asChild>
              <Link href={`/anime/${anime.id}`}>
                <Info className="mr-2 h-5 w-5" />
                More Info
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
