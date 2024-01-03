import { RecipeStats } from "@/types/Recipe";

export const generateRecipeKey = (recipeStats: RecipeStats): string => {
  const { title, difficulty, portions, prepTime, cookTime } = recipeStats;

  return `${encodeURIComponent(
    title
  )}_?difficulty=${difficulty}&portions=${portions}&prepTime=${prepTime}&cookTime=${cookTime}`;
};

export const getRecipeStatsFromKey = (key: string): RecipeStats => {
  const [title, queryParams] = key.split("_?");

  const params = new URLSearchParams(queryParams);
  const difficulty = Number(params.get("difficulty")) || 0;
  const prepTime = Number(params.get("prepTime")) || 0;
  const cookTime = Number(params.get("cookTime")) || 0;
  const portions = Number(params.get("portions")) || 0;

  return {
    title: decodeURIComponent(title),
    difficulty,
    prepTime,
    cookTime,
    portions,
  };
};
