import { createFileRoute, redirect } from '@tanstack/react-router';
import MainLayout from '@/components/Layout/MainLayout';
import TaskCard from '../../components/ui/task-card';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { supabase } from '@/lib/supabase';

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
  addTask: (text: string) => void;
};
function RouteComponent() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [openInput, setOpenInput] = useState<boolean>(false);

  function addTask(text: string) {
    setTasks((prevTasks) => {
      return [
        ...prevTasks,
        {
          id: crypto.randomUUID(),
          text: text,
          completed: false,
        },
      ];
    });
    setOpenInput(false);
  }
  function toggleTask(taskID: string) {
    setTasks((prevTasks) => {
      return prevTasks.map((t) =>
        t.id === taskID ? { ...t, completed: !t.completed } : t,
      );
    });
  }

  function deleteTask(taskID: string) {
    setTasks((prevTasks) => prevTasks.filter((t) => t.id !== taskID));
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
        {openInput && <InputBox addTask={addTask} />}
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
      {tasks.length === 0 && (
        <p className="text-foreground mt-10 font-bold text-lg font-[Urbanist]">
          {' '}
          No tasks yet. Add one to get started.
        </p>
      )}
    </MainLayout>
  );
}

function InputBox({ addTask }: InputBoxProps) {
  function HandleSubmit(formData: FormData) {
    const task = formData.get('task') as string;
    if (!task?.trim()) return;

    addTask(task);
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
