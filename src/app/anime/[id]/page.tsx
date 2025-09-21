import Image from 'next/image';
import { notFound } from 'next/navigation';
import { animeData } from '@/lib/data';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { PlayCircle, Star, PlusCircle } from 'lucide-react';
import { EpisodeList } from '@/components/anime/EpisodeList';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { getAuthenticatedUser, isAdmin } from '@/lib/auth/server';

type AnimePageProps = {
  params: {
    id: string;
  };
};

export default async function AnimePage({ params }: AnimePageProps) {
  const anime = animeData.find((a) => a.id === params.id);
  const user = await getAuthenticatedUser();
  const admin = await isAdmin();

  if (!anime) {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header initialUser={user} isAdmin={admin} />
      <main className="flex-grow">
        <div>
          <div className="relative h-[40vh] md:h-[50vh] w-full">
            <Image
              src={anime.backdropUrl}
              alt={`Backdrop for ${anime.title}`}
              fill
              className="object-cover object-top"
              data-ai-hint="anime landscape"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
          </div>

          <div className="container mx-auto px-4 -mt-24 md:-mt-32 pb-16">
            <div className="relative flex flex-col md:flex-row gap-8">
              <div className="w-48 md:w-64 flex-shrink-0">
                <div className="aspect-[2/3] relative rounded-lg overflow-hidden shadow-2xl">
                  <Image
                    src={anime.posterUrl}
                    alt={`Poster for ${anime.title}`}
                    fill
                    className="object-cover"
                    data-ai-hint="anime poster"
                  />
                </div>
              </div>

              <div className="flex-grow pt-8 md:pt-32">
                <h1 className="text-3xl md:text-5xl font-bold font-headline mb-2">{anime.title}</h1>
                <div className="flex items-center gap-4 text-muted-foreground mb-4">
                  <div className="flex items-center gap-1">
                    <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                    <span>{anime.rating}</span>
                  </div>
                  <span>{anime.type}</span>
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {anime.genres.map((genre) => (
                    <Badge key={genre} variant="secondary">{genre}</Badge>
                  ))}
                </div>
                <p className="max-w-3xl text-muted-foreground mb-6">{anime.description}</p>
                <div className="flex items-center gap-4">
                  <Button size="lg">
                    <PlayCircle className="mr-2 h-5 w-5" />
                    {anime.type === 'Movie' ? 'Play Movie' : 'Watch E1'}
                  </Button>
                  <Button size="lg" variant="outline">
                    <PlusCircle className="mr-2 h-5 w-5" />
                    Add to Favorites
                  </Button>
                </div>
              </div>
            </div>

            {anime.type === 'Series' && anime.episodes.length > 0 && (
              <div className="mt-12">
                <h2 className="text-2xl font-bold font-headline mb-4">Episodes</h2>
                <EpisodeList episodes={anime.episodes} />
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
