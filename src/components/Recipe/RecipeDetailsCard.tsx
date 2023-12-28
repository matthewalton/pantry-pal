type Props = {
  ingredients: string[];
  instructions: string[];
};

export default function RecipeDetailsCard({
  ingredients,
  instructions,
}: Props) {
  return (
    <div className="flex flex-col gap-5">
      <ul>
        {ingredients.map((ingredient) => (
          <li key={ingredient}>{ingredient}</li>
        ))}
      </ul>

      <ol className="list-decimal gap-2">
        {instructions.map((instruction) => (
          <li key={instruction}>{instruction}</li>
        ))}
      </ol>
    </div>
  );
}
