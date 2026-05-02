import clientPromise from "./mongodb";
import type { Story } from "./stories";

export interface VotedStory extends Story {
  votedAt?: string;
}

export async function getVotedStories(): Promise<VotedStory[]> {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  const votedStories = await db
    .collection<VotedStory>("votedStories")
    .find({})
    .toArray();

  return votedStories
    .map((story) => ({
      ...story,
      _id: story._id?.toString(),
    }))
    .sort((a, b) => Number(a.id) - Number(b.id));
}

export async function addVotedStory(story: Story): Promise<VotedStory> {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  const votedStory: VotedStory = {
    id: story.id,
    name: story.name,
    imageUrl: story.imageUrl,
    description: story.description,
    votedAt: new Date().toISOString(),
  };

  await db
    .collection<VotedStory>("votedStories")
    .updateOne({ id: story.id }, { $set: votedStory }, { upsert: true });

  return votedStory;
}

export async function removeVotedStory(id: string): Promise<boolean> {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  const result = await db.collection("votedStories").deleteOne({ id });

  return result.deletedCount === 1;
}
