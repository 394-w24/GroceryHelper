import React from "react";
import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen, fireEvent } from '@testing-library/react';
import Footer from "./Footer";
import * as FirebaseModule from '../Firebase';  
 

describe("Footer Buttons", () => {
 
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

  it('click on manual input button and see grocery form popup, click on photo and see image recognition', async () => {
 
    window.localStorage.setItem('uid', 'testUid');
    FirebaseModule.checkIfLoggedIn.mockReturnValue(true);
    FirebaseModule.getUserData.mockResolvedValue({
      uid: 'testUid',
      email: 'test@example.com',
      displayName: 'Test User',
    });
 
      render(
        <Footer /> 
      );


    expect(screen.queryByText(/manual input/i)).toBeDefined(); 
    const inputButton = screen.getByRole('button', { name: 'Manual Input' });
    fireEvent.click(inputButton);
    expect(await screen.queryByText(/add grocery item/i)).toBeDefined(); 
    

    expect(screen.queryByText(/manual input/i)).toBeDefined(); 
    const secondButton = screen.getByRole('button', { name: 'Take Photo' });
    fireEvent.click(secondButton);
    expect(await screen.queryByText(/Take a picture of your grocery, one at a time/i)).toBeDefined(); 
     
    
      });
  });