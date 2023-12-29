import OpenAI from "openai";
import { NextRequest } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const items = searchParams.get("items");
  const difficulty = searchParams.get("difficulty");

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-1106",
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant that recommends 3 recipes. There will be a given criteria that the recipes must meet. Respond with a recipe name, difficulty, prep time, cook time, and how many it serves. Provide your answer in JSON structure, where each item is structured as {'title': '<Name of recipe>', 'difficulty': '<Number between 1 and 10>', 'prepTime': '<Time in minutes>', 'cookTime': '<Time in minutes>', 'portions': '<Number of portions the recipe is for>'} inside a 'recipes' property.",
      },
      {
        role: "assistant",
        content: "The recipe should have the following details:",
      },
      {
        role: "assistant",
        content: `Food Items: ${items}`,
      },
      {
        role: "assistant",
        content: difficulty
          ? `Difficulty: ${difficulty}/10`
          : "Difficulty: any",
      },
      {
        role: "user",
        content: "Provide a list of 3 recipes that meet this criteria.",
      },
    ],
    temperature: 0.7,
  });

  return Response.json(JSON.parse(response.choices[0].message.content ?? ""));
}
