import { Shape } from '../../entities/Shape';
import { Comparator } from './Comparator';

export class ShapeIdComparator implements Comparator<Shape> {
  compare(a: Shape, b: Shape): number {
    return a.id.localeCompare(b.id);
  }
}
