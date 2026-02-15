import imdb from "@/assets/pics/imdb-logo.png";
import { Button } from "./button";
import { Check, Plus } from "lucide-react";
export default function MovieCard() {
  let watched = false;
  return (
    <>
      {/* <div className="relative"> */}
      <div className="flex flex-col dark:bg-card h-fit w-75 drop-shadow-xl backdrop-blur-md rounded-xl m-10 pb-3 text-card-foreground gap-2 bg-white ">
        <img
          src="https://imgs.search.brave.com/9vqtM6SLRUCoQsqZ5djbwUrW3Rwcbh1MYtYvalSu6Vk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMud2lraWEubm9j/b29raWUubmV0L2Zp/bG1ndWlkZS9pbWFn/ZXMvMy8zOS9TaHV0/dGVyX0lzbGFuZF9w/b3N0ZXIuanBlZy9y/ZXZpc2lvbi9sYXRl/c3Qvc2NhbGUtdG8t/d2lkdGgtZG93bi8y/Njc_Y2I9MjAyMjA0/MDcwNTA4NTE"
          alt=""
          className="rounded-t-xl h-70 "
        />
        {/* <div className="absolute inset-0 bg-linear-to-b from-black/20 to-transparent top-1/2 " /> */}
        <div className="flex justify-between px-2 items-center">
          <h1 className="font-bold text-center my-2 font-[Jost]">
            Shutter Island (2014)
          </h1>
          <Button
            size={"icon-sm"}
            variant={"secondary"}
            className="cursor-pointer"
          >
            {watched ? <Check /> : <Plus />}
          </Button>
        </div>
        <div className="flex items-center">
          <img src={imdb} alt="" className="h-6 w-6 mx-2" />
          <span className=""> 8.6⭐</span>
        </div>
        <h1 className="mx-2">Your Rating 8⭐</h1>
        <h1 className="mx-2">128 min • Thriller, Suspense</h1>
        <h1 className="mx-2 text-xs leading-relaxed">
          While investigating a missing patient at a psychiatric facility, a US
          marshal gets caught in a web of deception and starts to question his
          sanity
        </h1>
      </div>
      {/* </div> */}
    </>
  );
}
