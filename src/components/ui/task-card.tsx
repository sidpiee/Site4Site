import { Check } from 'lucide-react';
import { Button } from './button';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Input } from './input';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../Context/AuthContext';
import { toast } from 'sonner';

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
  const { session } = useAuth();
  const queryClient = useQueryClient();
  const CompletedClass = 'bg-primary text-primary-foreground border-primary';
  const InCompleteClass = 'bg-white dark:bg-black  border-border ';
  const [isEditing, setIsEditing] = useState(false);
  const [draftText, setDraftText] = useState(text);
  const updateMutation = useMutation({
    mutationFn: async (text: string) => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/task/updateTask/${id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.access_token}`,
          },
          body: JSON.stringify({ text }),
        },
      );
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }
      return res.json();
    },
    onSuccess: (_data, updatedText) => {
      queryClient.invalidateQueries({
        queryKey: ['user-task'],
      });
      toast.success('Text updated');
      setIsEditing(false);
      setDraftText(updatedText);
    },
    onError: (error) => {
      toast.error(error.message);
      setIsEditing(false);
      setDraftText(text);
    },
  });
  function updateTask() {
    const updatedText = draftText.replace(/\s+/g, ' ').trim();
    if (!updatedText) {
      toast.error('Task cannot be empty');
      return;
    }
    if (updatedText === text) {
      setDraftText(text);
      setIsEditing(false);
      return;
    }
    updateMutation.mutate(updatedText);
  }
  return (
    <div className="w-full bg-gray-100 dark:bg-card dark:drop-shadow-white/10 drop-shadow-black/30 drop-shadow-sm flex items-center justify-start p-5 rounded-2xl gap-4 border-border border mt-4">
      <button
        disabled={isEditing}
        className={cn(
          'h-8 w-8 rounded-full flex items-center justify-center cursor-pointer',
          completed ? CompletedClass : InCompleteClass,
          isEditing ? 'disabled:bg-slate-700' : '',
        )}
        onClick={() => toggleTask({ id, completed })}
      >
        <Check />
      </button>
      {isEditing ? (
        <Input
          value={draftText}
          onChange={(e) => setDraftText(e.target.value)}
          autoFocus
          className="mr-10"
        />
      ) : (
        <p
          className={cn(
            'text-foreground  min-w-0 wrap-break-word font-semibold text-xl font-[Urbanist]',
            completed && 'line-through',
          )}
        >
          {text}
        </p>
      )}
      {isEditing ? (
        <div className="flex flex-1 justify-end gap-5">
          <Button
            onClick={updateTask}
            className="cursor-pointer"
            disabled={updateMutation.isPending}
          >
            Save
          </Button>{' '}
          <Button
            className=" cursor-pointer text-destructive-foreground bg-red-500  hover:bg-red-600 dark:hover:bg-red-800"
            onClick={() => {
              setIsEditing(false);
              setDraftText(text);
            }}
            size={'sm'}
          >
            Cancel
          </Button>
        </div>
      ) : (
        <div className="flex flex-1 justify-end gap-5">
          <Button
            className="cursor-pointer"
            onClick={() => {
              setDraftText(text);
              setIsEditing(true);
            }}
          >
            Edit
          </Button>
          <Button
            size={'sm'}
            className=" cursor-pointer text-destructive-foreground bg-red-500  hover:bg-red-600 dark:hover:bg-red-800"
            onClick={() => deleteTask(id)}
          >
            Delete
          </Button>
        </div>
      )}
    </div>
  );
}
