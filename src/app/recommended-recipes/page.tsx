import { fetchRecipes } from "@/services/api";
import RecipeStatsCard from "@/components/Recipe/RecipeStatsCard";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const foodItems = searchParams["items"]?.split(",");

  if (!foodItems) {
    redirect("/");
  }

  const recipes = await fetchRecipes(foodItems);

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
