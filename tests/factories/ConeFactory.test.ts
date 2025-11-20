import { ConeFactory } from '../../src/factories/ConeFactory';
import { Cone } from '../../src/entities/Cone';
import { ValidationException } from '../../src/exceptions/ValidationException';

describe('ConeFactory', () => {
  let factory: ConeFactory;

  beforeEach(() => {
    factory = new ConeFactory();
  });

  describe('getShapeType', () => {
    it('should return Cone', () => {
      expect(factory.getShapeType()).toBe('Cone');
    });
  });

  describe('create', () => {
    it('should create valid cone', () => {
      const data = ['cone1', '0', '0', '5', '0', '0', '0', '3'];
      const shape = factory.create(data);
      const cone = shape as Cone; // Type assertion

      expect(cone).toBeInstanceOf(Cone);
      expect(cone.id).toBe('cone1');
      expect(cone.getType()).toBe('Cone');
      expect(cone.getRadius()).toBe(3); // Теперь TypeScript знает что это Cone
    });

    it('should throw for invalid data length', () => {
      const data = ['cone1', '0', '0', '5'];
      expect(() => factory.create(data)).toThrow(ValidationException);
    });

    it('should throw for negative radius', () => {
      const data = ['cone1', '0', '0', '5', '0', '0', '0', '-3'];
      expect(() => factory.create(data)).toThrow(ValidationException);
    });

    it('should throw for zero height (apex = base)', () => {
      const data = ['cone1', '0', '0', '0', '0', '0', '0', '3'];
      expect(() => factory.create(data)).toThrow(ValidationException);
    });
  });
});
