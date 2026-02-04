import { createFileRoute, Link } from "@tanstack/react-router";

import { AuroraText } from "@/components/ui/aurora-text";
import { RetroGrid } from "@/components/ui/retro-grid";
import { TypingAnimation } from "@/components/ui/typing-animation";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <div className="relative bg-linear-to-t from-blue-200 via-blue-300 to-blue-400 min-h-screen  w-full dark:bg-linear-to-t dark:from-blue-950 dark:via-indigo-950 dark:to-sky-950 z-0">
        <div className=" flex justify-center items-center min-h-screen flex-col p-10 relative">
          <RetroGrid darkLineColor="white" />

          <h1 className="font-[jost] font-bold italic text-indigo-500 dark:text-white text-6xl text-center z-10">
            Tired of digging through <AuroraText> bookmarks </AuroraText> just
            to find that one thing?
          </h1>
          <h2 className="mt-6 font-[figtree] italic  z-10">
            <TypingAnimation typeSpeed={30} delay={1000}>
              Save, organize, and rediscover your favorite sites with Site4Site.
            </TypingAnimation>
          </h2>
          <Link to="/docs">
            <Button className=" relative z-50">Get Started</Button>
          </Link>
        </div>
      </div>
    </>
  );
}
