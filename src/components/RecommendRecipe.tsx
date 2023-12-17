type Props = {
  items: string[];
  onClick: () => void;
};

export default function RecommendRecipe({ items, onClick }: Props) {
  return (
    <button
      className="rounded bg-green-600 enabled:hover:bg-green-700 disabled:opacity-75 px-8 py-2 text-lg font-bold"
      disabled={items.length === 0}
      onClick={() => onClick()}
    >
      Get Recipe
    </button>
  );
}
