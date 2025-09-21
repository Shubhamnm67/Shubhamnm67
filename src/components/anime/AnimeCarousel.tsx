import type { Anime } from '@/lib/types';
import { AnimeCard } from './AnimeCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

interface AnimeCarouselProps {
  title: string;
  animeList: Anime[];
  icon?: React.ReactNode;
}

export function AnimeCarousel({ title, animeList, icon }: AnimeCarouselProps) {
  return (
    <section>
      <div className="flex items-center gap-2 mb-4">
        {icon}
        <h2 className="text-2xl font-bold font-headline">{title}</h2>
      </div>
      <Carousel
        opts={{
          align: 'start',
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent>
          {animeList.map((anime) => (
            <CarouselItem key={anime.id} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6">
              <AnimeCard anime={anime} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex" />
        <CarouselNext className="hidden md:flex" />
      </Carousel>
    </section>
  );
}
