import RecipeStatsCard from "@/components/Recipe/RecipeStatsCard";
import { RecipeStats } from "@/types/Recipe";
import { cookies } from "next/headers";
import { getRecipe } from "@/services/api";
import Link from "next/link";
import RecipeDetailsCard from "@/components/Recipe/RecipeDetailsCard";

export default async function Page({ params }: { params: { title: string } }) {
  const title = decodeURIComponent(params.title);

  const recipeStats = JSON.parse(
    cookies().get("recipeStats")?.value ?? ""
  ) as RecipeStats;

  if (!recipeStats) {
    throw new Error(`Could not find recipe: ${title}`);
  }

  const recipeDetails = await getRecipe(
    title,
    recipeStats.difficulty,
    recipeStats.portions
  );

  return (
    <div className="flex flex-col gap-5">
      <Link
        href="/recommended-recipes"
        className="transition-colors rounded bg-gray-600 hover:bg-gray-700 py-2 px-4 me-auto"
      >
        Back
      </Link>

      <RecipeStatsCard recipeStats={recipeStats} showLink={false} />

      <RecipeDetailsCard
        ingredients={recipeDetails.ingredients}
        instructions={recipeDetails.instructions}
      />
    </div>
  );
}
