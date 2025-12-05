import { Warehouse } from '../../src/store/Warehouse';
import { Rectangle } from '../../src/entities/Rectangle';
import { Point } from '../../src/entities/Point';
import { Cone } from '../../src/entities/Cone';

describe('Warehouse', () => {
  beforeEach(() => {
    const instance = Warehouse.getInstance();
    // @ts-expect-error: Accessing private property for testing cleanup
    instance.cache.clear();
  });

  it('should be a Singleton', () => {
    const instance1 = Warehouse.getInstance();
    const instance2 = Warehouse.getInstance();
    expect(instance1).toBe(instance2);
  });

  it('should calculate and store metrics for Rectangle', () => {
    const warehouse = Warehouse.getInstance();
    const rect = new Rectangle(
      'rect1',
      new Point(0, 0),
      new Point(4, 0),
      new Point(4, 3),
      new Point(0, 3),
    );

    warehouse.update(rect);
    const metrics = warehouse.getMetrics('rect1');

    expect(metrics).toBeDefined();
    expect(metrics?.area).toBe(12); // 4 * 3
    expect(metrics?.perimeter).toBe(14); // (4 + 3) * 2
  });

  it('should calculate and store metrics for Cone', () => {
    const warehouse = Warehouse.getInstance();
    const cone = new Cone(
      'cone1',
      new Point(0, 0, 3), // height = 3
      new Point(0, 0, 0),
      4, // radius = 4
    );

    warehouse.update(cone);
    const metrics = warehouse.getMetrics('cone1');

    expect(metrics).toBeDefined();
    // V = 1/3 * PI * r^2 * h = 1/3 * PI * 16 * 3 = 16 * PI
    expect(metrics?.volume).toBeCloseTo(16 * Math.PI, 2);
  });
});
