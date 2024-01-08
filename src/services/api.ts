import { RecipeDetails, RecipeStats } from "@/types/Recipe";
import { insertRecipes } from "./db";

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

export const fetchRecipes = async (
  foodItems: string[],
  difficulty?: string,
  portions?: string
): Promise<RecipeStats[]> => {
  try {
    const foodItemsQueryParam = encodeURIComponent(foodItems.join(","));

    let queryString = `?items=${foodItemsQueryParam}`;

    if (difficulty) {
      queryString += `&difficulty=${difficulty}`;
    }

    if (portions) {
      queryString += `&portions=${portions}`;
    }

    const res = await fetch(
      `${process.env.URL}/api/recommend-recipe${queryString}`,
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

    const data = await res.json();
    const recipes = data.recipes;

    await insertRecipes(recipes);

    return recipes;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw new Error("Failed to fetch recipes");
  }
};
