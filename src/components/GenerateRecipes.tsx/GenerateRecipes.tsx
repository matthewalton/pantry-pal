import { fetchRecipes } from "@/app/services/api";
import { RecipeStats } from "@/types/Recipe";
import { useEffect, useState } from "react";
import RecommendedRecipe from "./Recipe/RecommendedRecipe";

type Props = {
  foodList: string[];
};

export default function GenerateRecipes({ foodList }: Props) {
  const [recommendedRecipes, setRecommendedRecipes] = useState<RecipeStats[]>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        if (foodList.length > 0) {
          const recipes = await fetchRecipes(foodList);
          setRecommendedRecipes(recipes);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [foodList]);

  if (loading) {
    return <h2>Finding recipes...</h2>;
  }

  return (
    <div className="flex flex-col gap-5">
      {recommendedRecipes?.map((recipe, index) => (
        <RecommendedRecipe key={index} recipeStats={recipe} />
      ))}
    </div>
  );
}
