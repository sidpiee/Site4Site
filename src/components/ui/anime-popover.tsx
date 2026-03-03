import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "./textarea";
import { ScrollArea } from "./scroll-area";
type AnimePopOverProps = {
  imgSrc: string;
  name: string;
  totalEp: number;
};
export default function AnimePopOver({
  imgSrc,
  name,
  totalEp,
}: AnimePopOverProps) {
  return (
    <div className="h-120 w-full flex justify-start items-start">
      <img src={imgSrc} alt={name} className="h-full w-2/5 object-cover" />

      <div className=" flex flex-col gap-8 justify-start items-start px-3 py-6">
        <h1 className="font-[Urbanist] font-bold text-md ">{name}</h1>
        <div className="flex gap-2">
          <button className="dark:bg-indigo-600 bg-indigo-300 cursor-pointer  border border-black/40 dark:border-white  px-2 py-1 text-sm rounded-full backdrop-blur-2xl shadow-md font-[Urbanist] font-semibold">
            Watching
          </button>
          <button className="dark:bg-blue-600 bg-blue-300 cursor-pointer px-2 py-1 border border-black/40 dark:border-white  text-sm rounded-full backdrop-blur-2xl shadow-md font-[Urbanist] font-semibold">
            Plan to Watch
          </button>
          <button className="dark:bg-emerald-600 bg-emerald-300 px-2 cursor-pointer border border-black/40 dark:border-white py-1 text-sm rounded-full backdrop-blur-2xl shadow-md font-[Urbanist] font-semibold">
            Completed
          </button>
        </div>
        <p className="flex font-medium items-center text-sm gap-2">
          Episodes Watched <EpWatched totalEpisodes={totalEp} />{" "}
          <span className="font-semibold text-lg">/{totalEp}</span>
        </p>
        <RatingSection />
        <Textarea
          placeholder="my comfort anime..."
          className="bg-gray-200/80 placeholder:text-black/50 dark:placeholder:text-white/50"
        />
        <Button className="self-center cursor-pointer">Save Changes</Button>
      </div>
    </div>
  );
}

function EpWatched({ totalEpisodes }: { totalEpisodes: number }) {
  return (
    <Select>
      <SelectTrigger className="w-18 bg-gray-200/80">
        <SelectValue placeholder="0" />
      </SelectTrigger>
      <SelectContent>
        <ScrollArea className="h-60">
          <SelectGroup>
            {Array.from({ length: totalEpisodes + 1 }, (_, i) => (
              <SelectItem key={i} value={String(i)}>
                {i}
              </SelectItem>
            ))}
          </SelectGroup>
        </ScrollArea>
      </SelectContent>
    </Select>
  );
}

function RatingSection() {
  return (
    <>
      <Select defaultValue="one">
        <SelectTrigger className="w-full  max-w-48 bg-gray-200/80">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel className="text-xs">Rating</SelectLabel>
            <SelectItem value="one">⭐</SelectItem>
            <SelectItem value="two">⭐⭐</SelectItem>
            <SelectItem value="three">⭐⭐⭐</SelectItem>
            <SelectItem value="four">⭐⭐⭐⭐</SelectItem>
            <SelectItem value="five">⭐⭐⭐⭐⭐</SelectItem>
            <SelectItem value="zero" className="font-semibold">
              Haven't watched yet
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}
