import MainLayout from '@/components/Layout/MainLayout';
import type { GameListItem } from '@/components/Types/game';
import GameCard from '@/components/ui/game-card';
import GamePopOver from '@/components/ui/game-popover';
import Loding from '@/components/ui/loding-state';
import SearchResult from '@/components/ui/search-result';
import { SearchBar } from '@/components/ui/searchbar';
import useDebounce from '@/hooks/useDebounce';
import { useQuery } from '@tanstack/react-query';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { createFileRoute } from '@tanstack/react-router';
import { useState } from 'react';

export const Route = createFileRoute('/games/')({
  component: RouteComponent,
});

function RouteComponent() {
  const [search, setSearch] = useState<string>('');
  const debouncedSearch = useDebounce(search, 1000);
  const [selectedGame, setSelectedGame] = useState<number>(0);
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

  return (
    <MainLayout>
      <div className="relative">
        <SearchBar
          placeholder="Elden Ring..."
          Search={search}
          SetSearch={setSearch}
        />
        {isLoading && (
          <div className="absolute top-full left-0 shadow-lg  mt-2 z-20 min-w-sm">
            <Loding />
          </div>
        )}
        {isError && (
          <p className="mt-5 text-red-500 font-semibold font-[Figtree] ">
            {error.message}
          </p>
        )}
        {data?.data?.results?.length > 0 && (
          <div className="absolute top-full left-0 shadow-lg  mt-2 z-20 min-w-sm max-h-90 overflow-y-auto no-scrollbar">
            {data.data.results.map((game: GameListItem) => (
              <SearchResult
                key={game.id}
                imgSrc={game.background_image}
                title={game.name}
                onClick={() => {
                  setSearch('');
                  setSelectedGame(game.id);
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
            if (!open) setSelectedGame(0);
          }}
        >
          <DialogContent className="p-0 overflow-hidden max-w-4xl">
            <GamePopOver game={particularGameQuery.data.data} />
          </DialogContent>
        </Dialog>
      )}
      <div className="grid grid-cols-4 mt-8">
        <GameCard />
      </div>
    </MainLayout>
  );
}
