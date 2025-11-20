import { RectangleFactory } from '../../src/factories/RectangleFactory';
import { Rectangle } from '../../src/entities/Rectangle';
import { ValidationException } from '../../src/exceptions/ValidationException';

describe('RectangleFactory', () => {
  let factory: RectangleFactory;

  beforeEach(() => {
    factory = new RectangleFactory();
  });

  describe('getShapeType', () => {
    it('should return Rectangle', () => {
      expect(factory.getShapeType()).toBe('Rectangle');
    });
  });

  describe('create', () => {
    it('should create valid rectangle', () => {
      const data = ['rect1', '0', '0', '4', '0', '4', '3', '0', '3'];
      const rectangle = factory.create(data);

      expect(rectangle).toBeInstanceOf(Rectangle);
      expect(rectangle.id).toBe('rect1');
      expect(rectangle.getType()).toBe('Rectangle');
    });

    it('should throw for invalid data length', () => {
      const data = ['rect1', '0', '0', '4', '0'];
      expect(() => factory.create(data)).toThrow(ValidationException);
    });

    it('should throw for invalid rectangle geometry', () => {
      // Points not forming a rectangle (opposite sides not equal)
      const data = ['rect1', '0', '0', '5', '0', '4', '3', '0', '3'];
      expect(() => factory.create(data)).toThrow(ValidationException);
    });
  });
});
