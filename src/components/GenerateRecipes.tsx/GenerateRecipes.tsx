import { fetchRecipes } from "@/app/services/api";
import { RecipeStats } from "@/types/Recipe";
import { useEffect, useState } from "react";
import RecommendedRecipe from "./Recipe/RecommendedRecipe";

type Props = {
  foodList: string[];
};

export default function GenerateRecipes({ foodList }: Props) {
  const [recommendedRecipes, setRecommendedRecipes] = useState<RecipeStats[]>();

  useEffect(() => {
    const fetchData = async () => {
      if (foodList.length > 0) {
        const recipes = await fetchRecipes(foodList);
        setRecommendedRecipes(recipes);
      }
    };

    fetchData();
  }, [foodList]);

  if (!recommendedRecipes) {
    return <h2>Finding recipes...</h2>;
  }

  return (
    <>
      {recommendedRecipes?.map((recipe, index) => (
        <RecommendedRecipe key={index} recipeStats={recipe} />
      ))}
    </>
  );
}
