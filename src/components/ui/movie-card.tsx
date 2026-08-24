import imdb from '@/assets/pics/imdb-logo.png';
import { Button } from './button';
import { Check, Plus } from 'lucide-react';
import type { MovieListItem } from '../Types/movie';
import noImage from '@/assets/pics/No_image_Moviecard.png';

export default function MovieCard({
  movie,
  changeStatus,
  onClick,
}: {
  movie: MovieListItem;
  changeStatus: (id: string, status: 'watched' | 'plan') => void;
  onClick: () => void;
}) {
  const watched = movie.status === 'watched';
  return (
    <>
      <div
        onClick={onClick}
        className="mx-auto flex h-fit w-full max-w-75 cursor-pointer flex-col gap-2 rounded-xl bg-white pb-3 text-card-foreground drop-shadow-xl backdrop-blur-md transition-all ease-out hover:scale-[1.02] dark:bg-card"
      >
        <img
          src={movie.Poster}
          alt={movie.Title}
          className="aspect-2/3 h-auto w-full rounded-t-xl object-cover"
          onError={(e) => {
            e.currentTarget.src = noImage;
          }}
        />
        <div className="bg-background absolute right-1 top-2 px-2 py-1 rounded-xl dark:border-white/50 border border-black ">
          {movie.status === 'plan' ? 'Plan to watch' : 'Watched'}
        </div>
        <div className="flex items-center justify-between gap-2 px-2">
          <h1 className="my-2 min-w-0 font-bold text-center font-[Urbanist]">
            {movie.Title} ({movie.Year})
          </h1>
          <Button
            size={'icon-sm'}
            variant={'secondary'}
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              changeStatus(movie.imdbID, movie.status);
            }}
          >
            {watched ? <Check /> : <Plus />}
          </Button>
        </div>
        <div className="flex items-center">
          <img src={imdb} alt="imdb" className="h-6 w-6 mx-2" />
          <span className=""> {movie.imdbRating}⭐</span>
        </div>
        <p className="mx-2 font-[Figtree]">
          {movie.Runtime} • {movie.Genre}
        </p>
        {movie.Plot && (
          <p className="mx-2 text-sm leading-relaxed text-muted-foreground font-bold italic">
            {movie.Plot}
          </p>
        )}
        <div className="mt-2 p-3 bg-muted/50 rounded-xl border-l-4 border-primary">
          <p className="text-sm italic text-muted-foreground leading-relaxed">
            {movie.notes.length === 0 ? 'no notes added' : movie.notes}
          </p>
        </div>
      </div>
    </>
  );
}
