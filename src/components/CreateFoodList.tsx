"use client";

import { useState } from "react";

export default function CreateFoodList() {
  const [foodList, setFoodList] = useState<string[]>([]);
  const [foodItem, setFoodItem] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleFormSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Ensure foodItem has a starting capital letter
    const capitalizedFoodItem =
      foodItem.charAt(0).toUpperCase() + foodItem.slice(1);

    // Check if the current item is already in the array
    if (foodList.includes(capitalizedFoodItem)) {
      setError("Item is already in your food list.");
      return;
    }

    setFoodList((prevArray) => [...prevArray, capitalizedFoodItem]);
    setFoodItem("");
    setError("");
  };

  return (
    <div className="flex flex-col gap-5 place-items-center">
      {error && <span className="text-red-500 text-sm">{error}</span>}

      <form className="flex" onSubmit={handleFormSubmit}>
        <input
          type="text"
          value={foodItem}
          className="border rounded-md rounded-r-none px-4 py-2 focus:outline-none focus:border-blue-500 text-gray-800"
          onChange={(e) => setFoodItem(e.target.value)}
          placeholder="Enter item"
        />
        <button
          className="rounded rounded-l-none transition-colors bg-green-600 enabled:hover:bg-green-700 disabled:opacity-75 px-6 py-2"
          disabled={!foodItem.trim()}
          type="submit"
        >
          Add
        </button>
      </form>

      <h3 className="font-bold">Food List</h3>
      <ul>
        {foodList.map((item) => {
          return <li key={item}>{item}</li>;
        })}
      </ul>
    </div>
  );
}
