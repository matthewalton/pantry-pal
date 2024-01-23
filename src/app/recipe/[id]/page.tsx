import RecipeParamsEdit from "@/app/_components/recipe/recipe-params-edit";
import RecipeParamsForm from "@/app/_components/recipe/recipe-params-form";
import RecipeSteps from "@/app/_components/recipe/recipe-steps";
import { getRecipe } from "@/services/db";
import { redirect } from "next/navigation";

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
    <div className="mx-auto flex w-full max-w-xl flex-col items-stretch gap-5">
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
