import { describe, it, expect } from 'vitest';
import { render } from '@testing-library/react';
import HomePage from './HomePage';

describe('HomePage', () => {
  it('displays a message when there are no food items', async () => {
    const { findByText } = render(<HomePage />);

    const noItemsText = await findByText('No Items Stored Yet...');
    expect(noItemsText).toBeTruthy();
  });
});
