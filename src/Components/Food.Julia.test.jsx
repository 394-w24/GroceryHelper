import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Food from './Food';

  
  describe('Food Component', () => {

    it('displays "Expired!!!" if the food is expired', async () => {
        //mock expired food
      const expiredFoodItem = {
        createdAt: new Date(),
        expiredAt: new Date(new Date().setDate(new Date().getDate() - 1)), // Yesterday's date, making it expired
        imageURL: '',
        productId: 'mockedProductId',
        quantity: 1,
        storageType: 'Fridge',
        userId: 'mockedUserId',
        id: 'mockedId',
      };
  
      render(<Food fooditem={expiredFoodItem} isExpanded={false} setIsExpanded={() => {}} />);
      expect(screen.getByText('Expired!!!')).toBeDefined();
    });
  });