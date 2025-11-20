export class Point {
  readonly x: number;

  readonly y: number;

  readonly z: number;

  constructor(x: number, y: number, z: number = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  distanceTo(other: Point): number {
    const dx = this.x - other.x;
    const dy = this.y - other.y;
    const dz = this.z - other.z;
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }

  equals(other: Point, epsilon: number = 1e-10): boolean {
    return (
      Math.abs(this.x - other.x) < epsilon
      && Math.abs(this.y - other.y) < epsilon
      && Math.abs(this.z - other.z) < epsilon
    );
  }

  toString(): string {
    if (this.z === 0) {
      return `(${this.x}, ${this.y})`;
    }
    return `(${this.x}, ${this.y}, ${this.z})`;
  }
}
