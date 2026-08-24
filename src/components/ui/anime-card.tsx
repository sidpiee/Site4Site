import { Field, FieldLabel } from '@/components/ui/field';
import { Progress } from '@/components/ui/progress';
import type { SavedAnime } from '../Types/anime';
import { cn } from '@/lib/utils';
type AnimeCardProps = {
  anime: SavedAnime;
  onClick: () => void;
};
export default function AnimeCard({ anime, onClick }: AnimeCardProps) {
  const notes = anime.notes ?? 'No notes added';
  return (
    <>
      <div
        onClick={onClick}
        className="relative flex h-fit min-w-0 w-full flex-col overflow-hidden rounded-2xl border border-black/30 bg-slate-300/10 pb-2 backdrop-blur-2xl transition-all ease-out hover:scale-[1.02] dark:border-white/30 dark:bg-card cursor-pointer"
      >
        <img
          src={anime.image}
          alt={anime.title_english || anime.title}
          className="aspect-3/4 h-auto w-full object-cover"
        />

        <div
          className={cn(
            'absolute right-2 top-2 rounded-full border-2 border-white/50 px-2 py-1 text-xs font-[Urbanist] font-semibold shadow-md backdrop-blur-2xl sm:text-sm',
            anime.status === 'Plan to watch' && 'bg-violet-500',
            anime.status === 'Completed' && 'bg-emerald-500',
            anime.status === 'Watching' && 'bg-indigo-500',
          )}
        >
          {anime.status}
        </div>
        <div className="z-10 mt-1 flex flex-col justify-center gap-2 px-2 text-sm">
          <h1 className="text-center text-base font-extrabold text-card-foreground font-[Urbanist] sm:text-lg">
            {anime.title_english || anime.title}
          </h1>
          {anime.genres?.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {anime.genres.map((g) => (
                <GenrePills key={g.mal_id} genre={g.name} />
              ))}
            </div>
          )}
          <Star rating={anime.rating} />
          <Field className="w-full max-w-sm">
            <FieldLabel
              htmlFor="episodes-watched"
              className="flex justify-between "
            >
              <span className="font-[Urbanist] text-xs font-semibold sm:text-sm">
                Episodes Watched
              </span>
              <span className="font-[Urbanist] text-xs font-semibold sm:text-sm">
                {anime.episodesWatched}/{anime.episodes}
              </span>
            </FieldLabel>
            <Progress
              value={(anime.episodesWatched * 100) / (anime.episodes ?? 1)}
              id="episodes-watched"
            />
          </Field>

          <div className="mt-2 rounded-xl border-l-4 border-primary bg-muted/50 p-2 sm:p-3">
            <p className="text-xs italic leading-relaxed text-muted-foreground sm:text-sm">
              {notes}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

function GenrePills({ genre }: { genre: string }) {
  return (
    <>
      <div className="px-3 py-1 font-bold tracking-tighter text-secondary-foreground rounded-full bg-secondary w-fit text-xs">
        {genre}
      </div>
    </>
  );
}

function Star({ rating }: { rating: number | null }) {
  const safeRating = rating ?? 0;
  return (
    <>
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`text-2xl  ${
              star <= safeRating
                ? 'text-yellow-400'
                : 'text-gray-300 dark:text-gray-600'
            }`}
          >
            ★
          </span>
        ))}
      </div>
    </>
  );
}
