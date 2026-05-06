import type { OMDbMovie } from "../Types/movie";

type movieCardProps = {
  movie: OMDbMovie;
};

export default function MoviePopOver({ movie }: movieCardProps) {
  return (
    <>
      <div className="bg-background h-100 w-100">
        <img src={movie.Poster} alt="" />
      </div>
    </>
  );
}
