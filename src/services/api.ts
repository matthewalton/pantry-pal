"use server";

import { RecipeDetails } from "@/types/Recipe";

export const getRecipe = async (
  title: string,
  difficulty: string,
  portions: string
): Promise<RecipeDetails> => {
  try {
    const encodedTitle = encodeURIComponent(title);

    const res = await fetch(
      `${process.env.URL}/api/recipe/${encodedTitle}?difficulty=${difficulty}&portions=${portions}`,
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
