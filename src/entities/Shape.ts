import { Point } from './Point';

export abstract class Shape {
  readonly id: string;

  constructor(id: string) {
    this.id = id;
  }

  abstract getType(): string;

  abstract getPoints(): Point[];

  toString(): string {
    return `${this.getType()} [id: ${this.id}]`;
  }
}
