import { createFileRoute, redirect } from '@tanstack/react-router';
import MainLayout from '@/components/Layout/MainLayout';
import TaskCard from '../../components/ui/task-card';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { supabase } from '@/lib/supabase';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/components/Context/AuthContext';
import { toast } from 'sonner';

export const Route = createFileRoute('/tasks/')({
  component: RouteComponent,
  beforeLoad: async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      throw redirect({ to: '/signIn' });
    }
  },
});
type Task = {
  id: string;
  text: string;
  completed: boolean;
};
type InputBoxProps = {
  createTask: (t: Task) => void;
};
function RouteComponent() {
  const { session } = useAuth();
  const queryClient = useQueryClient();

  const toggleTaskMutation = useMutation({
    mutationFn: async ({
      id,
      completed,
    }: {
      id: string;
      completed: boolean;
    }) => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/task/toggleTask/${id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.access_token}`,
          },
          body: JSON.stringify({ completed }),
        },
      );
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user-task'],
      });
      toast.success('Status updated');
    },
    onError: () => {
      toast.error('An error occurred');
    },
  });
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/task/deleteTask/${id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        },
      );
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user-task'],
      });
      toast.success('Task deleted');
    },
    onError: () => {
      toast.error('An error occurred');
    },
  });
  const [openInput, setOpenInput] = useState<boolean>(false);
  const mutation = useMutation({
    mutationFn: async (t: Task) => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/task/addTask`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.access_token}`,
          },
          body: JSON.stringify(t),
        },
      );
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user-task'],
      });
      toast.success('Task added successfully');
      setOpenInput(false);
    },

    onError: (error) => {
      toast.error(error.message);
      console.log(error);
      setOpenInput(false);
    },
  });

  const { data: tasks = [], isLoading: loading } = useQuery<Task[]>({
    queryKey: ['user-task'],
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/task/getTask`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        },
      );
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }
      const data = await res.json();
      return data.data;
    },
    enabled: !!session,
  });
  function toggleTask({ id, completed }: { id: string; completed: boolean }) {
    const newCompleted = !completed;
    toggleTaskMutation.mutate({ id, completed: newCompleted });
  }

  function deleteTask(id: string) {
    deleteMutation.mutate(id);
  }
  return (
    <MainLayout>
      <div className="relative">
        <Button
          className="p-4 text-md border-2 cursor-pointer mb-5"
          variant="outline"
          size={'sm'}
          onClick={() => setOpenInput((prevOpenInput) => !prevOpenInput)}
        >
          Add Task <Plus />
        </Button>
        {openInput && <InputBox createTask={mutation.mutate} />}
      </div>

      {tasks.map((t) => {
        return (
          <TaskCard
            key={t.id}
            id={t.id}
            text={t.text}
            completed={t.completed}
            toggleTask={toggleTask}
            deleteTask={deleteTask}
          />
        );
      })}
      {tasks.length === 0 && !loading && (
        <p className="text-foreground mt-10 font-bold text-lg font-[Urbanist]">
          {' '}
          No tasks yet. Add one to get started.
        </p>
      )}
    </MainLayout>
  );
}

function InputBox({ createTask }: InputBoxProps) {
  function HandleSubmit(formData: FormData) {
    const task = formData.get('task') as string;
    if (!task?.trim()) return;
    const newTask = task.replace(/\s+/g, ' ').trim();
    const TasktoAdd = {
      id: crypto.randomUUID(),
      text: newTask,
      completed: false,
    };
    createTask(TasktoAdd);
  }
  return (
    <>
      <div
        className="bg-card p-5 w-100 rounded-2xl absolute top-full mt-3 left-0 z-50
"
      >
        <form action={HandleSubmit} className="flex flex-col items-start gap-5">
          <FieldGroup>
            <Field className="">
              <FieldLabel htmlFor="task">Task</FieldLabel>
              <Input
                id="task"
                placeholder="AI slop"
                name="task"
                className="bg-gray-100"
                required
              />
            </Field>
          </FieldGroup>
          <Button type="submit" className="cursor-pointer">
            Submit
          </Button>
        </form>
      </div>
    </>
  );
}
