import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from './textarea';
import { ScrollArea } from './scroll-area';
import { useState } from 'react';
import { cn } from '@/lib/utils';
import type { Anime, AnimeListItem, SavedAnime } from '../Types/anime';
import { toast } from 'sonner';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../Context/AuthContext';
type AnimePopOverProps = {
  selectedAnime: Anime | SavedAnime;
  setSelectedAnime: (anime: Anime | SavedAnime | null) => void;
};
export default function AnimePopOver({
  selectedAnime,
  setSelectedAnime,
}: AnimePopOverProps) {
  const queryClient = useQueryClient();
  const { session } = useAuth();
  const isSavedAnime = 'episodesWatched' in selectedAnime;
  const imageSrc =
    'image' in selectedAnime
      ? selectedAnime.image
      : selectedAnime.images.jpg.large_image_url;
  const initialStatus = isSavedAnime ? selectedAnime.status : 'Watching';
  const initialNote = isSavedAnime ? selectedAnime.notes : '';
  const initialEpWatched = isSavedAnime ? selectedAnime.episodesWatched : 0;
  const initialRating = isSavedAnime ? selectedAnime.rating : null;
  const [status, setStatus] = useState<
    'Plan to watch' | 'Watching' | 'Completed'
  >(initialStatus);
  const [note, setNote] = useState<string>(initialNote);
  const [epWatched, setEpWatched] = useState<number>(initialEpWatched);
  const [rating, setRating] = useState<number | null>(initialRating);
  const mutation = useMutation({
    mutationFn: async (anime: AnimeListItem) => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/anime/addAnime`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.access_token}`,
          },
          body: JSON.stringify(anime),
        },
      );

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }

      return res.json();
    },

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user-anime'],
      });
      setSelectedAnime(null);
      toast.success('Anime added successfully');
    },

    onError: () => {
      toast.error('Anime already added');
      setSelectedAnime(null);
    },
  });
  const updateMutation = useMutation({
    mutationFn: async (anime: {
      status: 'Plan to watch' | 'Watching' | 'Completed';
      episodesWatched: number;
      rating: number | null;
      notes: string;
      id: number;
    }) => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/anime/updateAnime/${anime.id}`,
        {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.access_token}`,
          },
          body: JSON.stringify(anime),
        },
      );
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user-anime'],
      });
      setSelectedAnime(null);
      toast.success('Anime updated successfully');
    },

    onError: () => {
      toast.error('Cannot update anime');
      setSelectedAnime(null);
    },
  });
  const deleteMutation = useMutation({
    mutationFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/anime/deleteAnime/${selectedAnime.mal_id}`,
        {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        },
      );
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['user-anime'],
      });
      setSelectedAnime(null);
      toast.success('Anime delete successfully');
    },

    onError: () => {
      toast.error('Cannot delete anime');
      setSelectedAnime(null);
    },
  });
  function saveDetails() {
    if (isSavedAnime) return;

    const animeToAdd: AnimeListItem = {
      mal_id: selectedAnime.mal_id,
      title: selectedAnime.title,
      title_english: selectedAnime.title_english,
      images: selectedAnime.images,
      episodes: selectedAnime.episodes,
      genres: selectedAnime.genres,
      status: status,
      rating: rating,
      episodesWatched: epWatched,
      notes: note || 'No notes added',
    };
    mutation.mutate(animeToAdd);
  }
  function UpdateDetails() {
    const anime = {
      id: selectedAnime.mal_id,
      status,
      rating,
      episodesWatched: epWatched,
      notes: note,
    };
    updateMutation.mutate(anime);
  }
  function deleteAnime() {
    deleteMutation.mutate();
  }
  return (
    <div className="h-120 w-full flex justify-start items-start">
      <img
        src={imageSrc}
        alt={selectedAnime.title_english || selectedAnime.title}
        className="h-full w-2/5 object-cover"
      />

      <div className=" flex flex-col gap-8 justify-start items-start px-3 py-6">
        <h1 className="font-[Urbanist] font-bold text-md ">
          {selectedAnime.title_english || selectedAnime.title}
        </h1>
        <div className="flex gap-2">
          <button
            className={cn(
              'dark:bg-indigo-600 bg-indigo-300 cursor-pointer  border border-black/40 dark:border-white  px-2 py-1 text-sm rounded-full backdrop-blur-2xl shadow-md font-[Urbanist] font-semibold',
              status === 'Watching'
                ? 'dark:shadow-[inset_0_2px_4px_rgba(0,0,0,0.9)] shadow-[inset_0_2px_4px_rgba(255,255,255,0.7)] scale-110'
                : 'opacity-60',
            )}
            onClick={() => setStatus('Watching')}
          >
            Watching
          </button>
          <button
            className={cn(
              'dark:bg-blue-600 bg-blue-300 cursor-pointer px-2 py-1 border border-black/40 dark:border-white  text-sm rounded-full backdrop-blur-2xl shadow-md font-[Urbanist] font-semibold',
              status === 'Plan to watch'
                ? 'shadow-[inset_0_2px_4px_rgba(255,255,255,0.7)] dark:shadow-[inset_0_2px_4px_rgba(0,0,0,0.9)] scale-110'
                : 'opacity-60',
            )}
            onClick={() => setStatus('Plan to watch')}
          >
            Plan to Watch
          </button>
          <button
            className={cn(
              'dark:bg-emerald-600 bg-emerald-300 px-2 cursor-pointer border border-black/40 dark:border-white py-1 text-sm rounded-full backdrop-blur-2xl shadow-md font-[Urbanist] font-semibold',
              status === 'Completed'
                ? ' shadow-[inset_0_2px_4px_rgba(255,255,255,0.7)] dark:shadow-[inset_0_2px_4px_rgba(0,0,0,0.9)] scale-110'
                : 'opacity-60',
            )}
            onClick={() => setStatus('Completed')}
          >
            Completed
          </button>
        </div>
        <p className="flex font-medium items-center text-sm gap-2 font-[Urbanist]">
          Episodes Watched{' '}
          <EpWatched
            totalEpisodes={selectedAnime.episodes || 0}
            value={epWatched}
            setEpWatched={setEpWatched}
          />{' '}
          <span className="font-semibold text-lg">
            /{selectedAnime.episodes || 0}
          </span>
        </p>
        <div className="flex items-center gap-3">
          <p className="font-[Urbanist] font-medium text-md">Your rating</p>
          <RatingSection value={rating} setRating={setRating} />
        </div>
        <Textarea
          value={note}
          placeholder="only got 50 words! make em count..."
          maxLength={50}
          className="bg-gray-200/80 placeholder:text-black/50 dark:placeholder:text-white/50"
          onChange={(e) => setNote(e.target.value)}
        />
        {isSavedAnime ? (
          <div className="flex gap-15">
            <Button
              className="self-center cursor-pointer "
              onClick={UpdateDetails}
            >
              Update Changes
            </Button>
            <Button
              className="cursor-pointer bg-red-600 hover:bg-red-700"
              onClick={deleteAnime}
            >
              Delete
            </Button>
          </div>
        ) : (
          <Button className="self-center cursor-pointer" onClick={saveDetails}>
            Save Changes
          </Button>
        )}
      </div>
    </div>
  );
}

function EpWatched({
  totalEpisodes,
  value,
  setEpWatched,
}: {
  totalEpisodes: number;
  value: number;
  setEpWatched: (val: number) => void;
}) {
  return (
    <Select
      value={String(value)}
      onValueChange={(val) => setEpWatched(Number(val))}
    >
      <SelectTrigger className="w-18 bg-gray-200/80">
        <SelectValue placeholder="0" />
      </SelectTrigger>
      <SelectContent className="cursor-pointer">
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

function RatingSection({
  value,
  setRating,
}: {
  value: number | null;
  setRating: (val: number | null) => void;
}) {
  return (
    <>
      <Select
        value={value === null ? '0' : String(value)}
        onValueChange={(val) => setRating(val === '0' ? null : Number(val))}
      >
        <SelectTrigger className="w-full  max-w-48 bg-gray-200/80">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="cursor-pointer">
          <SelectGroup>
            <SelectLabel className="text-xs">Rating</SelectLabel>
            <SelectItem value="1">⭐</SelectItem>
            <SelectItem value="2">⭐⭐</SelectItem>
            <SelectItem value="3">⭐⭐⭐</SelectItem>
            <SelectItem value="4">⭐⭐⭐⭐</SelectItem>
            <SelectItem value="5">⭐⭐⭐⭐⭐</SelectItem>
            <SelectItem value="0" className="font-semibold">
              Haven't watched yet
            </SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  );
}
