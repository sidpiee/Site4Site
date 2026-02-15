import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import MainLayout from "@/components/Layout/MainLayout";
import { SearchBar } from "@/components/ui/searchbar";
import MovieCard from "@/components/ui/movie-card";
import { ButtonGroup } from "@/components/ui/button-group";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/movies/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <MainLayout>
      <div className="flex justify-between">
        <SearchBar />
        <BtnGroup />
      </div>
      <MovieCard />
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
