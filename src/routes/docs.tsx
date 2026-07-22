import { createFileRoute, Link } from '@tanstack/react-router';
import {
  ArrowRight,
  BookmarkPlus,
  CheckSquare,
  Clapperboard,
  Gamepad2,
  Globe2,
  Sparkles,
  type LucideIcon,
} from 'lucide-react';

import MainLayout from '@/components/Layout/MainLayout';
import { Button } from '@/components/ui/button';

export const Route = createFileRoute('/docs')({
  component: RouteComponent,
});

type ProductRoute = '/site' | '/tasks' | '/anime' | '/movies' | '/games';

type Feature = {
  title: string;
  description: string;
  action: string;
  to: ProductRoute;
  icon: LucideIcon;
  accent: string;
};

const features: Feature[] = [
  {
    title: 'Site4Site',
    description:
      'Group useful links into sections, add context with notes, and keep every resource easy to rediscover.',
    action: 'Organize sites',
    to: '/site',
    icon: Globe2,
    accent: 'bg-sky-500/10 text-sky-600 dark:text-sky-400',
  },
  {
    title: 'Site4Tasks',
    description:
      'Capture small to-dos, update them as plans change, and check off finished work without leaving your library.',
    action: 'View tasks',
    to: '/tasks',
    icon: CheckSquare,
    accent: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  },
  {
    title: 'Site4Anime',
    description:
      'Search for anime, open the details that matter, and save titles you want to keep close.',
    action: 'Find anime',
    to: '/anime',
    icon: Sparkles,
    accent: 'bg-violet-500/10 text-violet-600 dark:text-violet-400',
  },
  {
    title: 'Site4Movies',
    description:
      'Build a personal movie shelf by searching the catalogue and saving interesting finds for later.',
    action: 'Browse movies',
    to: '/movies',
    icon: Clapperboard,
    accent: 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
  },
  {
    title: 'Site4Games',
    description:
      'Discover games, check their details, and collect the ones worth playing in one focused place.',
    action: 'Explore games',
    to: '/games',
    icon: Gamepad2,
    accent: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
  },
];

const steps = [
  {
    number: '01',
    title: 'Sign in once',
    description:
      'Use your email to receive a secure magic link—there is no password to remember.',
  },
  {
    number: '02',
    title: 'Pick a space',
    description:
      'Use the sidebar to move between sites, tasks, anime, movies, and games.',
  },
  {
    number: '03',
    title: 'Build your library',
    description:
      'Add what matters, attach useful context, and return whenever you need it.',
  },
];

function RouteComponent() {
  return (
    <MainLayout>
      <main className="mx-auto w-full max-w-8xl pb-8">
        <section className="relative overflow-hidden rounded-3xl border bg-linear-to-br from-indigo-500/15 via-background to-sky-500/10 px-6 py-10 sm:px-10 sm:py-14">
          <div
            aria-hidden="true"
            className="absolute -right-20 -top-24 size-64 rounded-full bg-indigo-500/15 blur-3xl"
          />
          <div className="relative max-w-3xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border bg-background/70 px-3 py-1.5 text-sm font-semibold text-indigo-600 shadow-sm backdrop-blur dark:text-indigo-300">
              <BookmarkPlus className="size-4" />
              Your Site4Site guide
            </div>
            <h1 className="font-[Urbanist] text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Keep the good stuff.
              <span className="block text-indigo-500 mt-4">
                Find it when it matters.
              </span>
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:text-lg">
              Site4Site is a personal home for useful links, everyday tasks, and
              entertainment picks. This guide will get your workspace ready in a
              few minutes.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild size="lg" className="cursor-pointer">
                <Link to="/signIn">
                  Get started
                  <ArrowRight />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <a href="#features">Explore features</a>
              </Button>
            </div>
          </div>
        </section>

        <section className="py-14" aria-labelledby="quick-start-heading">
          <div className="mb-7 flex items-end justify-between gap-4">
            <div>
              <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-indigo-500">
                Quick start
              </p>
              <h2
                id="quick-start-heading"
                className="font-[Urbanist] text-3xl font-bold tracking-tight sm:text-4xl"
              >
                From inbox to organized
              </h2>
            </div>
            <span className="hidden text-sm text-muted-foreground sm:block">
              Three simple steps
            </span>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {steps.map((step) => (
              <article
                key={step.number}
                className="group rounded-2xl border bg-card/40 p-6 transition-colors hover:border-indigo-500/40 hover:bg-accent/40"
              >
                <span className="font-mono text-sm font-bold text-indigo-500">
                  {step.number}
                </span>
                <h3 className="mt-8 font-[Urbanist] text-xl font-bold">
                  {step.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">
                  {step.description}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section
          id="features"
          className="scroll-mt-24"
          aria-labelledby="features-heading"
        >
          <div className="mb-7 max-w-2xl">
            <p className="mb-2 text-sm font-bold uppercase tracking-[0.2em] text-indigo-500">
              One workspace, five spaces
            </p>
            <h2
              id="features-heading"
              className="font-[Urbanist] text-3xl font-bold tracking-tight sm:text-4xl"
            >
              Choose what you want to save
            </h2>
            <p className="mt-3 leading-7 text-muted-foreground">
              Every space is focused on one kind of item, while the sidebar
              keeps the whole collection only one click away.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <article
                  key={feature.title}
                  className={`flex min-h-64 flex-col rounded-3xl border bg-background p-6 transition-all hover:-translate-y-0.5 hover:border-indigo-500/40 hover:shadow-lg ${index === 0 ? 'md:col-span-2 md:min-h-56' : ''}`}
                >
                  <div
                    className={`flex size-11 items-center justify-center rounded-2xl ${feature.accent}`}
                  >
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-6 font-[Urbanist] text-2xl font-bold">
                    {feature.title}
                  </h3>
                  <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">
                    {feature.description}
                  </p>
                  <Button
                    asChild
                    variant="link"
                    className="mt-auto h-auto w-fit justify-start px-0 pt-6 text-indigo-500"
                  >
                    <Link to={feature.to}>
                      {feature.action}
                      <ArrowRight />
                    </Link>
                  </Button>
                </article>
              );
            })}
          </div>
        </section>

        {/* <section className="grid gap-5 py-14 lg:grid-cols-[1.4fr_1fr]">
          <article className="rounded-3xl border bg-muted/30 p-6 sm:p-8">
            <div className="flex size-11 items-center justify-center rounded-2xl bg-indigo-500 text-white">
              <Layers3 className="size-5" />
            </div>
            <h2 className="mt-6 font-[Urbanist] text-2xl font-bold sm:text-3xl">
              A tidy first collection
            </h2>
            <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
              Start in Site4Site with broad sections such as Work, Learning, or
              Inspiration. Give each saved link a short note that explains why
              you kept it—future you will know exactly what to look for.
            </p>
            <ul className="mt-6 grid gap-3 text-sm sm:grid-cols-2">
              {[
                'Use clear section names',
                'Add a useful one-line note',
                'Edit items when plans change',
                'Remove anything you no longer need',
              ].map((tip) => (
                <li key={tip} className="flex items-center gap-2">
                  <CheckCircle2 className="size-4 text-emerald-500" />
                  {tip}
                </li>
              ))}
            </ul>
          </article>

          <aside className="rounded-3xl border border-amber-500/20 bg-amber-500/5 p-6 sm:p-8">
            <div className="flex size-11 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-600 dark:text-amber-400">
              <Lightbulb className="size-5" />
            </div>
            <h2 className="mt-6 font-[Urbanist] text-2xl font-bold">
              Search with intent
            </h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              In anime, movies, and games, search for a title first, open its
              details, then save it to your personal collection.
            </p>
            <div className="mt-6 flex items-center gap-3 rounded-2xl border bg-background/70 px-4 py-3 text-sm text-muted-foreground">
              <Search className="size-4" />
              Try a title you already love
            </div>
          </aside>
        </section> */}

        <section className="overflow-hidden rounded-3xl bg-indigo-600 px-6 py-10 text-white sm:px-10 mt-10">
          <div className="flex flex-col items-start justify-between gap-7 md:flex-row md:items-center">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-indigo-200">
                Ready when you are
              </p>
              <h2 className="mt-2 font-[Urbanist] text-3xl font-extrabold tracking-tight sm:text-4xl">
                Make your corner of the internet easier to return to.
              </h2>
            </div>
            <Button
              asChild
              size="lg"
              variant="secondary"
              className="shrink-0 bg-white text-indigo-700 hover:bg-indigo-50"
            >
              <Link to="/signIn">
                Create your library
                <ArrowRight />
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </MainLayout>
  );
}
