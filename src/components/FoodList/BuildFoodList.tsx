"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import FoodListItemInput from "./Inputs/FoodListItemInput";
import FoodListItemList from "./FoodListItemList";
import FoodListDifficultyInput from "./Inputs/FoodListDifficultyInput";
import FoodListPortionsInput from "./Inputs/FoodListPortionsInput";
import { useSession } from "next-auth/react";
import { useSignInPanel } from "../Providers/SignInPanelProvider";

export default function BuildFoodList() {
  const [foodList, setFoodList] = useState<string[]>([]);
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const { data: session } = useSession();
  const { openPanel } = useSignInPanel();

  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleFindRecipeSubmit = (
    event: React.ChangeEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!session) {
      openPanel();
      return;
    }

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
    <div className="flex flex-col gap-5 items-stretch w-full max-w-lg mx-auto duration-1000 ease-in-out animate-in fade-in slide-in-from-bottom-4">
      <FoodListItemInput onAddItemToList={handleAddItemToList} />

      {error && <span className="text-red-500 text-sm">{error}</span>}

      <FoodListItemList
        foodList={foodList}
        onRemoveItemFromList={handleRemoveItemClick}
      />

      <form className="flex flex-col gap-3" onSubmit={handleFindRecipeSubmit}>
        <div
          data-testid="options-div"
          className={`${showOptions ? "flex" : "hidden"} flex flex-col gap-2`}
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
          className="transition-all rounded border enabled:bg-white enabled:text-black disabled:bg-gray-100 disabled:text-gray-500 enabled:hover:bg-gray-50 px-6 py-2 font-medium"
          disabled={foodList.length === 0}
          aria-label="Find Recipe"
          type="submit"
        >
          Find Recipe
        </button>
      </form>
    </div>
  );
}
