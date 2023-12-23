import RecipeStatsCard from "@/components/Recipe/RecipeStatsCard";
import { RecipeStats } from "@/types/Recipe";
import { cookies } from "next/headers";
import { getRecipe } from "@/services/api";
import { Suspense } from "react";

export default async function Page({ params }: { params: { slug: string } }) {
  const slug = params.slug;

  const allRecipes = JSON.parse(
    cookies().get("recipes")?.value ?? "[]"
  ) as RecipeStats[];

  if (!allRecipes) {
    throw new Error("No recipes found in cookie store.");
  }

  const recipeStats = allRecipes.find((recipe) => recipe.slug === slug);

  if (!recipeStats) {
    throw new Error(`Could not find recipe with slug: ${slug}`);
  }

  const recipeData = getRecipe(
    slug,
    recipeStats.difficulty,
    recipeStats.portions
  );

  const recipe = await Promise.resolve(recipeData);

  return (
    <div className="flex flex-col gap-5">
      <RecipeStatsCard recipeStats={recipeStats} showLink={false} />

      <Suspense fallback={<div>Loading...</div>}>
        <div>{recipe}</div>
      </Suspense>
    </div>
  );
}
