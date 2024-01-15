import RecipeParamsEdit from "@/app/_components/recipe-params-edit";
import RecipeParamsForm from "@/app/_components/recipe-params-form";
import RecipeSteps from "@/app/_components/recipe-steps";
import RecipeStepsLoading from "@/app/_components/recipe-steps/loading";
import { getRecipe } from "@/services/db";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function Page({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { difficulty: string; portions: string };
}) {
  const data = await getRecipe(params.id);
  if (!data) redirect("/");

  const { difficulty, portions } = searchParams;

  return (
    <div className="flex items-stretch flex-col gap-5 w-full max-w-xl mx-auto">
      <h3 className="text-2xl font-semibold">{data.title}</h3>

      <RecipeParamsEdit difficulty={difficulty} portions={portions}>
        <RecipeParamsForm difficulty={difficulty} portions={portions} />
      </RecipeParamsEdit>

      <RecipeSteps
        uuid={params.id}
        params={{
          difficulty: difficulty,
          portions: portions,
        }}
      />
    </div>
  );
}
