import { describe, it, beforeEach, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Kitchen from "./Kitchen";
import Profile from "../Pages/Profile";

vi.mock("../Firebase.js");

describe("Check if clicking on the account icon navigates the user to the account page", () => {
  beforeEach(async () => {
    render(
      <MemoryRouter>
        <Kitchen />
        <Profile />
      </MemoryRouter>
    );
    await screen.findByTestId("profileIcon");
  });

  it("should redirect users to the /account when clicking on the account icon", async () => {
    const profileIcon = screen.getByTestId("profileIcon");
    fireEvent(profileIcon, new MouseEvent("click", { bubbles: true }));
    await screen.findByText("Account & Settings");
  });
});
