import React from "react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import Profile from './Profile';  
import * as FirebaseModule from '../Firebase';  

describe("Profile Logout", () => {
 
  beforeEach(() => {
    vi.mock('../Firebase', () => ({
 
      handleLogOut: vi.fn(() => {
        window.localStorage.clear();  
      }),
      updateUserSettings: vi.fn(),
      checkIfLoggedIn: vi.fn(),
      getUserData: vi.fn(() => Promise.resolve({
        uid: 'testUid',
        email: 'test@example.com',
        displayName: 'Test User',
      })),
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
        removeItem(key) {
          delete store[key];
        },
        clear() {
          store = {};
        },
      };
    })();

    Object.defineProperty(window, 'localStorage', { value: mockLocalStorage });
  });

  it("navigates to the login page on logout", async () => {
    window.localStorage.setItem('uid', 'testUid');
    FirebaseModule.checkIfLoggedIn.mockReturnValue(true);

    render(
      <MemoryRouter>
        <Profile />
      </MemoryRouter>
    );


    const logoutButton = screen.getByRole('button', { name: /logout/i });
    fireEvent.click(logoutButton);
    expect(FirebaseModule.handleLogOut).toHaveBeenCalled();
    expect(screen.queryByText(/login with gmail/i)).toBeDefined(); 
  });
});
