import MainLayout from "@/components/Layout/MainLayout";
import GameCard from "@/components/ui/game-card";
import GamePopOver from "@/components/ui/game-popover";
import { SearchBar } from "@/components/ui/searchbar";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/games/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <MainLayout>
      <SearchBar placeholder="Elden Ring..." />
      <div className="grid grid-cols-4 mt-8">
        <GameCard/>
        <GamePopOver/>
      </div>
    </MainLayout>
  );
}
