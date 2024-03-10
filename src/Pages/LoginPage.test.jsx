import React from "react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";

import { MemoryRouter } from "react-router-dom";
import App from "../App";

import * as FirebaseModule from "../Firebase";

describe("LoginPage", () => {
  //mocking firebase modules
  vi.mock("../Firebase", () => ({
    signUpWithGoogle: vi.fn(() => Promise.resolve({ uid: "testUid" })),
    checkIfLoggedIn: vi.fn(),

    getUserData: vi.fn(() =>
      Promise.resolve({
        uid: "testUid",
        email: "test@example.com",
        displayName: "Test User",
      })
    ),

    db: {
      collection: vi.fn().mockReturnThis(),
      doc: vi.fn().mockImplementation((...args) => ({
        // Mock any methods called on the result of doc(), such as updateDoc, deleteDoc, getDoc
        updateDoc: vi.fn(),
        deleteDoc: vi.fn(),
        getDoc: vi.fn(() =>
          Promise.resolve({
            exists: () => true,
            data: () => ({ onboardingComplete: true }),
          })
        ),
      })),
      getDocs: vi.fn(() =>
        Promise.resolve({
          forEach: vi.fn((callback) => {
            // Mock data to simulate Firestore documents
            const mockDocs = [
              {
                id: "1",
                data: () => ({
                  /* Your mock document data */
                }),
              },
              // Add more mock documents as needed
            ];
            mockDocs.forEach(callback);
          }),
        })
      ),
      query: vi.fn().mockReturnThis(),
      where: vi.fn().mockReturnThis(),
      orderBy: vi.fn().mockReturnThis(),
    },
  }));

  const mockLocalStorage = (() => {
    let store = {};
    return {
      getItem(key) {
        return store[key] || null;
      },
      setItem(key, value) {
        store[key] = value.toString();
      },
      clear() {
        store = {};
      },
    };
  })();

  Object.defineProperty(window, "localStorage", {
    value: mockLocalStorage,
  });

  beforeEach(() => {
    vi.resetAllMocks();
    //default to not logged in
    window.localStorage.clear();
    FirebaseModule.checkIfLoggedIn.mockReturnValue(false);
  });

  it("shows the login page if the user is not logged in", async () => {
    // Mock not being logged
    FirebaseModule.checkIfLoggedIn.mockReturnValue(false);

    render(<App />);
    expect(screen.getByText("Login With Gmail")).toBeDefined();
  });

  it("shows the Homepage if logged in", async () => {
    //mock logged
    window.localStorage.setItem("uid", "testUid");
    FirebaseModule.checkIfLoggedIn.mockReturnValue(true);
    FirebaseModule.getUserData.mockResolvedValue({
      uid: "testUid",
      email: "test@example.com",
      displayName: "Test User",
    });

    //check it routes to HomePage instead of checking content
    render(
      <MemoryRouter initialEntries={["/"]}>
        <App />
      </MemoryRouter>
    );
  });
});
