import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Clock, NotebookText, Trophy, User, UserStar } from "lucide-react";

export default function GamePopOver() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Share</Button>
      </DialogTrigger>
      <DialogContent className="p-0 overflow-hidden">
        <div className="relative h-120 w-full">
          <img
            src="https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/library_hero.jpg"
            alt="Elden Ring"
            className="absolute inset-x-0 top-0 w-full h-1/2 object-cover"
          />

          <div className=" relative top-2/5 flex flex-col gap-5 justify-start items-start px-3">
            <h1 className="font-[Urbanist] font-bold text-4xl text-white">
              ELDEN RING
            </h1>
            <p className="flex font-medium items-center text-sm gap-2">
              <User /> Singleplayer / Multiplayer
            </p>
            <p className="flex font-medium items-center text-sm gap-2">
              <Clock /> 12.5 Hrs (Last 2 weeks)
            </p>
            <p className="flex font-medium items-center text-sm gap-2">
              <Trophy /> 32/50 (Achievements Unlocked)
            </p>
            <p className="flex font-medium items-center text-sm gap-2">
              <UserStar /> ⭐⭐⭐⭐ (Personal Rating)
            </p>
            <p className="flex font-medium items-center text-sm gap-2">
              <NotebookText /> I love this game so muchhh
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
