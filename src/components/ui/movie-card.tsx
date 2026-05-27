import imdb from "@/assets/pics/imdb-logo.png";
import { Button } from "./button";
import { Check, Plus } from "lucide-react";
import type { MovieListItem } from "../Types/movie";
import noImage from "@/assets/pics/No_image_Moviecard.png";

export default function MovieCard({ movie , changeStatus }: { movie: MovieListItem , changeStatus : ( id : string)=>void}) {
  const watched = movie.status === "watched";
  return (
    <>
      <div className="flex flex-col dark:bg-card h-fit w-75 drop-shadow-xl backdrop-blur-md rounded-xl m-10 pb-3 text-card-foreground gap-2 bg-white">
        <img
          src={movie.Poster}
          alt={movie.Title}
          className="rounded-t-xl h-100 object-fit"
          onError={(e) => {
            e.currentTarget.src = noImage;
          }}
        />
        <div className="bg-background absolute right-1 top-2 px-2 py-1 rounded-xl dark:border-white/50 border border-black ">
          {movie.status === "plan" ? "Plan to watch" : "Watched"}
        </div>
        <div className="flex justify-between px-2 items-center">
          <h1 className="font-bold text-center my-2 font-[Urbanist]">
            {movie.Title} ({movie.Year})
          </h1>
          <Button
            size={"icon-sm"}
            variant={"secondary"}
            className="cursor-pointer"
            onClick={() => changeStatus(movie.imdbID)}
          >
            {watched ? <Check /> : <Plus />}
          </Button>
        </div>
        <div className="flex items-center">
          <img src={imdb} alt="imdb" className="h-6 w-6 mx-2" />
          <span className=""> {movie.imdbRating}⭐</span>
        </div>
        <p className="mx-2 font-[Figtree]">
          {movie.Runtime}  • {movie.Genre}
        </p>
        {movie.Plot && (
          <p className="mx-2 text-sm leading-relaxed text-muted-foreground font-bold italic">
            {movie.Plot}
          </p>
        )}
        <div className="mt-2 p-3 bg-muted/50 rounded-xl border-l-4 border-primary">
          <p className="text-sm italic text-muted-foreground leading-relaxed">
            {movie.notes.length === 0 ? "no notes added" : movie.notes}
          </p>
        </div>
      </div>
    </>
  );
}
