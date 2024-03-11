import { describe, it, beforeEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Product from "./Product";
import ConfirmModal from "../Components/ConfirmModal";

describe("Check if clicking on the camera icon opens up the confirmModal to show captured image", () => {
  beforeEach(async () => {
    const mockData = {
      open: true,
      onClose: () => {},
      onConfirm: () => {},
      setChosenName: () => {},
      image: "testImage",
      name: "testName",
      allData: [],
    };

    render(
      <MemoryRouter>
        <Product />
        <ConfirmModal
          open={mockData.open}
          onClose={mockData.onClose}
          onConfirm={mockData.onConfirm}
          setChosenName={mockData.setChosenName}
          image={mockData.image}
          name={mockData.name}
          allData={mockData.allData}
        />
      </MemoryRouter>
    );
    await screen.findByText("Take a picture of your grocery, one at a time");
  });

  it("should open up confirmModal when clicking on the camera icon", async () => {
    const cameraCaptureButton = screen.getByTestId("cameraIconButton");
    fireEvent(cameraCaptureButton, new MouseEvent("click", { bubbles: true }));
    await screen.findByText("We have detected");
  });
});
