import { Point } from './Point';
import { Observable } from '../patterns/observer/Observable';
import { Observer } from '../patterns/observer/Observer';

export abstract class Shape implements Observable {
  readonly id: string;
  private observers: Observer[] = [];

  constructor(id: string) {
    this.id = id;
  }

  abstract getType(): string;
  abstract getPoints(): Point[];

  attach(observer: Observer): void {
    if (!this.observers.includes(observer)) {
      this.observers.push(observer);
    }
  }

  detach(observer: Observer): void {
    const index = this.observers.indexOf(observer);
    if (index !== -1) {
      this.observers.splice(index, 1);
    }
  }

  notify(): void {
    this.observers.forEach((observer) => observer.update(this));
  }

  toString(): string {
    return `${this.getType()} [id: ${this.id}]`;
  }
}
