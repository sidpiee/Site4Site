// import { Badge } from "@/components/ui/badge";
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import {
  CalendarDays,
  Gamepad2,
  Heart,
  NotebookText,
  Star,
  User,
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

export default function GamePopOver() {
  const [rating, setRating] = useState<number | null>(null);
  const [note, setNote] = useState<string>('');
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Share</Button>
      </DialogTrigger>

      <DialogContent className="p-0 overflow-hidden border-none bg-[#111827] text-white max-w-3xl rounded-3xl">
        <div className="relative min-h-160 w-full">
          <img
            src="https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/library_hero.jpg"
            alt="Elden Ring"
            className="absolute inset-0 w-full h-[45%] object-cover"
          />

          <div className="absolute inset-0 bg-linear-to-b from-transparent via-[#111827]/60 to-[#111827]" />

          <div className="relative pt-64 px-6 pb-6 flex flex-col gap-5">
            <div className="flex items-start justify-between">
              <div>
                <h1 className="font-[Urbanist] font-bold text-5xl">
                  ELDEN RING
                </h1>
              </div>

              <Button
                size="icon"
                variant="ghost"
                className="rounded-full hover:bg-white/10"
              >
                <Heart className="size-5" />
              </Button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-3">
                <User className="size-5 text-gray-300" />
                <span>Singleplayer / Multiplayer</span>
              </div>

              <div className="flex items-center gap-3">
                <CalendarDays className="size-5 text-gray-300" />
                <span>Released: 2022</span>
              </div>

              <div className="flex items-center gap-3">
                <Gamepad2 className="size-5 text-gray-300" />
                <span>PC • PS5 • Xbox Series X</span>
              </div>
              <div className="flex items-center gap-3">
                <Star className="size-5 text-yellow-400" />
                <span>4.7 Community Rating</span>
              </div>
            </div>
            <div className="flex justify-around items-center">
              <button className=" cursor-pointer bg-linear-to-r from bg-blue-400 to-blue-600 px-2 rounded-2xl text-lg font-[Urbanist] font-semibold">
                Playing
              </button>
              <button className=" cursor-pointer bg-linear-to-r from bg-emerald-400  to-emerald-600 px-2 rounded-2xl text-lg font-[Urbanist] font-semibold">
                Completed
              </button>
              <button className=" cursor-pointer bg-linear-to-r from bg-red-400 to-red-600 px-2 rounded-2xl text-lg font-[Urbanist] font-semibold">
                Dropped
              </button>
              <button className=" cursor-pointer bg-linear-to-r from bg-yellow-400 to-yellow-600 px-2 rounded-2xl text-lg font-[Urbanist] font-semibold">
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
                className=""
                placeholder="Zero deaths..."
                value={note}
                onChange={(e) => setNote(e.target.value)}
              />
            </p>
            <div className="flex gap-3 pt-2 justify-center">
              <Button className="rounded-xl">▶ Watch Trailer</Button>

              <Button variant="secondary" className="rounded-xl">
                View Screenshots
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
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
