import { useState } from 'react';
import { Button } from './button';
import { Input } from './input';
import { toast } from 'sonner';

type SiteUpdate = {
  _id: string;
  name: string;
  url: string;
  note: string;
};

type DisplayCardProps = {
  id: string;
  name: string;
  url: string;
  note: string;
  ondelete: () => void;
  updateSite: (newSite: SiteUpdate) => void;
};
export default function DisplayCard({
  id,
  name,
  url,
  note,
  ondelete,
  updateSite,
}: DisplayCardProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [draftName, setDraftName] = useState(name);
  const [draftUrl, setDraftUrl] = useState(url);
  const [draftNote, setDraftNote] = useState(note);
  function saveSite() {
    const updatedName = draftName.replace(/\s+/g, ' ').trim();
    const updatedUrl = draftUrl.replace(/\s+/g, ' ').trim();
    const updatedNote = draftNote.replace(/\s+/g, ' ').trim();
    if (!updatedName || !updatedUrl) {
      toast.error('Name or url  cannot be empty');
      return;
    }
    if (updatedName === name && updatedUrl === url && updatedNote === note) {
      setDraftName(name);
      setDraftNote(note);
      setDraftUrl(url);
      setIsEditing(false);
      return;
    }
    const newSite = {
      _id: id,
      name: updatedName,
      url: updatedUrl,
      note: updatedNote,
    };
    updateSite(newSite);
    setIsEditing(false);
  }
  return (
    <div className="mt-3 flex min-h-22 w-full flex-col items-start justify-start gap-4 rounded-lg border-4 border-border bg-card px-4 py-4 sm:flex-row sm:items-center sm:px-6">
      <div className="shrink-0 bg-background/80 rounded-md p-2">
        <img
          src={`https://www.google.com/s2/favicons?domain=${url}&sz=32`}
          alt="logo"
          className="h-8 w-8"
        />
      </div>
      {isEditing ? (
        <div className="flex min-w-0 flex-1 flex-col gap-2">
          <Input
            value={draftName}
            onChange={(e) => setDraftName(e.target.value)}
            autoFocus
            placeholder="Site name"
          />
          <Input
            value={draftUrl}
            onChange={(e) => setDraftUrl(e.target.value)}
            placeholder="https://example.com"
          />
          <Input
            value={draftNote}
            onChange={(e) => setDraftNote(e.target.value)}
            placeholder="Description"
          />
        </div>
      ) : (
        <div className="flex min-w-0 flex-1 flex-col">
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="min-w-0 max-w-full"
          >
            <h1 className="break-words font-[Urbanist] text-2xl font-semibold leading-tight tracking-wide text-card-foreground [overflow-wrap:anywhere] sm:text-3xl">
              {name}
            </h1>
          </a>
          <p className="font-[Fredoka] font-medium text-muted-foreground break-words [overflow-wrap:anywhere]">
            {note}
          </p>
        </div>
      )}
      {isEditing ? (
        <div className="flex w-full shrink-0 justify-end gap-2 sm:w-auto sm:gap-5">
          <Button onClick={saveSite} className="cursor-pointer">
            Save
          </Button>{' '}
          <Button
            className=" cursor-pointer text-destructive-foreground bg-red-500  hover:bg-red-600 dark:hover:bg-red-800"
            onClick={() => {
              setIsEditing(false);
              setDraftName(name);
              setDraftUrl(url);
              setDraftNote(note);
            }}
            size={'sm'}
          >
            Cancel
          </Button>
        </div>
      ) : (
        <div className="flex w-full shrink-0 justify-end gap-2 sm:w-auto sm:gap-5">
          <Button
            onClick={() => {
              setIsEditing(true);
              setDraftName(name);
              setDraftUrl(url);
              setDraftNote(note);
            }}
          >
            Edit
          </Button>
          <Button
            variant={'destructive'}
            className="dark:border-white/40 border-black/40  border cursor-pointer  text-destructive-foreground dark:bg-red-500 bg-red-500  hover:bg-red-600 dark:hover:bg-red-800"
            onClick={ondelete}
          >
            Delete
          </Button>
        </div>
      )}
    </div>
  );
}
