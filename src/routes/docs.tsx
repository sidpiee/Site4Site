import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/Layout/Header";

export const Route = createFileRoute("/docs")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Header />
    </>
  );
}
