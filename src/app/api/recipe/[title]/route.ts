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

  return Response.json(getDummyData());

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

function getDummyData() {
  return {
    recipe: {
      ingredients: [
        "8 oz fettuccine pasta",
        "2 boneless, skinless chicken breasts",
        "2 tablespoons olive oil",
        "2 cloves garlic, minced",
        "1 cup heavy cream",
        "1 cup grated Parmesan cheese",
        "1/2 cup unsalted butter",
        "Salt and pepper to taste",
        "Fresh parsley for garnish",
      ],
      instructions: [
        "Cook the fettuccine pasta according to package instructions. Drain and set aside.",
        "Season the chicken breasts with salt and pepper. In a large skillet, heat 1 tablespoon of olive oil over medium-high heat. Add the chicken and cook until golden brown and no longer pink in the middle, about 6-7 minutes per side. Remove the chicken from the skillet and let it rest for a few minutes before slicing it into strips.",
        "In the same skillet, add the remaining tablespoon of olive oil and minced garlic. Cook for 1-2 minutes until fragrant.",
        "Reduce the heat to low and add the heavy cream, grated Parmesan cheese, and unsalted butter to the skillet. Stir continuously until the sauce is smooth and the cheese is melted.",
        "Add the cooked fettuccine pasta to the skillet and toss until well coated with the Alfredo sauce.",
        "Add the sliced chicken to the skillet and gently mix it with the pasta and sauce.",
        "Season with salt and pepper to taste.",
        "Garnish with fresh parsley and serve hot.",
      ],
    },
  };
}
