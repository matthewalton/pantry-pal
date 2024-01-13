type Props = {
  handleSetDifficulty: (difficulty: number) => void;
  handleSetPortions: (portions: number) => void;
};

export default function RecipeParams() {
  return (
    <form className="flex flex-col gap-2">
      <input name="difficulty" defaultValue={6} min={1} max={10}></input>
      <input name="portions" defaultValue={1} min={1} max={20}></input>

      <button type="submit">Apply Changes</button>
    </form>
  );
}
