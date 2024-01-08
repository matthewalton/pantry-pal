import { sql } from "@vercel/postgres";

export default async function CreatedRecipes() {
  const pageSize = 9; // Number of records per page
  const pageNumber = 1; // Specific page number

  const offset = (pageNumber - 1) * pageSize;

  const { rows } =
    await sql`SELECT * from RECIPES ORDER BY id DESC LIMIT ${pageSize} OFFSET ${offset};`;

  return (
    <div>
      <h2 className="text-lg font-medium mb-4">Recent Recipes</h2>

      {rows.map((row) => (
        <div key={row.id}>
          {row.id} - {row.title}
        </div>
      ))}
    </div>
  );
}
