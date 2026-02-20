export default function GameCard() {
  return (
    <>
      <div className="h-95 w-60 relative bg-card rounded-2xl overflow-hidden border-border border-2 ">
        <img
          src="https://cdn.cloudflare.steamstatic.com/steam/apps/1245620/library_hero.jpg"
          alt=""
          className="absolute inset-0 object-cover h-full  "
        />
        <div className="absolute inset-0 bg-linear-to-t from-black via-black/40 to-transparent" />
        <div className="absolute bottom-0 w-full p-4 z-10 text-white flex flex-col gap-1">
          <h2 className="font-bold text-2xl font-[Urbanist]">Elden Ring</h2>
          <p className="text-sm opacity-80">120 hrs played</p>
          <p className="">Click for more details</p>
        </div>
      </div>
    </>
  );
}
