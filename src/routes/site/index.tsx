import { createFileRoute } from "@tanstack/react-router";
import MainLayout from "@/components/Layout/MainLayout";
import DisplayCard from "@/components/ui/display-card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import SectionCard from "@/components/ui/section-card";
import { useState, type ReactNode } from "react";
import InputBox from "@/components/ui/input-box";

export const Route = createFileRoute("/site/")({
  component: RouteComponent,
});

type Site = {
  id: string;
  name: string;
  url: string;
  note: string;
};

type Section = {
  id: string;
  title: string;
  description: string;
  sites: Site[];
};

function RouteComponent() {
  const [inputOpen, setInputOpen] = useState<boolean>(false);
  const [sections, setSections] = useState<Section[]>([]);
  function addsection(title: string, description: string) {
    setSections((prevSections) => {
      return [
        ...prevSections,
        {
          id: crypto.randomUUID(),
          title,
          description,
          sites: [],
        },
      ];
    });
    setInputOpen(false);
  }
  function addSite(
    sectionId: string,
    site: { name: string; url: string; note: string },
  ) {
    setSections((prev) =>
      prev.map((section) =>
        section.id === sectionId
          ? {
              ...section,
              sites: [...section.sites, { id: crypto.randomUUID(), ...site }],
            }
          : section,
      ),
    );
  }

  return (
    <MainLayout>
      <div className="relative inline-block">
        <Button
          className="p-4 text-md border-2 cursor-pointer"
          variant="outline"
          onClick={() => setInputOpen((prevInputOpen) => !prevInputOpen)}
        >
          Add Section <Plus />
        </Button>
        {inputOpen && <InputBox addsection={addsection} />}
      </div>

      {sections.map((s) => {
        return <SectionCard key={s.id} section={s} addsite={addSite} />;
      })}
    </MainLayout>
  );
}
