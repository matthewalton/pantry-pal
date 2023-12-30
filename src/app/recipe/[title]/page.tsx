import RecipeStatsCard from "@/components/Recipe/RecipeStatsCard";
import { getRecipe } from "@/services/api";
import RecipeDetailsCard from "@/components/Recipe/RecipeDetailsCard";
import BackButton from "@/components/Buttons/BackButton";
import { RecipeDetails } from "@/types/Recipe";
import { Suspense } from "react";

export default function Page({
  params,
  searchParams,
}: {
  params: { title: string };
  searchParams: { [key: string]: string | undefined };
}) {
  const title = decodeURIComponent(params.title);

  const difficulty = searchParams["difficulty"] ?? "";
  const portions = searchParams["portions"] ?? "";
  const prepTime = searchParams["prepTime"] ?? "";
  const cookTime = searchParams["cookTime"] ?? "";

  const recipeStats = {
    title: title,
    difficulty: +difficulty,
    portions: +portions,
    prepTime: +prepTime,
    cookTime: +cookTime,
  };

  return (
    <div className="flex flex-col gap-5">
      <BackButton />

      <RecipeStatsCard recipeStats={recipeStats} showLink={false} />

      <Suspense fallback={<div>Fetching recipe...</div>}>
        <RecipeDetailsCard recipeStats={recipeStats} />
      </Suspense>
    </div>
  );
}
