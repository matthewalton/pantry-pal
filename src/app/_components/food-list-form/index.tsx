"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useSignInPanel } from "../Providers";
import FoodListInput from "../food-list-input";
import { createRecipe } from "./action";
import { useFormState } from "react-dom";

export default function FoodListForm() {
  const [formState, formAction] = useFormState(createRecipe, { message: "" });
  const [foodList, setFoodList] = useState<string[]>([]);
  const { data: session } = useSession();
  const { openPanel } = useSignInPanel();

  const handleFormSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!session) openPanel();
  };

  const handleAddItemToList = (foodItem: string) => {
    const capitalizedFoodItem = (
      foodItem.charAt(0).toUpperCase() + foodItem.slice(1)
    ).trim();

    if (foodList.includes(capitalizedFoodItem)) {
      formState.message = "Item is already in your food list.";
      return;
    }

    setFoodList((prevArray) => [...prevArray, capitalizedFoodItem]);
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
      action={formAction}
    >
      <FoodListInput onAddItemToList={handleAddItemToList} />

      {formState.message && (
        <span className="text-red-500 text-sm mx-auto">
          {formState.message}
        </span>
      )}

      <ul className="px-1">
        {foodList.map((item, index) => {
          return (
            <li
              key={item}
              className="flex items-center justify-between gap-2 font-mono ease-in-out animate-in fade-in slide-in-from-bottom-4"
            >
              <span>{item}</span>
              <span
                role="button"
                className="text-xl text-red-500"
                onClick={() => handleRemoveItemClick(index)}
                aria-label="Remove Food Item"
                data-testid={`remove-item-${index}`}
              >
                &times;
              </span>
            </li>
          );
        })}
      </ul>

      <input type="hidden" name="foodList" value={JSON.stringify(foodList)} />

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
