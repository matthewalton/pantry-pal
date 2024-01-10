export default function RecipeDetailsLoadingSkeleton() {
  return (
    <div className="animate-pulse flex space-x-4">
      <div className="flex-1 space-y-6 py-1">
        <div className="flex flex-col gap-5">
          <ul className="space-y-2">
            <li className="h-2 bg-slate-300 rounded w-2/12"></li>
            <li className="h-2 bg-slate-300 rounded w-3/12"></li>
            <li className="h-2 bg-slate-300 rounded w-4/12"></li>
            <li className="h-2 bg-slate-300 rounded w-3/12"></li>
            <li className="h-2 bg-slate-300 rounded w-5/12"></li>
            <li className="h-2 bg-slate-300 rounded w-2/12"></li>
          </ul>

          <ul className="space-y-2">
            <li className="h-2 bg-slate-300 rounded w-4/12"></li>
            <li className="h-2 bg-slate-300 rounded w-5/12"></li>
            <li className="h-2 bg-slate-300 rounded w-6/12"></li>
            <li className="h-2 bg-slate-300 rounded w-3/12"></li>
            <li className="h-2 bg-slate-300 rounded w-4/12"></li>
            <li className="h-2 bg-slate-300 rounded w-5/12"></li>
            <li className="h-2 bg-slate-300 rounded w-6/12"></li>
            <li className="h-2 bg-slate-300 rounded w-2/12"></li>
          </ul>
        </div>
      </div>
    </div>
  );
}
