import { createFileRoute } from '@tanstack/react-router';
import titan from '@/assets/pics/titan 2.png';
import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';

export const Route = createFileRoute('/$')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <div className="bg-black h-screen flex justify-center items-center flex-col relative">
        <h1 className="absolute top-8 text-4xl font-extrabold italic tracking-tight font-[Zalando_Sans_Expanded] sm:top-10 sm:text-5xl">
          <Link to="/">
            <span className="text-indigo-500">SITE</span>
            <span className="">4</span>
            <span className="text-indigo-500">SITE</span>
          </Link>
        </h1>
        <img
          src={titan}
          alt="you dont wanna know..."
          className="absolute top-48 z-0 size-32 sm:top-57 sm:size-40"
        />

        <p className="z-10 text-7xl font-[Figtree] font-bold text-white sm:text-9xl">
          4 <span className="opacity-0">0</span> 4
        </p>
        <p className="mt-6 text-center text-xl font-[Urbanist] text-white sm:text-2xl">
          Oops... Page not found
        </p>
        <p className="mt-6 px-5 text-center text-white dark:text-muted-foreground">
          (How did you even get here?)
        </p>
        <Link to="/docs">
          <Button className="mt-5 cursor-pointer">Go to home</Button>
        </Link>
      </div>
    </>
  );
}
