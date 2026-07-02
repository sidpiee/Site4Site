import { Check } from 'lucide-react';
import { Button } from './button';
import { cn } from '@/lib/utils';

type TaskCardProps = {
  id: string;
  text: string;
  completed: boolean;
  toggleTask: ({ id, completed }: { id: string; completed: boolean }) => void;
  deleteTask: (taskID: string) => void;
};

export default function TaskCard({
  id,
  text,
  completed,
  toggleTask,
  deleteTask,
}: TaskCardProps) {
  const CompletedClass = 'bg-primary text-primary-foreground border-primary';
  const InCompleteClass = 'bg-white dark:bg-black  border-border ';
  return (
    <div className="w-full bg-gray-100 dark:bg-card drop-shadow-black/30 drop-shadow-sm flex items-center justify-start p-5 rounded-2xl gap-4 border-border border mt-4">
      <button
        className={cn(
          'h-8 w-8 rounded-full flex items-center justify-center cursor-pointer',
          completed ? CompletedClass : InCompleteClass,
        )}
        onClick={() => toggleTask({ id, completed })}
      >
        <Check />
      </button>
      <p
        className={cn(
          'text-foreground  min-w-0 wrap-break-word font-semibold text-xl font-[Urbanist]',
          completed && 'line-through',
        )}
      >
        {text}
      </p>
      <div className="flex flex-1 justify-end">
        <Button
          size={'sm'}
          className=" cursor-pointer text-destructive-foreground bg-red-500  hover:bg-red-600 dark:hover:bg-red-800"
          onClick={() => deleteTask(id)}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
