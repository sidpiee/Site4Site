export type OMDbMovie = {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Genre: string;
  Runtime: string;
  imdbRating: string;
  Plot: string;
};
export type UserMovieData = {
  status: "watched" | "plan";
  personalRating: number | null;
  notes: string;
};
export type MovieListItem = OMDbMovie & UserMovieData;
