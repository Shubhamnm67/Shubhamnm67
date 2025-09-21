import { animeData } from '@/lib/data';
import { SearchClient } from '@/components/search/SearchClient';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function SearchPage() {
  const allGenres = [...new Set(animeData.flatMap((a) => a.genres))];
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold font-headline mb-6">Discover Anime</h1>
          <SearchClient allAnime={animeData} allGenres={allGenres} />
        </div>
      </main>
      <Footer />
    </div>
  );
}
