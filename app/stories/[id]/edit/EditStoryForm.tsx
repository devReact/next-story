"use client";

import { Story } from "@/lib/stories";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { SyntheticEvent } from "react";

type EditStoryFormProps = {
  story: Story;
};

export default function EditStoryForm({ story }: EditStoryFormProps) {
  const router = useRouter();

  const [name, setName] = useState(story.name);
  const [imageUrl, setImageUrl] = useState(story.imageUrl);
  const [description, setDescription] = useState(story.description);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/stories/${story.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          imageUrl,
          description,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || "Unable to update the story.");
        return;
      }

      router.push(`/stories/${story.id}`);
      router.refresh();
    } catch {
      setError("Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen bg-linear-to-br from-orange-50 via-yellow-50 to-rose-50 px-4 py-4 text-zinc-950">
      <section className="mx-auto max-w-xl">
        <Link
          href={`/stories/${story.id}`}
          className="mb-3 inline-flex rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-zinc-900 shadow-sm transition hover:bg-orange-100"
        >
          ← Back to story
        </Link>

        <div className="rounded-2xl bg-white p-5 shadow-lg ring-1 ring-black/5">
          <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-orange-600">
            Edit story
          </p>

          <h1 className="mb-4 text-2xl font-bold text-zinc-950">
            Modify fruit story
          </h1>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label
                htmlFor="name"
                className="mb-1 block text-sm font-semibold text-zinc-800"
              >
                Name
              </label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
                className="w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
              />
            </div>

            <div>
              <label
                htmlFor="imageUrl"
                className="mb-1 block text-sm font-semibold text-zinc-800"
              >
                Image filename
              </label>
              <input
                id="imageUrl"
                type="text"
                value={imageUrl}
                onChange={(event) => setImageUrl(event.target.value)}
                className="w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
              />
            </div>

            <div>
              <label
                htmlFor="description"
                className="mb-1 block text-sm font-semibold text-zinc-800"
              >
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                rows={3}
                className="w-full resize-none rounded-xl border border-zinc-300 px-3 py-2 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
              />
            </div>

            {error && (
              <p className="rounded-xl bg-red-50 p-2 text-sm font-semibold text-red-600">
                {error}
              </p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-full bg-orange-500 px-5 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-zinc-300"
            >
              {isSubmitting ? "Updating..." : "Update story"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
