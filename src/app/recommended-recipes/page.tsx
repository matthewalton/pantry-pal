import { cookies } from "next/headers";
import { fetchRecipes } from "@/services/api";
import RecipeStatsCard from "@/components/Recipe/RecipeStatsCard";
import Link from "next/link";

export default async function Page() {
  const foodList = JSON.parse(
    cookies().get("foodItems")?.value ?? "[]"
  ) as string[];

  if (!foodList) {
    throw new Error("No food items found.");
  }

  const recipes = await fetchRecipes(foodList);

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
