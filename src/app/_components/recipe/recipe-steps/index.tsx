"use client";

import { getRecipeDetails } from "@/services/api";
import { useEffect, useState } from "react";
import RecipeStepsLoading from "./loading";

type Props = {
  uuid: string;
  params: { difficulty: string; portions: string };
};

export default function RecipeSteps({ uuid, params }: Props) {
  const [loading, setLoading] = useState<boolean>(false);
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [instructions, setInstructions] = useState<string[]>([]);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);

      const { ingredients, instructions } = await getRecipeDetails(
        uuid,
        params.difficulty,
        params.portions
      );
      setIngredients(ingredients);
      setInstructions(instructions);

      setLoading(false);
    }

    fetchData();
  }, [uuid, params]);

  if (loading) {
    return <RecipeStepsLoading />;
  }

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
