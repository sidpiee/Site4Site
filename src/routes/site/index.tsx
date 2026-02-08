import { createFileRoute } from "@tanstack/react-router";
import MainLayout from "@/components/Layout/MainLayout";
import DisplayCard from "@/components/ui/display-card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

export const Route = createFileRoute("/site/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <MainLayout>
      <div>
        {/* <Button className="p-4 text-md border-2">
          Add Section <Plus />
        </Button> */}
        <SectionCard />
        <DisplayCard />
      </div>
    </MainLayout>
  );
}
function SectionCard() {
  return (
    <>
      <div className="flex flex-col bg-sidebar">
        <h1 className=" font-[Space_Grotesk] font-bold text-3xl text-sidebar-foreground">
          AI Slop
        </h1>
        <h1 className=" font-[Space_Grotesk] font-bold text-sm text-muted-foreground">
          all of the AI i can use
        </h1>
      </div>
    </>
  );
}
