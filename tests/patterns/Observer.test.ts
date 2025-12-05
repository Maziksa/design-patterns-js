import { Warehouse } from '../../src/store/Warehouse';
import { Rectangle } from '../../src/entities/Rectangle';
import { Point } from '../../src/entities/Point';

describe('Observer Pattern Integration', () => {
  it('should automatically update Warehouse when Shape changes', () => {
    const warehouse = Warehouse.getInstance();

    const rect = new Rectangle(
      'obs-rect',
      new Point(0, 0),
      new Point(2, 0),
      new Point(2, 2),
      new Point(0, 2),
    );

    rect.attach(warehouse);

    warehouse.update(rect);

    expect(warehouse.getMetrics('obs-rect')?.area).toBe(4);

    rect.setPoints(
      new Point(0, 0),
      new Point(4, 0),
      new Point(4, 2),
      new Point(0, 2),
    );

    expect(warehouse.getMetrics('obs-rect')?.area).toBe(8);
  });

  it('should stop updating after detach', () => {
    const warehouse = Warehouse.getInstance();
    const rect = new Rectangle(
      'detach-test',
      new Point(0, 0),
      new Point(2, 0),
      new Point(2, 2),
      new Point(0, 2),
    );
    rect.attach(warehouse);
    warehouse.update(rect);

    rect.detach(warehouse);

    rect.setPoints(
      new Point(0, 0),
      new Point(10, 0),
      new Point(10, 10),
      new Point(0, 10),
    );

    expect(warehouse.getMetrics('detach-test')?.area).toBe(4);
  });
});
