import Link from "next/link";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-linear-to-br from-orange-50 via-yellow-50 to-rose-50 px-6 text-center">
      <h1 className="mb-4 text-5xl font-bold text-orange-700">Fruit Stories</h1>

      <p className="mb-8 max-w-xl text-lg leading-8 text-zinc-700">
        Discover fun little stories about fruits and learn how a Next.js project
        is organized step by step.
      </p>

      <Link
        href="/stories"
        className="rounded-full bg-orange-500 px-7 py-3 font-semibold text-white shadow-md transition hover:-translate-y-0.5 hover:bg-orange-600 hover:shadow-lg"
      >
        View stories
      </Link>
    </main>
  );
}
