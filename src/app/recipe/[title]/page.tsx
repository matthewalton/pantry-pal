import RecipeDetails from "@/app/_components/Recipe/RecipeDetails";
import { Suspense } from "react";
import RecipeDetailsCardLoadingSkeleton from "@/app/_components/Recipe/RecipeDetailsLoadingSkeleton";
import SaveRecipeButton from "@/app/_components/Buttons/SaveRecipeButton";

export default function Page({ params }: { params: { title: string } }) {
  const title = decodeURIComponent(params.title);

  const recipeStats = {
    id: 0,
    title: title,
    difficulty: 0,
    portions: 0,
    prepTime: 0,
    cookTime: 0,
  };

  return (
    <div className="flex items-start flex-col gap-5 w-full max-w-xl mx-auto">
      <div className="flex flex-wrap gap-3">
        <SaveRecipeButton recipeStats={recipeStats} />
      </div>

      <h3 className="text-2xl font-semibold">{title}</h3>

      <Suspense fallback={<RecipeDetailsCardLoadingSkeleton />}>
        <RecipeDetails recipeStats={recipeStats} />
      </Suspense>
    </div>
  );
}
