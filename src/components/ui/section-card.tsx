import { Button } from "@/components/ui/button";
import { ChevronDown, Plus } from "lucide-react";

type SectionCardProps = {
  title: string;
  description: string;
};
export default function SectionCard({ title, description }: SectionCardProps) {
  return (
    <div className="flex bg-muted/70 dark:bg-muted/20 px-6 py-4 items-center rounded-md mt-4">
      <div className="flex flex-col gap-1">
        <h1 className="font-[Space_Grotesk] font-bold text-3xl text-card-foreground">
          {title}
        </h1>
        <p className="font-[Space_Grotesk] text-sm text-muted-foreground">
          {description}
        </p>
      </div>

      <div className="flex flex-1 justify-end items-center gap-2">
        <Button size="sm" variant="secondary" className="cursor-pointer">
          <Plus className="h-4 w-4" />
          Add Site
        </Button>

        <button className="flex items-center justify-center rounded-md p-1 hover:bg-muted cursor-pointer">
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
        </button>
      </div>
    </div>
  );
}
