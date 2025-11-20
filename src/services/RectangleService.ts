import { Rectangle } from '../entities/Rectangle';
import { Point } from '../entities/Point';
import logger from '../utils/logger';

export class RectangleService {
  private static readonly EPSILON = 1e-10;

  calculateArea(rectangle: Rectangle): number {
    const sides = rectangle.getSides();
    const area = sides.top * sides.left;

    logger.debug({
      rectangleId: rectangle.id,
      width: sides.top,
      height: sides.left,
      area,
    }, 'Calculated rectangle area');

    return area;
  }

  calculatePerimeter(rectangle: Rectangle): number {
    const sides = rectangle.getSides();
    const perimeter = 2 * (sides.top + sides.left);

    logger.debug({
      rectangleId: rectangle.id,
      width: sides.top,
      height: sides.left,
      perimeter,
    }, 'Calculated rectangle perimeter');

    return perimeter;
  }

  isValidRectangle(rectangle: Rectangle): boolean {
    const points = rectangle.getPoints();

    for (let i = 0; i < points.length; i += 1) {
      for (let j = i + 1; j < points.length; j += 1) {
        for (let k = j + 1; k < points.length; k += 1) {
          if (this.areCollinear(points[i], points[j], points[k])) {
            logger.warn({
              rectangleId: rectangle.id,
              points: [points[i].toString(), points[j].toString(), points[k].toString()],
            }, 'Three points are collinear');
            return false;
          }
        }
      }
    }

    return true;
  }

  isConvex(rectangle: Rectangle): boolean {
    const points = rectangle.getPoints();
    const crossProducts: number[] = [];

    for (let i = 0; i < 4; i += 1) {
      const p1 = points[i];
      const p2 = points[(i + 1) % 4];
      const p3 = points[(i + 2) % 4];

      const cross = this.crossProduct2D(p1, p2, p3);
      crossProducts.push(cross);
    }

    const allPositive = crossProducts.every((cp) => cp > 0);
    const allNegative = crossProducts.every((cp) => cp < 0);

    const isConvex = allPositive || allNegative;

    logger.debug({
      rectangleId: rectangle.id,
      isConvex,
      crossProducts,
    }, 'Checked if quadrilateral is convex');

    return isConvex;
  }

  isSquare(rectangle: Rectangle): boolean {
    const sides = rectangle.getSides();

    const isSquare = this.areEqual(sides.top, sides.left)
      && this.areEqual(sides.bottom, sides.right)
      && this.areEqual(sides.top, sides.bottom);

    logger.debug({
      rectangleId: rectangle.id,
      isSquare,
      sides,
    }, 'Checked if rectangle is square');

    return isSquare;
  }

  isRhombus(rectangle: Rectangle): boolean {
    const sides = rectangle.getSides();

    const isRhombus = this.areEqual(sides.top, sides.left)
      && this.areEqual(sides.left, sides.bottom)
      && this.areEqual(sides.bottom, sides.right);

    logger.debug({
      rectangleId: rectangle.id,
      isRhombus,
      sides,
    }, 'Checked if rectangle is rhombus');

    return isRhombus;
  }

  isTrapezoid(rectangle: Rectangle): boolean {
    const points = rectangle.getPoints();

    const topParallel = this.areParallel(
      points[0],
      points[1],
      points[3],
      points[2],
    );

    const sideParallel = this.areParallel(
      points[0],
      points[3],
      points[1],
      points[2],
    );

    const isTrapezoid = topParallel || sideParallel;

    logger.debug({
      rectangleId: rectangle.id,
      isTrapezoid,
      topParallel,
      sideParallel,
    }, 'Checked if quadrilateral is trapezoid');

    return isTrapezoid;
  }

  getCharacteristics(rectangle: Rectangle): {
    area: number;
    perimeter: number;
    isValid: boolean;
    isConvex: boolean;
    isSquare: boolean;
    isRhombus: boolean;
    isTrapezoid: boolean;
  } {
    return {
      area: this.calculateArea(rectangle),
      perimeter: this.calculatePerimeter(rectangle),
      isValid: this.isValidRectangle(rectangle),
      isConvex: this.isConvex(rectangle),
      isSquare: this.isSquare(rectangle),
      isRhombus: this.isRhombus(rectangle),
      isTrapezoid: this.isTrapezoid(rectangle),
    };
  }

  private areCollinear(p1: Point, p2: Point, p3: Point): boolean {
    const area = Math.abs(
      (p2.x - p1.x) * (p3.y - p1.y) - (p3.x - p1.x) * (p2.y - p1.y),
    );
    return area < RectangleService.EPSILON;
  }

  /**
   * Векторное произведение для определения направления поворота
   */
  private crossProduct2D(p1: Point, p2: Point, p3: Point): number {
    const v1x = p2.x - p1.x;
    const v1y = p2.y - p1.y;
    const v2x = p3.x - p2.x;
    const v2y = p3.y - p2.y;

    return v1x * v2y - v1y * v2x;
  }

  /**
   * Проверка параллельности отрезков: v1 × v2 = 0
   */
  private areParallel(a: Point, b: Point, c: Point, d: Point): boolean {
    const v1x = b.x - a.x;
    const v1y = b.y - a.y;
    const v2x = d.x - c.x;
    const v2y = d.y - c.y;

    const crossProduct = v1x * v2y - v1y * v2x;

    return Math.abs(crossProduct) < RectangleService.EPSILON;
  }

  private areEqual(a: number, b: number): boolean {
    return Math.abs(a - b) < RectangleService.EPSILON;
  }
}
