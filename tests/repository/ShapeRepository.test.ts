import { ShapeRepository } from '../../src/repository/ShapeRepository';
import { Rectangle } from '../../src/entities/Rectangle';
import { Point } from '../../src/entities/Point';
import { Warehouse } from '../../src/store/Warehouse';
import {
  ShapeIdSpecification,
  FirstQuadrantSpecification,
  AreaRangeSpecification,
} from '../../src/repository/specifications';
import { ShapeXCoordinateComparator } from '../../src/repository/comparators';

describe('ShapeRepository', () => {
  let repository: ShapeRepository;
  let rect1: Rectangle;
  let rect2: Rectangle;

  beforeEach(() => {
    repository = new ShapeRepository();

    rect1 = new Rectangle('1', new Point(1, 1), new Point(3, 1), new Point(3, 3), new Point(1, 3));

    rect2 = new Rectangle('2', new Point(-2, -2), new Point(2, -2), new Point(2, 2), new Point(-2, 2));

    repository.add(rect1);
    repository.add(rect2);

    const warehouse = Warehouse.getInstance();
    warehouse.update(rect1);
    warehouse.update(rect2);
  });

  test('should add and get shapes', () => {
    expect(repository.getById('1')).toBe(rect1);
    expect(repository.getAll()).toHaveLength(2);
  });

  test('should remove shape', () => {
    repository.remove(rect1);
    expect(repository.getById('1')).toBeUndefined();
    expect(repository.getAll()).toHaveLength(1);
  });

  test('should find by ID Specification', () => {
    const result = repository.query(new ShapeIdSpecification('1'));
    expect(result).toHaveLength(1);
    expect(result[0]).toBe(rect1);
  });

  test('should find by First Quadrant Specification', () => {
    const result = repository.query(new FirstQuadrantSpecification());
    expect(result).toHaveLength(1);
    expect(result[0]).toBe(rect1);
  });

  test('should find by Area Range Specification', () => {
    const result = repository.query(new AreaRangeSpecification(10, 20));
    expect(result).toHaveLength(1);
    expect(result[0]).toBe(rect2);
  });

  test('should sort by X coordinate', () => {
    const sorted = repository.sort(new ShapeXCoordinateComparator());

    expect(sorted[0]).toBe(rect2);
    expect(sorted[1]).toBe(rect1);
  });
});
