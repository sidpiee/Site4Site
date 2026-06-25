import { Field, FieldLabel } from '@/components/ui/field';
import { Progress } from '@/components/ui/progress';
import type { SavedAnime } from '../Types/anime';
import { cn } from '@/lib/utils';
type AnimeCardProps = {
  anime: SavedAnime;
};
export default function AnimeCard({ anime }: AnimeCardProps) {
  const notes = anime.notes ?? 'No notes added';
  return (
    <>
      <div className="w-75 dark:bg-card border-black/30 border dark:border-white/30 bg-slate-300/10 h-fit pb-2 flex flex-col rounded-2xl overflow-hidden backdrop-blur-2xl relative ">
        <img
          src={anime.image}
          alt={anime.title_english || anime.title}
          className="object-cover h-100"
        />

        <div
          className={cn(
            'absolute top-2 right-2 px-2 py-1 text-sm rounded-full backdrop-blur-2xl shadow-md font-[Urbanist] font-semibold border-2 border-white/50',
            anime.status === 'Plan to watch' && 'bg-violet-500',
            anime.status === 'Completed' && 'bg-emerald-500',
            anime.status === 'Watching' && 'bg-indigo-500',
          )}
        >
          {anime.status}
        </div>
        <div className="mt-3 flex flex-col gap-4 px-2 text-sm justify-center z-10">
          <h1 className="text-center text-lg text-card-foreground font-extrabold font-[Urbanist] ">
            {anime.title_english || anime.title}
          </h1>
          {anime.genres?.length > 0 && (
            <div className="flex gap-2 mt-2 flex-wrap">
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
              <span className="font-[Urbanist] font-semibold">
                Episodes Watched
              </span>
              <span className=" font-[Urbanist] font-semibold">
                {anime.episodesWatched}/{anime.episodes}
              </span>
            </FieldLabel>
            <Progress
              value={(anime.episodesWatched * 100) / (anime.episodes ?? 1)}
              id="episodes-watched"
            />
          </Field>

          <div className="mt-2 p-3 bg-muted/50 rounded-xl border-l-4 border-primary">
            <p className="text-sm italic text-muted-foreground leading-relaxed">
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
