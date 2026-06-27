import { Check } from 'lucide-react';
import type { MovieListItem, OMDbMovie } from '../Types/movie';
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
};

export default function MoviePopOver({
  movie,
  setSelectedMovie,
}: MovieCardProps) {
  const { session } = useAuth();
  const queryClient = useQueryClient();
  const rottenTomatoes =
    movie?.Ratings?.find((r) => r.Source === 'Rotten Tomatoes')?.Value || 'N/A';
  const genres = movie.Genre.split(',').map((g) => g.trim());
  const [note, setNote] = useState<string>('');
  const [status, setStatus] = useState<'watched' | 'plan'>('watched');
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
      toast.success('Movie added successfully');
    },

    onError: (error) => {
      toast.error(error.message);
      setSelectedMovie('');
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

  return (
    <>
      <div className="bg-background h-140 w-full flex">
        <img
          src={movie.Poster}
          alt={movie.Title}
          className="object-cover w-[35%] h-full"
          onError={(e) => {
            e.currentTarget.src = no_image_found;
          }}
        />
        <div className="flex flex-col flex-1 items-start pt-10 gap-2">
          <p className="font-[Urbanist] text-center w-full font-bold text-2xl">
            {movie.Title} ({movie.Year})
          </p>
          <div className="pl-5  flex items-center gap-2">
            <img src={IMDB} alt="" className="size-10" />
            <p className="font-[Figtree] font-bold text-yellow-300">
              {movie.imdbRating}/10
            </p>
            <p>⭐</p>
            <img
              src={RottenTomatoes}
              alt=""
              className="size-10 rounded-full ml-6"
            />
            <p className="font-[Figtree] font-bold text-red-500">
              {rottenTomatoes}
            </p>
            <p className="ml-0.5">🍅</p>
          </div>

          <div className="flex pl-2 items-center">
            <img src={Length} alt="" className="h-10" />
            <p className="font-[Figtree] font-bold">{movie.Runtime} • </p>
          </div>
          <div className="flex pl-5 gap-2 flex-wrap">
            {genres.map((g) => (
              <GenrePills key={g} genre={g} />
            ))}
          </div>
          <p className="px-5 text-xs font-semibold  italic leading-relaxed text-muted-foreground">
            "{movie.Plot}"
          </p>
          <div className="flex gap-2 px-4 justify-around w-full mt-3 pb-2">
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
          <div className="w-full px-2">
            <Textarea
              value={note}
              placeholder="50 words to write your heart out!..."
              maxLength={50}
              className=" border-black/20 border dark:border-white/20  bg-gray-200/80 placeholder:text-black/50 dark:placeholder:text-white/50 mb-2"
              onChange={(e) => setNote(e.target.value)}
            />
          </div>
          <div className="flex justify-center w-full">
            <Button
              className=" cursor-pointer dark:bg-indigo-900 border-l-2 border-white/50 bg-indigo-700 px-2 hover:dark:bg-indigo-950 hover:scale-110"
              onClick={saveDetails}
            >
              Save Changes
            </Button>
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
