import { Spinner } from "./spinner";

export default function Loding() {
  return (
    <>
      <div className="max-w-sm  bg-slate-100 dark:bg-card border-black/30 dark:border-white/40 border gap-5 flex justify-start items-center h-26 mt-2 overflow-hidden rounded-l-sm">
        <Spinner className="size-6" />
        <p className="font-[Figtree] text-lg">Loding...</p>
      </div>
    </>
  );
}
