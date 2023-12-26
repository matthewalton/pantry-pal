import { RecipeStats } from "@/types/Recipe";

export const getRecipe = async (
  slug: string,
  difficulty: number,
  portions: number
) => {
  try {
    const res = await fetch(
      `${process.env.URL}/api/recipe/${slug}?difficulty=${difficulty}&portions=${portions}`,
      {
        method: "GET",
      }
    );

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();

    return data;
  } catch (error) {
    console.error("Error fetching recipe:", error);
    throw new Error("Failed to fetch recipe");
  }
};

export const fetchRecipes = async (
  foodItems: string[]
): Promise<RecipeStats[]> => {
  try {
    const res = await fetch(`${process.env.URL}/api/recommend-recipe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ foodItems }),
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();

    return data.recipes;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw new Error("Failed to fetch recipes");
  }
};
