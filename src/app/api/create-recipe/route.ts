import OpenAI from "openai";
import { NextRequest } from "next/server";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

export const runtime = "edge";

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;

  const items = searchParams.get("items");

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [
      {
        role: "system",
        content:
          "You are a helpful assistant that creates a recipe. You will be given a list of food items. You must respond with the name of a recipe that could use them.",
      },
      {
        role: "assistant",
        content: `The recipe should include: ${items}`,
      },
      {
        role: "user",
        content: "Provide the name of a recipe.",
      },
    ],
    temperature: 0.7,
  });

  return Response.json(response.choices[0].message.content);
}
