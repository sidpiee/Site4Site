import { Field, FieldLabel } from "@/components/ui/field";
import { Progress } from "@/components/ui/progress";
export default function AnimeCard() {
  return (
    <>
      <div className="w-75 dark:bg-card border-black/30 border dark:border-white/30 bg-slate-300/10 h-fit pb-2 flex flex-col rounded-2xl overflow-hidden backdrop-blur-2xl relative ">
        <img
          src="https://imgs.search.brave.com/jizepV3veJvMeUAlKq4HVF3XQZs_0MsZiSGBwBbNuA4/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9tLm1l/ZGlhLWFtYXpvbi5j/b20vaW1hZ2VzL00v/TVY1QlpEa3dOamMw/TldFdE56SmxPQzAw/TjJZd0xUazRNamt0/WkdGbFpERTJZMlF6/T1dJMFhrRXlYa0Zx/Y0djQC5qcGc"
          alt=""
          className="object-cover h-100"
        />

        <div className="absolute top-4 right-4  bg-indigo-500/90 px-2 py-1 text-sm rounded-full backdrop-blur-2xl shadow-md font-[Urbanist] font-semibold">
          Watching
        </div>
        <div className="mt-3 flex flex-col gap-4 px-2 text-sm justify-center z-10">
          <h1 className="text-center text-2xl text-card-foreground font-extrabold font-[Urbanist] truncate">
            Spy X Family <span className="text-xs">(Season 1)</span>
          </h1>
          <div className="flex gap-2 mt-2">
            <GenrePills genre="comedy" />
            <GenrePills genre="Sci-Fi" />
          </div>
          <Star />
          <Field className="w-full max-w-sm">
            <FieldLabel
              htmlFor="episodes-watched"
              className="flex justify-between "
            >
              <span className="font-[Urbanist] font-semibold">
                Episodes Watched
              </span>
              <span className=" font-[Urbanist] font-semibold">11/13</span>
            </FieldLabel>
            <Progress value={(11 * 100) / 13} id="episodes-watched" />
          </Field>

          <div className="mt-2 p-3 bg-muted/50 rounded-xl border-l-4 border-primary">
            <p className="text-sm italic text-muted-foreground leading-relaxed">
              Need to complete this before exams!!!
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

function GenrePills({ genre }: { genre: string }) {
  return (
    <>
      <div className="px-3 py-1 font-bold tracking-tighter text-secondary-foreground rounded-full bg-secondary w-fit text-xs">
        {genre}
      </div>
    </>
  );
}

function Star() {
  return (
    <>
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={`text-2xl  ${
              star <= 4 ? "text-yellow-400" : "text-gray-300 dark:text-gray-600"
            }`}
          >
            ★
          </span>
        ))}
      </div>
    </>
  );
}
