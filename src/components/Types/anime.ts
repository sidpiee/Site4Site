export type Anime = {
  mal_id: number;
  title: string;
  title_english: string | null;
  images: {
    jpg: {
      large_image_url: string;
    };
  };
  episodes: number | null;
  genres: {
    mal_id: number;
    name: string;
  }[];
};

export type UserAnimeData = {
  status: "watching" | "planned" | "completed";
  rating: number | null;
  episodesWatched: number;
  notes: string;
};

export type AnimeListItem = Anime & UserAnimeData;
