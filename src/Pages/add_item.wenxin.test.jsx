import { describe, it, expect, vi } from 'vitest';
import { render, fireEvent, waitFor } from '@testing-library/react';
import GroceryForm from '../Components/GroceryForm';

describe('GroceryForm', () => {
  beforeEach(() => {
    vi.spyOn(window.localStorage, 'getItem').mockImplementation(() => 'userId123');
  });
  it('saves item correctly', async () => {

    // Mock functions and data
    const onAddFoodItem = vi.fn();
    const onClose = vi.fn();

    // Render the component
    const { getByLabelText, getByText } = render(
      <GroceryForm open={true} onAddFoodItem={onAddFoodItem} onClose={onClose} />
    );

    // Simulate user input
    fireEvent.change(getByLabelText('Grocery Item'), { target: { value: 'Apples/Produce' } });
    fireEvent.change(getByLabelText('Quantity'), { target: { value: 2 } });
    fireEvent.change(getByLabelText("Please enter your own days"), { target: { value: 5 } });

    // Simulate saving the item
    fireEvent.click(getByText('Save'));

    // Wait for the assertions
    await waitFor(() => {
      const calls = onAddFoodItem.mock.calls;
      const lastCall = calls[calls.length - 1][0];
      
      expect(lastCall).toHaveProperty('createdAt');
      expect(lastCall.createdAt).toBeInstanceOf(Date);
      expect(lastCall).toHaveProperty('expiredAt');
      expect(lastCall.expiredAt).toBeInstanceOf(Date);
      expect(lastCall).toHaveProperty('id');
      expect(typeof lastCall.id).toBe('string');
      expect(lastCall).toHaveProperty('imageURL', '');
      expect(lastCall).toHaveProperty('productId');
      expect(lastCall).toHaveProperty('quantity', 2);
      expect(lastCall).toHaveProperty('storageType', 'Pantry');
      expect(lastCall).toHaveProperty('userId');
    });
  });
});
