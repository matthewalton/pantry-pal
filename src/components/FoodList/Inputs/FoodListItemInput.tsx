import { useState } from "react";

type Props = {
  onAddItemToList: (item: string) => void;
};

export default function FoodListItemInput({ onAddItemToList }: Props) {
  const [foodItem, setFoodItem] = useState("");

  const handleFormSubmit = (event: React.ChangeEvent<HTMLFormElement>) => {
    event.preventDefault();

    onAddItemToList(foodItem);
    setFoodItem("");
  };

  return (
    <form
      className="flex h-fit w-full flex-row items-center rounded-xl bg-black px-1 shadow-lg"
      onSubmit={handleFormSubmit}
    >
      <input
        type="text"
        id="foodItem"
        autoComplete="off"
        value={foodItem}
        className="h-10 w-full resize-none bg-transparent px-2 font-mono text-base text-white placeholder:text-gray-400 sm:text-sm border-0 outline-none ring-0 focus:ring-0 transition-all duration-300"
        onChange={(e) => setFoodItem(e.target.value)}
        placeholder="Enter item"
        autoFocus
      />
      <button
        className="flex aspect-square h-8 w-8 items-center justify-center rounded-lg text-white outline-0 ring-0 hover:bg-white/25 focus-visible:bg-white/25"
        disabled={!foodItem.trim()}
        type="submit"
      >
        +
      </button>
    </form>
  );
}
