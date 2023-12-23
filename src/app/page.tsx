"use client";

import BuildFoodList from "@/components/FoodList/BuildFoodList";
import GenerateRecipes from "@/components/GenerateRecipes";
import { useState } from "react";

export default function Home() {
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
