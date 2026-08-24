import MainLayout from '@/components/Layout/MainLayout';
import { type savedGame, type GameListItem } from '@/components/Types/game';
import GameCard from '@/components/ui/game-card';
import GamePopOver from '@/components/ui/game-popover';
import Loding from '@/components/ui/loding-state';
import SearchResult from '@/components/ui/search-result';
import { SearchBar } from '@/components/ui/searchbar';
import useDebounce from '@/hooks/useDebounce';
import { useQuery } from '@tanstack/react-query';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/components/Context/AuthContext';

export const Route = createFileRoute('/games/')({
  component: RouteComponent,
  beforeLoad: async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      throw redirect({ to: '/signIn' });
    }
  },
});

function RouteComponent() {
  const [search, setSearch] = useState<string>('');
  const { session } = useAuth();
  const debouncedSearch = useDebounce(search, 1000);
  const [selectedGame, setSelectedGame] = useState<number>(0);
  const [dbGame, setDbGame] = useState<savedGame | null>(null);
  // const [games, setGames] = useState<GameListItem[]>([]);
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['game', debouncedSearch],
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/game?game=${debouncedSearch}`,
      );
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }

      return res.json();
    },
    enabled: !!debouncedSearch.trim(),
  });
  const particularGameQuery = useQuery({
    queryKey: ['game-details', selectedGame],
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/game/this?id=${encodeURIComponent(selectedGame)}`,
      );
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }

      return res.json();
    },
    enabled: !!selectedGame,
  });
  const { data: games = [], isLoading: gamesLoding } = useQuery({
    queryKey: ['user-game'],
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/game/getGame`,
        {
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        },
      );
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }
      const data = await res.json();
      return data.data;
    },
    enabled: !!session,
  });
  return (
    <MainLayout>
      <div className="relative mb-2">
        <SearchBar
          placeholder="Elden Ring..."
          Search={search}
          SetSearch={setSearch}
        />
        {isLoading && (
          <div className="absolute left-0 top-full z-20 mt-2 w-full max-w-sm shadow-lg">
            <Loding />
          </div>
        )}
        {isError && (
          <p className="mt-5 text-red-500 font-semibold font-[Figtree] ">
            {error.message}
          </p>
        )}
        {data?.data?.results?.length > 0 && (
          <div className="absolute left-0 top-full z-20 mt-2 max-h-90 w-full max-w-sm overflow-y-auto shadow-lg no-scrollbar">
            {data.data.results.map((game: GameListItem) => (
              <SearchResult
                key={game.id}
                imgSrc={game.background_image}
                title={game.name}
                onClick={() => {
                  setSearch('');
                  setSelectedGame(game.id);
                  setDbGame(null);
                }}
              />
            ))}
          </div>
        )}
      </div>
      {particularGameQuery.data && (
        <Dialog
          open={!!selectedGame}
          onOpenChange={(open) => {
            if (!open) {
              setSelectedGame(0);
              setDbGame(null);
            }
          }}
        >
          <DialogContent className="max-h-[90dvh] max-w-[calc(100%-1rem)] overflow-y-auto p-0 sm:max-w-4xl">
            <GamePopOver
              game={particularGameQuery.data.data}
              setSelectedGame={setSelectedGame}
              dbGame={dbGame}
              setDbGame={setDbGame}
            />
          </DialogContent>
        </Dialog>
      )}
      {!gamesLoding && games.length === 0 && (
        <div className="mt-16 text-center">
          <p className="text-3xl font-semibold">No games found 🎮</p>
          <p>Search and add your first game.</p>
        </div>
      )}

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {games.map((g: GameListItem) => (
          <GameCard
            key={g.id}
            name={g.name}
            review={g.review}
            rating={g.personalRating}
            img={g.background_image}
            status={g.status}
            favourite={g.favourite}
            onClick={() => {
              setSelectedGame(g.id);
              setDbGame({
                personalRating: g.personalRating,
                status: g.status,
                favourite: g.favourite,
                review: g.review,
              });
            }}
          />
        ))}
      </div>
    </MainLayout>
  );
}
