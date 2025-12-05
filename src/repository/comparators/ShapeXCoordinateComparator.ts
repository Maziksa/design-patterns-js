import { Shape } from '../../entities/Shape';
import { Comparator } from './Comparator';

export class ShapeXCoordinateComparator implements Comparator<Shape> {
  compare(a: Shape, b: Shape): number {
    const aX = a.getPoints()[0]?.x || 0;
    const bX = b.getPoints()[0]?.x || 0;
    return aX - bX;
  }
}
