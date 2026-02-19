import { Check } from "lucide-react";
import { Button } from "./button";
import { cn } from "@/lib/utils";

type TaskCardProps = {
  id: string;
  text: string;
  completed: boolean;
  toggleTask: (taskID: string) => void;
  deleteTask: (taskID: string) => void;
};

export default function TaskCard({
  id,
  text,
  completed,
  toggleTask,
  deleteTask,
}: TaskCardProps) {
  const CompletedClass = "bg-primary text-primary-foreground border-primary";
  const InCompleteClass = "bg-black border-border hover:bg-muted/70";
  return (
    <div className="w-full bg-card drop-shadow-black/20 drop-shadow-sm flex items-center justify-start p-5 rounded-2xl gap-4 border-border border mt-4">
      <button
        className={cn(
          "h-8 w-8 rounded-full flex items-center justify-center cursor-pointer",
          completed ? CompletedClass : InCompleteClass,
        )}
        onClick={() => toggleTask(id)}
      >
        <Check />
      </button>
      <p
        className={cn(
          "text-foreground font-semibold text-xl font-[Urbanist]",
          completed && "line-through",
        )}
      >
        {text}
      </p>
      <div className="flex flex-1 justify-end">
        <Button
          variant={"destructive"}
          size={"sm"}
          className="cursor-pointer text-destructive-foreground"
          onClick={() => deleteTask(id)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
