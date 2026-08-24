import { cn } from '@/lib/utils';
import { Heart, Star } from 'lucide-react';

type gameCardProps = {
  name: string;
  rating?: number;
  review?: string;
  img: string;
  status: 'playing' | 'completed' | 'dropped' | 'wishlist';
  favourite?: boolean;
  onClick: () => void;
};
export default function GameCard({
  name,
  rating,
  review,
  img,
  status,
  favourite,
  onClick,
}: gameCardProps) {
  return (
    <>
      <div
        className={cn(
          'relative flex h-full min-h-70 w-full flex-col overflow-hidden rounded-3xl border-l-4 border-t-4 bg-slate-200/70 drop-shadow-md transition-all ease-out hover:scale-[1.02] dark:bg-black/60 dark:drop-shadow-white/20 drop-shadow-black/30 cursor-pointer',
          status === 'playing' && 'border-t-blue-500 border-l-blue-500',
          status === 'completed' && 'border-y-emerald-500 border-l-emerald-500',
          status === 'dropped' && 'border-y-red-500 border-l-red-500',
          status === 'wishlist' && 'border-y-yellow-400 border-l-yellow-400',
        )}
        onClick={onClick}
      >
        <img src={img} alt="" className="aspect-video h-auto w-full object-cover" />
        {/* <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/40 to-transparent" /> */}
        <div
          className={cn(
            'absolute right-2 top-2 rounded-full border-2 border-white/50 px-2 text-xs font-[Urbanist] font-semibold shadow-md backdrop-blur-2xl sm:text-sm',
            status === 'playing' && 'bg-blue-500',
            status === 'completed' && 'bg-emerald-500',
            status === 'dropped' && 'bg-red-500',
            status === 'wishlist' && 'bg-yellow-400',
          )}
        >
          {status.toUpperCase()}
        </div>
        {favourite && (
          <div className="absolute right-3 top-10">
            <Heart className="fill-white" />
          </div>
        )}
        <div className="z-10 flex w-full flex-col gap-1 px-3 pb-3 pt-2 text-white">
          <div className="flex items-start justify-between gap-2">
            <h2 className="min-w-0 font-bold text-lg font-[Urbanist] text-black dark:text-white">
              {name}
            </h2>
            <p className="dark:text-yellow-400 text-amber-500 font-[Urbanist] flex items-center gap-1">
              {rating}
              <Star size={15} />
            </p>
          </div>
          <h2 className="text-muted-foreground italic text-sm relative">
            ~"{review}"
          </h2>
        </div>
      </div>
    </>
  );
}
