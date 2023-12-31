import { fetchRecipes } from "@/services/api";
import RecipeStatsCard from "../Recipe/Cards/Stats/RecipeStatsCard";

type Props = {
  items: string[];
  difficulty?: string;
  portions?: string;
};

export default async function RecommendedRecipes({
  items,
  difficulty,
  portions,
}: Props) {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const recipes = await fetchRecipes(items, difficulty, portions);

  if (recipes.length === 0) {
    return <div>No recipes available.</div>;
  }

  return recipes?.map((recipe, index) => (
    <RecipeStatsCard key={index} recipeStats={recipe} showLink={true} />
  ));
}
