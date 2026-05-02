import MainLayout from "@/components/Layout/MainLayout";
import AnimeCard from "@/components/ui/anime-card";
import { SearchBar } from "@/components/ui/searchbar";
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import { useQuery } from "@tanstack/react-query";
import SearchResult from "@/components/ui/search-result";
import Loding from "@/components/ui/loding-state";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import AnimePopOver from "@/components/ui/anime-popover";

export const Route = createFileRoute("/anime/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [search, setSearch] = useState<string>("");
  const [selectedAnime, setSelectedAnime] = useState<any | null>(null);
  const debouncedSearch = useDebounce(search, 1000);

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["anime", debouncedSearch],
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_ANIME_API_URL}/api/v1/anime?anime=${debouncedSearch}`,
      );

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
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
        {isLoading && (
          <div className="absolute top-full left-0 shadow-lg  mt-2 z-20 min-w-sm">
            <Loding />
          </div>
        )}
        {isError && (
          <p className="mt-5 text-red-500 font-semibold font-[Figtree] ">
            {error.message}
          </p>
        )}
        {data?.data?.length > 0 && (
          <div className="absolute top-full left-0 shadow-lg  mt-2 z-20 min-w-sm max-h-90 overflow-y-auto no-scrollbar">
            {data.data.map((anime) => (
              <SearchResult
                key={anime.mal_id}
                imgSrc={anime.images.jpg.large_image_url}
                title={anime.title_english || anime.title}
                onClick={() => {
                  setSearch("");
                  setSelectedAnime(anime);
                }}
              />
            ))}
          </div>
        )}
      </div>
      <Dialog
        open={!!selectedAnime}
        onOpenChange={(open) => {
          if (!open) setSelectedAnime(null);
        }}
      >
        <DialogContent className="p-0 overflow-hidden max-w-4xl">
          {selectedAnime && (
            <AnimePopOver
              imgSrc={selectedAnime.images.jpg.large_image_url}
              name={selectedAnime.title_english || selectedAnime.title}
              totalEp={selectedAnime.episodes || 0}
            />
          )}
        </DialogContent>
      </Dialog>
      <div className="mb-10">
        <section>
          <h1 className="text-6xl  text-transparent bg-linear-to-r from-violet-500 to-violet-700 font-bold inline-block bg-clip-text font-[Urbanist] italic">
            Plan to Watch
          </h1>
          <div className="h-1 w-110 bg-linear-to-r from-purple-500 to-purple-800 mt-3 mb-8 rounded-full" />
          <div className="grid grid-cols-4 gap-x-2 gap-y-10">
            <AnimeCard />
          </div>
        </section>
      </div>
      <div className="mb-10">
        <section>
          <h1 className="text-6xl  text-transparent bg-linear-to-r from-indigo-500 to-indigo-700 font-bold inline-block bg-clip-text font-[Urbanist] italic">
            Watching
          </h1>
          <div className="h-1 w-140 bg-linear-to-r from-blue-500 to-blue-800 mt-3 mb-8 rounded-full" />
          <div className="grid grid-cols-4 gap-x-2 gap-y-10">
            <AnimeCard />
          </div>
        </section>
      </div>
      <div className="mb-10">
        <section>
          <h1 className="text-6xl  text-transparent bg-linear-to-r from-emerald-500 to-emerald-700 font-bold inline-block bg-clip-text font-[Urbanist] italic">
            Completed
          </h1>
          <div className="h-1 w-180 bg-linear-to-r from-green-500 to-green-800 mt-3 mb-8 rounded-full" />
          <div className="grid grid-cols-4 gap-x-2 gap-y-10">
            <AnimeCard />
          </div>
        </section>
      </div>
    </MainLayout>
  );
}
