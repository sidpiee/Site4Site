import { Button } from "@/components/ui/button";
import { ChevronDown, Plus } from "lucide-react";
export default function SectionCard() {
  return (
    <div className="flex bg-muted/70 px-6 py-4 items-center rounded-md">
      <div className="flex flex-col gap-1">
        <h1 className="font-[Space_Grotesk] font-bold text-3xl text-card-foreground">
          AI Slop
        </h1>
        <p className="font-[Space_Grotesk] text-sm text-muted-foreground">
          all of the AI i can use
        </p>
      </div>

      <div className="flex flex-1 justify-end items-center gap-2">
        <Button size="sm" variant="secondary">
          <Plus className="h-4 w-4" />
          Add Site
        </Button>

        <button className="flex items-center justify-center rounded-md p-1 hover:bg-muted">
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
        </button>
      </div>
    </div>
  );
}
