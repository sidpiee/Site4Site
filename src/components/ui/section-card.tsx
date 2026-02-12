import { Button } from "@/components/ui/button";
import { ChevronDown, Plus } from "lucide-react";
import { Field, FieldGroup, FieldLabel } from "./field";
import { Input } from "./input";
import { useState } from "react";
import DisplayCard from "./display-card";

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

type SectionCardProps = {
  section: Section;
  addsite: (sectionId: string, site: Omit<Site, "id">) => void;
  removesection: (sectionId: string) => void;
  removesite: (sectionId: string, siteId: string) => void;
};

type InputBoxProps = {
  sectionId: string;
  addSite: (sectionId: string, site: Omit<Site, "id">) => void;
  close: () => void;
  opendropdown: () => void;
};
export default function SectionCard({
  section,
  addsite,
  removesection,
  removesite,
}: SectionCardProps) {
  const [open, setOpen] = useState<boolean>(false);
  const [dropdown, setDropdown] = useState<boolean>(false);
  return (
    <div className="flex flex-col bg-muted/70 dark:bg-muted/20 px-6 py-4 rounded-md mt-4">
      <div className="flex  items-center ">
        <div className="flex flex-col gap-1">
          <h1 className="font-[Urbanist]  font-bold text-3xl text-card-foreground">
            {section.title}
          </h1>
          <p className="font-[Space_Grotesk] text-sm text-muted-foreground">
            {section.description}
          </p>
        </div>

        <div className="flex flex-1 justify-end items-center gap-4 relative">
          <Button
            variant={"destructive"}
            className="dark:border-white/40 border-black/40  border cursor-pointer dark:text-white text-black/70"
            onClick={() => removesection(section.id)}
          >
            Delete
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="cursor-pointer border-2"
            onClick={() => setOpen((prevOpen) => !prevOpen)}
          >
            Add Site
            <Plus className="h-4 w-4" />
          </Button>
          {open && (
            <InputBox
              addSite={addsite}
              sectionId={section.id}
              close={() => setOpen(false)}
              opendropdown={() => setDropdown(true)}
            />
          )}

          <button
            className="flex items-center justify-center rounded-md p-1 hover:bg-muted cursor-pointer"
            onClick={() => setDropdown((prevDropdown) => !prevDropdown)}
          >
            <ChevronDown className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>
      </div>
      <div className="mt-3">
        {dropdown &&
          section.sites.map((site) => (
            <DisplayCard
              key={site.id}
              id={site.id}
              name={site.name}
              url={site.url}
              note={site.note}
              ondelete={() => removesite(section.id, site.id)}
            />
          ))}
      </div>
    </div>
  );
}

function InputBox({ addSite, sectionId, close, opendropdown }: InputBoxProps) {
  function takeinput(formData: FormData): void {
    const url = formData.get("url") as string;
    const name = formData.get("name") as string;
    const note = formData.get("note") as string;
    addSite(sectionId, { name, url, note });
    close();
    opendropdown();
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
              required
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
            <FieldLabel htmlFor="note">Description</FieldLabel>
            <Input
              id="note"
              name="note"
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
