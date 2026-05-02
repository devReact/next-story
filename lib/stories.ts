import { ObjectId } from "mongodb";
import clientPromise from "./mongodb";

export interface Story {
  _id?: string;
  id: string;
  imageUrl: string;
  name: string;
  description: string;
}

interface MongoStory {
  _id?: ObjectId;
  id: string;
  imageUrl: string;
  name: string;
  description: string;
}

function formatStory(story: MongoStory): Story {
  return {
    ...story,
    _id: story._id?.toString(),
  };
}

export async function getStories(): Promise<Story[]> {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  const stories = await db.collection<MongoStory>("stories").find({}).toArray();

  return stories.map(formatStory).sort((a, b) => Number(a.id) - Number(b.id));
}

export async function getStoryById(id: string): Promise<Story | null> {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  const story = await db.collection<MongoStory>("stories").findOne({ id });

  if (!story) {
    return null;
  }

  return formatStory(story);
}

export async function createStory(story: Omit<Story, "_id">): Promise<Story> {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  await db.collection("stories").insertOne(story);

  return story;
}

export async function updateStory(
  id: string,
  updatedStory: {
    name: string;
    imageUrl: string;
    description: string;
  },
): Promise<Story | null> {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  const result = await db.collection("stories").findOneAndUpdate(
    { id },
    {
      $set: {
        name: updatedStory.name,
        imageUrl: updatedStory.imageUrl,
        description: updatedStory.description,
      },
    },
    {
      returnDocument: "after",
    },
  );

  if (!result) {
    return null;
  }

  return {
    ...result,
    _id: result._id.toString(),
  } as Story;
}

export async function deleteStory(id: string): Promise<boolean> {
  const client = await clientPromise;
  const db = client.db(process.env.MONGODB_DB);

  const result = await db.collection("stories").deleteOne({ id });

  return result.deletedCount === 1;
}
