import MainLayout from "@/components/Layout/MainLayout";
import AnimeCard from "@/components/ui/anime-card";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/anime/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <MainLayout>
      <AnimeCard />
    </MainLayout>
  );
}
