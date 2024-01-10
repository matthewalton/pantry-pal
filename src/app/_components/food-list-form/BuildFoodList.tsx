"use client";

import { useState } from "react";
import FoodListItemInput from "./food-list/inputs/FoodListItemInput";
import FoodListItemList from "./food-list/FoodListItemList";
import { useSession } from "next-auth/react";
import { useSignInPanel } from "../Providers";
import { createRecipe } from "@/services/api";

export default function BuildFoodList() {
  const [foodList, setFoodList] = useState<string[]>([]);
  const { data: session } = useSession();
  const { openPanel } = useSignInPanel();

  const [error, setError] = useState<string>("");

  const handleCreateRecipeSubmit = (
    event: React.ChangeEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!session) {
      openPanel();
      return;
    }

    createRecipe(foodList);
  };

  const handleAddItemToList = (foodItem: string) => {
    const capitalizedFoodItem = (
      foodItem.charAt(0).toUpperCase() + foodItem.slice(1)
    ).trim();

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

  return (
    <form
      className="flex flex-col gap-3 items-stretch w-full max-w-lg mx-auto duration-1000 ease-in-out animate-in fade-in slide-in-from-bottom-4"
      onSubmit={handleCreateRecipeSubmit}
    >
      <FoodListItemInput onAddItemToList={handleAddItemToList} />

      {error && <span className="text-red-500 text-sm mx-auto">{error}</span>}

      <FoodListItemList
        foodList={foodList}
        onRemoveItemFromList={handleRemoveItemClick}
      />

      <button
        className="transition-all rounded border enabled:bg-white enabled:text-black disabled:bg-gray-100 disabled:text-gray-500 enabled:hover:bg-gray-50 px-6 py-2 font-medium"
        disabled={foodList.length === 0}
        aria-label="Find Recipe"
        type="submit"
      >
        Create Recipe
      </button>
    </form>
  );
}
