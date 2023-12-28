type Props = {
  disabled: boolean;
  handleButtonClick: () => void;
};

export default function FindRecipeButton({
  disabled,
  handleButtonClick,
}: Props) {
  return (
    <button
      className="transition-all rounded bg-yellow-500 enabled:hover:bg-yellow-600 disabled:opacity-75 px-6 py-2 font-bold"
      disabled={disabled}
      onClick={() => handleButtonClick()}
      aria-label="Find Recipe"
    >
      Find Recipe
    </button>
  );
}
