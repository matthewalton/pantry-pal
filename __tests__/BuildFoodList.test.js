import "@testing-library/jest-dom";
import { render, fireEvent } from "@testing-library/react";
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

  it("adds item to the food list", () => {
    const { getByPlaceholderText, getByText } = render(<BuildFoodList />);

    const input = getByPlaceholderText("Enter item");
    fireEvent.change(input, { target: { value: "New Food Item" } });

    const addButton = getByText("Add");
    fireEvent.click(addButton);

    expect(getByText("New Food Item")).toBeInTheDocument();
  });
});
