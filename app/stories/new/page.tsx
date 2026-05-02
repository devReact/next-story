"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import type { SyntheticEvent } from "react";

export default function NewStoryPage() {
  const router = useRouter();

  const [id, setId] = useState("");
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/stories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          name,
          imageUrl,
          description,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || "Unable to create the story.");
        return;
      }

      router.push("/stories");
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
          href="/stories"
          className="mb-3 inline-flex rounded-full bg-white px-4 py-1.5 text-sm font-semibold text-zinc-900 shadow-sm transition hover:bg-orange-100"
        >
          ← Back to stories
        </Link>

        <div className="rounded-2xl bg-white p-5 shadow-lg ring-1 ring-black/5">
          <p className="mb-1 text-xs font-bold uppercase tracking-[0.2em] text-orange-600">
            New story
          </p>

          <h1 className="mb-4 text-2xl font-bold text-zinc-950">
            Add a fruit story
          </h1>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <label
                htmlFor="id"
                className="mb-1 block text-sm font-semibold text-zinc-800"
              >
                ID
              </label>
              <input
                id="id"
                type="text"
                value={id}
                onChange={(event) => setId(event.target.value)}
                placeholder="Example: 4"
                className="w-full rounded-xl border border-zinc-300 px-3 py-2 text-sm outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-200"
              />
            </div>

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
                placeholder="Example: The Strawberry Secret"
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
                placeholder="Example: 4.jpeg"
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
                placeholder="Write a short story description..."
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
              {isSubmitting ? "Creating..." : "Create story"}
            </button>
          </form>
        </div>
      </section>
    </main>
  );
}
