import { createFileRoute } from "@tanstack/react-router";
import MainLayout from "@/components/Layout/MainLayout";
import TaskCard from "../../components/ui/task-card";
import { useState } from "react";

export const Route = createFileRoute("/tasks/")({
  component: RouteComponent,
});
type task = {
  id: string;
  text: string;
  completed: boolean;
};
function RouteComponent() {
  const [tasks, setTasks] = useState<task[]>([]);
  return (
    <MainLayout>
      {tasks.map((t) => {
        return (
          <TaskCard
            key={t.id}
            id={t.id}
            text={t.text}
            completed={t.completed}
          />
        );
      })}
    </MainLayout>
  );
}
