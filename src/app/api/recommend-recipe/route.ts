import OpenAI from "openai";
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || "",
});

export const runtime = "edge";

export async function POST(req: NextRequest) {
  const { foodItems } = await req.json();

  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo-1106",
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content:
          "You will be provided with a list of food items, and your task is to recommend 3 recipes using them. Respond with a recipe name, difficulty, prep time, cook time, and how many it serves. Provide your answer in JSON structure, where each item is structured as {'title': '<Name of recipe>', 'difficulty': '<Number between 1 and 10>', 'prepTime': '<Time in minutes>', 'cookTime': '<Time in minutes>', 'portions': '<Number of portions the recipe is for>'} inside a 'recipes' property.",
      },
      {
        role: "user",
        content: foodItems.join(", "),
      },
    ],
    temperature: 0.7,
  });

  return NextResponse.json(response.choices[0].message.content);
}
