import { getStoryById } from "@/lib/stories";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import DeleteStoryButton from "./DeleteStoryButton";

type StoryDetailsPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function StoryDetailsPage({
  params,
}: StoryDetailsPageProps) {
  const { id } = await params;

  const story = await getStoryById(id);

  if (!story) {
    notFound();
  }

  return (
    <main className="min-h-screen bg-linear-to-br from-orange-50 via-yellow-50 to-rose-50 px-4 py-6">
      <section className="mx-auto max-w-3xl">
        <Link
          href="/stories"
          className="mb-4 inline-flex items-center rounded-full bg-white px-4 py-2 text-sm font-semibold text-zinc-900 shadow-sm transition hover:bg-orange-100"
        >
          ← Back to stories
        </Link>

        <article className="overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-black/5">
          <div className="grid gap-0 md:grid-cols-[280px_1fr]">
            <div className="bg-orange-100 p-4">
              <div className="h-60 w-full overflow-hidden rounded-2xl shadow-md md:h-80">
                <Image
                  src={`/${story.imageUrl}`}
                  alt={story.name}
                  width={700}
                  height={700}
                  className="h-full w-full scale-[1.03] object-cover"
                  priority
                />
              </div>
            </div>

            <div className="flex flex-col justify-center p-5 md:p-6">
              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-orange-500">
                Fruit Story
              </p>

              <h1 className="mb-4 text-3xl font-bold leading-tight text-zinc-950 md:text-4xl">
                {story.name}
              </h1>

              <p className="text-base leading-7 text-zinc-700">
                {story.description}
              </p>

              <div className="mt-5 rounded-2xl bg-orange-50 p-4">
                <p className="text-xs font-semibold text-orange-800">
                  Story number
                </p>
                <p className="mt-1 text-xl font-bold text-orange-600">
                  #{story.id}
                </p>
              </div>
              <Link
                href={`/stories/${story.id}/edit`}
                className="mt-5 inline-flex rounded-full bg-zinc-950 px-5 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-zinc-800"
              >
                Edit story
              </Link>

              <DeleteStoryButton id={story.id} />
            </div>
          </div>
        </article>
      </section>
    </main>
  );
}
