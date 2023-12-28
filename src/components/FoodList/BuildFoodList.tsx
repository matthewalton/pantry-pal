"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import FoodListItemInput from "./FoodListItemInput";
import FoodListItemList from "./FoodListItemList";

type Props = {
  setCookieHandler: (foodList: string[]) => void;
};

export default function BuildFoodList({ setCookieHandler }: Props) {
  const [foodList, setFoodList] = useState<string[]>([]);
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleAddItemToList = (foodItem: string) => {
    const capitalizedFoodItem =
      foodItem.charAt(0).toUpperCase() + foodItem.slice(1);

    if (foodList.includes(capitalizedFoodItem)) {
      setError("Item is already in your food list.");
      return;
    }

    setFoodList((prevArray) => [...prevArray, capitalizedFoodItem]);
    setError("");
  };

  const handleRemoveItemClick = (index: number) => {
    const newFoodList = [...foodList];

    if (index >= 0 && index < foodList.length) {
      newFoodList.splice(index, 1);
    }

    setFoodList(newFoodList);
  };

  const handleFindRecipeClick = () => {
    setCookieHandler(foodList);
    router.push("recommended-recipes");
  };

  return (
    <>
      <button
        className="transition-all rounded bg-yellow-500 enabled:hover:bg-yellow-600 disabled:opacity-75 px-6 py-2 font-bold"
        disabled={foodList.length === 0}
        onClick={() => handleFindRecipeClick()}
        aria-label="Find Recipe"
      >
        Find Recipe
      </button>

      {error && <span className="text-red-500 text-sm">{error}</span>}

      <div className="relative">
        <FoodListItemInput handleAddItemToList={handleAddItemToList} />

        <FoodListItemList
          foodList={foodList}
          handleRemoveItemFromList={handleRemoveItemClick}
        />
      </div>
    </>
  );
}
