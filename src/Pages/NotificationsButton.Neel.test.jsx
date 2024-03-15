import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Profile from '../Profile';
import '@testing-library/jest-dom';

describe('Profile Component - Notification Switch', () => {
  it('should toggle the notification switch correctly', async () => {
    render(<Profile />);
    
    localStorage.setItem('sendEmail', 'true');

    const notificationsTab = screen.getByTestId('notification-tab');

    userEvent.click(notificationsTab);

    const emailSwitch = screen.getByTestId('email-switch');

    expect(emailSwitch).toBeChecked();

    userEvent.click(emailSwitch);

    expect(emailSwitch).not.toBeChecked();

    expect(localStorage.getItem('sendEmail')).toBe('false');

    userEvent.click(emailSwitch);

    expect(emailSwitch).toBeChecked();

    expect(localStorage.getItem('sendEmail')).toBe('true');
  });
});
