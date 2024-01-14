import { getRecipeDetails } from "@/services/api";

type Props = {
  uuid: string;
  params: { difficulty: string; portions: string };
};

export default async function RecipeSteps({ uuid, params }: Props) {
  const { ingredients, instructions } = await getRecipeDetails(
    uuid,
    params.difficulty,
    params.portions
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
