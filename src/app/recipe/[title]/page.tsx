import RecipeStatsCard from "@/components/Recipe/Cards/Stats/RecipeStatsCard";
import RecipeDetailsCard from "@/components/Recipe/Cards/Details/RecipeDetailsCard";
import BackButton from "@/components/Buttons/BackButton";
import { Suspense } from "react";
import RecipeDetailsCardLoadingSkeleton from "@/components/Recipe/Cards/Details/RecipeDetailsCardLoadingSkeleton";
import SaveRecipeButton from "@/components/Buttons/SaveRecipeButton";

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
    <div className="flex items-start flex-col gap-5">
      <div className="flex flex-wrap gap-3">
        <BackButton />

        <SaveRecipeButton recipeStats={recipeStats} />
      </div>

      <RecipeStatsCard recipeStats={recipeStats} showLink={false} />

      <Suspense fallback={<RecipeDetailsCardLoadingSkeleton />}>
        <RecipeDetailsCard recipeStats={recipeStats} />
      </Suspense>
    </div>
  );
}
