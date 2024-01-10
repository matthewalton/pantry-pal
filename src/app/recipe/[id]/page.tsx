import RecipeDetails from "@/app/_components/recipe/RecipeDetails";
import { Suspense } from "react";
import RecipeDetailsCardLoadingSkeleton from "@/app/_components/recipe/RecipeDetailsLoadingSkeleton";
import SaveRecipeButton from "@/app/_components/buttons/SaveRecipeButton";
import { getRecipe } from "@/services/db";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const data = await getRecipe(params.id);
  if (!data) redirect("/");

  const recipeStats = {
    id: 0,
    title: data.title,
    difficulty: 0,
    portions: 0,
    prepTime: 0,
    cookTime: 0,
  };

  return (
    <div className="flex items-stretch flex-col gap-5 w-full max-w-xl mx-auto">
      <div className="flex flex-wrap gap-3">
        <SaveRecipeButton recipeStats={recipeStats} />
      </div>

      <h3 className="text-2xl font-semibold">{data.title}</h3>

      <Suspense fallback={<RecipeDetailsCardLoadingSkeleton />}>
        <RecipeDetails recipeStats={recipeStats} />
      </Suspense>
    </div>
  );
}
