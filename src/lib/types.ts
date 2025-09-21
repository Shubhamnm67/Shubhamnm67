export type Episode = {
  id: string;
  title: string;
  thumbnailUrl: string;
  duration: string;
};

export type Anime = {
  id: string;
  title: string;
  description: string;
  posterUrl: string;
  backdropUrl: string;
  genres: string[];
  rating: number;
  episodes: Episode[];
  type: 'Movie' | 'Series';
};
