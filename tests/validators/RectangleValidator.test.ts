import { RectangleValidator } from '../../src/validators/RectangleValidator';
import { Point } from '../../src/entities/Point';
import { ValidationException } from '../../src/exceptions/ValidationException';

describe('RectangleValidator', () => {
  let validator: RectangleValidator;

  beforeEach(() => {
    validator = new RectangleValidator();
  });

  describe('validateDataLength', () => {
    it('should pass for 9 values', () => {
      const data = ['id', '0', '0', '4', '0', '4', '3', '0', '3'];
      expect(() => validator.validateDataLength(data)).not.toThrow();
    });

    it('should throw for less than 9 values', () => {
      const data = ['id', '0', '0', '4', '0'];
      expect(() => validator.validateDataLength(data)).toThrow(ValidationException);
    });

    it('should throw for more than 9 values', () => {
      const data = ['id', '0', '0', '4', '0', '4', '3', '0', '3', '5'];
      expect(() => validator.validateDataLength(data)).toThrow(ValidationException);
    });
  });

  describe('validateRectangle', () => {
    it('should pass for valid rectangle', () => {
      const topLeft = new Point(0, 0);
      const topRight = new Point(4, 0);
      const bottomRight = new Point(4, 3);
      const bottomLeft = new Point(0, 3);

      expect(() => validator.validateRectangle(topLeft, topRight, bottomRight, bottomLeft))
        .not.toThrow();
    });

    it('should throw if points are not in same plane', () => {
      const topLeft = new Point(0, 0, 0);
      const topRight = new Point(4, 0, 0);
      const bottomRight = new Point(4, 3, 1); // Different z
      const bottomLeft = new Point(0, 3, 0);

      expect(() => validator.validateRectangle(topLeft, topRight, bottomRight, bottomLeft))
        .toThrow(ValidationException);
    });

    it('should throw if points are identical', () => {
      const topLeft = new Point(0, 0);
      const topRight = new Point(0, 0); // Same as topLeft
      const bottomRight = new Point(4, 3);
      const bottomLeft = new Point(0, 3);

      expect(() => validator.validateRectangle(topLeft, topRight, bottomRight, bottomLeft))
        .toThrow(ValidationException);
    });

    it('should throw if opposite sides are not equal', () => {
      const topLeft = new Point(0, 0);
      const topRight = new Point(5, 0);
      const bottomRight = new Point(4, 3); // Different width
      const bottomLeft = new Point(0, 3);

      expect(() => validator.validateRectangle(topLeft, topRight, bottomRight, bottomLeft))
        .toThrow(ValidationException);
    });
  });
});
