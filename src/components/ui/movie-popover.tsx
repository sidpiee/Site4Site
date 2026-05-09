import { Star } from "lucide-react";
import type { OMDbMovie } from "../Types/movie";
import IMDB from "@/assets/pics/imdb-logo.png";
import RottenTomatoes from "@/assets/pics/rotten_tomatoes.jpg";
import Length from "@/assets/pics/length.webp";
import { Button } from "./button";
import { Textarea } from "./textarea";
import { useState } from "react";

type movieCardProps = {
  movie: OMDbMovie;
};

export default function MoviePopOver({ movie }: movieCardProps) {
  const rottenTomatoes =
    movie?.Ratings?.find((r) => r.Source === "Rotten Tomatoes")?.Value || "N/A";
  const genres = movie.Genre.split(",");
  const [note, setNote] = useState<string>("");
  return (
    <>
      <div className="bg-background h-130 w-full flex">
        <img src={movie.Poster} alt="" className="object-cover w-2/5 h-full" />
        <div className="flex flex-col flex-1 items-start pt-10 gap-2">
          <p className="font-[Urbanist] text-center w-full font-bold text-2xl">
            {movie.Title} ({movie.Year})
          </p>
          <div className="pl-5  flex items-center gap-3">
            <img src={IMDB} alt="" className="size-10" />
            <p className="font-[Figtree] font-bold text-yellow-300">
              {movie.imdbRating}/10
            </p>
            <p>⭐</p>
          </div>
          <div className="pl-5  flex items-center gap-3">
            <img src={RottenTomatoes} alt="" className="size-10 rounded-full" />
            <p className="font-[Figtree] font-bold text-red-500">
              {rottenTomatoes}
            </p>
            <p className="ml-2">🍅</p>
          </div>
          <div className="flex pl-2 items-center">
            <img src={Length} alt="" className="h-10" />
            <p className="font-[Figtree] font-bold">{movie.Runtime} • </p>
          </div>
          <div className="flex pl-5 gap-2 flex-wrap">
            {genres.map((g) => (
              <GenrePills genre={g} />
            ))}
          </div>
          <p className="px-5 text-sm  italic">"{movie.Plot}"</p>
          <div className="flex gap-2 px-4 justify-around w-full mt-3 pb-2">
            <Button className="">Watched</Button>
            <Button className="">Plan to watch</Button>
          </div>
          <Textarea
            value={note}
            placeholder="Might have to binge watch this one..."
            className="  bg-gray-200/80 placeholder:text-black/50 dark:placeholder:text-white/50"
            onChange={(e) => setNote(e.target.value)}
          />
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
