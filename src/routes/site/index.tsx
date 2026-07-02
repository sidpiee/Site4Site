import { createFileRoute, redirect } from '@tanstack/react-router';
import MainLayout from '@/components/Layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import SectionCard from '@/components/ui/section-card';
import { useState } from 'react';
import InputBox from '@/components/ui/input-box';
import { supabase } from '@/lib/supabase';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useAuth } from '@/components/Context/AuthContext';
import { toast } from 'sonner';

export const Route = createFileRoute('/site/')({
  beforeLoad: async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      throw redirect({ to: '/signIn' });
    }
  },
  component: RouteComponent,
});

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

function RouteComponent() {
  const queryClient = useQueryClient();
  const { session } = useAuth();
  const addSectionMutation = useMutation({
    mutationFn: async (section: { title: string; description: string }) => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/section`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${session?.access_token}`,
          },
          body: JSON.stringify(section),
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
        queryKey: ['user-section'],
      });
      setInputOpen(false);
      toast.success('Section added successfully');
    },

    onError: (error) => {
      toast.error(error.message);
      setInputOpen(false);
    },
  });
  const deleteSectionMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/section/${id}`,
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
        queryKey: ['user-section'],
      });
      toast.success('Section deleted');
    },
    onError: () => {
      toast.error('An error occurred');
    },
  });
  const [inputOpen, setInputOpen] = useState<boolean>(false);
  // const [sections, setSections] = useState<Section[]>([]);
  function addsection(title: string, description: string) {
    const newSection = {
      title,
      description,
    };
    addSectionMutation.mutate(newSection);
  }
  function addSite(
    sectionId: string,
    site: { name: string; url: string; note: string },
  ) {}
  function removesection(sectionId: string) {
    deleteSectionMutation.mutate(sectionId);
  }
  function removeSite(sectionId: string, siteId: string) {}
  const { data: sections = [] } = useQuery({
    queryKey: ['user-section'],
    queryFn: async () => {
      const res = await fetch(
        `${import.meta.env.VITE_API_URL}/api/v1/section`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${session?.access_token}`,
          },
        },
      );
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message);
      }
      const data = await res.json();
      return data.data;
    },
    enabled: !!session,
  });
  console.log(sections);
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
      </div>

      {sections.map((s) => {
        return (
          <SectionCard
            key={s.id}
            section={s}
            addsite={addSite}
            removesection={removesection}
            removesite={removeSite}
          />
        );
      })}
      {sections.length === 0 && (
        <p className="text-foreground mt-10 font-bold text-lg font-[Urbanist]">
          {' '}
          No sections added yet. Add one to get started.
        </p>
      )}
    </MainLayout>
  );
}
