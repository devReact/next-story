import { createStory } from "@/lib/stories";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { id, name, imageUrl, description } = body;

    if (!id || !name || !imageUrl || !description) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 },
      );
    }

    const newStory = await createStory({
      id,
      name,
      imageUrl,
      description,
    });

    return NextResponse.json(newStory, { status: 201 });
  } catch (error) {
    console.error("Error creating story:", error);

    return NextResponse.json(
      { message: "Something went wrong while creating the story." },
      { status: 500 },
    );
  }
}
