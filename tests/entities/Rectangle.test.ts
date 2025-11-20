import { Rectangle } from '../../src/entities/Rectangle';
import { Point } from '../../src/entities/Point';

describe('Rectangle', () => {
  let rectangle: Rectangle;

  beforeEach(() => {
    const topLeft = new Point(0, 0);
    const topRight = new Point(4, 0);
    const bottomRight = new Point(4, 3);
    const bottomLeft = new Point(0, 3);
    rectangle = new Rectangle('rect1', topLeft, topRight, bottomRight, bottomLeft);
  });

  describe('getType', () => {
    it('should return Rectangle', () => {
      expect(rectangle.getType()).toBe('Rectangle');
    });
  });

  describe('getPoints', () => {
    it('should return all 4 points', () => {
      const points = rectangle.getPoints();
      expect(points).toHaveLength(4);
      expect(points[0]).toEqual(new Point(0, 0));
      expect(points[1]).toEqual(new Point(4, 0));
      expect(points[2]).toEqual(new Point(4, 3));
      expect(points[3]).toEqual(new Point(0, 3));
    });
  });

  describe('getSides', () => {
    it('should calculate side lengths', () => {
      const sides = rectangle.getSides();
      expect(sides.top).toBe(4);
      expect(sides.right).toBe(3);
      expect(sides.bottom).toBe(4);
      expect(sides.left).toBe(3);
    });
  });

  describe('getDiagonals', () => {
    it('should calculate diagonal lengths', () => {
      const diagonals = rectangle.getDiagonals();
      expect(diagonals.diagonal1).toBe(5);
      expect(diagonals.diagonal2).toBe(5);
    });
  });

  describe('toString', () => {
    it('should return formatted string', () => {
      expect(rectangle.toString()).toBe('Rectangle [id: rect1]');
    });
  });
});
