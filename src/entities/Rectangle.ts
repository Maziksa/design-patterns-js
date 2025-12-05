import { Shape } from './Shape';
import { Point } from './Point';

export class Rectangle extends Shape {
  private topLeft: Point;
  private topRight: Point;
  private bottomRight: Point;
  private bottomLeft: Point;

  constructor(
    id: string,
    topLeft: Point,
    topRight: Point,
    bottomRight: Point,
    bottomLeft: Point,
  ) {
    super(id);
    this.topLeft = topLeft;
    this.topRight = topRight;
    this.bottomRight = bottomRight;
    this.bottomLeft = bottomLeft;
  }

  setPoints(topLeft: Point, topRight: Point, bottomRight: Point, bottomLeft: Point): void {
    this.topLeft = topLeft;
    this.topRight = topRight;
    this.bottomRight = bottomRight;
    this.bottomLeft = bottomLeft;
    this.notify();
  }

  getType(): string {
    return 'Rectangle';
  }

  getPoints(): Point[] {
    return [this.topLeft, this.topRight, this.bottomRight, this.bottomLeft];
  }

  getTopLeft(): Point { return this.topLeft; }
  getTopRight(): Point { return this.topRight; }
  getBottomRight(): Point { return this.bottomRight; }
  getBottomLeft(): Point { return this.bottomLeft; }

  getSides(): { top: number; right: number; bottom: number; left: number } {
    return {
      top: this.topLeft.distanceTo(this.topRight),
      right: this.topRight.distanceTo(this.bottomRight),
      bottom: this.bottomRight.distanceTo(this.bottomLeft),
      left: this.bottomLeft.distanceTo(this.topLeft),
    };
  }

  getDiagonals(): { diagonal1: number; diagonal2: number } {
    return {
      diagonal1: this.topLeft.distanceTo(this.bottomRight),
      diagonal2: this.topRight.distanceTo(this.bottomLeft),
    };
  }
}
