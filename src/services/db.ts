"use server";

import { RecipeStats } from "@/types/Recipe";
import { db } from "@vercel/postgres";

export async function insertRecipe(recipeTitle: string, uuid: string) {
  const client = await db.connect();

  try {
    const existingRecipe = await client.query(
      "SELECT 1 FROM recipes WHERE title = $1",
      [recipeTitle]
    );

    if (existingRecipe.rows.length === 0) {
      await client.query("INSERT INTO recipes (title, uuid) VALUES ($1, $2)", [
        recipeTitle,
        uuid,
      ]);
    }
  } finally {
    client.release();
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
    client.release();
  }
}

export async function getRecipe(uuid: string) {
  const client = await db.connect();

  try {
    const { rows } = await client.query<RecipeStats>(
      "SELECT * FROM RECIPES WHERE uuid = $1 LIMIT 1;",
      [uuid]
    );
    return rows[0];
  } finally {
    client.release();
  }
}
