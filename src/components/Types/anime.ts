export type Anime = {
  mal_id: number;
  title: string;
  title_english: string | undefined;
  images: {
    jpg: {
      large_image_url: string;
    };
  };
  episodes: number;
  genres: {
    mal_id: number;
    name: string;
  }[];
};

export type SavedAnime = {
  mal_id: number;
  title: string;
  title_english?: string;
  image: string;
  episodes: number;
  genres: {
    mal_id: number;
    name: string;
  }[];
} & UserAnimeData;

export type UserAnimeData = {
  status: "Watching" | "Plan to watch" | "Completed";
  rating: number | null;
  episodesWatched: number;
  notes: string;
};

export type AnimeListItem = Anime & UserAnimeData;