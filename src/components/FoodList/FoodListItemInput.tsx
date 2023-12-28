import { useState } from "react";

type Props = {
  handleAddItemToList: (foodItem: string) => void;
};

export default function FoodListItemInput({ handleAddItemToList }: Props) {
  const [foodItem, setFoodItem] = useState("");

  const handleFormSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();
    handleAddItemToList(foodItem);
    setFoodItem("");
  };

  return (
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
  );
}