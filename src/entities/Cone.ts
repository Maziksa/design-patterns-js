import { Shape } from './Shape';
import { Point } from './Point';

export class Cone extends Shape {
  private apex: Point;
  private baseCenter: Point;
  private radius: number;

  constructor(
    id: string,
    apex: Point,
    baseCenter: Point,
    radius: number,
  ) {
    super(id);
    this.apex = apex;
    this.baseCenter = baseCenter;
    this.radius = radius;
  }

  setGeometry(apex: Point, baseCenter: Point, radius: number): void {
    this.apex = apex;
    this.baseCenter = baseCenter;
    this.radius = radius;
    this.notify();
  }

  setRadius(radius: number): void {
    this.radius = radius;
    this.notify();
  }

  getType(): string {
    return 'Cone';
  }

  getPoints(): Point[] {
    return [this.apex, this.baseCenter];
  }

  getApex(): Point { return this.apex; }
  getBaseCenter(): Point { return this.baseCenter; }
  getRadius(): number { return this.radius; }

  getHeight(): number {
    return this.apex.distanceTo(this.baseCenter);
  }

  getSlantHeight(): number {
    const h = this.getHeight();
    return Math.sqrt(h * h + this.radius * this.radius);
  }
}
