export default function DisplayCard() {
  return (
    <>
      <div className="bg-card h-22 w-full px-6 rounded-l-lg mt-2 flex items-center justify-start gap-7">
        <div className="bg-background/80 rounded-md p-2">
          <img
            src="https://www.google.com/s2/favicons?domain=youtube.com&sz=128"
            alt=""
            className=" h-8 w-8"
          />
        </div>
        <div className="flex flex-col">
          <h1 className="font-[Bangers] text-card-foreground text-3xl tracking-wide">
            Youtube
          </h1>
          <h1 className="font-[Fredoka] font-medium text-muted-foreground">
            Love to watch vids on this site. I mean normal vids damn
          </h1>
        </div>
      </div>
    </>
  );
}
