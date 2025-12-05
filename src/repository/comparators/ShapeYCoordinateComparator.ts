import { Shape } from '../../entities/Shape';
import { Comparator } from './Comparator';

export class ShapeYCoordinateComparator implements Comparator<Shape> {
  compare(a: Shape, b: Shape): number {
    const aY = a.getPoints()[0]?.y || 0;
    const bY = b.getPoints()[0]?.y || 0;
    return aY - bY;
  }
}
