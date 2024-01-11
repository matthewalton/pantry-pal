import RecipeDetails from "@/app/_components/recipe/RecipeDetails";
import { Suspense } from "react";
import RecipeDetailsCardLoadingSkeleton from "@/app/_components/recipe/RecipeDetailsLoadingSkeleton";
import SaveRecipeButton from "@/app/_components/buttons/SaveRecipeButton";
import { getRecipe } from "@/services/db";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const data = await getRecipe(params.id);
  if (!data) redirect("/");

  return (
    <div className="flex items-stretch flex-col gap-5 w-full max-w-xl mx-auto">
      <div className="flex flex-wrap gap-3">
        {/* <SaveRecipeButton recipeStats={recipeStats} /> */}
      </div>

      <h3 className="text-2xl font-semibold">{data.title}</h3>

      <Suspense fallback={<RecipeDetailsCardLoadingSkeleton />}>
        <RecipeDetails uuid={params.id} difficulty={6} portions={1} />
      </Suspense>
    </div>
  );
}
