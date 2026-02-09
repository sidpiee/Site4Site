import { createFileRoute } from "@tanstack/react-router";
import MainLayout from "@/components/Layout/MainLayout";
import DisplayCard from "@/components/ui/display-card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import SectionCard from "@/components/ui/section-card";

export const Route = createFileRoute("/site/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <MainLayout>
      <div>
        <Button className="p-4 text-md border-2">
          Add Section <Plus />
        </Button>
        <SectionCard />
        <DisplayCard />
      </div>
    </MainLayout>
  );
}
