"use server";

import { insertRecipe } from "@/services/db";
import { redirect } from "next/navigation";

interface FormState {
  message: string;
}

export async function createRecipe(
  prevFormState: FormState | null,
  formData: FormData
): Promise<FormState> {
  const foodList = formData.get("foodList") as string | null;

  if (!foodList) return { message: "" };

  const foodListQueryParam = JSON.parse(foodList).join(",");

  let recipeTitle = "";

  try {
    const res = await fetch(
      `${process.env.URL}/api/create-recipe?items=${encodeURIComponent(
        foodListQueryParam
      )}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      return { message: "Connection error, failed to create recipe." };
    }

    recipeTitle = await res.json();
    await insertRecipe(recipeTitle);
  } catch (error) {
    console.error(error);
    return { message: "Connection error, please refresh the page." };
  }

  if (!recipeTitle) {
    redirect("/");
  }

  redirect(`/recipe/${encodeURIComponent(recipeTitle)}`);
}
