interface Recipe {
  id: number;
  uuid: string;
  title: string;
}

interface Stats {
  difficulty: number; // Difficulty out of 10
  prepTime: number; // Time in minutes
  cookTime: number; // Time in minutes
  portions: number;
}

interface Details {
  ingredients: string[];
  instructions: string[];
}

type RecipeStats = Recipe & Stats;
type RecipeDetails = Recipe & Details;

export type { Recipe, RecipeStats, RecipeDetails };
