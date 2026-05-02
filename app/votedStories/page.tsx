import { getStories } from "@/lib/stories";
import { getVotedStories } from "@/lib/votedStories";
import VotedStoriesClient from "./VotedStoriesClient";

export default async function VotedStoriesPage() {
  const stories = await getStories();
  const votedStories = await getVotedStories();

  return (
    <VotedStoriesClient
      stories={stories}
      initialSelectedStories={votedStories}
    />
  );
}
