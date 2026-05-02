import { deleteStory, updateStory } from "@/lib/stories";
import { NextResponse } from "next/server";

type RouteParams = {
  params: Promise<{
    id: string;
  }>;
};

export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;
    const body = await request.json();

    const { name, imageUrl, description } = body;

    if (!name || !imageUrl || !description) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 },
      );
    }

    const updatedStory = await updateStory(id, {
      name,
      imageUrl,
      description,
    });

    if (!updatedStory) {
      return NextResponse.json(
        { message: "Story not found." },
        { status: 404 },
      );
    }

    return NextResponse.json(updatedStory, { status: 200 });
  } catch (error) {
    console.error("Error updating story:", error);

    return NextResponse.json(
      { message: "Something went wrong while updating the story." },
      { status: 500 },
    );
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
  try {
    const { id } = await params;

    const deleted = await deleteStory(id);

    if (!deleted) {
      return NextResponse.json(
        { message: "Story not found." },
        { status: 404 },
      );
    }

    return NextResponse.json(
      { message: "Story deleted successfully." },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting story:", error);

    return NextResponse.json(
      { message: "Something went wrong while deleting the story." },
      { status: 500 },
    );
  }
}
