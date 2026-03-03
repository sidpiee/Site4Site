type SearchResultProps = {
  imgSrc: string;
  title: string;
};

export default function SearchResult({ imgSrc, title }: SearchResultProps) {
  return (
    <>
      <div className="max-w-sm  bg-slate-100 dark:bg-card border-black/30 dark:border-white/40 border gap-5 flex justify-start items-center h-26  overflow-hidden rounded-l-sm">
        <img
          src={imgSrc}
          alt={title}
          className="object-cover w-18 h-full z-10 "
        />
        <h1 className="font-[Figtree] tracking-tight font-semibold  antialiased text-md text-card-foreground pr-2">
          {title}
        </h1>
      </div>
    </>
  );
}
