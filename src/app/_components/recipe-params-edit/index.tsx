"use client";

import { useState } from "react";

type Props = {
  difficulty: string;
  portions: string;
  children: React.ReactNode;
};

export default function RecipeParamsEdit({
  difficulty,
  portions,
  children,
}: Props) {
  const [editing, setEditing] = useState<boolean>(false);

  if (editing) {
    return (
      <div className="flex flex-col gap-2">
        {children}
        <button
          className={`transition-colors text-gray-800 font-medium py-1 px-4 rounded bg-gray-100 hover:bg-gray-200 border`}
          onClick={() => setEditing(false)}
        >
          Cancel
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-2">
      <div className="flex gap-2">
        <div>Difficulty: {difficulty}/10</div>
        <div>Portions: {portions}</div>
      </div>

      <button
        className={`transition-colors text-black font-medium py-1 px-4 rounded hover:bg-gray-100 border`}
        onClick={() => setEditing(true)}
      >
        Edit
      </button>
    </div>
  );
}
