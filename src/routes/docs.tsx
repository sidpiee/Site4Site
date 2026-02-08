import { createFileRoute } from "@tanstack/react-router";

import MainLayout from "@/components/Layout/MainLayout";

export const Route = createFileRoute("/docs")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <MainLayout>
        <h1>hello</h1>
      </MainLayout>
    </>
  );
}
