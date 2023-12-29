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

  const handleAddItemToListSubmit = (
    event: React.ChangeEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    const formElements = event.target.elements;

    const itemInput = formElements.namedItem("foodItem") as HTMLInputElement;
    const foodItem = itemInput.value.trim();

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

  return (
    <>
      <form className="flex flex-col gap-5" onSubmit={handleFindRecipeSubmit}>
        <button
          className="transition-all rounded bg-yellow-500 enabled:hover:bg-yellow-600 disabled:opacity-75 px-6 py-2 font-bold"
          disabled={foodList.length === 0}
          aria-label="Find Recipe"
          type="submit"
        >
          Find Recipe
        </button>

        <FoodListDifficultyInput />
      </form>

      {error && <span className="text-red-500 text-sm">{error}</span>}

      <form className="relative" onSubmit={handleAddItemToListSubmit}>
        <FoodListItemInput key={foodList.length} />

        <FoodListItemList
          foodList={foodList}
          onRemoveItemFromList={handleRemoveItemClick}
        />
      </form>
    </>
  );
}
