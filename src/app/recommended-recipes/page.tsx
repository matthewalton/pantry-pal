import { fetchRecipes } from "@/services/api";
import RecipeStatsCard from "@/components/Recipe/RecipeStatsCard";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const itemsSearchParam = decodeURIComponent(searchParams["items"] ?? "");

  const items = itemsSearchParam.split(",");
  const difficulty = searchParams["difficulty"];

  if (!items) {
    redirect("/");
  }

  const recipes = await fetchRecipes(items, difficulty);

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
