import { getRecipes } from "@/services/db";
import Link from "next/link";

export default async function CreatedRecipes() {
  const pageSize = 9;
  const pageNumber = 1;

  const recipes = await getRecipes(pageSize, pageNumber);

  return (
    <div>
      <h2 className="text-2xl font-medium mb-4">Recent Recipes</h2>

      <div className="flex flex-wrap gap-x-4 gap-y-2">
        {recipes.map((recipe) => (
          <div key={recipe.id}>
            <Link href={`/recipe/${recipe.uuid}`}>
              <div className="transition-colors px-4 py-2 rounded-xl border-2 border-dotted bg-white hover:bg-gray-100 text-gray-800 hover:text-gray-900">
                {recipe.title}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
