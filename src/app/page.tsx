import BuildFoodList from "@/components/FoodList/BuildFoodList";

export default function Home() {
  return (
    <div className="flex flex-col gap-5 items-stretch max-w-lg mx-auto">
      <BuildFoodList />
    </div>
  );
}
