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

  gameplayType:
    | "Singleplayer"
    | "Multiplayer"
    | "Singleplayer / Multiplayer";

platforms: {
  platform: {
    id: number;
    name: string;
  };
}[];

  personalRating?: number;

  review?: string;

  favorite?: boolean;
};