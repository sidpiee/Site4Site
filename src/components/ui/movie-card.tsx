import imdb from "@/assets/pics/imdb-logo.png";
import { Button } from "./button";
import { Check, Plus } from "lucide-react";
import type { MovieListItem } from "../Types/movie";

export default function MovieCard({ movie }: { movie: MovieListItem }) {
  const watched = movie.status === "watched";
  return (
    <>
      <div className="flex flex-col dark:bg-card h-fit w-75 drop-shadow-xl backdrop-blur-md rounded-xl m-10 pb-3 text-card-foreground gap-2 bg-white ">
        <img
          src={movie.Poster}
          alt={movie.Title}
          className="rounded-t-xl h-70 "
        />
        <div className="flex justify-between px-2 items-center">
          <h1 className="font-bold text-center my-2 font-[Jost]">
            {movie.Title} ({movie.Year})
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
          <img src={imdb} alt="imdb" className="h-6 w-6 mx-2" />
          <span className=""> {movie.imdbRating}⭐</span>
        </div>
        <p className="mx-2">
          {movie.Runtime} min • {movie.Genre}
        </p>
        {movie.Plot && (
          <p className="mx-2 text-xs leading-relaxed">{movie.Plot}</p>
        )}
      </div>
    </>
  );
}
