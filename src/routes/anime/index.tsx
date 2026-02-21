import MainLayout from "@/components/Layout/MainLayout";
import AnimeCard from "@/components/ui/anime-card";
import { SearchBar } from "@/components/ui/searchbar";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/anime/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <MainLayout>
      <div className="mb-10">
        <SearchBar placeholder="Death Note..." />
      </div>
      <AnimeCard />
    </MainLayout>
  );
}
