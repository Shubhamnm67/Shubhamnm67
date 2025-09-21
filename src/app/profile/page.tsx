import Image from 'next/image';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { animeData } from '@/lib/data';
import { AnimeCard } from '@/components/anime/AnimeCard';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export default function ProfilePage() {
  const watchHistory = animeData.slice(0, 4);
  const favorites = animeData.slice(5, 9);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-8">
          <Card className="mb-8">
            <CardContent className="p-6 flex items-center gap-6">
              <Avatar className="h-24 w-24">
                <AvatarImage src="https://picsum.photos/seed/user-avatar/100/100" />
                <AvatarFallback>U</AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-3xl font-bold font-headline">User</h1>
                <p className="text-muted-foreground">user@example.com</p>
                <p className="text-sm text-muted-foreground mt-1">Joined January 2024</p>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="history">
            <TabsList className="grid w-full grid-cols-2 md:w-96">
              <TabsTrigger value="history">Watch History</TabsTrigger>
              <TabsTrigger value="favorites">Favorites</TabsTrigger>
            </TabsList>
            <TabsContent value="history">
              <Card>
                <CardHeader>
                  <CardTitle>Continue Watching</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {watchHistory.map(anime => (
                      <AnimeCard key={anime.id} anime={anime} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="favorites">
              <Card>
                <CardHeader>
                  <CardTitle>My Favorite Anime</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {favorites.map(anime => (
                      <AnimeCard key={anime.id} anime={anime} />
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
}
