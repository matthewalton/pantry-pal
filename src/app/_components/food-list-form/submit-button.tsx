import { useFormStatus } from "react-dom";

type Props = {
  listHasItems: boolean;
};

export default function FoodListFormSubmitButton({ listHasItems }: Props) {
  const { pending } = useFormStatus();

  return (
    <button
      className="transition-all flex gap-2 align-baseline justify-center rounded border enabled:bg-white enabled:text-black disabled:bg-gray-100 disabled:text-gray-500 enabled:hover:bg-gray-50 px-6 py-2 font-medium"
      disabled={listHasItems || pending}
      aria-label="Find Recipe"
      type="submit"
    >
      {pending && (
        <svg
          className="animate-spin h-5 w-5 text-gray-800"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth={4}
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          ></path>
        </svg>
      )}
      Create Recipe
    </button>
  );
}
