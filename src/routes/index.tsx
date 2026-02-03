import { createFileRoute } from "@tanstack/react-router";
import { RainbowButton } from "@/components/ui/rainbow-button.tsx";
import { AuroraText } from "@/components/ui/aurora-text";
import { RetroGrid } from "@/components/ui/retro-grid";
import { TypingAnimation } from "@/components/ui/typing-animation";

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
        <h2 className="mt-6 font-[figtree] italic  z-10">
          <TypingAnimation typeSpeed={50} delay={1000}>
            Save, organize, and rediscover your favorite sites with Site4Site.
          </TypingAnimation>
        </h2>
        <RainbowButton variant="outline" className=" mt-5 z-10">
          Get Started
        </RainbowButton>
      </div>
    </>
  );
}
