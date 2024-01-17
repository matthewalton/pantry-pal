type Props = {
  foodList: string[];
  onRemoveItemClick: (index: number) => void;
};

export default function FoodListItemList({
  foodList,
  onRemoveItemClick,
}: Props) {
  return (
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
              onClick={() => onRemoveItemClick(index)}
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
