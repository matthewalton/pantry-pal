import { RecipeStats } from "@/types/Recipe";
import { db } from "@vercel/postgres";

export async function insertRecipes(recipes: RecipeStats[]) {
  const client = await db.connect();

  try {
    for (const recipe of recipes) {
      const { title, difficulty, prepTime, cookTime, portions } = recipe;

      try {
        await client.query(
          `
            INSERT INTO recipes (title, difficulty, prepTime, cookTime, portions)
            VALUES ($1, $2, $3, $4, $5)
          `,
          [title, difficulty, prepTime, cookTime, portions]
        );
      } catch (insertError) {
        console.error(`Failed to insert recipe "${title}":`, insertError);
      }
    }
  } finally {
    await client.release();
  }
}
