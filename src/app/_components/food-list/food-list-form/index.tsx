"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { useSignInPanel } from "../../Providers";
import FoodListInput from "../food-list-input";
import { createRecipe } from "./action";
import { useFormState, useFormStatus } from "react-dom";
import FoodListFormSubmitButton from "./submit-button";
import FoodListItemList from "../food-list-item-list";

export default function FoodListForm() {
  const [formState, formAction] = useFormState(createRecipe, { message: "" });
  const [foodList, setFoodList] = useState<string[]>([]);
  const { data: session } = useSession();
  const { openPanel } = useSignInPanel();
  const { pending } = useFormStatus();

  const handleAuthCheck = (event: React.ChangeEvent<HTMLFormElement>) => {
    if (!session) {
      event.preventDefault();
      openPanel();
    }
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
      onSubmit={handleAuthCheck}
    >
      <FoodListInput onAddItemToList={handleAddItemToList} />

      {formState.message && (
        <span className="text-red-500 text-sm mx-auto">
          {formState.message}
        </span>
      )}

      <FoodListItemList
        foodList={foodList}
        onRemoveItemClick={handleRemoveItemClick}
      />

      <input type="hidden" name="foodList" value={JSON.stringify(foodList)} />

      <FoodListFormSubmitButton listHasItems={foodList.length === 0} />
    </form>
  );
}
