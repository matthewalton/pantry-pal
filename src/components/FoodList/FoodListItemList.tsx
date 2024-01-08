type Props = {
  foodList: string[];
  onRemoveItemFromList: (index: number) => void;
};

export default function FoodListItemList({
  foodList,
  onRemoveItemFromList,
}: Props) {
  if (foodList.length === 0) {
    return "";
  }

  return (
    <ul className="px-1">
      {foodList.map((item, index) => {
        return (
          <li
            key={item}
            className="flex items-center justify-between gap-2 font-mono duration-1200 ease-in-out animate-in fade-in slide-in-from-bottom-4"
          >
            <span>{item}</span>
            <span
              role="button"
              className="text-xl text-red-500"
              onClick={() => onRemoveItemFromList(index)}
              aria-label="Remove Food Item"
              data-testid={`remove-item-${index}`}
            >
              &times;
            </span>
          </li>
        );
      })}
    </ul>
  );
}
