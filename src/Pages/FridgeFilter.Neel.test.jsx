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
  {
    productId: "mockedProductId",
    quantity: 6,
    storageType: "Pantry",
    userId: "mockedUserId",
    id: "mockedId",
  },
  {
    productId: "mockedProductId",
    quantity: 8,
    storageType: "Fridge",
    userId: "mockedUserId",
    id: "mockedId",
  },
  {
    productId: "mockedProductId",
    quantity: 11,
    storageType: "Freezer",
    userId: "mockedUserId",
    id: "mockedId",
  },
  {
    productId: "mockedProductId",
    quantity: 3,
    storageType: "Pantry",
    userId: "mockedUserId",
    id: "mockedId",
  },
  {
    productId: "mockedProductId",
    quantity: 2,
    storageType: "Fridge",
    userId: "mockedUserId",
    id: "mockedId",
  },
  {
    productId: "mockedProductId",
    quantity: 7,
    storageType: "Freezer",
    userId: "mockedUserId",
    id: "mockedId",
  },
  {
    productId: "mockedProductId",
    quantity: 9,
    storageType: "Pantry",
    userId: "mockedUserId",
    id: "mockedId",
  },
];

describe("FoodList Component", () => {
  it("displays only items from the selected category", () => {
    const categories = ["Fridge"];

    for (const category of categories) {
      const filteredItems = mockFoodItems.filter(
        (item) => item.storageType === category
      );

      render(<FoodList foodItems={filteredItems} />);

      for (const item of filteredItems) {
        const quantityText =
          item.quantity === 1 ? `1pc` : `${item.quantity}pcs`;
        expect(screen.getByText(quantityText)).toBeDefined();
      }
    }
  });
});
