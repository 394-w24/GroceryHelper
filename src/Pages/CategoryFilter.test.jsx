import React from "react";
import { describe, it, expect, beforeEach } from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import HomePage from "./HomePage";

const mockFoodItems = [
  {
    id: "item1",
    name: "Butter",
    storageType: "Fridge",
    // other properties
  },
  {
    id: "item2",
    name: "Bread",
    storageType: "Pantry",
    // other properties
  },
  // Add more items as necessary
];

describe("HomePage", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
  });

  it("displays only items from the selected category", async () => {
    const categories = ["All", "Fridge", "Freezer", "Pantry"];

    for (const category of categories) {
      fireEvent.click(screen.getByText(category));

      const expectedItems = mockFoodItems.filter(
        (item) => category === "All" || item.storageType === category
      );

      for (const item of expectedItems) {
        // Use findByText for potentially asynchronous updates
        const itemElement = await screen.findByText(item.name);
        expect(itemElement).toBeDefined(); // Vitest uses toBeDefined
      }
    }
  });
});
