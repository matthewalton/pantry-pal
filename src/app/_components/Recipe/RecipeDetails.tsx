import { getRecipeDetails } from "@/services/api";

type Props = {
  uuid: string;
  difficulty: number;
  portions: number;
};

export default async function RecipeDetails({
  uuid,
  difficulty,
  portions,
}: Props) {
  const { ingredients, instructions } = await getRecipeDetails(
    uuid,
    difficulty.toString(),
    portions.toString()
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
