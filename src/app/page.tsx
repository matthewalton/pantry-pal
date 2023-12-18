import CreateFoodList from "@/components/CreateFoodList";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="relative z-10 flex place-items-center">
        <div className="absolute h-[300px] w-[480px] -translate-x-1/2 rounded-full bg-gradient-radial from-white to-transparent blur-2xl content-[''] dark:bg-gradient-to-br dark:from-transparent dark:to-green-700 dark:opacity-10 lg:h-[360px] z-10"></div>

        <div className="relative z-20">
          <CreateFoodList />
        </div>

        <div className="absolute -z-20 h-[180px] w-[240px] translate-x-1/3 bg-gradient-conic from-emerald-200 via-green-200 blur-2xl content-[''] dark:from-emerald-900 dark:via-[#1b7540] dark:opacity-40"></div>
      </div>
    </main>
  );
}
