import { Button } from './button';

type DisplayCardProps = {
  id: string;
  name: string;
  url: string;
  note: string;
  ondelete: () => void;
};
export default function DisplayCard({
  name,
  url,
  note,
  ondelete,
}: DisplayCardProps) {
  return (
    <div className="bg-card min-h-22 w-full px-6 py-4 rounded-l-lg mt-3 flex flex-col items-start justify-start gap-4 border-border border-4 sm:flex-row sm:items-center">
      <div className="shrink-0 bg-background/80 rounded-md p-2">
        <img
          src={`https://www.google.com/s2/favicons?domain=${url}&sz=32`}
          alt="logo"
          className="h-8 w-8"
        />
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="min-w-0 max-w-full"
        >
          <h1 className="font-[Urbanist] font-semibold text-card-foreground text-3xl leading-tight tracking-wide break-words [overflow-wrap:anywhere]">
            {name}
          </h1>
        </a>
        <p className="font-[Fredoka] font-medium text-muted-foreground break-words [overflow-wrap:anywhere]">
          {note}
        </p>
      </div>
      <div className="flex w-full shrink-0 justify-end sm:w-auto">
        <Button
          variant={'destructive'}
          className="dark:border-white/40 border-black/40  border cursor-pointer  text-destructive-foreground dark:bg-red-500 bg-red-500  hover:bg-red-600 dark:hover:bg-red-800"
          onClick={ondelete}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}
