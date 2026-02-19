import MainLayout from "@/components/Layout/MainLayout";

import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/games/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <MainLayout>
      <div>hello</div>
    </MainLayout>
  );
}
