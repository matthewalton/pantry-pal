import { render } from "@testing-library/react";
import BuildFoodList from "../src/components/FoodList/BuildFoodList";

// Mock useRouter:
jest.mock("next/navigation", () => ({
  useRouter() {
    return {
      prefetch: () => null,
    };
  },
}));

describe("BuildFoodList component", () => {
  it("renders BuildFoodList component without errors", () => {
    render(<BuildFoodList />);
  });
});
