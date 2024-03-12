import { describe, it, beforeEach, vi } from "vitest";
import {
	fireEvent,
	render,
	screen,
	within,
	waitFor,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Profile from "./Profile";
import * as FirebaseModule from "../Firebase";

vi.mock("../Firebase.js");

describe("Check email setting functionality", () => {
	const localStorageMock = (() => {
		let store = {};

		return {
			getItem: (key) => store[key] || null,
			setItem: (key, value) => {
				store[key] = value.toString();
			},
			removeItem: (key) => {
				delete store[key];
			},
			clear: () => {
				store = {};
			},
		};
	})();
	localStorageMock.setItem("sendEmail", "true");
	beforeEach(() => {
		Object.defineProperty(window, "localStorage", {
			value: localStorageMock,
		});
	});
	it("Selecting an email notification option triggers firebase update", async () => {
		localStorage.setItem("sendEmail", "true");
		const { getByRole } = render(
			<MemoryRouter>
				<Profile />
			</MemoryRouter>
		);
		const notificationTab = screen.getByTestId("notification-tab");
		expect(notificationTab).toBeDefined();
		fireEvent.click(notificationTab);
		expect(getByRole("checkbox")).toBeDefined();
		expect(getByRole("checkbox")).to.have.property("checked", true);

		const selectElement = screen.getByTestId("day-select");
		selectElement.value = "48 Hrs before items expire";
		fireEvent.change(selectElement);
		expect(FirebaseModule.updateUserSettings).toHaveBeenCalled();
	});
});
