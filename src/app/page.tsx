import CreateFoodList from "@/components/CreateFoodList";
import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <CreateFoodList />
    </main>
  );
}
