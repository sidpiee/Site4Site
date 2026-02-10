import { Button } from "@/components/ui/button";
import { ChevronDown, Plus } from "lucide-react";
import { Field, FieldGroup, FieldLabel } from "./field";
import { Input } from "./input";
import { useState } from "react";

type SectionCardProps = {
  title: string;
  description: string;
};
export default function SectionCard({ title, description }: SectionCardProps) {
  const [open, setOpen] = useState<boolean>(false);
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

      <div className="flex flex-1 justify-end items-center gap-2 relative">
        <Button
          size="sm"
          variant="outline"
          className="cursor-pointer"
          onClick={() => setOpen((prevOpen) => !prevOpen)}
        >
          <Plus className="h-4 w-4" />
          Add Site
        </Button>
        {open && <InputBox />}

        <button className="flex items-center justify-center rounded-md p-1 hover:bg-muted cursor-pointer">
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
        </button>
      </div>
    </div>
  );
}

function InputBox() {
  function takeinput(formData: FormData): void {
    const url = formData.get("url") as string;
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
  }
  return (
    <div
      className="bg-card p-5 w-100 h-fit rounded-2xl absolute top-full mt-3 right-0 z-50
"
    >
      <form action={takeinput} className="flex flex-col items-start gap-4">
        <FieldGroup className="flex flex-col justify-center gap-3">
          <Field>
            <FieldLabel htmlFor="name">Name</FieldLabel>
            <Input
              id="name"
              name="name"
              placeholder="youtube"
              className="bg-gray-100"
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="url">URL</FieldLabel>
            <Input
              id="url"
              placeholder="https://youtube.com"
              name="url"
              className="bg-gray-100"
              required
            />
          </Field>
          <Field>
            <FieldLabel htmlFor="description">Description</FieldLabel>
            <Input
              id="description"
              name="description"
              placeholder="love to watch videos hehehe"
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
