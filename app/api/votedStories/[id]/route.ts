import { removeVotedStory } from "@/lib/votedStories";
import { NextResponse } from "next/server";

type RouteParams = {
  params: Promise<{
    id: string;
  }>;
};

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;

    const deleted = await removeVotedStory(id);

    if (!deleted) {
      return NextResponse.json(
        { message: "Voted story not found." },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "Voted story removed successfully." },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error removing voted story:", error);

    return NextResponse.json(
      { message: "Something went wrong while removing voted story." },
      { status: 500 },
    );
  }
}
