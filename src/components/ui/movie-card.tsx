import imdb from "@/assets/pics/imdb-logo.png";
import { Button } from "./button";
import { Check, Plus } from "lucide-react";

type Movie = {
  id: string;
  title: string;
  year: number;
  poster: string;
  genre: string[];
  runtime: number;
  imdbRating: number;
  personalRating?: number;
  status: "watched" | "plan";
  description?: string;
};
type MovieCardProps = {
  movie: Movie;
};
export default function MovieCard({ movie }: MovieCardProps) {
  const watched = movie.status === "watched";
  return (
    <>
      <div className="flex flex-col dark:bg-card h-fit w-75 drop-shadow-xl backdrop-blur-md rounded-xl m-10 pb-3 text-card-foreground gap-2 bg-white ">
        <img
          src={movie.poster}
          alt={movie.title}
          className="rounded-t-xl h-70 "
        />
        <div className="flex justify-between px-2 items-center">
          <h1 className="font-bold text-center my-2 font-[Jost]">
            {movie.title} ({movie.year})
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
        {watched && <p className="mx-2">Your Rating {movie.personalRating}</p>}
        <p className="mx-2">
          {movie.runtime} min • {movie.genre.join(",")}
        </p>
        {movie.description && (
          <p className="mx-2 text-xs leading-relaxed">{movie.description}</p>
        )}
      </div>
    </>
  );
}
