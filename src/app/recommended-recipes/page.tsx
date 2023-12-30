import { fetchRecipes } from "@/services/api";
import RecipeStatsCard from "@/components/Recipe/Cards/Stats/RecipeStatsCard";
import { redirect } from "next/navigation";
import BackButton from "@/components/Buttons/BackButton";

export default async function Page({
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

  const recipes = await fetchRecipes(items, difficulty, portions);

  return (
    <div className="flex flex-col gap-5">
      <BackButton />

      {recipes?.map((recipe, index) => (
        <RecipeStatsCard key={index} recipeStats={recipe} showLink={true} />
      ))}
    </div>
  );
}
