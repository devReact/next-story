"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type DeleteStoryButtonProps = {
  id: string;
};

export default function DeleteStoryButton({ id }: DeleteStoryButtonProps) {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this story?",
    );

    if (!confirmed) {
      return;
    }

    setError("");
    setIsDeleting(true);

    try {
      const response = await fetch(`/api/stories/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        setError(data.message || "Unable to delete the story.");
        return;
      }

      router.push("/stories");
      router.refresh();
    } catch {
      setError("Something went wrong.");
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="mt-3">
      <button
        type="button"
        onClick={handleDelete}
        disabled={isDeleting}
        className="inline-flex rounded-full bg-red-500 px-5 py-2 text-sm font-semibold text-white shadow-md transition hover:bg-red-600 disabled:cursor-not-allowed disabled:bg-zinc-300"
      >
        {isDeleting ? "Deleting..." : "Delete story"}
      </button>

      {error && (
        <p className="mt-2 text-sm font-semibold text-red-600">{error}</p>
      )}
    </div>
  );
}
