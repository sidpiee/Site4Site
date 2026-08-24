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
import type { Anime, SavedAnime } from '@/components/Types/anime';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/components/Context/AuthContext';

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
  const { session } = useAuth();
  const [search, setSearch] = useState<string>('');
  const [selectedAnime, setSelectedAnime] = useState<SavedAnime | Anime | null>(
    null,
  );
  const debouncedSearch = useDebounce(search, 1200);

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
  const { data: animes = [], isLoading: loding } = useQuery({
    queryKey: ['user-anime'],
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/anime/getAnime`,
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
  const planned = animes.filter(
    (a: SavedAnime) => a.status === 'Plan to watch',
  );
  const watching = animes.filter((a: SavedAnime) => a.status === 'Watching');
  const completed = animes.filter((a: SavedAnime) => a.status === 'Completed');
  return (
    <MainLayout>
      <div className="relative mb-8">
        <SearchBar
          placeholder="Death Note..."
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
        {animes.length === 0 && !loding && (
          <div className="absolute mt-24 flex w-full flex-col items-center justify-center text-center sm:mt-30">
            <div className="mb-4 text-5xl sm:text-6xl">🎬</div>

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
          <div className="absolute left-0 top-full z-20 mt-2 max-h-90 w-full max-w-sm overflow-y-auto shadow-lg no-scrollbar">
            {data.data.map((anime: Anime) => (
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
        <DialogContent className="max-h-[90dvh] max-w-[calc(100%-1rem)] overflow-y-auto p-0 sm:max-w-4xl">
          {selectedAnime && (
            <AnimePopOver
              selectedAnime={selectedAnime}
              setSelectedAnime={setSelectedAnime}
            />
          )}
        </DialogContent>
      </Dialog>
      {planned.length !== 0 && (
        <div className="mb-10">
          <section>
            <h1 className="text-3xl  text-transparent bg-linear-to-r from-violet-500 to-violet-700 font-bold inline-block bg-clip-text font-[Urbanist] italic">
              Plan to Watch
            </h1>
            <div className="mt-3 mb-6 h-1 w-full max-w-100 rounded-full bg-linear-to-r from-purple-500 to-purple-800 sm:mb-8" />
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4 xl:grid-cols-5">
              {planned.map((a: SavedAnime) => {
                return (
                  <AnimeCard
                    key={a.mal_id}
                    anime={a}
                    onClick={() => {
                      setSelectedAnime(a);
                    }}
                  />
                );
              })}
            </div>
          </section>
        </div>
      )}
      {watching.length !== 0 && (
        <div className="mb-10">
          <section>
            <h1 className="text-3xl  text-transparent bg-linear-to-r from-indigo-500 to-indigo-700 font-bold inline-block bg-clip-text font-[Urbanist] italic">
              Watching
            </h1>
            <div className="mt-3 mb-6 h-1 w-full max-w-175 rounded-full bg-linear-to-r from-blue-500 to-blue-800 sm:mb-8" />
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4 xl:grid-cols-5">
              {watching.map((a: SavedAnime) => {
                return (
                  <AnimeCard
                    key={a.mal_id}
                    anime={a}
                    onClick={() => {
                      setSelectedAnime(a);
                    }}
                  />
                );
              })}
            </div>
          </section>
        </div>
      )}

      {completed.length !== 0 && (
        <div className="mb-10">
          <section>
            <h1 className="text-3xl  text-transparent bg-linear-to-r from-emerald-500 to-emerald-700 font-bold inline-block bg-clip-text font-[Urbanist] italic">
              Completed
            </h1>
            <div className="mt-3 mb-6 h-1 w-full max-w-250 rounded-full bg-linear-to-r from-green-500 to-green-800 sm:mb-8" />
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-6 lg:grid-cols-4 xl:grid-cols-5">
              {completed.map((a: SavedAnime) => {
                return (
                  <AnimeCard
                    key={a.mal_id}
                    anime={a}
                    onClick={() => {
                      setSelectedAnime(a);
                    }}
                  />
                );
              })}
            </div>
          </section>
        </div>
      )}
    </MainLayout>
  );
}
