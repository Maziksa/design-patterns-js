import { Point } from '../entities/Point';
import { ValidationException } from '../exceptions/ValidationException';

export class ConeValidator {
  private static readonly MIN_RADIUS = 0.001;

  private static readonly EPSILON = 1e-10;

  validateDataLength(data: string[]): void {
    if (data.length !== 8) {
      throw new ValidationException(
        `Cone requires 8 values (id + apex(3) + baseCenter(3) + radius), got ${data.length}`,
      );
    }
  }

  validateCone(apex: Point, baseCenter: Point, radius: number): void {
    this.validateRadius(radius);

    if (apex.equals(baseCenter, ConeValidator.EPSILON)) {
      throw new ValidationException('Apex and base center must be different points');
    }

    const height = apex.distanceTo(baseCenter);
    if (height < ConeValidator.EPSILON) {
      throw new ValidationException('Height must be positive');
    }
  }

  validateRadius(radius: number): void {
    if (!Number.isFinite(radius)) {
      throw new ValidationException('Radius must be a finite number');
    }

    if (radius < ConeValidator.MIN_RADIUS) {
      throw new ValidationException(
        `Radius must be >= ${ConeValidator.MIN_RADIUS}, got ${radius}`,
      );
    }
  }
}
