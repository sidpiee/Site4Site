import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import MainLayout from "@/components/Layout/MainLayout";
import { SearchBar } from "@/components/ui/searchbar";
import MovieCard from "@/components/ui/movie-card";

export const Route = createFileRoute("/movies/")({
  component: RouteComponent,
});

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

function RouteComponent() {
  const [movies, setMovies] = useState<Movie[]>([]);
  return (
    <MainLayout>
      <div className="flex justify-between">
        <SearchBar />
        <BtnGroup />
      </div>
      <div className="grid grid-cols-3 gap-6 mt-6">
        {movies.map((m) => (
          <MovieCard movie={m} key={m.id} />
        ))}
      </div>
    </MainLayout>
  );
}

export default function BtnGroup() {
  type Filter = "watched" | "all" | "plan";
  const [active, setActive] = useState<Filter>("all");

  const baseStyle =
    "px-3 py-2 rounded-2xl text-sm font-medium transition-all duration-300 cursor-pointer";

  const activeStyle =
    "bg-gradient-to-r from-blue-400 to-blue-600 text-white shadow-md";

  const inactiveStyle = "text-white/70 hover:text-white";

  return (
    <div className="flex dark:bg-blue-950/40 bg-blue-400/50 rounded-3xl p-2 border border-white/20 gap-5 w-fit">
      <button
        onClick={() => setActive("watched")}
        className={`${baseStyle} ${
          active === "watched" ? activeStyle : inactiveStyle
        }`}
      >
        Watched
      </button>

      <button
        onClick={() => setActive("all")}
        className={`${baseStyle} ${
          active === "all" ? activeStyle : inactiveStyle
        }`}
      >
        All
      </button>

      <button
        onClick={() => setActive("plan")}
        className={`${baseStyle} ${
          active === "plan" ? activeStyle : inactiveStyle
        }`}
      >
        Plan to Watch
      </button>
    </div>
  );
}
