import RecipeStatsCard from "@/components/Recipe/RecipeStatsCard";
import { RecipeStats } from "@/types/Recipe";
import { cookies } from "next/headers";
import { getRecipe } from "@/services/api";
import { Suspense } from "react";
import Link from "next/link";
import { slugify } from "@/services/str";

export default async function Page({ params }: { params: { slug: string } }) {
  const slug = params.slug;

  const allRecipes = JSON.parse(
    cookies().get("recipes")?.value ?? "[]"
  ) as RecipeStats[];

  if (allRecipes?.length === 0) {
    throw new Error("No recipes found in cookie store.");
  }

  const recipeStats = allRecipes.find(
    (recipe) => slugify(recipe.title) === slug
  );

  if (!recipeStats) {
    throw new Error(`Could not find recipe with slug: ${slug}`);
  }

  const recipeData = getRecipe(
    slug,
    recipeStats.difficulty,
    recipeStats.portions
  );

  const recipe = Promise.resolve<string>(recipeData);

  return (
    <div className="flex flex-col gap-5">
      <Link
        href="/recommended-recipes"
        className="transition-colors rounded bg-gray-600 hover:bg-gray-700 py-2 px-4 me-auto"
      >
        Back
      </Link>

      <RecipeStatsCard recipeStats={recipeStats} showLink={false} />

      <Suspense fallback={<div>Loading...</div>}>
        <div>{recipe}</div>
      </Suspense>
    </div>
  );
}
