import { RecipeStats } from "@/types/Recipe";

export const generateRecipeKey = (recipeStats: RecipeStats): string => {
  const { title, difficulty, portions, prepTime, cookTime } = recipeStats;

  return `${encodeURIComponent(
    title
  )}_?difficulty=${difficulty}&portions=${portions}&prepTime=${prepTime}&cookTime=${cookTime}`;
};
