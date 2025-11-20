import { Shape } from './Shape';
import { Point } from './Point';

export class Cone extends Shape {
  constructor(
    id: string,
    private readonly apex: Point,
    private readonly baseCenter: Point,
    private readonly radius: number,
  ) {
    super(id);
  }

  getType(): string {
    return 'Cone';
  }

  getPoints(): Point[] {
    return [this.apex, this.baseCenter];
  }

  getApex(): Point {
    return this.apex;
  }

  getBaseCenter(): Point {
    return this.baseCenter;
  }

  getRadius(): number {
    return this.radius;
  }

  getHeight(): number {
    return this.apex.distanceTo(this.baseCenter);
  }

  getSlantHeight(): number {
    const h = this.getHeight();
    return Math.sqrt(h * h + this.radius * this.radius);
  }
}
