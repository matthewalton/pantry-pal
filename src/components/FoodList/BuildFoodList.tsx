"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import FoodListItemInput from "./FoodListItemInput";
import FoodListItemList from "./FoodListItemList";
import FindRecipeButton from "../Buttons/FindRecipeButton";

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
      <FindRecipeButton
        disabled={foodList.length === 0}
        handleButtonClick={handleFindRecipeClick}
      />

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
