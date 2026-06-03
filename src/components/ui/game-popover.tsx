// import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import {
  CalendarDays,
  ChevronsLeft,
  ChevronsRight,
  Gamepad2,
  Heart,
  NotebookText,
  Star,
  UserStar,
} from 'lucide-react';
import { Textarea } from './textarea';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import type { GameListItem } from '../Types/game';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
type gamePopOverProps = {
  game: GameListItem;
  addGames: (g: GameListItem) => void;
  setSelectedGame: (n: number) => void;
};
export default function GamePopOver({
  game,
  addGames,
  setSelectedGame,
}: gamePopOverProps) {
  const [rating, setRating] = useState<number | null>(null);
  const [note, setNote] = useState<string>('');
  const [status, setStatus] = useState<
    'playing' | 'completed' | 'dropped' | 'wishlist'
  >('playing');
  const [favourite, setFavourite] = useState<boolean>(false);
  const [screenshotIndex, setScreenshotIndex] = useState<number>(-1);
  const selectedStatus =
    'scale-125 drop-shadow-md dark:drop-shadow-white/20 border drop-shadow-black/20 border-black/60 dark:border-white';
  const { data } = useQuery({
    queryKey: ['game-trailer', game.id],
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/game/this/trailer?id=${game.id}`,
      );

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }

      return res.json();
    },
    enabled: !!game?.id,
  });
  const screenshotQuery = useQuery({
    queryKey: ['game-screenshots', game.id],
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/game/this/screenshots?id=${game.id}`,
      );

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }

      return res.json();
    },
    enabled: !!game?.id,
  });
  const screenshots =
    screenshotQuery.data?.data?.results?.map(
      (s: { id: number; image: string }) => s.image,
    ) || [];
  function saveChanges() {
    addGames({
      ...game,
      personalRating: rating ?? 0,
      review: note || 'No notes added',
      favorite: favourite,
      status,
    });

    setSelectedGame(0);
    toast.success('Game added successfully');
  }
  return (
    <div className="relative min-h-160 w-full ">
      <img
        src={
          screenshotIndex === -1
            ? game.background_image
            : screenshots[screenshotIndex]
        }
        alt={game.name}
        className="absolute inset-0 w-full h-[45%] object-cover"
      />
      <Button
        variant="ghost"
        className="absolute z-20 top-35 right-0 hover:bg-white/20 cursor-pointer"
        onClick={() =>
          setScreenshotIndex((prev) => {
            if (screenshots.length === 0) {
              toast('No screenshot avaliable');
              return -1;
            } else {
              if (prev === screenshots.length - 1) return -1;
              else return prev + 1;
            }
          })
        }
      >
        <ChevronsRight className="size-10 text-white" />
      </Button>
      <Button
        variant="ghost"
        className="absolute top-35 z-20 left-0 hover:bg-white/20 cursor-pointer"
        onClick={() =>
          setScreenshotIndex((prev) => {
            if (screenshots.length === 0) {
              toast('No screenshot avaliable');
              return -1;
            } else {
              if (prev === -1) return screenshots.length - 1;
              else return prev - 1;
            }
          })
        }
      >
        <ChevronsLeft className="size-10 text-white " />
      </Button>
      <div className="hidden dark:block absolute inset-0 bg-linear-to-b from-transparent via-[#111827]/60 to-[#111827] pointer-events-none" />

      <div className="relative pt-60 px-6 pb-6 flex flex-col gap-5">
        <div className="flex items-start justify-between">
          <div>
            <h1 className="font-[Urbanist] font-bold text-3xl text-white ">
              {game.name}
            </h1>
          </div>

          <Button
            size="icon"
            variant="ghost"
            className="rounded-full hover:bg-white/10 cursor-pointer"
            onClick={() => setFavourite((prev) => !prev)}
          >
            {favourite ? (
              <Heart className="size-5 fill-white" />
            ) : (
              <Heart className="size-5 fill-zinc-500/70" />
            )}
          </Button>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm font-[Urbanist]">
          <div className="flex items-center gap-3 font-[Urbanist]">
            <CalendarDays className="size-5 dark:text-gray-300 text-black" />
            <span>Released: {game.released}</span>
          </div>

          <div className="flex items-center gap-3 font-[Urbanist]">
            <Gamepad2 className="size-5 dark:text-gray-300 text-black" />

            <span>
              {game.platforms.map((p) => p.platform.name).join(' • ')}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <Star className="size-5 text-yellow-400" />
            <span className="font-[Urbanist]">
              {game.rating} Community Rating
            </span>
          </div>
        </div>
        <div className="flex justify-around items-center">
          <button
            className={cn(
              'text-white cursor-pointer bg-linear-to-r from-blue-400 to-blue-600 px-2 rounded-2xl text-lg font-[Urbanist] font-semibold',
              status === 'playing' && selectedStatus,
            )}
            onClick={() => setStatus('playing')}
          >
            Playing
          </button>
          <button
            className={cn(
              ' text-white cursor-pointer bg-linear-to-r from-emerald-400  to-emerald-600 px-2 rounded-2xl text-lg font-[Urbanist] font-semibold',
              status === 'completed' && selectedStatus,
            )}
            onClick={() => setStatus('completed')}
          >
            Completed
          </button>
          <button
            className={cn(
              ' text-white cursor-pointer bg-linear-to-r from-red-400 to-red-600 px-2 rounded-2xl text-lg font-[Urbanist] font-semibold',
              status === 'dropped' && selectedStatus,
            )}
            onClick={() => setStatus('dropped')}
          >
            Dropped
          </button>
          <button
            className={cn(
              'text-white cursor-pointer bg-linear-to-r from-yellow-300 to-yellow-600 px-2 rounded-2xl text-lg font-[Urbanist] font-semibold',
              status === 'wishlist' && selectedStatus,
            )}
            onClick={() => setStatus('wishlist')}
          >
            Wishlist
          </button>
        </div>
        <div className="flex items-center gap-3">
          <UserStar className="size-5 text-gray-300" />
          <RatingSection value={rating} setRating={setRating} />
        </div>

        <p className="flex items-center gap-3 text-sm leading-relaxed text-gray-200">
          <NotebookText className="min-w-5 mt-0.5" />

          <Textarea
            className="bg-gray-200/80"
            placeholder="Zero deaths..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />
        </p>
        <div className="flex gap-3 pt-2 justify-center">
          {data?.data?.results?.length ? (
            <Dialog>
              <DialogTrigger asChild>
                <Button className="rounded-xl cursor-pointer">
                  ▶ Watch Trailer
                </Button>
              </DialogTrigger>

              <DialogContent className="max-w-5xl p-0 overflow-hidden border-none bg-black">
                <video
                  controls
                  autoPlay
                  className="w-full backdrop-blur-2xl aspect-video overflow-hidden"
                  src={data.data.results[0].data.max}
                  poster={game.background_image}
                />
              </DialogContent>
            </Dialog>
          ) : (
            <Button
              className="rounded-xl cursor-pointer"
              onClick={() => toast.error('No trailer available')}
            >
              ▶ Watch Trailer
            </Button>
          )}
          <Button
            variant="secondary"
            className="cursor-pointer"
            onClick={saveChanges}
          >
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
}
function RatingSection({
  value,
  setRating,
}: {
  value: number | null;
  setRating: (val: number | null) => void;
}) {
  return (
    <>
      <Select
        value={value === null ? '0' : String(value)}
        onValueChange={(val) => setRating(val === '0' ? null : Number(val))}
      >
        <SelectTrigger className="w-full  max-w-48 bg-gray-200/80">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="cursor-pointer">
          <SelectGroup>
            <SelectLabel className="text-xs">Rating</SelectLabel>
            <SelectItem value="1">⭐</SelectItem>
            <SelectItem value="2">⭐⭐</SelectItem>
            <SelectItem value="3">⭐⭐⭐</SelectItem>
            <SelectItem value="4">⭐⭐⭐⭐</SelectItem>
            <SelectItem value="5">⭐⭐⭐⭐⭐</SelectItem>
            <SelectItem value="0" className="font-semibold">
              Haven't played yet
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}
