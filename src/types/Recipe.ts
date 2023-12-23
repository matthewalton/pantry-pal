interface Recipe {
  title: string;
  slug: string;
}

interface Stats {
  difficulty: number; // Difficulty out of 10
  prepTime: number; // Time in minutes
  cookTime: number; // Time in minutes
  portions: number;
}

type RecipeStats = Recipe & Stats;

export type { Recipe, RecipeStats };
