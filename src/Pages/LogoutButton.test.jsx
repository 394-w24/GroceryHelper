import { describe, expect, test, vi } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import Profile from './Profile';  
import * as FirebaseModule from '../Firebase';  

vi.mock('../Firebase', () => ({
  ...vi.importActual('../Firebase'), 
  handleLogOut: vi.fn(),  
  updateUserSettings: vi.fn(),
}));

describe('Logout functionality', () => {
  test('Logout Button triggers handleLogOut', async () => {
    render(<Profile />);
    const logoutButton = screen.getByRole('button', { name: /logout/i });
    fireEvent.click(logoutButton);
    expect(FirebaseModule.handleLogOut).toHaveBeenCalled();
  });
});


// import { describe, expect, test, vi } from 'vitest';
// import { fireEvent, render, screen } from '@testing-library/react';
// import Profile from './Profile';
// import * as FirebaseModule from '../Firebase';

 
// vi.mock('../Firebase', () => ({
//   ...vi.importActual('../Firebase'),
//   signOut: vi.fn(),  
//   handleLogOut: vi.fn(),
//   updateUserSettings: vi.fn(),
// }));

// beforeEach(() => {
//   localStorage.clear();  
// });

// describe('Logout functionality', () => {
//   test('Logout Button triggers handleLogOut', async () => {
//     // Setup mocks
//     const reloadMock = vi.fn();
//     delete window.location;
//     window.location = { reload: reloadMock };

  
//     localStorage.setItem("isSignedIn", "true");
//     localStorage.setItem("name", "Test User");
//     localStorage.setItem("photoUrl", "http://example.com/photo.jpg");
//     localStorage.setItem("uid", "123456");

//     render(<Profile />);

 
//     const logoutButton = screen.getByRole('button', { name: /logout/i });
//     fireEvent.click(logoutButton);

//     //  
//     expect(FirebaseModule.handleLogOut).toHaveBeenCalled();

 
//     expect(localStorage.getItem("isSignedIn")).toBeNull();
//     expect(localStorage.getItem("name")).toBeNull();
//     expect(localStorage.getItem("photoUrl")).toBeNull();
//     expect(localStorage.getItem("uid")).toBeNull();

 
//     expect(reloadMock).toHaveBeenCalled();
//   });

 
//   afterEach(() => {
//     localStorage.clear();
//     vi.restoreAllMocks();
//   });
// });


