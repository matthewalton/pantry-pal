type Props = {
  foodList: string[];
  handleRemoveItemFromList: (index: number) => void;
};

export default function FoodListItemList({
  foodList,
  handleRemoveItemFromList,
}: Props) {
  return (
    <>
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
                  onClick={() => handleRemoveItemFromList(index)}
                  aria-label="Remove Food Item"
                >
                  &times;
                </span>
              </li>
            );
          })}
        </ul>
      )}
    </>
  );
}
