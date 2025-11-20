import { ValidationException } from '../exceptions/ValidationException';

export class DataValidator {
  private static readonly NUMBER_REGEX = /^-?\d+\.?\d*$/;

  static parseNumbers(data: string[]): number[] {
    const numbers: number[] = [];

    for (let i = 0; i < data.length; i += 1) {
      const value = data[i].trim();

      if (!DataValidator.NUMBER_REGEX.test(value)) {
        throw new ValidationException(`Invalid number format at position ${i}: "${value}"`);
      }

      const num = parseFloat(value);

      if (!Number.isFinite(num)) {
        throw new ValidationException(`Non-finite number at position ${i}: "${value}"`);
      }

      numbers.push(num);
    }

    return numbers;
  }

  static validateId(id: string): void {
    if (!id || id.trim().length === 0) {
      throw new ValidationException('ID cannot be empty');
    }

    if (id.trim() !== id) {
      throw new ValidationException('ID cannot have leading or trailing whitespace');
    }
  }

  static parseAndValidate(data: string[], expectedLength: number): {
    id: string;
    numbers: number[];
  } {
    if (data.length !== expectedLength) {
      throw new ValidationException(
        `Expected ${expectedLength} values, got ${data.length}`,
      );
    }

    const id = data[0];
    DataValidator.validateId(id);

    const numberStrings = data.slice(1);
    const numbers = DataValidator.parseNumbers(numberStrings);

    return { id, numbers };
  }
}
