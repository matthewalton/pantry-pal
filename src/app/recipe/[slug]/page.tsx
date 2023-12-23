"use server";

import RecipeStatsCard from "@/components/Recipe/RecipeStatsCard";
import { RecipeStats } from "@/types/Recipe";
import { cookies } from "next/headers";

async function getRecipe(slug: string) {
  const recipes = cookies().get("recipes");

  const res = await fetch(`${process.env.URL}/api/recipe/${slug}`, {
    method: "GET",
    headers: { "Set-Cookie": `recipes=${recipes?.value}` },
  });

  const data = await res.json();
  console.log(data);

  if (!res.ok) {
    return [];
  }

  return data;
}

export default async function Page({ params }: { params: { slug: string } }) {
  const slug = params.slug;

  const allRecipes = JSON.parse(
    cookies().get("recipes")?.value ?? "[]"
  ) as RecipeStats[];

  if (!allRecipes) {
    throw new Error("No recipes in session storage to generate.");
  }

  const recipeStats = allRecipes.find((recipe) => recipe.slug === slug);

  if (!recipeStats) {
    throw new Error(`Could not find recipe with slug: ${slug}`);
  }

  const recipeData = getRecipe(slug);

  const [recipe] = await Promise.all([recipeData]);

  return (
    <div className="flex flex-col gap-5">
      <RecipeStatsCard recipeStats={recipeStats} showLink={false} />

      {/* <div>{recipe}</div> */}
    </div>
  );
}
