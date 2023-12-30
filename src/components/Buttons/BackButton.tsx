"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      type="button"
      className="transition-colors rounded bg-gray-600 hover:bg-gray-700 py-2 px-4 me-auto"
      onClick={() => router.back()}
    >
      Back
    </button>
  );
}