"use client";

import { slugify } from "@/services/str";
import { RecipeStats } from "@/types/Recipe";
import { useRouter } from "next/navigation";

type Props = {
  recipeStats: RecipeStats;
  setCookieHandler: (recipeStats: RecipeStats) => void;
};

export default function ViewRecipeButton({
  recipeStats,
  setCookieHandler,
}: Props) {
  const router = useRouter();

  const handleViewRecipe = (stats: RecipeStats) => {
    setCookieHandler(stats);
    router.push(`recipe/${slugify(stats.title)}`);
  };

  return (
    <button
      className="transition-colors rounded w-100 bg-green-600 hover:bg-green-700 p-2 text-center"
      onClick={() => handleViewRecipe(recipeStats)}
    >
      View Recipe
    </button>
  );
}
