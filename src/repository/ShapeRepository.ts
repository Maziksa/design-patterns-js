import { Shape } from '../entities/Shape';
import { Specification } from './specifications/Specification';
import { Comparator } from './comparators/Comparator';
import logger from '../utils/logger';

export class ShapeRepository {
  private storage: Map<string, Shape> = new Map();

  add(shape: Shape): void {
    this.storage.set(shape.id, shape);
    logger.info({ shapeId: shape.id }, 'Shape added to repository');
  }

  remove(shape: Shape): void {
    this.storage.delete(shape.id);
    logger.info({ shapeId: shape.id }, 'Shape removed from repository');
  }

  removeById(id: string): void {
    this.storage.delete(id);
  }

  getById(id: string): Shape | undefined {
    return this.storage.get(id);
  }

  getAll(): Shape[] {
    return Array.from(this.storage.values());
  }

  query(specification: Specification<Shape>): Shape[] {
    const result: Shape[] = [];
    for (const shape of this.storage.values()) {
      if (specification.isSatisfiedBy(shape)) {
        result.push(shape);
      }
    }
    return result;
  }

  sort(comparator: Comparator<Shape>): Shape[] {
    const shapes = this.getAll();
    return shapes.sort((a, b) => comparator.compare(a, b));
  }
}
