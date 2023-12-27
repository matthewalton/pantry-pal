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
    model: "gpt-3.5-turbo",
    temperature: 0.7,
    messages: [
      {
        role: "system",
        content: "You are a helpful assistant that provides a recipe.",
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
          "Provide the list of ingredients and steps to make the recipe.",
      },
    ],
    max_tokens: 1,
  });

  return Response.json(response.choices[0].message.content);
}
