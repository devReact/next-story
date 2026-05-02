import { getStories } from "@/lib/stories";
import VotedStoriesClient from "./VotedStoriesClient";

export default async function VotedStoriesPage() {
  const stories = await getStories();

  return <VotedStoriesClient stories={stories} />;
}
