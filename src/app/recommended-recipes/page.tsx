import { redirect } from "next/navigation";
import BackButton from "@/components/Buttons/BackButton";
import RecommendedRecipes from "@/components/Recipe/RecommendedRecipes/RecommendedRecipes";
import { Suspense } from "react";
import RecipeStatsCardLoadingSkeleton from "@/components/Recipe/Cards/Stats/RecipeStatsCardLoadingSkeleton";

export default function Page({
  searchParams,
}: {
  searchParams: { [key: string]: string | undefined };
}) {
  const itemsSearchParam = decodeURIComponent(searchParams["items"] ?? "");

  if (!itemsSearchParam) {
    redirect("/");
  }

  const items = itemsSearchParam.split(",");
  const difficulty = searchParams["difficulty"];
  const portions = searchParams["portions"];

  return (
    <div className="flex items-stretch flex-col gap-5">
      <div>
        <BackButton />
      </div>

      <Suspense
        fallback={
          <>
            <RecipeStatsCardLoadingSkeleton />
            <RecipeStatsCardLoadingSkeleton />
            <RecipeStatsCardLoadingSkeleton />
          </>
        }
      >
        <RecommendedRecipes
          items={items}
          difficulty={difficulty}
          portions={portions}
        />
      </Suspense>
    </div>
  );
}
