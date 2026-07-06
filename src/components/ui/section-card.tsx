import { Button } from '@/components/ui/button';
import { ChevronDown, Plus } from 'lucide-react';
import { Field, FieldGroup, FieldLabel } from './field';
import { Input } from './input';
import { useState } from 'react';
import DisplayCard from './display-card';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../Context/AuthContext';
import { toast } from 'sonner';

type Site = {
  _id: string;
  name: string;
  url: string;
  note: string;
};

type Section = {
  _id: string;
  title: string;
  description: string;
  sites: Site[];
};

type SectionCardProps = {
  section: Section;
  addsite: (sectionId: string, site: Omit<Site, '_id'>) => void;
  removesection: (sectionId: string) => void;
  removesite: (sectionId: string, siteId: string) => void;
};

type InputBoxProps = {
  sectionId: string;
  addSite: (sectionId: string, site: Omit<Site, '_id'>) => void;
  close: () => void;
  opendropdown: () => void;
};
export default function SectionCard({
  section,
  addsite,
  removesection,
  removesite,
}: SectionCardProps) {
  const { session } = useAuth();
  const queryClient = useQueryClient();
  const [open, setOpen] = useState<boolean>(false);
  const [dropdown, setDropdown] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState(section.title);
  const [draftDes, setDraftDes] = useState(section.description);
  const updateMutation = useMutation({
    mutationFn: async (updatedSection: {
      title: string;
      description: string;
    }) => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/section/${section._id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.access_token}`,
          },
          body: JSON.stringify(updatedSection),
        },
      );
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }
      return res.json();
    },
    onSuccess: (_data, updatedSection) => {
      queryClient.invalidateQueries({
        queryKey: ['user-section'],
      });
      toast.success('Section updated');
      setIsEditing(false);
      setDraftTitle(updatedSection.title);
      setDraftDes(updatedSection.description);
    },
    onError: (error) => {
      toast.error(error.message);
      setIsEditing(false);
      setDraftTitle(section.title);
      setDraftDes(section.description);
    },
  });
  function updateSection() {
    const updatedTitle = draftTitle.replace(/\s+/g, ' ').trim();
    const updatedDes = draftDes.replace(/\s+/g, ' ').trim();
    if (!updatedTitle) {
      toast.error('Title cannot be empty');
      return;
    }
    if (updatedTitle === section.title && updatedDes === section.description) {
      setDraftTitle(section.title);
      setDraftDes(section.description);
      setIsEditing(false);
      return;
    }
    updateMutation.mutate({ title: updatedTitle, description: updatedDes });
  }
  return (
    <div className="flex flex-col bg-muted/70 dark:bg-muted/20 px-6 py-4 rounded-md mt-4 border dark:border-white/30 border-black/50 drop-shadow-xl">
      <div className="flex flex-col gap-4 md:flex-row md:items-start">
        {isEditing ? (
          <div className="flex min-w-0 flex-1 flex-col gap-5">
            <div className="flex items-center">
              <span className="font-[Urbanist] font-semibold">Title</span>
              <Input
                value={draftTitle}
                onChange={(e) => setDraftTitle(e.target.value)}
                autoFocus
                className="mx-10"
              />
            </div>
            <div className="flex items-center">
              <span className="font-[Urbanist] font-semibold">Description</span>
              <Input
                value={draftDes}
                onChange={(e) => setDraftDes(e.target.value)}
                className="mx-10"
              />
            </div>
          </div>
        ) : (
          <div className="flex min-w-0 flex-1 flex-col gap-1">
            <h1 className="font-[Urbanist] font-bold text-3xl leading-tight text-card-foreground wrap-break-words [overflow-wrap:anywhere]">
              {section.title}
            </h1>
            <p className="font-[Space_Grotesk] text-sm text-muted-foreground wrap-break-words [overflow-wrap:anywhere]">
              {section.description}
            </p>
          </div>
        )}

        {isEditing ? (
          <div className="relative flex shrink-0 flex-wrap items-center justify-start gap-3 md:justify-end">
            <Button className="cursor-pointer" onClick={updateSection}>
              Save
            </Button>
            <Button
              className="dark:border-white/40 border-black/40  border cursor-pointer  text-destructive-foreground bg-red-500  hover:bg-red-600 dark:hover:bg-red-800"
              onClick={() => {
                setIsEditing(false);
                setDraftDes(section.description);
                setDraftTitle(section.title);
              }}
            >
              Cancel
            </Button>
          </div>
        ) : (
          <div className="relative flex shrink-0 flex-wrap items-center justify-start gap-3 md:justify-end">
            <Button
              className="cursor-pointer"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </Button>
            <Button
              className="dark:border-white/40 border-black/40  border cursor-pointer  text-destructive-foreground bg-red-500  hover:bg-red-600 dark:hover:bg-red-800"
              onClick={() => removesection(section._id)}
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
                sectionId={section._id}
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
        )}
      </div>
      <div className="mt-3">
        {dropdown &&
          section.sites.map((site) => (
            <DisplayCard
              key={site._id}
              id={site._id}
              name={site.name}
              url={site.url}
              note={site.note}
              ondelete={() => removesite(section._id, site._id)}
            />
          ))}
      </div>
    </div>
  );
}

function InputBox({ addSite, sectionId, close, opendropdown }: InputBoxProps) {
  function takeinput(formData: FormData): void {
    const url = formData.get('url') as string;
    const name = formData.get('name') as string;
    const note = formData.get('note') as string;
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
