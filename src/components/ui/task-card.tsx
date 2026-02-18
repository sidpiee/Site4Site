import { Check } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

type TaskCardProps = {
  id: string;
  text: string;
  completed: boolean;
};

export default function TaskCard({ id, text, completed }: TaskCardProps) {
  const CompletedClass = "bg-primary text-primary-foreground border-primary";
  const InCompleteClass = "bg-muted border-border hover:bg-muted/70";
  return (
    <>
      <div className="w-full bg-card drop-shadow-black/30 drop-shadow-md flex items-center justify-start p-3 rounded-2xl gap-4 border-border border ">
        <button
          className={cn(
            "h-8 w-8 rounded-full flex items-center justify-center cursor-pointer",
            completed ? CompletedClass : InCompleteClass,
          )}
        >
          <Check />
        </button>
        <p
          className={cn(
            "text-foreground font-semibold text-xl font-[Urbanist]",
            completed ? "line-through" : "",
          )}
        >
          {text}
        </p>
        <div className="flex flex-1 justify-end">
          <Button
            variant={"destructive"}
            size={"sm"}
            className="cursor-pointer"
          >
            Delete
          </Button>
        </div>
      </div>
    </>
  );
}
