import { createFileRoute, Link } from '@tanstack/react-router';

import { AuroraText } from '@/components/ui/aurora-text';
import { RetroGrid } from '@/components/ui/retro-grid';
import { TypingAnimation } from '@/components/ui/typing-animation';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <div className="relative bg-linear-to-t from-blue-200 via-blue-300 to-blue-400 min-h-screen  w-full dark:bg-linear-to-t dark:from-blue-950 dark:via-indigo-950 dark:to-sky-950 z-0">
        <div className="relative flex min-h-screen flex-col items-center justify-center p-5 text-center sm:p-10">
          <RetroGrid darkLineColor="white" />

          <h1 className="z-10 max-w-4xl font-[jost] text-4xl font-bold italic text-indigo-500 dark:text-white sm:text-5xl md:text-6xl">
            Tired of digging through <AuroraText> bookmarks </AuroraText> just
            to find that one thing?
          </h1>
          <h2 className="z-10 mt-6 max-w-2xl px-2 font-[figtree] text-sm italic sm:text-base">
            <TypingAnimation typeSpeed={30} delay={1000}>
              Save, organize, and rediscover your favorite sites with Site4Site.
            </TypingAnimation>
          </h2>
          <Link to="/docs" className="z-50 mt-8">
            <Button className="relative cursor-pointer">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </>
  );
}
