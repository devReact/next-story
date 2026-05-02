import { getStoryById } from "@/lib/stories";
import { notFound } from "next/navigation";
import EditStoryForm from "./EditStoryForm";

type EditStoryPageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditStoryPage({ params }: EditStoryPageProps) {
  const { id } = await params;

  const story = await getStoryById(id);

  if (!story) {
    notFound();
  }

  return <EditStoryForm story={story} />;
}
