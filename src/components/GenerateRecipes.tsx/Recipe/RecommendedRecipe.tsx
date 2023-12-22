import { RecipeStats } from "@/types/Recipe";

type Props = {
  recipeStats: RecipeStats;
};

export default function RecommendedRecipe({ recipeStats }: Props) {
  const { title, difficulty, prepTime, cookTime, portions } = recipeStats;

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden w-96">
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{title}</h3>

        <div className="grid grid-cols-2 gap-1">
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <span className="mr-2">Difficulty:</span>
            <span>{difficulty}/10</span>
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <span className="mr-2">Prep Time:</span>
            <span>{prepTime} mins</span>
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <span className="mr-2">Cook Time:</span>
            <span>{cookTime} mins</span>
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-400">
            <span className="mr-2">Portions:</span>
            <span>{portions}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
