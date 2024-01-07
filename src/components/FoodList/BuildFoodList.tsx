"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import FoodListItemInput from "./Inputs/FoodListItemInput";
import FoodListItemList from "./FoodListItemList";
import FoodListDifficultyInput from "./Inputs/FoodListDifficultyInput";
import FoodListPortionsInput from "./Inputs/FoodListPortionsInput";

export default function BuildFoodList() {
  const [foodList, setFoodList] = useState<string[]>([]);
  const [showOptions, setShowOptions] = useState<boolean>(false);

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
    const portionsInput = formElements.namedItem(
      "portions"
    ) as HTMLInputElement;

    let queryString = `?items=${encodeURIComponent(foodList.join(","))}`;

    const difficulty = difficultyInput.value;
    if (difficulty) {
      queryString += `&difficulty=${difficulty}`;
    }

    const portions = portionsInput.value;
    if (portions) {
      queryString += `&portions=${portions}`;
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
            className="flex flex-col gap-3 md:min-w-[200px]"
            onSubmit={handleFindRecipeSubmit}
          >
            <div
              data-testid="options-div"
              className={`${
                showOptions ? "flex" : "hidden"
              } flex flex-col gap-2`}
            >
              <FoodListDifficultyInput />

              <FoodListPortionsInput />
            </div>

            <button
              className="text-sm transition-colors hover:text-gray-700"
              type="button"
              onClick={() => setShowOptions(!showOptions)}
            >
              {showOptions ? "Hide Options ▲" : "Show Options ▼"}
            </button>

            <button
              className="transition-all rounded text-white bg-yellow-500 enabled:hover:bg-yellow-600 disabled:opacity-75 px-6 py-2 font-bold"
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
