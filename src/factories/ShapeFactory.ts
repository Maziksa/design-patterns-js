import { Shape } from '../entities/Shape';

/**
 * Абстрактная фабрика для создания фигур
 */
export abstract class ShapeFactory {
  abstract getShapeType(): string;

  abstract create(data: string[]): Shape;

  parseNumbers(data: string[], startIndex: number, count: number): number[] {
    const numbers: number[] = [];

    for (let i = 0; i < count; i += 1) {
      const value = parseFloat(data[startIndex + i]);
      if (Number.isNaN(value) || !Number.isFinite(value)) {
        throw new Error(`Invalid number at index ${startIndex + i}: ${data[startIndex + i]}`);
      }
      numbers.push(value);
    }

    return numbers;
  }
}
