import { useState } from 'react';
import { createFileRoute, redirect } from '@tanstack/react-router';
import MainLayout from '@/components/Layout/MainLayout';
import { SearchBar } from '@/components/ui/searchbar';
import MovieCard from '@/components/ui/movie-card';
import useDebounce from '@/hooks/useDebounce';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import Loding from '@/components/ui/loding-state';
import SearchResult from '@/components/ui/search-result';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import MoviePopOver from '@/components/ui/movie-popover';
import {
  type DbMovie,
  type MovieListItem,
} from '@/components/Types/movie';
import { supabase } from '@/lib/supabase';
import { useAuth } from '@/components/Context/AuthContext';
import { toast } from 'sonner';

export const Route = createFileRoute('/movies/')({
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
type Filter = 'watched' | 'all' | 'plan';

type BtnGroupProps = {
  active: Filter;
  setActive: (value: Filter) => void;
};
function RouteComponent() {
  const queryClient = useQueryClient();
  const { session } = useAuth();
  const [search, setSearch] = useState<string>('');
  const [filter, setFilter] = useState<Filter>('all');
  const [savedMovie, setSavedMovie] = useState<DbMovie | null>(null);
  const [selectedMovie, setSelectedMovie] = useState<string>('');
  const debouncedSearch = useDebounce(search, 800);
  const changeStatusMutation = useMutation({
    mutationFn: async ({
      id,
      status,
    }: {
      id: string;
      status: 'watched' | 'plan';
    }) => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/movie/editMovie/${id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.access_token}`,
          },
          body: JSON.stringify({ status }),
        },
      );
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user-movie'],
      });
      toast.success('Status updated');
    },
    onError: () => {
      toast.error('An error occurred');
    },
  });
  function changeStatus(id: string, status: 'watched' | 'plan') {
    const newStatus = status === 'plan' ? 'watched' : 'plan';
    changeStatusMutation.mutate({ id, status: newStatus });
  }
  const { data, isLoading, isError } = useQuery({
    queryKey: ['movie', debouncedSearch],
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/movie?movie=${encodeURIComponent(debouncedSearch)}`,
      );
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }

      return res.json();
    },
    enabled: debouncedSearch.trim().length > 0,
  });
  const particularMovieQuery = useQuery({
    queryKey: ['movie-details', selectedMovie],
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/movie/this?movie=${encodeURIComponent(selectedMovie)}`,
      );
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }

      return res.json();
    },
    enabled: !!selectedMovie,
  });
  const { data: movies = [], isLoading: loding } = useQuery({
    queryKey: ['user-movie'],
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/movie/getMovie`,
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

  const filteredMovies =
    filter === 'all'
      ? movies
      : movies.filter((m: MovieListItem) => m.status === filter);

  return (
    <MainLayout>
      <div className="relative flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <SearchBar
          placeholder="Titanic..."
          Search={search}
          SetSearch={setSearch}
        />
        <BtnGroup active={filter} setActive={setFilter} />
        {data?.data?.Search?.length > 0 && (
        <div className="absolute left-0 top-full z-20 mt-2 max-h-90 w-full max-w-sm overflow-y-auto shadow-lg no-scrollbar">
            {data?.data?.Search?.map((movie: any) => (
              <SearchResult
                imgSrc={movie.Poster}
                title={movie.Title}
                key={movie.imdbID}
                onClick={() => {
                  setSearch('');
                  setSelectedMovie(movie.imdbID);
                }}
              />
            ))}
          </div>
        )}
        {isLoading && (
          <div className="absolute left-0 top-full z-20 mt-2 w-full max-w-sm shadow-lg">
            <Loding />
          </div>
        )}
      </div>
      {isError && (
        <p className="mt-5 w-full text-center text-red-500 font-semibold font-[Figtree]">
          Movie not found!
        </p>
      )}
      {particularMovieQuery.data && (
        <Dialog
          open={!!selectedMovie}
          onOpenChange={(open) => {
            if (!open) {
              setSelectedMovie('');
              setSavedMovie(null);
            }
          }}
        >
          <DialogContent className="max-h-[90dvh] max-w-[calc(100%-1rem)] overflow-y-auto p-0 sm:max-w-4xl">
            <MoviePopOver
              movie={particularMovieQuery.data.data}
              setSelectedMovie={setSelectedMovie}
              savedMovie={savedMovie}
              setSavedMovie={setSavedMovie}
            />
          </DialogContent>
        </Dialog>
      )}
      {filteredMovies.length !== 0 && (
        <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {filteredMovies.map((m: MovieListItem) => (
            <MovieCard
              movie={m}
              key={m.imdbID}
              changeStatus={changeStatus}
              onClick={() => {
                setSelectedMovie(m.imdbID);
                setSavedMovie({ notes: m.notes, status: m.status });
              }}
            />
          ))}
        </div>
      )}
      {filteredMovies.length === 0 && !loding && (
        <div className="mt-16 text-center flex flex-col items-center">
          <p className="text-foreground font-semibold text-3xl">
            No movies found 🍿
          </p>
          <p className="text-foreground mt-2 text-md">
            Try changing filters or adding a new movie.
          </p>
        </div>
      )}
    </MainLayout>
  );
}

function BtnGroup({ active, setActive }: BtnGroupProps) {
  const baseStyle =
    'shrink-0 rounded-3xl px-2 py-2 text-xs font-medium transition-all duration-200 cursor-pointer sm:px-3 sm:text-sm';

  const activeStyle =
    'bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md';

  const inactiveStyle =
    'dark:text-white text-black hover:text-slate-400 dark:hover:text-slate-400';

  return (
    <div className="flex w-full max-w-full gap-1 overflow-x-auto rounded-3xl border border-black/40 p-1 dark:bg-card dark:border-white/20 sm:w-fit sm:gap-2">
      <button
        onClick={() => setActive('watched')}
        className={`${baseStyle} ${
          active === 'watched' ? activeStyle : inactiveStyle
        }`}
      >
        Watched
      </button>

      <button
        onClick={() => setActive('all')}
        className={`${baseStyle} ${
          active === 'all' ? activeStyle : inactiveStyle
        }`}
      >
        All
      </button>

      <button
        onClick={() => setActive('plan')}
        className={`${baseStyle} ${
          active === 'plan' ? activeStyle : inactiveStyle
        }`}
      >
        Plan to Watch
      </button>
    </div>
  );
}
