import { createFileRoute } from "@tanstack/react-router";
import MainLayout from "@/components/Layout/MainLayout";
import DisplayCard from "@/components/ui/display-card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import SectionCard from "@/components/ui/section-card";
import { useState } from "react";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

export const Route = createFileRoute("/site/")({
  component: RouteComponent,
});

function RouteComponent() {
  const [inputOpen, setInputOpen] = useState<boolean>(false);

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
        {inputOpen && <InputBox />}
        {/* <SectionCard />
        <DisplayCard /> */}
      </div>
    </MainLayout>
  );
}
function InputBox() {
  function takeinput(formData: FormData): void {
    const title = formData.get("title");
    const description = formData.get("description");
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
