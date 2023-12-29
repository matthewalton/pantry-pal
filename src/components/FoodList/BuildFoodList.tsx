"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import FoodListItemInput from "./FoodListItemInput";
import FoodListItemList from "./FoodListItemList";
import FindRecipeButton from "../Buttons/FindRecipeButton";
import FoodListDifficultyInput from "./FoodListDifficultyInput";

export default function BuildFoodList() {
  const [foodList, setFoodList] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState<number>(6);

  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleFormSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formElements = event.currentTarget.elements;

    const foodItemInput = formElements.namedItem(
      "foodItem"
    ) as HTMLInputElement;
    const foodItem = foodItemInput.value.trim();

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
    let queryString = `?items=${encodeURIComponent(foodList.join(","))}`;

    queryString += difficulty ? `&difficulty=${difficulty}` : "";

    router.push(`recommended-recipes${queryString}`);
  };

  return (
    <>
      <FindRecipeButton
        disabled={foodList.length === 0}
        handleButtonClick={handleFindRecipeClick}
      />

      <form className="flex flex-col gap-5" onSubmit={handleFormSubmit}>
        <FoodListDifficultyInput
          difficulty={difficulty}
          onDifficultyChange={() => setDifficulty}
        />

        {error && <span className="text-red-500 text-sm">{error}</span>}

        <div className="relative">
          <FoodListItemInput key={foodList.length} />

          <FoodListItemList
            foodList={foodList}
            handleRemoveItemFromList={handleRemoveItemClick}
          />
        </div>
      </form>
    </>
  );
}
