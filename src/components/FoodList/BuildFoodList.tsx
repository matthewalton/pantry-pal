"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  setCookieHandler: (foodList: string[]) => void;
};

export default function BuildFoodList({ setCookieHandler }: Props) {
  const [foodList, setFoodList] = useState<string[]>([]);
  const [foodItem, setFoodItem] = useState<string>("");
  const [error, setError] = useState<string>("");
  const router = useRouter();

  const handleFormSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    const capitalizedFoodItem =
      foodItem.charAt(0).toUpperCase() + foodItem.slice(1);

    if (foodList.includes(capitalizedFoodItem)) {
      setError("Item is already in your food list.");
      return;
    }

    setFoodList((prevArray) => [...prevArray, capitalizedFoodItem]);
    setFoodItem("");
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
        <form className="flex" onSubmit={handleFormSubmit}>
          <input
            type="text"
            value={foodItem}
            className="border rounded-md rounded-r-none px-4 py-2 focus:outline-none focus:border-blue-500 text-gray-800"
            onChange={(e) => setFoodItem(e.target.value)}
            placeholder="Enter item"
          />
          <button
            className="transition-all rounded rounded-l-none bg-green-600 enabled:hover:bg-green-700 disabled:opacity-75 px-4 py-2"
            disabled={!foodItem.trim()}
            type="submit"
          >
            Add
          </button>
        </form>

        {foodList.length > 0 && (
          <ul className="absolute w-full p-6 rounded-b">
            {foodList.map((item, index) => {
              return (
                <li
                  key={item}
                  className="flex items-center justify-between gap-2"
                >
                  <span>{item}</span>
                  <span
                    role="button"
                    className="text-xl text-red-500"
                    onClick={() => handleRemoveItemClick(index)}
                    aria-label="Remove Food Item"
                  >
                    &times;
                  </span>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </>
  );
}
