"use client";

import { getRecipeStatsFromKey } from "@/services/recipe";
import { RecipeStats } from "@/types/Recipe";
import Link from "next/link";

export default function MyRecipes() {
  let recipesStore = null;

  if (typeof window !== "undefined") {
    recipesStore = localStorage.getItem("recipes");
  }

  let recipes: RecipeStats[] = [];

  if (recipesStore) {
    const recipeKeys = JSON.parse(recipesStore) as string[];
    recipes = recipeKeys.map((key) => getRecipeStatsFromKey(key));
  }

  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-bold">My Recipes</h2>

      {recipes.length === 0 ? (
        <>
          <span>You have not saved any recipes.</span>
          <Link
            href="/"
            className="underline transition-colors text-emerald-500 hover:text-emerald-600"
          >
            Create a Recipe
          </Link>
        </>
      ) : (
        <ul>
          {recipes.map((recipe) => (
            <li key={recipe.title}>{recipe.title}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
