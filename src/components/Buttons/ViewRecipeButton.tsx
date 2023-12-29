import { RecipeStats } from "@/types/Recipe";
import Link from "next/link";

type Props = {
  recipeStats: RecipeStats;
};

export default function ViewRecipeButton({ recipeStats }: Props) {
  const { title, difficulty, prepTime, cookTime, portions } = recipeStats;

  const url = `recipe/${encodeURIComponent(
    title
  )}?difficulty=${difficulty}&portions=${portions}&prepTime=${prepTime}&cookTime=${cookTime}`;

  return (
    <Link
      href={url}
      className="transition-colors rounded w-100 bg-green-600 hover:bg-green-700 p-2 text-center"
    >
      View Recipe
    </Link>
  );
}
