import BuildFoodList from "@/components/FoodList/BuildFoodList";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center py-[15vh] sm:py-[20vh]">
      <h1 className="mb-3 text-4xl font-medium text-black duration-1000 ease-in-out animate-in fade-in slide-in-from-bottom-3">
        Pantry Pal
      </h1>
      <p className="mb-12 text-base text-gray-500 duration-1200 ease-in-out animate-in fade-in slide-in-from-bottom-4">
        Got some food at home? See what you can make!
      </p>
      <BuildFoodList />
    </div>
  );
}
