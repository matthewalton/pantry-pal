"use client";

import { generateRecipeKey } from "@/services/recipe";
import { RecipeStats } from "@/types/Recipe";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

type Props = {
  recipeStats: RecipeStats;
};

export default function SaveRecipeButton({ recipeStats }: Props) {
  const { data: session } = useSession();
  const [recipeIsSaved, setRecipeIsSaved] = useState<boolean>(false);

  const recipeKey = generateRecipeKey(recipeStats);

  useEffect(() => {
    const savedRecipes = JSON.parse(
      localStorage.getItem("recipes") ?? "[]"
    ) as string[];
    setRecipeIsSaved(savedRecipes.includes(recipeKey));
  }, [recipeKey, recipeStats]);

  if (!session) {
    return "";
  }

  const handleSaveRecipe = () => {
    const savedRecipes = JSON.parse(
      localStorage.getItem("recipes") ?? "[]"
    ) as string[];
    const updatedRecipes = [...savedRecipes, recipeKey];

    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));

    setRecipeIsSaved(true);
  };

  const handleRemoveRecipe = () => {
    const savedRecipes = JSON.parse(
      localStorage.getItem("recipes") ?? "[]"
    ) as string[];
    const updatedRecipes = savedRecipes.filter((key) => key !== recipeKey);

    localStorage.setItem("recipes", JSON.stringify(updatedRecipes));

    setRecipeIsSaved(false);
  };

  if (recipeIsSaved) {
    return (
      <button
        className="transition-colors rounded bg-red-600 hover:bg-red-700 py-2 px-4"
        onClick={() => handleRemoveRecipe()}
      >
        Remove Recipe
      </button>
    );
  }

  return (
    <button
      className="transition-colors rounded bg-green-600 hover:bg-green-700 py-2 px-4"
      onClick={() => handleSaveRecipe()}
    >
      Save Recipe
    </button>
  );
}
