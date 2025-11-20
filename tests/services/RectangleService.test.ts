import { RectangleService } from '../../src/services/RectangleService';
import { Rectangle } from '../../src/entities/Rectangle';
import { Point } from '../../src/entities/Point';

describe('RectangleService', () => {
  let service: RectangleService;
  let rectangle: Rectangle;
  let square: Rectangle;

  beforeEach(() => {
    service = new RectangleService();

    // Прямоугольник 4x3
    rectangle = new Rectangle(
      'rect1',
      new Point(0, 0),
      new Point(4, 0),
      new Point(4, 3),
      new Point(0, 3),
    );

    // Квадрат 2x2
    square = new Rectangle(
      'square1',
      new Point(0, 0),
      new Point(2, 0),
      new Point(2, 2),
      new Point(0, 2),
    );
  });

  describe('calculateArea', () => {
    it('should calculate rectangle area', () => {
      expect(service.calculateArea(rectangle)).toBe(12);
    });

    it('should calculate square area', () => {
      expect(service.calculateArea(square)).toBe(4);
    });
  });

  describe('calculatePerimeter', () => {
    it('should calculate rectangle perimeter', () => {
      expect(service.calculatePerimeter(rectangle)).toBe(14);
    });

    it('should calculate square perimeter', () => {
      expect(service.calculatePerimeter(square)).toBe(8);
    });
  });

  describe('isSquare', () => {
    it('should return false for rectangle', () => {
      expect(service.isSquare(rectangle)).toBe(false);
    });

    it('should return true for square', () => {
      expect(service.isSquare(square)).toBe(true);
    });
  });

  describe('isRhombus', () => {
    it('should return false for rectangle', () => {
      expect(service.isRhombus(rectangle)).toBe(false);
    });

    it('should return true for square', () => {
      expect(service.isRhombus(square)).toBe(true);
    });
  });

  describe('isValidRectangle', () => {
    it('should return true for valid rectangle', () => {
      expect(service.isValidRectangle(rectangle)).toBe(true);
    });

    it('should return true for valid square', () => {
      expect(service.isValidRectangle(square)).toBe(true);
    });
  });

  describe('isConvex', () => {
    it('should return true for rectangle', () => {
      expect(service.isConvex(rectangle)).toBe(true);
    });

    it('should return true for square', () => {
      expect(service.isConvex(square)).toBe(true);
    });
  });

  describe('getCharacteristics', () => {
    it('should return all characteristics', () => {
      const chars = service.getCharacteristics(rectangle);
      expect(chars.area).toBe(12);
      expect(chars.perimeter).toBe(14);
      expect(chars.isValid).toBe(true);
      expect(chars.isConvex).toBe(true);
      expect(chars.isSquare).toBe(false);
      expect(chars.isRhombus).toBe(false);
    });
  });
});
