import React from 'react';
import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import Food from './Food';

  
  describe('Food Component', () => {

    it('displays Expires in X days!!! if the food not expired', async () => {
        //mock food
      const expiredFoodItem = {
        createdAt: new Date(),
        expiredAt: new Date(new Date().setDate(new Date().getDate() + 3)),
        imageURL: '',
        productId: 'mockedProductId',
        quantity: 1,
        storageType: 'Fridge',
        userId: 'mockedUserId',
        id: 'mockedId',
      };
  
      render(<Food fooditem={expiredFoodItem} isExpanded={false} setIsExpanded={() => {}} />);
      expect(screen.getByText('Expires in 2 days')).toBeDefined();
    });

    it('displays Expires in X days!!! if the food not expired', async () => {
      //mock food
      const expiredFoodItem = {
        createdAt: new Date(),
        expiredAt: new Date(new Date().setDate(new Date().getDate() + 7)),
        imageURL: '',
        productId: 'mockedProductId',
        quantity: 1,
        storageType: 'Fridge',
        userId: 'mockedUserId',
        id: 'mockedId',
      };

      render(<Food fooditem={expiredFoodItem} isExpanded={false} setIsExpanded={() => { }} />);
      expect(screen.getByText('Expires in 6 days')).toBeDefined();
    });

  });