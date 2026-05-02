"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Story } from "@/lib/stories";

export default function VotedStoriesClient({ stories }: { stories: Story[] }) {
  const [selectedStories, setSelectedStories] = useState<Story[]>([]);

  const addStory = (story: Story) => {
    const alreadySelected = selectedStories.some(
      (selectedStory) => selectedStory.id === story.id,
    );

    if (alreadySelected) {
      return;
    }

    setSelectedStories([...selectedStories, story]);
  };

  const removeStory = (id: string) => {
    setSelectedStories(
      selectedStories.filter((selectedStory) => selectedStory.id !== id),
    );
  };

  return (
    <main className="min-h-screen bg-linear-to-br from-orange-50 via-yellow-50 to-rose-50 px-6 py-8 text-zinc-950">
      <section className="mx-auto max-w-6xl">
        <Link
          href="/stories"
          className="mb-8 inline-flex rounded-full bg-white px-5 py-2 text-sm font-semibold text-zinc-900 shadow-sm transition hover:bg-orange-100"
        >
          ← Back to stories
        </Link>

        <div className="mb-10">
          <p className="mb-2 text-sm font-bold uppercase tracking-[0.25em] text-orange-600">
            Vote Area
          </p>

          <h1 className="mb-4 text-5xl font-bold text-zinc-950">
            Choose your favorite fruits
          </h1>

          <p className="max-w-2xl text-lg leading-8 text-zinc-700">
            Select several fruits from the list, then remove any item you no
            longer want.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <section>
            <h2 className="mb-4 text-2xl font-bold text-zinc-950">
              Available fruits
            </h2>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {stories.map((story, index) => {
                const isSelected = selectedStories.some(
                  (selectedStory) => selectedStory.id === story.id,
                );

                return (
                  <article
                    key={story.id}
                    onClick={() => addStory(story)}
                    className={`cursor-pointer rounded-2xl bg-white p-4 shadow-md ring-1 ring-black/5 transition hover:-translate-y-1 hover:shadow-xl ${
                      isSelected ? "opacity-60 ring-2 ring-orange-400" : ""
                    }`}
                  >
                    <div className="h-37.5 w-37.5 overflow-hidden rounded-xl">
                      <Image
                        src={`/${story.imageUrl}`}
                        alt={story.name}
                        width={150}
                        height={150}
                        className="h-full w-full scale-[1.03] object-cover"
                        priority={index === 0}
                      />
                    </div>

                    <h3 className="mt-4 text-xl font-bold text-zinc-950">
                      {story.name}
                    </h3>

                    {isSelected && (
                      <p className="mt-2 text-sm font-semibold text-orange-600">
                        Selected
                      </p>
                    )}
                  </article>
                );
              })}
            </div>
          </section>

          <aside className="self-start rounded-3xl bg-white p-5 shadow-xl ring-1 ring-black/5">
            <h2 className="mb-4 text-2xl font-bold text-zinc-950">
              Selected fruits
            </h2>

            {selectedStories.length === 0 ? (
              <p className="rounded-2xl bg-orange-50 p-4 text-zinc-700">
                No fruit selected yet.
              </p>
            ) : (
              <div className="space-y-4">
                {selectedStories.map((story) => (
                  <div
                    key={story.id}
                    className="flex items-center gap-4 rounded-2xl bg-orange-50 p-3"
                  >
                    <div className="h-17.5 w-17.5 overflow-hidden rounded-xl">
                      <Image
                        src={`/${story.imageUrl}`}
                        alt={story.name}
                        width={70}
                        height={70}
                        className="h-full w-full scale-[1.03] object-cover"
                      />
                    </div>

                    <div className="flex-1">
                      <h3 className="font-bold text-zinc-950">{story.name}</h3>
                      <p className="text-sm text-zinc-600">Story #{story.id}</p>
                    </div>

                    <button
                      onClick={() => removeStory(story.id)}
                      className="rounded-full bg-red-500 px-3 py-1 text-sm font-semibold text-white transition hover:bg-red-600"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </aside>
        </div>
      </section>
    </main>
  );
}
