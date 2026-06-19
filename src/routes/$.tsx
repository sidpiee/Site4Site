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
        <h1 className="text-5xl font-extrabold italic tracking-tight font-[Zalando_Sans_Expanded] absolute top-10 ">
          <Link to="/">
            <span className="text-indigo-500">SITE</span>
            <span className="">4</span>
            <span className="text-indigo-500">SITE</span>
          </Link>
        </h1>
        <img
          src={titan}
          alt="you dont wanna know..."
          className="size-40 absolute z-0 top-57"
        />

        <p className="text-9xl text-white font-[Figtree] z-10 font-bold">
          4 <span className="opacity-0">0</span> 4
        </p>
        <p className="mt-6 text-2xl font-[Urbanist] text-white">
          Oops... Page not found
        </p>
        <p className="mt-6 dark:text-muted-foreground text-white">
          (How did you even get here?)
        </p>
        <Link to="/docs">
          <Button className="mt-5 cursor-pointer">Go to home</Button>
        </Link>
      </div>
    </>
  );
}
