import { Cone } from '../../src/entities/Cone';
import { Point } from '../../src/entities/Point';

describe('Cone', () => {
  let cone: Cone;

  beforeEach(() => {
    const apex = new Point(0, 0, 5);
    const baseCenter = new Point(0, 0, 0);
    cone = new Cone('cone1', apex, baseCenter, 3);
  });

  describe('getType', () => {
    it('should return Cone', () => {
      expect(cone.getType()).toBe('Cone');
    });
  });

  describe('getPoints', () => {
    it('should return apex and base center', () => {
      const points = cone.getPoints();
      expect(points).toHaveLength(2);
      expect(points[0]).toEqual(new Point(0, 0, 5));
      expect(points[1]).toEqual(new Point(0, 0, 0));
    });
  });

  describe('getRadius', () => {
    it('should return radius', () => {
      expect(cone.getRadius()).toBe(3);
    });
  });

  describe('getHeight', () => {
    it('should calculate height', () => {
      expect(cone.getHeight()).toBe(5);
    });
  });

  describe('getSlantHeight', () => {
    it('should calculate slant height', () => {
      const slantHeight = cone.getSlantHeight();
      expect(slantHeight).toBeCloseTo(Math.sqrt(34), 5);
    });
  });

  describe('toString', () => {
    it('should return formatted string', () => {
      expect(cone.toString()).toBe('Cone [id: cone1]');
    });
  });
});
