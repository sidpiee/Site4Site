export type GameListItem = {
  id: number;
  name: string;
  background_image: string;
  released: string;
  rating: number;

  status:
    | "playing"
    | "completed"
    | "dropped"
    | "wishlist";


platforms: {
  platform: {
    id: number;
    name: string;
  };
}[];

  personalRating?: number;

  review?: string;

  favourite?: boolean;
};

export type savedGame = {
  personalRating?: number;
  status:
    | "playing"
    | "completed"
    | "dropped"
    | "wishlist";
  favourite?: boolean;
  review?: string;
}
