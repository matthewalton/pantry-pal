import { RecipeStats } from "@/types/Recipe";

export const fetchRecipes = async (
  foodItems: string[]
): Promise<RecipeStats[]> => {
  try {
    const res = await fetch("/api/recommend-recipe", {
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
    return JSON.parse(data).recipes;
  } catch (error) {
    console.error("Error fetching recipe:", error);
    throw new Error("Failed to fetch recipe");
  }
};
