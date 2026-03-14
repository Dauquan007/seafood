import { describe, it, expect } from 'vitest';
import { calculateCLV, calculateChurnRate, calculateGrowth } from './financialCalculations';

describe('Financial Calculations Utilities', () => {
  
  describe('calculateCLV', () => {
    it('should correctly calculate Customer Lifetime Value', () => {
      expect(calculateCLV(10000, 10)).toBe(1000);
      expect(calculateCLV(50000, 100)).toBe(500);
    });

    it('should return 0 when total customers is 0 to avoid division by zero', () => {
      expect(calculateCLV(10000, 0)).toBe(0);
    });
  });

  describe('calculateChurnRate', () => {
    it('should correctly calculate the churn rate percentage', () => {
       expect(calculateChurnRate(5, 100)).toBe(5);
       expect(calculateChurnRate(50, 200)).toBe(25);
    });

    it('should return 0 when total customers is 0 to avoid division by zero', () => {
       expect(calculateChurnRate(10, 0)).toBe(0);
    });
  });

  describe('calculateGrowth', () => {
    it('should correctly calculate positive growth percentage', () => {
      expect(calculateGrowth(110, 100)).toBe(10);
    });

    it('should correctly calculate negative growth percentage', () => {
      expect(calculateGrowth(90, 100)).toBe(-10);
    });

    it('should handle zero previous value correctly', () => {
      expect(calculateGrowth(100, 0)).toBe(100);
      expect(calculateGrowth(0, 0)).toBe(0);
    });
  });

});
