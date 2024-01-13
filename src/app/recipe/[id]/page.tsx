import RecipeForm from "@/app/_components/recipe-form";
import { getRecipe } from "@/services/db";
import { redirect } from "next/navigation";

export default async function Page({ params }: { params: { id: string } }) {
  const data = await getRecipe(params.id);
  if (!data) redirect("/");

  return (
    <div className="flex items-stretch flex-col gap-5 w-full max-w-xl mx-auto">
      <h3 className="text-2xl font-semibold">{data.title}</h3>

      <RecipeForm uuid={params.id} />
    </div>
  );
}
