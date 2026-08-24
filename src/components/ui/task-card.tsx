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
    <div className="mt-4 flex w-full flex-col items-stretch justify-start gap-4 rounded-2xl border border-border bg-gray-100 p-4 drop-shadow-sm drop-shadow-black/30 dark:bg-card dark:drop-shadow-white/10 sm:flex-row sm:items-center sm:p-5">
      <button
        disabled={isEditing}
        className={cn(
          'flex h-8 w-8 shrink-0 items-center justify-center rounded-full cursor-pointer',
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
          className="w-full min-w-0 sm:mr-10"
        />
      ) : (
        <p
          className={cn(
            'min-w-0 flex-1 wrap-break-word text-lg font-semibold text-foreground font-[Urbanist] sm:text-xl',
            completed && 'line-through',
          )}
        >
          {text}
        </p>
      )}
      {isEditing ? (
        <div className="flex w-full justify-end gap-2 sm:w-auto sm:gap-5">
          <Button
            onClick={updateTask}
            className="flex-1 cursor-pointer sm:flex-none"
            disabled={updateMutation.isPending}
          >
            Save
          </Button>{' '}
          <Button
            className="flex-1 cursor-pointer bg-red-500 text-destructive-foreground hover:bg-red-600 dark:hover:bg-red-800 sm:flex-none"
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
        <div className="flex w-full justify-end gap-2 sm:w-auto sm:gap-5">
          <Button
            className="flex-1 cursor-pointer sm:flex-none"
            onClick={() => {
              setDraftText(text);
              setIsEditing(true);
            }}
          >
            Edit
          </Button>
          <Button
            size={'sm'}
            className="flex-1 cursor-pointer bg-red-500 text-destructive-foreground hover:bg-red-600 dark:hover:bg-red-800 sm:flex-none"
            onClick={() => deleteTask(id)}
          >
            Delete
          </Button>
        </div>
      )}
    </div>
  );
}
