import { RecipeStats } from "@/types/Recipe";

type Props = {
  recipeStats: RecipeStats;
};

export default function RecommendedRecipe({ recipeStats }: Props) {
  const { title, difficulty, prepTime, cookTime, portions } = recipeStats;

  return (
    <div>
      <h2>{title}</h2>
      <p>Difficulty: {difficulty}/10</p>
      <p>Prep Time: {prepTime} minutes</p>
      <p>Cook Time: {cookTime} minutes</p>
      <p>Portions: {portions}</p>
    </div>
  );
}
