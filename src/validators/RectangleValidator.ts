import { Point } from '../entities/Point';
import { ValidationException } from '../exceptions/ValidationException';

export class RectangleValidator {
  private static readonly EPSILON = 1e-10;

  validateDataLength(data: string[]): void {
    if (data.length !== 9) {
      throw new ValidationException(
        `Rectangle requires 9 values (id + 8 coordinates), got ${data.length}`,
      );
    }
  }

  validateRectangle(
    topLeft: Point,
    topRight: Point,
    bottomRight: Point,
    bottomLeft: Point,
  ): void {
    this.validateSamePlane(topLeft, topRight, bottomRight, bottomLeft);
    this.validateDistinctPoints(topLeft, topRight, bottomRight, bottomLeft);
    this.validateOppositeSides(topLeft, topRight, bottomRight, bottomLeft);
    this.validateRightAngles(topLeft, topRight, bottomRight, bottomLeft);
  }

  private validateSamePlane(
    topLeft: Point,
    topRight: Point,
    bottomRight: Point,
    bottomLeft: Point,
  ): void {
    const points = [topLeft, topRight, bottomRight, bottomLeft];
    const zValues = points.map((p) => p.z);
    const allSameZ = zValues.every((z) => Math.abs(z - zValues[0]) < RectangleValidator.EPSILON);

    if (!allSameZ) {
      throw new ValidationException('All points must be in the same plane (same z-coordinate)');
    }
  }

  private validateDistinctPoints(
    topLeft: Point,
    topRight: Point,
    bottomRight: Point,
    bottomLeft: Point,
  ): void {
    const points = [topLeft, topRight, bottomRight, bottomLeft];

    for (let i = 0; i < points.length; i += 1) {
      for (let j = i + 1; j < points.length; j += 1) {
        if (points[i].equals(points[j], RectangleValidator.EPSILON)) {
          throw new ValidationException(`Points at positions ${i} and ${j} are identical`);
        }
      }
    }
  }

  private validateOppositeSides(
    topLeft: Point,
    topRight: Point,
    bottomRight: Point,
    bottomLeft: Point,
  ): void {
    const topSide = topLeft.distanceTo(topRight);
    const bottomSide = bottomLeft.distanceTo(bottomRight);
    const leftSide = topLeft.distanceTo(bottomLeft);
    const rightSide = topRight.distanceTo(bottomRight);

    if (Math.abs(topSide - bottomSide) > RectangleValidator.EPSILON) {
      throw new ValidationException('Top and bottom sides must be equal');
    }

    if (Math.abs(leftSide - rightSide) > RectangleValidator.EPSILON) {
      throw new ValidationException('Left and right sides must be equal');
    }
  }

  private validateRightAngles(
    topLeft: Point,
    topRight: Point,
    bottomRight: Point,
    bottomLeft: Point,
  ): void {
    const corners = [
      {
        name: 'top-left', p1: bottomLeft, p2: topLeft, p3: topRight,
      },
      {
        name: 'top-right', p1: topLeft, p2: topRight, p3: bottomRight,
      },
      {
        name: 'bottom-right', p1: topRight, p2: bottomRight, p3: bottomLeft,
      },
      {
        name: 'bottom-left', p1: bottomRight, p2: bottomLeft, p3: topLeft,
      },
    ];

    corners.forEach((corner) => {
      if (!this.isRightAngle(corner.p1, corner.p2, corner.p3)) {
        throw new ValidationException(`Not a right angle at ${corner.name} corner`);
      }
    });
  }

  private isRightAngle(p1: Point, p2: Point, p3: Point): boolean {
    const v1x = p1.x - p2.x;
    const v1y = p1.y - p2.y;
    const v2x = p3.x - p2.x;
    const v2y = p3.y - p2.y;

    const dotProduct = v1x * v2x + v1y * v2y;

    return Math.abs(dotProduct) < RectangleValidator.EPSILON;
  }
}
