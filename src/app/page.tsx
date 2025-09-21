import { animeData } from '@/lib/data';
import { HeroSection } from '@/components/anime/HeroSection';
import { AnimeCarousel } from '@/components/anime/AnimeCarousel';
import { Clapperboard, Flame } from 'lucide-react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default async function Home() {
  const featuredAnime = animeData[0];
  const trendingAnime = animeData.slice(1, 7);
  const newReleases = animeData.slice(7);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="space-y-16 pb-16">
          <HeroSection anime={featuredAnime} />
          <div className="container mx-auto px-4 space-y-12">
            <AnimeCarousel
              title="Trending Now"
              animeList={trendingAnime}
              icon={<Flame className="text-primary" />}
            />
            <AnimeCarousel
              title="New Releases"
              animeList={newReleases}
              icon={<Clapperboard className="text-primary" />}
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
