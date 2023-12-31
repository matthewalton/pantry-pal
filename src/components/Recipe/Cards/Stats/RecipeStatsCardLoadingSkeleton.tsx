export default function RecipeStatsCardLoadingSkeleton() {
  return (
    <div className="animate-pulse bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden w-96">
      <div className="flex flex-col gap-3 p-4">
        <div className="h-6 bg-slate-700 rounded w-2/3"></div>

        <div className="grid grid-cols-2 gap-3">
          <div className="flex gap-1 items-center text-gray-600 dark:text-gray-400">
            <span className="h-3 bg-slate-700 rounded w-1/4"></span>
            <span className="h-3 bg-slate-700 rounded w-1/6"></span>
          </div>
          <div className="flex gap-1 items-center text-gray-600 dark:text-gray-400">
            <span className="h-3 bg-slate-700 rounded w-1/4"></span>
            <span className="h-3 bg-slate-700 rounded w-1/6"></span>
          </div>
          <div className="flex gap-1 items-center text-gray-600 dark:text-gray-400">
            <span className="h-3 bg-slate-700 rounded w-1/4"></span>
            <span className="h-3 bg-slate-700 rounded w-1/6"></span>
          </div>
          <div className="flex gap-1 items-center text-gray-600 dark:text-gray-400">
            <span className="h-3 bg-slate-700 rounded w-1/4"></span>
            <span className="h-3 bg-slate-700 rounded w-1/6"></span>
          </div>
        </div>

        <div className="h-8 bg-slate-700 rounded w-full"></div>
      </div>
    </div>
  );
}
