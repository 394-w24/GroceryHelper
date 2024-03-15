import React from "react";
import { describe, it, expect, beforeEach, cleanup } from "vitest";
import { render, screen } from "@testing-library/react";
import FoodList from "../Components/FoodList";

const mockFoodItems = [
  {
    productId: "mockedProductId",
    quantity: 1,
    storageType: "Fridge",
    userId: "mockedUserId",
    id: "mockedId",
  },
  {
    productId: "mockedProductId",
    quantity: 4,
    storageType: "Freezer",
    userId: "mockedUserId",
    id: "mockedId",
  },
];

describe("FoodList Component", () => {
  it("displays only items from the fridge", () => {
    const fridgeItems = mockFoodItems.filter(item => item.storageType === "Fridge");

    render(<FoodList foodItems={fridgeItems} />);

    fridgeItems.forEach(item => {
      const quantityText = item.quantity === 1 ? `1pc` : `${item.quantity}pcs`;
      expect(screen.getByText(quantityText)).toBeDefined();
    });

  });

  afterEach(cleanup);
});
