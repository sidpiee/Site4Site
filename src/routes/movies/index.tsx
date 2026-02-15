import { createFileRoute } from "@tanstack/react-router";
import MainLayout from "@/components/Layout/MainLayout";
import { SearchBar } from "@/components/ui/searchbar";
import MovieCard from "@/components/ui/movie-card";

export const Route = createFileRoute("/movies/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <MainLayout>
      <SearchBar />
      <MovieCard />
    </MainLayout>
  );
}
