import OpenAI from "openai";
import { OpenAIStream, StreamingTextResponse } from "ai";
import { RecipeStats } from "@/types/Recipe";
import { NextRequest, NextResponse } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

export const runtime = "edge";

export async function GET(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const slug = params.slug;

  console.log(req.cookies.getAll());

  const allRecipes = JSON.parse(
    req.cookies.get("recipes")?.value ?? "[]"
  ) as RecipeStats[];

  if (allRecipes.length === 0) {
    return NextResponse.json({
      status: 400,
      error: "No recipes in session storage to generate.",
    });
  }

  const recipeStats = allRecipes.find((recipe) => recipe.slug === slug);

  if (!recipeStats) {
    return NextResponse.json({
      status: 400,
      error: `Could not find recipe with slug: ${slug}`,
    });
  }

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant that provides a recipe.",
      },
      { role: "user", content: `Create a recipe for ${recipeStats.title}.` },
      {
        role: "assistant",
        content: "The recipe should have the following details:",
      },
      {
        role: "assistant",
        content: `Difficulty: ${recipeStats.difficulty}/10`,
      },
      {
        role: "assistant",
        content: `Portions: ${recipeStats.portions}`,
      },
      {
        role: "user",
        content:
          "Provide the list of ingredients and steps to make the recipe.",
      },
    ],
    temperature: 0.7,
    stream: true,
  });

  const stream = OpenAIStream(response);
  return new StreamingTextResponse(stream);
}
