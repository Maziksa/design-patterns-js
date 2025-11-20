export class ShapeException extends Error {
  constructor(message: string, public readonly shapeId: string) {
    super(message);
    this.name = 'ShapeException';
    Object.setPrototypeOf(this, ShapeException.prototype);
  }
}
