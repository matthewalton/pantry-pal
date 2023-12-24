import { cookies } from "next/headers";
import { fetchRecipes } from "@/services/api";
import { RecipeStats } from "@/types/Recipe";
import RecipeStatsCard from "@/components/Recipe/RecipeStatsCard";

export default async function Page() {
  const foodList = JSON.parse(
    cookies().get("foodItems")?.value ?? "[]"
  ) as string[];

  if (!foodList) {
    throw new Error("No food items found.");
  }

  const recipesData = fetchRecipes(foodList);

  const recipes = await Promise.resolve<RecipeStats[]>(recipesData);

  return (
    <div className="flex flex-col gap-5">
      {recipes?.map((recipe, index) => (
        <RecipeStatsCard key={index} recipeStats={recipe} showLink={true} />
      ))}
    </div>
  );
}
