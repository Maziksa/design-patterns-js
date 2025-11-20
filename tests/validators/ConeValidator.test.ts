import { ConeValidator } from '../../src/validators/ConeValidator';
import { Point } from '../../src/entities/Point';
import { ValidationException } from '../../src/exceptions/ValidationException';

describe('ConeValidator', () => {
  let validator: ConeValidator;

  beforeEach(() => {
    validator = new ConeValidator();
  });

  describe('validateDataLength', () => {
    it('should pass for 8 values', () => {
      const data = ['id', '0', '0', '5', '0', '0', '0', '3'];
      expect(() => validator.validateDataLength(data)).not.toThrow();
    });

    it('should throw for less than 8 values', () => {
      const data = ['id', '0', '0', '5'];
      expect(() => validator.validateDataLength(data)).toThrow(ValidationException);
    });

    it('should throw for more than 8 values', () => {
      const data = ['id', '0', '0', '5', '0', '0', '0', '3', '5'];
      expect(() => validator.validateDataLength(data)).toThrow(ValidationException);
    });
  });

  describe('validateRadius', () => {
    it('should pass for valid radius', () => {
      expect(() => validator.validateRadius(3)).not.toThrow();
    });

    it('should throw for negative radius', () => {
      expect(() => validator.validateRadius(-3)).toThrow(ValidationException);
    });

    it('should throw for zero radius', () => {
      expect(() => validator.validateRadius(0)).toThrow(ValidationException);
    });

    it('should throw for non-finite radius', () => {
      expect(() => validator.validateRadius(Infinity)).toThrow(ValidationException);
    });
  });

  describe('validateCone', () => {
    it('should pass for valid cone', () => {
      const apex = new Point(0, 0, 5);
      const baseCenter = new Point(0, 0, 0);
      expect(() => validator.validateCone(apex, baseCenter, 3)).not.toThrow();
    });

    it('should throw if apex equals base center', () => {
      const apex = new Point(0, 0, 5);
      const baseCenter = new Point(0, 0, 5); // Same as apex
      expect(() => validator.validateCone(apex, baseCenter, 3)).toThrow(ValidationException);
    });

    it('should throw for invalid radius', () => {
      const apex = new Point(0, 0, 5);
      const baseCenter = new Point(0, 0, 0);
      expect(() => validator.validateCone(apex, baseCenter, -3)).toThrow(ValidationException);
    });
  });
});
