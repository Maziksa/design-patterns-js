import { Point } from '../../src/entities/Point';

describe('Point', () => {
  describe('constructor', () => {
    it('should create a 2D point with z=0', () => {
      const point = new Point(1, 2);
      expect(point.x).toBe(1);
      expect(point.y).toBe(2);
      expect(point.z).toBe(0);
    });

    it('should create a 3D point', () => {
      const point = new Point(1, 2, 3);
      expect(point.x).toBe(1);
      expect(point.y).toBe(2);
      expect(point.z).toBe(3);
    });
  });

  describe('distanceTo', () => {
    it('should calculate distance between 2D points', () => {
      const p1 = new Point(0, 0);
      const p2 = new Point(3, 4);
      expect(p1.distanceTo(p2)).toBe(5);
    });

    it('should calculate distance between 3D points', () => {
      const p1 = new Point(0, 0, 0);
      const p2 = new Point(1, 1, 1);
      expect(p1.distanceTo(p2)).toBeCloseTo(Math.sqrt(3), 5);
    });

    it('should return 0 for same point', () => {
      const p1 = new Point(5, 5, 5);
      const p2 = new Point(5, 5, 5);
      expect(p1.distanceTo(p2)).toBe(0);
    });
  });

  describe('equals', () => {
    it('should return true for equal points', () => {
      const p1 = new Point(1, 2, 3);
      const p2 = new Point(1, 2, 3);
      expect(p1.equals(p2)).toBe(true);
    });

    it('should return false for different points', () => {
      const p1 = new Point(1, 2, 3);
      const p2 = new Point(1, 2, 4);
      expect(p1.equals(p2)).toBe(false);
    });

    it('should handle epsilon tolerance', () => {
      const p1 = new Point(1.0000001, 2, 3);
      const p2 = new Point(1, 2, 3);
      expect(p1.equals(p2, 0.001)).toBe(true);
    });
  });

  describe('toString', () => {
    it('should format 2D point', () => {
      const point = new Point(1, 2);
      expect(point.toString()).toBe('(1, 2)');
    });

    it('should format 3D point', () => {
      const point = new Point(1, 2, 3);
      expect(point.toString()).toBe('(1, 2, 3)');
    });
  });
});
