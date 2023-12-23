"use server";

import { RecipeStats } from "@/types/Recipe";
import { slugify } from "./str";
import { cookies } from "next/headers";

export const getRecipe = async (
  slug: string,
  difficulty: number,
  portions: number
) => {
  return getDummyRecipeDetails();

  try {
    const res = await fetch(
      `${process.env.URL}/api/recipe/${slug}?difficulty=${difficulty}&portions=${portions}`,
      {
        method: "GET",
      }
    );

    const data = await res.json();
    console.log(data);

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    return data;
  } catch (error) {
    console.error("Error fetching recipe:", error);
    throw new Error("Failed to fetch recipe");
  }
};

export const fetchRecipes = async (
  foodItems: string[]
): Promise<RecipeStats[]> => {
  return getDummyRecipes();

  try {
    const res = await fetch("/api/recommend-recipe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ foodItems }),
    });

    if (!res.ok) {
      throw new Error("Failed to fetch data");
    }

    const data = await res.json();

    const recipes = JSON.parse(data).recipes.map((recipe: RecipeStats) => {
      const slug = slugify(recipe.title);
      return { ...recipe, slug };
    });

    cookies().set("recipes", JSON.stringify(recipes));
    return recipes;
  } catch (error) {
    console.error("Error fetching recipes:", error);
    throw new Error("Failed to fetch recipes");
  }
};

/**
 * Return dummy recipe details for testing.
 *
 * @returns array
 */
function getDummyRecipeDetails(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const recipeDetails =
        "Ingredients: - 4 boneless, skinless chicken breasts - 1 tablespoon olive oil - 1 teaspoon garlic powder - 1 teaspoon paprika - 1/2 teaspoon salt - 1/2 teaspoon black pepper - 1 cup chicken broth - 2 tablespoons butter - 2 tablespoons all-purpose flour - 1/2 cup heavy cream - Fresh parsley, for garnish (optional) Instructions: 1. Preheat the oven to 400°F (200°C). 2. In a small bowl, combine the garlic powder, paprika, salt, and black pepper. Set aside. 3. Heat the olive oil in a large oven-safe skillet over medium-high heat. 4. Season the chicken breasts on both sides with the spice mixture. 5. Place the chicken breasts in the skillet and cook for 3-4 minutes on each side until golden brown. 6. Remove the chicken from the skillet and set aside. 7. In the same skillet, melt the butter over medium heat. 8. Stir in the flour and cook for 1-2 minutes until lightly browned. 9. Slowly whisk in the chicken broth, scraping the bottom of the skillet to release any browned bits. 10. Bring the mixture to a simmer and cook for 2-3 minutes until thickened. 11. Stir in the heavy cream and cook for an additional 2 minutes. 12. Return the chicken breasts to the skillet, spooning the sauce over them. 13. Transfer the skillet to the preheated oven and bake for 15-20 minutes until the chicken is cooked through and reaches an internal temperature of 165°F (74°C). 14. Remove the skillet from the oven and let it rest for a few minutes. 15. Serve the chicken breasts with the creamy sauce spooned over the top. 16. Garnish with fresh parsley, if desired. 17. Enjoy your delicious dummy-recipe-1!";
      resolve(recipeDetails);
    }, 2000);
  });
}

/**
 * Return dummy recipes for testing.
 *
 * @returns array
 */
function getDummyRecipes(): Promise<RecipeStats[]> {
  return new Promise((resolve) => {
    const recipes = [
      {
        title: "Dummy Recipe 1",
        slug: "dummy-recipe-1",
        difficulty: 5,
        prepTime: 20,
        cookTime: 30,
        portions: 4,
      },
      {
        title: "Dummy Recipe 2",
        slug: "dummy-recipe-2",
        difficulty: 3,
        prepTime: 15,
        cookTime: 25,
        portions: 2,
      },
      {
        title: "Dummy Recipe 3",
        slug: "dummy-recipe-3",
        difficulty: 7,
        prepTime: 25,
        cookTime: 40,
        portions: 6,
      },
    ];

    cookies().set("recipes", JSON.stringify(recipes));

    setTimeout(() => {
      cookies().set("recipes", JSON.stringify(recipes));
      resolve(recipes);
    }, 2000);
  });
}
