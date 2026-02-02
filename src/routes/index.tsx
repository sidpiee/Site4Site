import { createFileRoute } from "@tanstack/react-router";
import { RainbowButton } from "@/components/ui/rainbow-button.tsx";
import { AuroraText } from "@/components/ui/aurora-text";
import { RetroGrid } from "@/components/ui/retro-grid";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <div className=" flex justify-center items-center h-screen flex-col p-10 relative">
        <RetroGrid />
        <h1 className="font-[jost] font-bold italic text-white text-6xl text-center z-10">
          Tired of digging through <AuroraText> bookmarks </AuroraText> just to
          find that one thing?
        </h1>
        <h2 className="mt-6 font-[figtree] font-bold z-10">
          Save, organize, and rediscover your favorite sites with Site4Site.
        </h2>
        <RainbowButton variant="outline" className=" mt-5 z-10">
          Get Started
        </RainbowButton>
      </div>
    </>
  );
}
