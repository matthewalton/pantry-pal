"use client";

import { useState } from "react";
import BuildFoodList from "./FoodList/BuildFoodList";
import GenerateRecipes from "./GenerateRecipes.tsx/GenerateRecipes";

export default function RecommendRecipes() {
  const [activeFoodList, setActiveFoodList] = useState<string[]>([]);

  return (
    <div className="flex flex-col gap-5 place-items-center">
      {activeFoodList.length === 0 && (
        <BuildFoodList handleGenerateRecipeClick={setActiveFoodList} />
      )}

      <GenerateRecipes foodList={activeFoodList} />
    </div>
  );
}
