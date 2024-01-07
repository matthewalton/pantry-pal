import { getRecipe } from "@/services/api";
import { RecipeStats } from "@/types/Recipe";

type Props = {
  recipeStats: RecipeStats;
};

export default async function RecipeDetailsCard({ recipeStats }: Props) {
  const { ingredients, instructions } = await getRecipe(
    recipeStats.title,
    recipeStats.difficulty.toString(),
    recipeStats.portions.toString()
  );

  return (
    <div className="flex flex-col gap-5 font-mono">
      <ul className="list-inside">
        {ingredients.map((ingredient) => (
          <li key={ingredient}>{ingredient}</li>
        ))}
      </ul>

      <ol className="list-decimal list-inside">
        {instructions.map((instruction) => (
          <li key={instruction}>{instruction}</li>
        ))}
      </ol>
    </div>
  );
}
