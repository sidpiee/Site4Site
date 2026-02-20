import MainLayout from "@/components/Layout/MainLayout";
import { SearchBar } from "@/components/ui/searchbar";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/games/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <MainLayout>
      <SearchBar placeholder="Elden Ring..." />
    </MainLayout>
  );
}
