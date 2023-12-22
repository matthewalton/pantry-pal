import { RecipeStats } from "@/types/Recipe";

export const fetchRecipes = async (
  foodItems: string[]
): Promise<RecipeStats[]> => {
  // return getDummyRecipes();

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

/**
 * Return dummy recipes for testing.
 *
 * @returns array
 */
function getDummyRecipes(): RecipeStats[] {
  return [
    {
      title: "Dummy Recipe 1",
      difficulty: 5,
      prepTime: 20,
      cookTime: 30,
      portions: 4,
    },
    {
      title: "Dummy Recipe 2",
      difficulty: 3,
      prepTime: 15,
      cookTime: 25,
      portions: 2,
    },
    {
      title: "Dummy Recipe 3",
      difficulty: 7,
      prepTime: 25,
      cookTime: 40,
      portions: 6,
    },
  ];
}
