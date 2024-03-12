import { describe, it, beforeEach, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Footer from "./Footer";
import Product from "../Pages/Product";

vi.mock("../Firebase.js");

describe("Check if clicking camera input button navigates Product page", () => {
	beforeEach(() => {
		vi.mock("../Firebase", async () => {
			const firebase = await vi.importActual("../Firebase");
			return {
				...firebase,
			};
		});

		render(
			<MemoryRouter>
				<Footer />
				<Product />
			</MemoryRouter>
		);
	});
	it("should redirect to Product page", async () => {
		// Wait for redirection to complete
		const cameraButton = screen.getByTestId("camera-button");
		expect(cameraButton).toBeDefined();
		fireEvent.click(cameraButton);
		expect(
			screen.queryByText(/Take a picture of your grocery, one at a time/i)
		).toBeDefined();
	});
});
