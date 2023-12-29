import OpenAI from "openai";
import { NextRequest } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

export const runtime = "edge";

export async function GET(
  req: NextRequest,
  { params }: { params: { title: string } }
) {
  const title = decodeURIComponent(params.title);

  const searchParams = req.nextUrl.searchParams;
  const difficulty = searchParams.get("difficulty");
  const portions = searchParams.get("portions");

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-1106",
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant that provides a recipe. The recipe details must include the list of ingredients and the instructions. Provide your answer in JSON structure, with an 'ingredients' property and an 'instructions' property, nested inside of an item called 'recipe'. The ingredients must be an array of strings. The instructions must be an array of strings.",
      },
      { role: "user", content: `Create a recipe for ${title}.` },
      {
        role: "assistant",
        content: "The recipe should have the following details:",
      },
      {
        role: "assistant",
        content: `Difficulty: ${difficulty}/10`,
      },
      {
        role: "assistant",
        content: `Portions: ${portions}`,
      },
      {
        role: "user",
        content:
          "Provide the list of ingredients and instructions to make the recipe.",
      },
    ],
    temperature: 0.7,
  });

  return Response.json(JSON.parse(response.choices[0].message.content ?? ""));
}
