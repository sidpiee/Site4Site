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
    <div className="bg-card h-22 w-full px-6 rounded-l-lg mt-3 flex items-center justify-start gap-7 border-border border-4">
      <div className="bg-background/80 rounded-md p-2">
        <img
          src={`https://www.google.com/s2/favicons?domain=${url}&sz=32`}
          alt="logo"
          className=" h-8 w-8"
        />
      </div>
      <div className="flex flex-col">
        <a href={url} target="_blank" rel="noopener noreferrer">
          <h1 className="font-[Urbanist] font-semibold text-card-foreground text-3xl tracking-wide">
            {name}
          </h1>
        </a>
        <h1 className="font-[Fredoka] font-medium text-muted-foreground">
          {note}
        </h1>
      </div>
      <div className="flex flex-1 justify-end">
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
