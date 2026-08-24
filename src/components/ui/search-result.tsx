import no_image_found from "@/assets/pics/Image-Not-Found.jpg";
type SearchResultProps = {
  imgSrc: string;
  title: string;
  onClick?: () => void;
};

export default function SearchResult({
  imgSrc,
  title,
  onClick,
}: SearchResultProps) {
  return (
    <>
      <div
        className="flex h-26 w-full max-w-sm items-center justify-start gap-4 overflow-hidden rounded-lg border border-black/30 bg-slate-100 dark:border-white/40 dark:bg-card cursor-pointer"
        onClick={onClick}
      >
        <img
          src={imgSrc}
          alt={title}
          className="z-10 h-full w-18 shrink-0 object-cover"
          onError={(e) => {
            e.currentTarget.src = no_image_found;
          }}
        />

        <h1 className="min-w-0 pr-3 font-[Figtree] text-md font-semibold tracking-tight text-card-foreground antialiased">
          {title}
        </h1>
      </div>
    </>
  );
}
