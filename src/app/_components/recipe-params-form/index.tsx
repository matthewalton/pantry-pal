import DifficultyInput from "../recipe-difficulty-input";
import PortionsInput from "../recipe-portions-input";

type Props = {
  difficulty: string;
  portions: string;
};

export default function RecipeParams({ difficulty, portions }: Props) {
  return (
    <form className="flex flex-col gap-2">
      <div className="flex gap-2">
        <DifficultyInput difficulty={difficulty} />
        <PortionsInput portions={portions} />
      </div>

      <button
        type="submit"
        className={`transition-colors text-black font-medium py-1 px-4 rounded hover:bg-gray-100 border`}
      >
        Apply Changes
      </button>
    </form>
  );
}
