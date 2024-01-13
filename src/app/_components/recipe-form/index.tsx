"use client";

import { useState } from "react";
import RecipeParams from "../recipe-params";
import RecipeSteps from "../recipe-steps";

type Props = {
  uuid: string;
};

export default function RecipeForm({ uuid }: Props) {
  const [difficulty, setDifficulty] = useState<number>(6);
  const [portions, setPortions] = useState<number>(1);

  return (
    <>
      <RecipeParams />

      <RecipeSteps
        uuid={uuid}
        params={{
          difficulty: difficulty.toString(),
          portions: portions.toString(),
        }}
      />
    </>
  );
}
