import { addVotedStory, getVotedStories } from "@/lib/votedStories";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const votedStories = await getVotedStories();

    return NextResponse.json(votedStories, { status: 200 });
  } catch (error) {
    console.error("Error getting voted stories:", error);

    return NextResponse.json(
      { message: "Something went wrong while getting voted stories." },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const story = await request.json();

    if (!story.id || !story.name || !story.imageUrl || !story.description) {
      return NextResponse.json(
        { message: "Story data is incomplete." },
        { status: 400 },
      );
    }

    const votedStory = await addVotedStory(story);

    return NextResponse.json(votedStory, { status: 201 });
  } catch (error) {
    console.error("Error adding voted story:", error);

    return NextResponse.json(
      { message: "Something went wrong while adding voted story." },
      { status: 500 },
    );
  }
}
