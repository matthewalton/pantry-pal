import BuildFoodList from "@/app/_components/food-list-form/BuildFoodList";
import CreatedRecipes from "@/app/_components/food-list-form/CreatedRecipes";

export default function Home() {
  return (
    <>
      <div className="flex flex-col items-center py-[15vh] sm:py-[20vh]">
        <h1 className="mb-3 text-4xl font-medium text-black">Pantry Pal</h1>
        <p className="mb-12 text-base text-gray-500">
          Got food at home? See what you can make!
        </p>

        <BuildFoodList />
      </div>

      <div className="duration-1000 ease-in-out animate-in fade-in slide-in-from-bottom-4">
        <CreatedRecipes />
      </div>
    </>
  );
}
