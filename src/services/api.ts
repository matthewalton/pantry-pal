"use server";

import { RecipeDetails } from "@/types/Recipe";
import { getRecipe } from "./db";

export const getRecipeDetails = async (
  uuid: string,
  difficulty: string,
  portions: string
): Promise<RecipeDetails> => {
  try {
    const { title } = await getRecipe(uuid);

    const res = await fetch(
      `${process.env.URL}/api/recipe/${encodeURIComponent(
        title
      )}?difficulty=${difficulty}&portions=${portions}`,
      {
        method: "GET",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();

    return data.recipe;
  } catch (error) {
    console.error("Error fetching recipe:", error);
    throw new Error("Failed to fetch recipe");
  }
};
