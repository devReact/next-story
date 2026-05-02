import Image from "next/image";
import Link from "next/link";
import { Story } from "@/lib/stories";

const StoriesList = ({ stories }: { stories: Story[] }) => {
  return (
    <section className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {stories.map((story, index) => (
        <Link
          key={story.id}
          href={`/stories/${story.id}`}
          className="rounded-xl bg-white p-3 text-zinc-950 shadow-sm ring-1 ring-black/5 transition hover:-translate-y-0.5 hover:shadow-md"
        >
          <div className="h-30 w-30 overflow-hidden rounded-lg">
            <Image
              src={`/${story.imageUrl}`}
              alt={story.name}
              width={120}
              height={120}
              className="h-full w-full scale-[1.03] object-cover"
              priority={index === 0}
            />
          </div>

          <h2 className="mt-3 text-base font-bold text-zinc-950">
            {story.name}
          </h2>
        </Link>
      ))}
    </section>
  );
};

export default StoriesList;
