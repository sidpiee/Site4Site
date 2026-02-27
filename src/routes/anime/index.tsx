import MainLayout from "@/components/Layout/MainLayout";
import AnimeCard from "@/components/ui/anime-card";
import { SearchBar } from "@/components/ui/searchbar";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/anime/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [search, setSearch] = useState<string>("");
  return (
    <MainLayout>
      <div className="mb-10">
        <SearchBar
          placeholder="Death Note..."
          Search={search}
          SetSearch={setSearch}
        />
      </div>
      <AnimeCard />
    </MainLayout>
  );
}
