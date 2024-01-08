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

export async function getRecipes(pageSize: number, pageNumber: number) {
  const client = await db.connect();
  const offset = (pageNumber - 1) * pageSize;

  try {
    const { rows } = await client.query<RecipeStats>(
      `SELECT * from RECIPES ORDER BY id DESC LIMIT ${pageSize} OFFSET ${offset};`
    );

    return rows;
  } finally {
    await client.release();
  }
}
