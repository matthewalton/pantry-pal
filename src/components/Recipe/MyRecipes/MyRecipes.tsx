"use client";

import { getRecipeStatsFromKey } from "@/services/recipe";
import { RecipeStats } from "@/types/Recipe";
import RecipeStatsCard from "../Cards/Stats/RecipeStatsCard";
import Link from "next/link";

export default function MyRecipes() {
  const recipesStore = localStorage.getItem("recipes");
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
            <li key={recipe.title}>
              <RecipeStatsCard recipeStats={recipe} showLink={true} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
