import MainLayout from "@/components/Layout/MainLayout";
import AnimeCard from "@/components/ui/anime-card";
import { SearchBar } from "@/components/ui/searchbar";
import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import useDebounce from "@/hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/anime/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 1000);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["anime", debouncedSearch],
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_ANIME_API_URL}/api/v1/anime?anime=${debouncedSearch}`,
      );

      if (!res.ok) {
        throw new Error("Failed to fetch anime");
      }

      return res.json();
    },
    enabled: debouncedSearch.trim().length > 0,
  });

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
