import { cookies } from "next/headers";
import { fetchRecipes } from "@/services/api";
import { RecipeStats } from "@/types/Recipe";
import RecipeStatsCard from "@/components/Recipe/RecipeStatsCard";
import Link from "next/link";

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
      <Link
        href="/"
        className="transition-colors rounded bg-gray-600 hover:bg-gray-700 py-2 px-4 me-auto"
      >
        Back
      </Link>

      {recipes?.map((recipe, index) => (
        <RecipeStatsCard key={index} recipeStats={recipe} showLink={true} />
      ))}
    </div>
  );
}
