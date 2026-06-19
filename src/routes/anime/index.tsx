import MainLayout from '@/components/Layout/MainLayout';
import AnimeCard from '@/components/ui/anime-card';
import { SearchBar } from '@/components/ui/searchbar';
import { createFileRoute, redirect } from '@tanstack/react-router';
import { useState } from 'react';
import useDebounce from '@/hooks/useDebounce';
import { useQuery } from '@tanstack/react-query';
import SearchResult from '@/components/ui/search-result';
import Loding from '@/components/ui/loding-state';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import AnimePopOver from '@/components/ui/anime-popover';
import type { AnimeListItem } from '@/components/Types/anime';
import { supabase } from '@/lib/supabase';

export const Route = createFileRoute('/anime/')({
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
  const [animes, setAnimes] = useState<AnimeListItem[]>([]);
  const [search, setSearch] = useState<string>('');
  const [selectedAnime, setSelectedAnime] = useState<any | null>(null);
  const debouncedSearch = useDebounce(search, 1200);

  function addAnime(anime: AnimeListItem): void {
    setAnimes((prev) => [...prev, anime]);
  }

  const planned = animes.filter((a) => a.status === 'Plan to watch');
  const watching = animes.filter((a) => a.status === 'Watching');
  const completed = animes.filter((a) => a.status === 'Completed');

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ['anime', debouncedSearch],
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/anime?anime=${debouncedSearch}`,
      );
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }

      return res.json();
    },
    enabled: debouncedSearch.trim().length > 0,
  });
  return (
    <MainLayout>
      <div className="mb-10 relative">
        <SearchBar
          placeholder="Death Note..."
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
        {animes.length === 0 && (
          <div className="w-full mt-30 flex flex-col items-center justify-center text-center absolute">
            <div className="text-6xl mb-4">🎬</div>

            <p className="text-2xl font-bold text-foreground">
              Your anime list is empty
            </p>

            <p className="text-muted-foreground mt-2 max-w-md">
              Start building your collection by searching and adding anime.
            </p>

            <p className="text-sm text-muted-foreground mt-1">
              Track what you're watching, planning, and completed.
            </p>
          </div>
        )}
        {data?.data?.length > 0 && (
          <div className="absolute top-full left-0 shadow-lg  mt-2 z-20 min-w-sm max-h-90 overflow-y-auto no-scrollbar">
            {data.data.map((anime: any) => (
              <SearchResult
                key={anime.mal_id}
                imgSrc={anime.images.jpg.large_image_url}
                title={anime.title_english || anime.title}
                onClick={() => {
                  setSearch('');
                  setSelectedAnime(anime);
                }}
              />
            ))}
          </div>
        )}
      </div>
      <Dialog
        open={!!selectedAnime}
        onOpenChange={(open) => {
          if (!open) setSelectedAnime(null);
        }}
      >
        <DialogContent className="p-0 overflow-hidden max-w-4xl">
          {selectedAnime && (
            <AnimePopOver
              selectedAnime={selectedAnime}
              setSelectedAnime={setSelectedAnime}
              addAnime={addAnime}
            />
          )}
        </DialogContent>
      </Dialog>
      {planned.length !== 0 && (
        <div className="mb-10">
          <section>
            <h1 className="text-6xl  text-transparent bg-linear-to-r from-violet-500 to-violet-700 font-bold inline-block bg-clip-text font-[Urbanist] italic">
              Plan to Watch
            </h1>
            <div className="h-1 w-110 bg-linear-to-r from-purple-500 to-purple-800 mt-3 mb-8 rounded-full" />
            <div className="grid grid-cols-4 gap-x-2 gap-y-10">
              {planned.map((a) => {
                return <AnimeCard key={a.mal_id} anime={a} />;
              })}
            </div>
          </section>
        </div>
      )}
      {watching.length !== 0 && (
        <div className="mb-10">
          <section>
            <h1 className="text-6xl  text-transparent bg-linear-to-r from-indigo-500 to-indigo-700 font-bold inline-block bg-clip-text font-[Urbanist] italic">
              Watching
            </h1>
            <div className="h-1 w-140 bg-linear-to-r from-blue-500 to-blue-800 mt-3 mb-8 rounded-full" />
            <div className="grid grid-cols-4 gap-x-2 gap-y-10">
              {watching.map((a) => {
                return <AnimeCard key={a.mal_id} anime={a} />;
              })}
            </div>
          </section>
        </div>
      )}

      {completed.length !== 0 && (
        <div className="mb-10">
          <section>
            <h1 className="text-6xl  text-transparent bg-linear-to-r from-emerald-500 to-emerald-700 font-bold inline-block bg-clip-text font-[Urbanist] italic">
              Completed
            </h1>
            <div className="h-1 w-180 bg-linear-to-r from-green-500 to-green-800 mt-3 mb-8 rounded-full" />
            <div className="grid grid-cols-4 gap-x-2 gap-y-10">
              {completed.map((a) => {
                return <AnimeCard key={a.mal_id} anime={a} />;
              })}
            </div>
          </section>
        </div>
      )}
    </MainLayout>
  );
}
