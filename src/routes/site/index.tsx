import { createFileRoute } from "@tanstack/react-router";
import MainLayout from "@/components/Layout/MainLayout";
import DisplayCard from "@/components/ui/display-card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import SectionCard from "@/components/ui/section-card";
import { useState, type ReactNode } from "react";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/site/")({
  component: RouteComponent,
});

type InputBoxProps = {
  addsection: (title: string, description: string) => void;
};

function RouteComponent() {
  const [inputOpen, setInputOpen] = useState<boolean>(false);
  const [sections, setSections] = useState<
    {
      id: string;
      title: string;
      description: string;
      sites: {
        id: string;
        name: string;
        url: string;
        note: string;
      }[];
    }[]
  >([]);
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
  const displaysection: ReactNode[] = sections.map((s) => {
    return (
      <SectionCard key={s.id} title={s.title} description={s.description} />
    );
  });

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
        {/* <DisplayCard /> */}
      </div>
      {displaysection}
    </MainLayout>
  );
}
function InputBox({ addsection }: InputBoxProps) {
  function takeinput(formData: FormData): void {
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    addsection(title, description);
  }
  return (
    <div
      className="bg-card p-5 w-100 h-50 rounded-2xl absolute top-full mt-3 left-0 z-50
"
    >
      <form action={takeinput} className="flex flex-col items-start gap-8">
        <FieldGroup className="grid max-w-sm grid-cols-2">
          <Field>
            <FieldLabel htmlFor="title">Title</FieldLabel>
            <Input
              id="title"
              placeholder="AI slop"
              name="title"
              className="bg-gray-100"
              required
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="description">Description</FieldLabel>
            <Input
              id="description"
              name="description"
              placeholder="all my AI agents..."
              className="bg-gray-100"
            />
          </Field>
        </FieldGroup>
        <Button type="submit" className="cursor-pointer">
          Submit
        </Button>
      </form>
    </div>
  );
}
