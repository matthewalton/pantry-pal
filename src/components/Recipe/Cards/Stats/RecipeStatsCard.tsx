import { RecipeStats } from "@/types/Recipe";
import ViewRecipeButton from "../../../Buttons/ViewRecipeButton";

type Props = {
  recipeStats: RecipeStats;
  showLink: boolean;
};

export default function RecipeStatsCard({ recipeStats, showLink }: Props) {
  const { title, difficulty, prepTime, cookTime, portions } = recipeStats;

  return (
    <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg">
      <div className="flex flex-col gap-3 p-4">
        <h3 className="text-xl font-semibold">{title}</h3>

        <div className="grid sm:grid-cols-2 gap-x-5 gap-y-1">
          <div className="flex flex-wrap gap-1 text-gray-600 dark:text-gray-400">
            <span className="font-bold">Difficulty:</span>
            <span>{difficulty}/10</span>
          </div>
          <div className="flex flex-wrap gap-1 text-gray-600 dark:text-gray-400">
            <span className="font-bold">Prep Time:</span>
            <span>{prepTime} mins</span>
          </div>
          <div className="flex flex-wrap gap-1 text-gray-600 dark:text-gray-400">
            <span className="font-bold">Cook Time:</span>
            <span>{cookTime} mins</span>
          </div>
          <div className="flex flex-wrap gap-1 text-gray-600 dark:text-gray-400">
            <span className="font-bold">Portions:</span>
            <span>{portions}</span>
          </div>
        </div>

        {showLink && <ViewRecipeButton recipeStats={recipeStats} />}
      </div>
    </div>
  );
}
