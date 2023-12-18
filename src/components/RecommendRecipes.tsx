"use client";

import { useState } from "react";
import { RecipeStats } from "@/types/Recipe";
import BuildFoodList from "./FoodList/BuildFoodList";
import { fetchRecipes } from "@/app/services/api";

export default function RecommendRecipes() {
  const [recommendedRecipes, setRecommendedRecipes] = useState<RecipeStats[]>(
    []
  );

  const handleGenerateRecipe = async (foodList: string[]) => {
    const recommendedRecipes = await fetchRecipes(foodList);
    setRecommendedRecipes(recommendedRecipes);
  };

  return (
    <div className="flex flex-col gap-5 place-items-center">
      <BuildFoodList handleGenerateRecipeClick={() => handleGenerateRecipe} />
    </div>
  );
}
