'use client';

import { useState, useMemo } from 'react';
import type { Anime } from '@/lib/types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { AnimeCard } from '../anime/AnimeCard';
import { Search, ListFilter } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from '../ui/button';


interface SearchClientProps {
  allAnime: Anime[];
  allGenres: string[];
}

export function SearchClient({ allAnime, allGenres }: SearchClientProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);

  const filteredAnime = useMemo(() => {
    return allAnime.filter((anime) => {
      const matchesSearch = anime.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesGenres = selectedGenres.length === 0 || selectedGenres.every(g => anime.genres.includes(g));
      return matchesSearch && matchesGenres;
    });
  }, [allAnime, searchTerm, selectedGenres]);

  const handleGenreChange = (genre: string) => {
    setSelectedGenres(prev => 
      prev.includes(genre) ? prev.filter(g => g !== genre) : [...prev, genre]
    );
  };

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <aside className="w-full md:w-64">
        <div className="sticky top-20">
          <h2 className="text-lg font-semibold font-headline mb-4">Filters</h2>
          <div className="space-y-4">
            <div>
              <Label className="font-semibold">Genres</Label>
              <div className="mt-2 space-y-2">
                {allGenres.map((genre) => (
                  <div key={genre} className="flex items-center space-x-2">
                    <Checkbox
                      id={genre}
                      checked={selectedGenres.includes(genre)}
                      onCheckedChange={() => handleGenreChange(genre)}
                    />
                    <label
                      htmlFor={genre}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {genre}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </aside>

      <main className="flex-1">
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search by title..." 
            className="pl-9 w-full" 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {filteredAnime.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredAnime.map(anime => (
              <AnimeCard key={anime.id} anime={anime} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <h3 className="text-xl font-semibold">No Results Found</h3>
            <p className="text-muted-foreground mt-2">Try adjusting your search or filters.</p>
          </div>
        )}
      </main>
    </div>
  );
}
