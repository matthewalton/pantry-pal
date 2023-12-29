import RecipeStatsCard from "@/components/Recipe/RecipeStatsCard";
import { getRecipe } from "@/services/api";
import RecipeDetailsCard from "@/components/Recipe/RecipeDetailsCard";
import BackButton from "@/components/Buttons/BackButton";

export default async function Page({
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

  const recipeDetails = await getRecipe(title, difficulty, portions);

  return (
    <div className="flex flex-col gap-5">
      <BackButton />

      <RecipeStatsCard recipeStats={recipeStats} showLink={false} />

      <RecipeDetailsCard
        ingredients={recipeDetails.ingredients}
        instructions={recipeDetails.instructions}
      />
    </div>
  );
}
