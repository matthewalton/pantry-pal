import BuildFoodList from "@/components/FoodList/BuildFoodList";
import { cookies } from "next/headers";

export default function Home() {
  const handleSetCookie = async (foodList: string[]) => {
    "use server";

    cookies().set("foodItems", JSON.stringify(foodList));
  };

  return (
    <div className="flex flex-col gap-5 place-items-center">
      <BuildFoodList setCookieHandler={handleSetCookie} />
    </div>
  );
}
