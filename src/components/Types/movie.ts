export type OMDbMovie = {
  imdbID: string;
  Title: string;
  Year: string;
  Poster: string;
  Genre: string;
  Runtime: string;
  imdbRating: string;
  Plot: string;
  Ratings?: {
    Source: string;
    Value: string;
  }[];
};
export type UserMovieData = {
  status: "watched" | "plan";
  notes: string;
};
export type MovieListItem = OMDbMovie & UserMovieData;

export type DbMovie = {
  notes : string ,
  status : "watched" | "plan";
}