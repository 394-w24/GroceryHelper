import React from "react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, fireEvent, screen } from "@testing-library/react";
import OnboardingPopup from "./OnboardingPopup";

describe("OnboardingPopup", () => {
  const mockOnClose = vi.fn();

  beforeEach(() => {
    render(<OnboardingPopup onClose={mockOnClose} />);
  });

  it("renders without crashing", () => {
    expect(screen.getByText("Welcome to Our App!")).toBeDefined();
  });

  it("navigates to previous slide", () => {
    const nextButton = screen.getByText("Next");
    fireEvent.click(nextButton);
    const backButton = screen.getByText("Back");
    fireEvent.click(backButton);
    expect(screen.getByText("Welcome to Our App!")).toBeDefined();
  });

  it("closes on click of close button", () => {
    const closeButton = screen.getByTestId("close-button");
    fireEvent.click(closeButton);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("displays correct content for each step", () => {
    expect(screen.getByText("Welcome to Our App!")).toBeDefined();
    expect(
      screen.getByText(
        "We're excited to have you onboard. Let's get you started."
      )
    ).toBeDefined();
  });
});
