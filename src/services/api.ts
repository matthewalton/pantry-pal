"use server";

import { RecipeDetails } from "@/types/Recipe";
import { insertRecipe } from "./db";
import { redirect } from "next/navigation";
import { Redirect } from "next";

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

export const createRecipe = async (foodItems: string[]): Promise<Redirect> => {
  const foodItemsQueryParam = encodeURIComponent(foodItems.join(","));

  const res = await fetch(
    `${process.env.URL}/api/create-recipe?items=${foodItemsQueryParam}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch data");
  }

  const recipeTitle = await res.json();

  await insertRecipe(recipeTitle);

  redirect(`/recipe/${encodeURIComponent(recipeTitle)}`);
};
