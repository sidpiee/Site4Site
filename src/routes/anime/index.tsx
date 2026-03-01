import MainLayout from "@/components/Layout/MainLayout";
import AnimeCard from "@/components/ui/anime-card";
import { SearchBar } from "@/components/ui/searchbar";
import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import useDebounce from "@/hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import SearchResult from "@/components/ui/search-result";

export const Route = createFileRoute("/anime/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [search, setSearch] = useState<string>("");
  const debouncedSearch = useDebounce(search, 800);

  const { data, isLoading, isError, error } = useQuery({
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
      <div className="mb-10 relative">
        <SearchBar
          placeholder="Death Note..."
          Search={search}
          SetSearch={setSearch}
        />
        {data?.data?.length > 0 && (
          <div className="absolute top-full left-0 shadow-lg mt-2 z-20 min-w-sm max-h-96 overflow-y-auto no-scrollbar">
            {data.data.map((anime) => (
              <SearchResult
                key={anime.mal_id}
                imgSrc={anime.images.jpg.large_image_url}
                title={anime.title_english || anime.title}
              />
            ))}
          </div>
        )}
      </div>
      <AnimeCard />
    </MainLayout>
  );
}
