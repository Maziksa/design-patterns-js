import { ConeService } from '../../src/services/ConeService';
import { Cone } from '../../src/entities/Cone';
import { Point } from '../../src/entities/Point';

describe('ConeService', () => {
  let service: ConeService;
  let cone: Cone;

  beforeEach(() => {
    service = new ConeService();
    cone = new Cone('cone1', new Point(0, 0, 5), new Point(0, 0, 0), 3);
  });

  describe('calculateVolume', () => {
    it('should calculate cone volume', () => {
      const volume = service.calculateVolume(cone);
      const expected = (1 / 3) * Math.PI * 3 * 3 * 5;
      expect(volume).toBeCloseTo(expected, 2);
    });
  });

  describe('calculateSurfaceArea', () => {
    it('should calculate cone surface area', () => {
      const area = service.calculateSurfaceArea(cone);
      const r = 3;
      const l = Math.sqrt(5 * 5 + 3 * 3);
      const expected = Math.PI * r * (r + l);
      expect(area).toBeCloseTo(expected, 2);
    });
  });

  describe('isValidCone', () => {
    it('should return true for valid cone', () => {
      expect(service.isValidCone(cone)).toBe(true);
    });

    it('should return false for cone with zero height', () => {
      const invalidCone = new Cone('invalid', new Point(0, 0, 0), new Point(0, 0, 0), 3);
      expect(service.isValidCone(invalidCone)).toBe(false);
    });
  });

  describe('isBaseOnCoordinatePlane', () => {
    it('should detect base on XY plane', () => {
      const result = service.isBaseOnCoordinatePlane(cone);
      expect(result.isOnPlane).toBe(true);
      expect(result.plane).toBe('XY');
    });

    it('should detect base on XZ plane', () => {
      // Для XZ плоскости: y=0, но x и z могут быть != 0
      const coneOnXZ = new Cone('cone2', new Point(5, 5, 5), new Point(5, 0, 5), 3);
      const result = service.isBaseOnCoordinatePlane(coneOnXZ);
      expect(result.isOnPlane).toBe(true);
      expect(result.plane).toBe('XZ');
    });

    it('should detect base on YZ plane', () => {
      // Для YZ плоскости: x=0, но y и z могут быть != 0
      const coneOnYZ = new Cone('cone3', new Point(5, 5, 5), new Point(0, 5, 5), 3);
      const result = service.isBaseOnCoordinatePlane(coneOnYZ);
      expect(result.isOnPlane).toBe(true);
      expect(result.plane).toBe('YZ');
    });

    it('should return false if not on any plane', () => {
      const floatingCone = new Cone('cone4', new Point(5, 5, 5), new Point(1, 1, 1), 3);
      const result = service.isBaseOnCoordinatePlane(floatingCone);
      expect(result.isOnPlane).toBe(false);
      expect(result.plane).toBeUndefined();
    });
  });

  describe('getCharacteristics', () => {
    it('should return all characteristics', () => {
      const chars = service.getCharacteristics(cone);
      expect(chars.volume).toBeGreaterThan(0);
      expect(chars.surfaceArea).toBeGreaterThan(0);
      expect(chars.height).toBe(5);
      expect(chars.radius).toBe(3);
      expect(chars.isValid).toBe(true);
      expect(chars.baseOnPlane.isOnPlane).toBe(true);
      expect(chars.baseOnPlane.plane).toBe('XY');
    });
  });
});
