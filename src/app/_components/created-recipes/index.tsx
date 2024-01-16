import { getRecipes } from "@/services/db";
import Link from "next/link";

export default async function CreatedRecipes() {
  const pageSize = 9;
  const pageNumber = 1;

  const recipes = await getRecipes(pageSize, pageNumber);

  return (
    <div>
      <h2 className="text-2xl font-medium mb-4">Recent Recipes</h2>

      <div className="grid grid-cols-2 gap-3">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="col">
            <Link href={`/recipe/${recipe.uuid}`}>{recipe.title}</Link>
          </div>
        ))}
      </div>
    </div>
  );
}
