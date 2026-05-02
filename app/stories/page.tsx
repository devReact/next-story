import StoriesList from "../components/storiesList";
import { getStories } from "@/lib/stories";
import Link from "next/link";

export default async function StoriesPage() {
  const stories = await getStories();

  return (
    <main className="min-h-screen bg-linear-to-br from-orange-50 via-yellow-50 to-rose-50 px-4 py-6 text-zinc-950">
      <section className="mx-auto max-w-4xl">
        <Link
          href="/"
          className="mb-5 inline-flex rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-zinc-900 shadow-sm transition hover:bg-orange-100"
        >
          ← Back home
        </Link>

        <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-orange-600">
          Fruit Stories
        </p>

        <h1 className="mb-2 text-3xl font-bold text-zinc-950">
          Choose a story
        </h1>

        <p className="mb-5 max-w-xl text-base leading-7 text-zinc-700">
          Pick a fruit story and discover its little adventure.
        </p>

        <Link
          href="/stories/new"
          className="mb-4 mr-3 inline-flex rounded-full bg-zinc-950 px-5 py-2 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-zinc-800 hover:shadow-lg"
        >
          Add new story
        </Link>

        <Link
          href="/votedStories"
          className="mb-6 inline-flex rounded-full bg-orange-500 px-5 py-2 text-sm font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-lg"
        >
          Show voted stories
        </Link>

        <StoriesList stories={stories} />
      </section>
    </main>
  );
}
