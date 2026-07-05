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
          'hover:scale-105 transition-all ease-out cursor-pointer h-70 w-100 flex flex-col relative dark:bg-black/60 bg-slate-200/70  rounded-3xl overflow-hidden border-t-4  border-l-4 drop-shadow-md dark:drop-shadow-white/20 drop-shadow-black/30',
          status === 'playing' && 'border-t-blue-500 border-l-blue-500',
          status === 'completed' && 'border-y-emerald-500 border-l-emerald-500',
          status === 'dropped' && 'border-y-red-500 border-l-red-500',
          status === 'wishlist' && 'border-y-yellow-400 border-l-yellow-400',
        )}
        onClick={onClick}
      >
        <img src={img} alt="" className=" inset-0 object-cover h-3/4 " />
        {/* <div className="absolute inset-0 bg-linear-to-t from-black/50 via-black/40 to-transparent" /> */}
        <div
          className={cn(
            'absolute top-2 right-2 px-2  text-sm rounded-full backdrop-blur-2xl shadow-md font-[Urbanist] font-semibold border-2 border-white/50',
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
        <div className=" w-full  pt-2 px-3  z-10 text-white flex flex-col gap-1">
          <div className="flex justify-between">
            <h2 className="font-bold text-lg font-[Urbanist] text-black dark:text-white">
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
