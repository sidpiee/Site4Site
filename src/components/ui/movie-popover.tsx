import { Check } from 'lucide-react';
import type { DbMovie, MovieListItem, OMDbMovie } from '../Types/movie';
import IMDB from '@/assets/pics/imdb-logo.png';
import no_image_found from '@/assets/pics/Image-Not-Found.jpg';
import RottenTomatoes from '@/assets/pics/rotten_tomatoes.jpg';
import Length from '@/assets/pics/length.webp';
import { Button } from './button';
import { Textarea } from './textarea';
import { useState } from 'react';
import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../Context/AuthContext';

type MovieCardProps = {
  movie: OMDbMovie;
  setSelectedMovie: (s: string) => void;
  savedMovie: DbMovie | null;
  setSavedMovie: (movie: DbMovie | null) => void;
};

export default function MoviePopOver({
  savedMovie,
  setSavedMovie,
  movie,
  setSelectedMovie,
}: MovieCardProps) {
  const { session } = useAuth();
  const queryClient = useQueryClient();
  const initialNotes = savedMovie?.notes ?? '';
  const initialStatus = savedMovie?.status ?? 'watched';
  const rottenTomatoes =
    movie?.Ratings?.find((r) => r.Source === 'Rotten Tomatoes')?.Value || 'N/A';
  const genres = movie.Genre.split(',').map((g) => g.trim());
  const [note, setNote] = useState<string>(initialNotes);
  const [status, setStatus] = useState<'watched' | 'plan'>(initialStatus);
  const mutation = useMutation({
    mutationFn: async (movie: MovieListItem) => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/movie/addMovie`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.access_token}`,
          },
          body: JSON.stringify(movie),
        },
      );
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user-movie'],
      });
      setSelectedMovie('');
      setSavedMovie(null);
      toast.success('Movie added successfully');
    },

    onError: () => {
      toast.error('Movie already exists');
      setSelectedMovie('');
      setSavedMovie(null);
    },
  });
  const updateMutation = useMutation({
    mutationFn: async (updatedMovie: {
      status: 'watched' | 'plan';
      notes: string;
    }) => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/movie/updateMovie/${movie.imdbID}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.access_token}`,
          },
          body: JSON.stringify(updatedMovie),
        },
      );
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user-movie'],
      });
      setSelectedMovie('');
      setSavedMovie(null);
      toast.success('Movie updated successfully');
    },

    onError: () => {
      toast.error('Movie not updated');
      setSelectedMovie('');
      setSavedMovie(null);
    },
  });
  const deleteMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/movie/deleteMovie/${movie.imdbID}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        },
      );
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }
      return await res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user-movie'],
      });
      setSelectedMovie('');
      setSavedMovie(null);
      toast.success('Movie deleted successfully');
    },

    onError: () => {
      toast.error('Movie not deleted');
      setSelectedMovie('');
      setSavedMovie(null);
    },
  });
  function saveDetails() {
    const movieToAdd: MovieListItem = {
      ...movie,
      status,
      notes: note,
    };
    mutation.mutate(movieToAdd);
  }
  function updateDetails() {
    const updateMovie = {
      notes: note,
      status,
    };
    updateMutation.mutate(updateMovie);
  }
  function deleteMovie() {
    deleteMutation.mutate();
  }
  return (
    <>
      <div className="flex max-h-[80vh] w-full flex-col overflow-y-auto bg-background sm:h-140 sm:max-h-none sm:flex-row">
        <img
          src={movie.Poster}
          alt={movie.Title}
          className="h-64 w-full object-cover sm:h-full sm:w-[35%]"
          onError={(e) => {
            e.currentTarget.src = no_image_found;
          }}
        />
        <div className="flex w-full flex-1 flex-col items-start gap-2 p-4 sm:pt-10">
          <p className="w-full text-center font-[Urbanist] text-xl font-bold sm:text-2xl">
            {movie.Title} ({movie.Year})
          </p>
          <div className="flex flex-wrap items-center gap-2 pl-0 sm:pl-5">
            <img src={IMDB} alt="" className="size-10" />
            <p className="font-[Figtree] font-bold text-yellow-300">
              {movie.imdbRating}/10
            </p>
            <p>⭐</p>
            <img
              src={RottenTomatoes}
              alt=""
              className="ml-2 size-10 rounded-full sm:ml-6"
            />
            <p className="font-[Figtree] font-bold text-red-500">
              {rottenTomatoes}
            </p>
            <p className="ml-0.5">🍅</p>
          </div>

          <div className="flex items-center pl-0 sm:pl-2">
            <img src={Length} alt="" className="h-10" />
            <p className="font-[Figtree] font-bold">{movie.Runtime} • </p>
          </div>
          <div className="flex flex-wrap gap-2 pl-0 sm:pl-5">
            {genres.map((g) => (
              <GenrePills key={g} genre={g} />
            ))}
          </div>
          <p className="px-0 text-xs font-semibold italic leading-relaxed text-muted-foreground sm:px-5">
            "{movie.Plot}"
          </p>
          <div className="mt-3 flex w-full flex-wrap justify-start gap-2 px-0 pb-2 sm:justify-around sm:px-4">
            <Button
              className="m-0 cursor-pointer"
              onClick={() => setStatus('watched')}
            >
              Watched{status === 'watched' && <Check />}
            </Button>
            <Button
              className="m-0 cursor-pointer"
              onClick={() => setStatus('plan')}
            >
              Plan to watch{status === 'plan' && <Check />}
            </Button>
          </div>
          <div className="w-full px-0 sm:px-2">
            <Textarea
              value={note}
              placeholder="50 words to write your heart out!..."
              maxLength={50}
              className=" border-black/20 border dark:border-white/20  bg-gray-200/80 placeholder:text-black/50 dark:placeholder:text-white/50 mb-2"
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
          <div className="flex justify-center w-full">
            {savedMovie ? (
              <div className="flex flex-wrap gap-2">
                <Button
                  className=" cursor-pointer dark:bg-indigo-900 border-l-2 border-white/50 bg-indigo-700 px-2 hover:dark:bg-indigo-950 hover:scale-110"
                  onClick={updateDetails}
                >
                  Update Changes
                </Button>
                <Button
                  className="cursor-pointer bg-red-600 hover:bg-red-700"
                  onClick={deleteMovie}
                >
                  Delete
                </Button>
              </div>
            ) : (
              <Button
                className=" cursor-pointer dark:bg-indigo-900 border-l-2 border-white/50 bg-indigo-700 px-2 hover:dark:bg-indigo-950 hover:scale-110"
                onClick={saveDetails}
              >
                Save Changes
              </Button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

function GenrePills({ genre }: { genre: string }) {
  return (
    <div className="px-3 rounded-2xl dark:bg-black/70 bg-white dark:text-white text-black border-black/40 drop-shadow-sm drop-shadow-black/20 py-1  dark:drop-shadow-sm dark:drop-shadow-white/10 border dark:border-white/30">
      {genre}
    </div>
  );
}
