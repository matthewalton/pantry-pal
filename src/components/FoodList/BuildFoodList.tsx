"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import FoodListItemInput from "./FoodListItemInput";
import FoodListItemList from "./FoodListItemList";
import FoodListDifficultyInput from "./FoodListDifficultyInput";

export default function BuildFoodList() {
  const [foodList, setFoodList] = useState<string[]>([]);

  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleFindRecipeSubmit = (
    event: React.ChangeEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const formElements = event.target.elements;

    const difficultyInput = formElements.namedItem(
      "difficulty"
    ) as HTMLInputElement;

    let queryString = `?items=${encodeURIComponent(foodList.join(","))}`;

    const difficulty = difficultyInput.value;
    if (difficulty) {
      queryString += `&difficulty=${difficulty}`;
    }

    router.push(`recommended-recipes${queryString}`);
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
    <>
      <FoodListItemInput onAddItemToList={handleAddItemToList} />

      {error && <span className="text-red-500 text-sm">{error}</span>}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="col">
          <FoodListItemList
            foodList={foodList}
            onRemoveItemFromList={handleRemoveItemClick}
          />
        </div>
        <div className="col">
          <form
            className="flex flex-col gap-5"
            onSubmit={handleFindRecipeSubmit}
          >
            <FoodListDifficultyInput />

            <button
              className="transition-all rounded bg-yellow-500 enabled:hover:bg-yellow-600 disabled:opacity-75 px-6 py-2 font-bold"
              disabled={foodList.length === 0}
              aria-label="Find Recipe"
              type="submit"
            >
              Find Recipe
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
